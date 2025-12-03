'use client'
import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

function computeBounds(sites){
  if(!sites || sites.length===0) return null
  let minLng=Infinity,minLat=Infinity,maxLng=-Infinity,maxLat=-Infinity
  sites.forEach(s=>{
    if(typeof s.longitude !== 'number' || typeof s.latitude !== 'number') return
    minLng = Math.min(minLng, s.longitude); maxLng = Math.max(maxLng, s.longitude)
    minLat = Math.min(minLat, s.latitude); maxLat = Math.max(maxLat, s.latitude)
  })
  if(minLng===Infinity) return null
  return [[minLng, minLat],[maxLng, maxLat]]
}

export default function MapBox({ sites = [], risks = [] }) {
  const elRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(()=>{
    if(!elRef.current) return
    if(mapRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: elRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: sites[0] ? [sites[0].longitude, sites[0].latitude] : [31, -17.8],
      zoom: sites.length ? 10 : 2
    })

    mapRef.current.on('load', ()=>{
      const bounds = computeBounds(sites)
      if(bounds){ try{ mapRef.current.fitBounds(bounds, { padding: 60, maxZoom: 14 }) }catch(e){} }

      if(mapRef.current._markers) { mapRef.current._markers.forEach(m=>m.remove()) }
      mapRef.current._markers = []

      sites.forEach(s=>{
        if(typeof s.longitude !== 'number' || typeof s.latitude !== 'number') return
        const r = (risks || []).find(x=>x.site_id === s.site_id) || {}
        const score = r.risk_score ?? 0
        const color = score >= 60 ? '#ef4444' : score >= 30 ? '#f59e0b' : '#10b981'
        const mark = document.createElement('div')
        mark.style.width = '18px'; mark.style.height = '18px'; mark.style.borderRadius = '6px'; mark.style.background = color; mark.style.boxShadow = '0 8px 18px rgba(0,0,0,0.45)'
        new mapboxgl.Marker(mark).setLngLat([s.longitude, s.latitude]).setPopup(new mapboxgl.Popup({ offset: 12 }).setHTML(`<strong>${s.name}</strong><div style="color:#bcd">${s.region||''}</div><div style="color:#bcd">Risk: ${score}</div>`)).addTo(mapRef.current)
      })
    })

    return ()=>{ if(mapRef.current){ mapRef.current.remove(); mapRef.current = null } }
  }, [sites, risks])

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <div style={{fontSize:12,color:'var(--muted)'}}>Map</div>
        <div className="legend"><span className="marker" style={{background:'#10b981'}}></span>Low <span style={{width:8}}></span><span className="marker" style={{background:'#f59e0b'}}></span>Medium <span style={{width:8}}></span><span className="marker" style={{background:'#ef4444'}}></span>High</div>
      </div>
      <div ref={elRef} style={{flex:1,minHeight:240,borderRadius:10,overflow:'hidden'}} />
    </div>
  )
}
