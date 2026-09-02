"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./MapSection.module.css";
import { MapPin, Navigation, Compass, ExternalLink, Map as MapIcon } from "lucide-react";

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

const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/ZVqP541KDSZJBTGV8";
const GOOGLE_MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.688229618058!2d-34.8656322!3d-7.9037675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab15097ab16705%3A0x9bea04f45a8ab97d!2sRu%C3%ADnas%20do%20Forno%20de%20Cal!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr";

export default function MapSection() {
  const [activeTab, setActiveTab] = useState<"google" | "trilha">("google");

  const handleOpenGoogleMaps = () => {
    window.open(GOOGLE_MAPS_LINK, "_blank");
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
            Nossa jornada ecológica e cultural começa no Forno da Cal às margens do Rio Timbó e termina nas ruínas da Igreja de São Bento, coração histórico de Abreu e Lima. Veja a localização no mapa abaixo.
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
                    onClick={handleOpenGoogleMaps}
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
                    onClick={handleOpenGoogleMaps}
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

          {/* Right panel: Embedded Google Map & Map Controls */}
          <div className={styles.mapContainer}>
            {/* View Mode Selector Tabs */}
            <div className={styles.mapTabBar}>
              <button 
                className={`${styles.tabBtn} ${activeTab === "google" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("google")}
              >
                <MapPin size={15} /> Google Maps Oficial
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === "trilha" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("trilha")}
              >
                <MapIcon size={15} /> Rota da Trilha (940m)
              </button>
              <a 
                href={GOOGLE_MAPS_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.openDirectBtn}
              >
                <span>Abrir App</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Google Maps View */}
            {activeTab === "google" ? (
              <div className={styles.googleEmbedWrapper}>
                <iframe
                  src={GOOGLE_MAPS_EMBED}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "480px", width: "100%" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de Localização Google Maps - Ruínas do Forno de Cal"
                ></iframe>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
