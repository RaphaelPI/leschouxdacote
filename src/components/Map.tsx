import type { Product } from "src/types/model"

import { useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl, { GeoJSONSource, Map, PopupOptions } from "mapbox-gl"
import { useRouter } from "next/router"

import PlacePopup from "src/components/PlacePopup"
import { LAYOUT } from "src/constants"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

const MAP_STYLE = "mapbox://styles/mapbox/streets-v11"
const DEFAULT_COORDS: Coordinates = [1.7, 46.7] // France
const DEFAULT_ZOOM = 5

const POPUP_OPTIONS: PopupOptions = {
  offset: 15,
  maxWidth: LAYOUT.mapPopupWidth + "px",
}

const getCoordinates = (ll?: string) => {
  if (!ll) {
    return DEFAULT_COORDS
  }
  return ll.split(",").reverse().map(Number) as Coordinates
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  .mapboxgl-control-container {
    display: none;
  }
  .mapboxgl-popup-content {
    padding: 0;
  }
`

interface MapProps {
  products: Product[]
}

interface Place {
  coordinates: Coordinates
  products: Product[]
}

const Mapbox = ({ products }: MapProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map>()
  const popupRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [placePopup, setPlacePopup] = useState<Place>()
  const { query, replace } = useRouter()
  const { type, ll, z } = query as SearchQuery
  const center = getCoordinates(ll)
  const zoom = Number(z) || DEFAULT_ZOOM

  useEffect(() => {
    if (!mapRef.current) {
      return
    }
    if (center && z) {
      mapRef.current.fitBounds([center, center], { zoom })
    }
  }, [loaded, type, zoom, ll]) // eslint-disable-line

  const handleMove = () => {
    const map = mapRef.current as Map
    const { lat, lng } = map.getCenter()
    const bounds = map.getBounds()
    const diagonal = bounds.getNorthWest().distanceTo(bounds.getSouthEast())
    const radius = Math.round(diagonal / 2)

    // TODO: fix "what" var scope
    console.log("move", radius, query)

    replace({
      query: {
        ...query,
        ll: `${lat.toFixed(4)},${lng.toFixed(4)}`,
        z: map.getZoom(),
        r: radius,
      },
    })
  }

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return
    }

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center,
      zoom,
    })

    map.on("load", () => {
      map.loadImage("/marker.png", (error, image) => {
        if (error) {
          throw error
        }
        if (image) {
          map.addImage("marker", image)
        }
      })
      map.addSource("source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      })
      map.addLayer({
        id: "layer",
        type: "symbol",
        source: "source",
        layout: {
          "icon-image": "marker",
          "icon-size": 0.5,
        },
      })
      setLoaded(true)
    })

    map.on("zoomend", handleMove)
    map.on("dragend", handleMove)

    map.on("click", "layer", ({ features }) => {
      if (!features) {
        return
      }
      const place = JSON.parse(features[0].properties?.place) as Place | undefined
      if (place) {
        setPlacePopup(place)
      }
    })

    map.on("mouseenter", "layer", () => {
      map.getCanvas().style.cursor = "pointer"
    })

    map.on("mouseleave", "layer", () => {
      map.getCanvas().style.cursor = ""
    })

    mapRef.current = map
  })

  useEffect(() => {
    if (!mapRef.current || !loaded) {
      return
    }

    const places: Record<Product["placeId"], Place> = {}
    products.forEach((product) => {
      if (!places[product.placeId]) {
        places[product.placeId] = {
          coordinates: [product._geoloc.lng, product._geoloc.lat],
          products: [],
        }
      }
      places[product.placeId].products.push(product)
    })

    const source = mapRef.current.getSource("source") as GeoJSONSource
    source.setData({
      type: "FeatureCollection",
      features: Object.keys(places).map((placeId) => {
        const place = places[placeId]
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: place.coordinates,
          },
          properties: {
            place,
          },
        }
      }),
    })
  }, [products, loaded])

  useEffect(() => {
    if (!placePopup || !mapRef.current || !popupRef.current) {
      return
    }

    const popup = new mapboxgl.Popup(POPUP_OPTIONS)
      .setLngLat(placePopup.coordinates)
      .setDOMContent(popupRef.current)
      .addTo(mapRef.current)

    return () => {
      popup.remove()
    }
  }, [placePopup])

  return (
    <Container ref={containerRef}>
      {placePopup && <PlacePopup products={placePopup.products} ref={popupRef} />}
    </Container>
  )
}

export default Mapbox
