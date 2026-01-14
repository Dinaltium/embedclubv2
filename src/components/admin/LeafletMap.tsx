"use client";

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'

interface ClickHandlerProps {
  onSelect: (coords: { lat: number; lng: number }) => void
  setInternalMarker: (coords: { lat: number; lng: number }) => void
}

function ClickHandler({ onSelect, setInternalMarker }: ClickHandlerProps) {
  useMapEvents({
    click(e) {
      const coords = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      }
      setInternalMarker(coords)
      onSelect(coords)
    },
  })
  return null
}

// Component to update map center when coordinates change externally
function MapUpdater({ lat, lng, setInternalMarker }: { lat?: number; lng?: number; setInternalMarker: (coords: { lat: number; lng: number }) => void }) {
  const map = useMap()
  
  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      setInternalMarker({ lat, lng })
      map.setView([lat, lng], map.getZoom())
    }
  }, [lat, lng, map, setInternalMarker])
  
  return null
}

interface LeafletMapProps {
  lat?: number
  lng?: number
  onChange: (coords: { lat: number; lng: number }) => void
}

export default function LeafletMap({ lat, lng, onChange }: LeafletMapProps) {
  // Internal marker state that doesn't change from parent re-renders
  const [markerPos, setMarkerPos] = useState<{ lat: number; lng: number } | null>(null)

  // Load Leaflet CSS and fix marker icons on mount
  useEffect(() => {
    // Dynamically import CSS only on client
    import('leaflet/dist/leaflet.css')
    
    // Fix for default marker icons in react-leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  // Update marker position when props change (from manual input)
  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      setMarkerPos({ lat, lng })
    }
  }, [lat, lng])

  // PA College of Engineering coordinates as default
  const defaultPosition: [number, number] = [12.808128, 74.933174]
  const position: [number, number] = lat !== undefined && lng !== undefined ? [lat, lng] : defaultPosition

  return (
    <div style={{ height: '600px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer 
        center={position} 
        zoom={17.5} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onSelect={onChange} setInternalMarker={setMarkerPos} />
        <MapUpdater lat={lat} lng={lng} setInternalMarker={setMarkerPos} />
        {markerPos && <Marker position={[markerPos.lat, markerPos.lng]} />}
      </MapContainer>
    </div>
  )
}
