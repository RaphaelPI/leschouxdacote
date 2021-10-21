import type { Product } from "src/types/model"

import { useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl, { GeoJSONSource, Map, PopupOptions } from "mapbox-gl"
import { useRouter } from "next/router"

import PlacePopup from "src/components/PlacePopup"
import { LAYOUT } from "src/constants"
import { getBounds } from "src/helpers/map"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

const ZOOM = {
  city: 12,
  dpt: 9,
  region: 7,
}

const POPUP_OPTIONS: PopupOptions = {
  offset: 15,
  maxWidth: LAYOUT.mapPopupWidth + "px",
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
  coordinates: [number, number]
  products: Product[]
}

const Mapbox = ({ products }: MapProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map>()
  const popupRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [placePopup, setPlacePopup] = useState<Place>()
  const { query } = useRouter()
  const { type, ll } = query as SearchQuery
  const placeCoords = ll ? (ll.split(",").reverse().map(Number) as [number, number]) : null
  const bounds = getBounds(products.map(({ _geoloc }) => [_geoloc.lng, _geoloc.lat]))

  useEffect(() => {
    if (!mapRef.current) {
      return
    }
    if (bounds) {
      mapRef.current.fitBounds(bounds, {
        maxZoom: 12,
        padding: 50,
      })
    } else if (placeCoords) {
      mapRef.current.fitBounds([placeCoords, placeCoords], {
        zoom: ZOOM[type || "city"],
      })
    }
  }, [loaded, type, JSON.stringify(bounds), JSON.stringify(placeCoords)]) // eslint-disable-line

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return
    }
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [1.7, 46.7],
      zoom: 5,
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

    const handleMove = () => {
      const center = map.getCenter()
      const zoom = map.getZoom()
      console.log(center, zoom) // TODO: update search
    }

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
