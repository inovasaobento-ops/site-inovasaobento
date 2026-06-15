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

      // CartoDB Dark Matter tile layer without labels for a clean vector-like design
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
        className: styles.greenMapTiles,
      }).addTo(map);

      // Custom divIcon markers styled as clean circular badges matching the illustrated map style
      const createCustomIcon = (label: string, bgColor: string, borderColor: string, textColor: string) => {
        return L.divIcon({
          className: styles.customMarker,
          html: `
            <div style="background-color: ${bgColor}; border: 3px solid ${borderColor}; color: ${textColor};" class="${styles.markerCircle}">
              <span class="${styles.markerLabel}">${label}</span>
            </div>
            <div style="background-color: ${borderColor};" class="${styles.markerPulse}"></div>
          `,
          iconSize: [44, 44],
          iconAnchor: [22, 22],
          popupAnchor: [0, -22],
        });
      };

      const startIcon = createCustomIcon("Início", "#f4f4ea", "#0b4728", "#0b4728");
      const endIcon = createCustomIcon("Ruínas", "#0b4728", "#f4f4ea", "#f4f4ea");

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

      // Draw path with dual polylines to match the reference map's solid and ground paths!
      const pathPoints: [number, number][] = [
        startCoords,
        [-7.9029, -34.8665], 
        [-7.9024, -34.8695], 
        endCoords,
      ];

      // Outer path (ground path in amber)
      L.polyline(pathPoints, {
        color: "#d97706",
        weight: 6,
        opacity: 0.9,
        lineJoin: "round",
      }).addTo(map);

      // Inner path (solid path in white)
      L.polyline(pathPoints, {
        color: "#ffffff",
        weight: 2.5,
        opacity: 0.95,
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
