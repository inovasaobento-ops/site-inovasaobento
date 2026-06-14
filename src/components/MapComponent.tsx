"use client";

import React, { useEffect, useRef } from "react";
import styles from "./MapSection.module.css";

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !mapRef.current) return;
    initialized.current = true;

    const initMap = async () => {
      if (!mapRef.current) return;
      // Import leaflet dynamically to prevent SSR errors
      const L = (await import("leaflet")).default;

      const startCoords: [number, number] = [-7.9030625, -34.8634375]; // Paulista (Jaguarana)
      const endCoords: [number, number] = [-7.90222, -34.87194];      // Abreu e Lima (Ruínas)
      const centerCoords: [number, number] = [
        (startCoords[0] + endCoords[0]) / 2,
        (startCoords[1] + endCoords[1]) / 2,
      ];

      // Initialize map
      const map = L.map(mapRef.current, {
        center: centerCoords,
        zoom: 15,
        scrollWheelZoom: false,
      });

      // CartoDB Dark Matter tile layer for a beautiful dark dashboard theme
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      // Custom divIcon markers styled with neon glows for dark mode
      const createCustomIcon = (label: string, color: string) => {
        return L.divIcon({
          className: styles.customMarker,
          html: `
            <div style="background-color: ${color}; border-color: #030f07; box-shadow: 0 0 15px ${color};" class="${styles.markerPin}">
              <span class="${styles.markerLabel}">${label}</span>
            </div>
            <div style="border-top-color: ${color};" class="${styles.markerArrow}"></div>
            <div style="background-color: ${color};" class="${styles.markerPulse}"></div>
          `,
          iconSize: [36, 42],
          iconAnchor: [18, 42],
          popupAnchor: [0, -42],
        });
      };

      const startIcon = createCustomIcon("Início", "#8fc95d"); // Neon Green
      const endIcon = createCustomIcon("Ruínas", "#9ae193");    // Soft Light Green

      // Add Start Marker
      L.marker(startCoords, { icon: startIcon })
        .addTo(map)
        .bindPopup(`
          <div class="${styles.mapPopup}">
            <strong>Ponto de Partida</strong><br/>
            <span>Mata de Jaguarana, Paulista - PE</span><br/>
            <small>Horário de Encontro: 11:00</small>
          </div>
        `);

      // Add End Marker
      L.marker(endCoords, { icon: endIcon })
        .addTo(map)
        .bindPopup(`
          <div class="${styles.mapPopup}">
            <strong>Ponto de Chegada</strong><br/>
            <span>Ruínas de São Bento & Forno da Cal, Abreu e Lima - PE</span><br/>
            <small>Sítio Histórico - Século XVII</small>
          </div>
        `);

      // Draw path with dual polylines to create a neon glowing line effect!
      const pathPoints: [number, number][] = [
        startCoords,
        [-7.9029, -34.8665], 
        [-7.9024, -34.8695], 
        endCoords,
      ];

      // Outer glow line
      L.polyline(pathPoints, {
        color: "#8fc95d",
        weight: 8,
        opacity: 0.2,
        lineJoin: "round",
      }).addTo(map);

      // Inner dashed line
      L.polyline(pathPoints, {
        color: "#8fc95d",
        weight: 3.5,
        dashArray: "6, 6",
        opacity: 0.9,
        lineJoin: "round",
      }).addTo(map);

      // Adjust map view
      const group = L.featureGroup([
        L.marker(startCoords),
        L.marker(endCoords)
      ]);
      map.fitBounds(group.getBounds().pad(0.15));
    };

    initMap();
  }, []);

  return <div ref={mapRef} className={styles.mapCanvas} />;
}
