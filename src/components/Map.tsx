import type { Product } from "src/types/model"

import { useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import "mapbox-gl/dist/mapbox-gl.css"
import mapboxgl, { GeoJSONSource, Map, PopupOptions } from "mapbox-gl"
import PlacePopup from "./PlacePopup"
import { LAYOUT } from "src/constants"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

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
  const container = useRef<HTMLDivElement>(null)
  const map = useRef<Map>()
  const popupRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [placePopup, setPlacePopup] = useState<Place>()

  useEffect(() => {
    if (!container.current || map.current) {
      return
    }
    const mapRef = new mapboxgl.Map({
      container: container.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [1.7, 46.7],
      zoom: 5,
    })

    mapRef.on("load", () => {
      mapRef.loadImage("/marker.png", (error, image) => {
        if (error) {
          throw error
        }
        if (image) {
          mapRef.addImage("marker", image)
        }
      })
      mapRef.addSource("source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      })
      mapRef.addLayer({
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

    mapRef.on("move", () => {
      // TODO: refresh results
      console.log(mapRef.getCenter(), mapRef.getZoom())
    })

    mapRef.on("click", "layer", ({ features }) => {
      if (!features) {
        return
      }
      const place = JSON.parse(features[0].properties?.place) as Place | undefined
      if (place) {
        setPlacePopup(place)
      }
    })

    mapRef.on("mouseenter", "layer", () => {
      mapRef.getCanvas().style.cursor = "pointer"
    })

    mapRef.on("mouseleave", "layer", () => {
      mapRef.getCanvas().style.cursor = ""
    })

    map.current = mapRef
  })

  useEffect(() => {
    if (!map.current || !loaded) {
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

    const source = map.current.getSource("source") as GeoJSONSource
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
    if (!placePopup || !popupRef.current) {
      return
    }

    const popup = new mapboxgl.Popup(POPUP_OPTIONS)
      .setLngLat(placePopup.coordinates)
      .setDOMContent(popupRef.current)
      .addTo(map.current as Map)

    return () => {
      popup.remove()
    }
  }, [placePopup])

  return (
    <Container ref={container}>{placePopup && <PlacePopup products={placePopup.products} ref={popupRef} />}</Container>
  )
}

export default Mapbox
