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
            Nossa jornada ecológica e cultural começa no Forno da Cal as margens do Rio Timbó e termina nas ruínas da Igreja de São Bento coração histórico de Abreu e Lima. Veja a rota de 940m no mapa abaixo.
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

            {/* Custom Map Legend overlay matching the reference design */}
            <div className={styles.mapLegend}>
              <div className={styles.legendHeader}>LEGENDA DA ROTA</div>
              <div className={styles.legendBody}>
                <div className={styles.legendItem}>
                  <span className={`${styles.legendColor} ${styles.legendStart}`}></span>
                  <span>Partida (Jaguarana)</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={`${styles.legendColor} ${styles.legendEnd}`}></span>
                  <span>Chegada (Ruínas)</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={`${styles.legendColor} ${styles.legendPath}`}></span>
                  <span>Trilha Ecológica (940m)</span>
                </div>
              </div>
            </div>

            {/* Custom Compass Rose overlay matching the reference design */}
            <div className={styles.mapCompass}>
              <svg viewBox="0 0 100 100" className={styles.compassSvg}>
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(244, 244, 234, 0.2)" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(244, 244, 234, 0.1)" strokeDasharray="2 2" />
                
                {/* North-South Points */}
                <polygon points="50,15 46,50 50,47" fill="var(--color-bege)" />
                <polygon points="50,15 54,50 50,47" fill="var(--color-taupe)" />
                <polygon points="50,85 46,50 50,53" fill="var(--color-taupe)" />
                <polygon points="50,85 54,50 50,53" fill="var(--color-bege)" />
                
                {/* West-East Points */}
                <polygon points="15,50 50,46 47,50" fill="var(--color-taupe)" />
                <polygon points="15,50 50,54 47,50" fill="var(--color-bege)" />
                <polygon points="85,50 50,46 53,50" fill="var(--color-bege)" />
                <polygon points="85,50 50,54 53,50" fill="var(--color-taupe)" />
                
                {/* Center circle */}
                <circle cx="50" cy="50" r="4" fill="var(--color-forest-green)" stroke="var(--color-bege)" strokeWidth="1.5" />
                
                {/* Cardinal Direction Text Labels */}
                <text x="50" y="11" fontSize="10" fontWeight="900" textAnchor="middle" fill="var(--color-bege)">N</text>
                <text x="50" y="97" fontSize="10" fontWeight="900" textAnchor="middle" fill="var(--color-bege)">S</text>
                <text x="7" y="53" fontSize="10" fontWeight="900" textAnchor="middle" fill="var(--color-bege)">W</text>
                <text x="93" y="53" fontSize="10" fontWeight="900" textAnchor="middle" fill="var(--color-bege)">E</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
