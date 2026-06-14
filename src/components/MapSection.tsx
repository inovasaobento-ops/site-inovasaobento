"use client";

import React from "react";
import dynamic from "next/dynamic";
import styles from "./MapSection.module.css";
import { MapPin, Navigation, Compass, ExternalLink } from "lucide-react";

// Load MapComponent dynamically to avoid "window is not defined" SSR errors
const DynamicMap = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className={styles.mapLoading}>
      <div className={styles.spinner}></div>
      <span>Carregando mapa interativo...</span>
    </div>
  ),
});

export default function MapSection() {
  const handleOpenGoogleMaps = (lat: number, lon: number) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`, "_blank");
  };

  const handleOpenWaze = (lat: number, lon: number) => {
    window.open(`https://waze.com/ul?ll=${lat},${lon}&navigate=yes`, "_blank");
  };

  return (
    <div className={styles.section} id="localizacao">
      {/* Watermark of ruins in background */}
      <div className={styles.watermarkBg}></div>
      
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tagline}>COMO CHEGAR</span>
          <h2 className={styles.title}>Localização da Trilha e do Evento</h2>
          <p className={styles.description}>
            Nossa jornada ecológica começa em Paulista e termina no coração histórico de Abreu e Lima. 
            Veja a rota de 940m no mapa abaixo.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Left panel: Info cards */}
          <div className={styles.infoPanel}>
            
            {/* Start Card */}
            <div className={styles.card}>
              <div className={`${styles.iconHeader} ${styles.startIconBg}`}>
                <MapPin size={24} />
                <h3>Ponto de Encontro e Partida</h3>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.addressName}>Mata de Jaguarana</p>
                <p className={styles.addressDetails}>
                  <strong>Plus Code:</strong> 34WP+QJ - Jaguarana, Paulista - PE
                </p>
                <p className={styles.helperText}>
                  Iniciaremos a recepção do público e a trilha às 11:00h no ponto de encontro. 
                  A área possui vegetação preservada e acesso pela Estrada de Jaguarana.
                </p>
                <div className={styles.btnGroup}>
                  <button 
                    onClick={() => handleOpenGoogleMaps(-7.9030625, -34.8634375)}
                    className={styles.mapBtn}
                  >
                    <Navigation size={14} /> Google Maps
                  </button>
                  <button 
                    onClick={() => handleOpenWaze(-7.9030625, -34.8634375)}
                    className={styles.wazeBtn}
                  >
                    <ExternalLink size={14} /> Waze
                  </button>
                </div>
              </div>
            </div>

            {/* Trail Distance Indicator */}
            <div className={styles.trailIndicator}>
              <Compass className={styles.compassIcon} />
              <div>
                <h4>Trilha Cultural e Ecológica</h4>
                <p>Distância: ~940 metros | Tempo estimado: 15-20 min a pé</p>
              </div>
            </div>

            {/* End Card */}
            <div className={styles.card}>
              <div className={`${styles.iconHeader} ${styles.endIconBg}`}>
                <MapPin size={24} />
                <h3>Local Principal (Chegada)</h3>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.addressName}>Ruínas de São Bento + Forno da Cal</p>
                <p className={styles.addressDetails}>
                  R. São Bento - Engenho Jaguaribe, Abreu e Lima - PE, 53417-480
                </p>
                <p className={styles.helperText}>
                  Aqui acontecerão as principais palestras, IdeaThon, apresentações de Afoxé, 
                  intervenções artísticas, DJ set e projeções audiovisuais.
                </p>
                <div className={styles.btnGroup}>
                  <button 
                    onClick={() => handleOpenGoogleMaps(-7.90222, -34.87194)}
                    className={styles.mapBtn}
                  >
                    <Navigation size={14} /> Google Maps
                  </button>
                  <button 
                    onClick={() => handleOpenWaze(-7.90222, -34.87194)}
                    className={styles.wazeBtn}
                  >
                    <ExternalLink size={14} /> Waze
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right panel: Interactive Map */}
          <div className={styles.mapContainer}>
            <DynamicMap />
          </div>
        </div>
      </div>
    </div>
  );
}
