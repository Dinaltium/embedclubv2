"use client";

import { useField } from '@payloadcms/ui'
import type { FieldClientComponent } from 'payload'
import dynamic from 'next/dynamic'
import React, { useEffect, useState, useRef } from 'react'

// Dynamically import Leaflet map to avoid SSR issues
const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false })

const LeafletLocationField: FieldClientComponent = (props) => {
  const { path } = props
  const { value = {}, setValue } = useField<{ lat?: number; lng?: number }>({ path })
  const [localLat, setLocalLat] = useState<string>('')
  const [localLng, setLocalLng] = useState<string>('')
  const isUpdatingFromMap = useRef(false)

  // Sync local state with form value only when NOT updating from map
  useEffect(() => {
    if (!isUpdatingFromMap.current) {
      if (value.lat !== undefined) {
        setLocalLat(value.lat.toString())
      }
      if (value.lng !== undefined) {
        setLocalLng(value.lng.toString())
      }
    }
    isUpdatingFromMap.current = false
  }, [value.lat, value.lng])

  const handleMapClick = (coords: { lat: number; lng: number }) => {
    isUpdatingFromMap.current = true
    setLocalLat(coords.lat.toString())
    setLocalLng(coords.lng.toString())
    setValue(coords)
  }

  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setLocalLat(val)
    const lat = val ? parseFloat(val) : undefined
    const lng = localLng ? parseFloat(localLng) : undefined
    if (lat !== undefined && lng !== undefined && !isNaN(lat) && !isNaN(lng)) {
      setValue({ lat, lng })
    }
  }

  const handleLngChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setLocalLng(val)
    const lat = localLat ? parseFloat(localLat) : undefined
    const lng = val ? parseFloat(val) : undefined
    if (lat !== undefined && lng !== undefined && !isNaN(lat) && !isNaN(lng)) {
      setValue({ lat, lng })
    }
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ marginBottom: '15px' }}>
        <strong>Click on the map to set location, or enter coordinates manually:</strong>
      </div>

      {/* Manual Input Fields */}
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>
            Latitude
          </label>
          <input
            type="number"
            step="0.000001"
            value={localLat}
            onChange={handleLatChange}
            placeholder="e.g., 12.806922"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>
            Longitude
          </label>
          <input
            type="number"
            step="0.000001"
            value={localLng}
            onChange={handleLngChange}
            placeholder="e.g., 74.932009"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Map */}
      <div style={{ marginBottom: '10px' }}>
        <strong>Click on map to set marker:</strong>
      </div>
      <LeafletMap
        lat={value.lat}
        lng={value.lng}
        onChange={handleMapClick}
      />

      {/* Current Coordinates Display */}
      {value.lat && value.lng && (
        <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px', fontSize: '12px' }}>
          <strong>Current Location:</strong> {value.lat.toFixed(6)}, {value.lng.toFixed(6)}
        </div>
      )}
    </div>
  )
}

export default LeafletLocationField
