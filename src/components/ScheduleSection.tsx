"use client";

import React from "react";
import styles from "./ScheduleSection.module.css";

interface EventLocation {
  type: string;
  name: string;
}

interface EventItem {
  time: string;
  title: string;
  description?: string;
  location: EventLocation;
}

export default function ScheduleSection() {
  const scheduleData: EventItem[] = [
    {
      time: "09:00 - 10:00",
      title: "Abertura cultural + Apresentação do Maracatu Malunguinho",
      description: "Recepção do público e apresentação do projeto",
      location: { type: "Ruína", name: "Forno da Cal" }
    },
    {
      time: "10:00 - 11:00",
      title: "IdeaThon- Inova São Bento - Joseph Nascimento - epec",
      description: "Pensando ideias criativas, culturais e ambientais com uso de tecnologia para a região. Participação da juventude local. Apresentação Grupo de Capoeira do Mestre Canela",
      location: { type: "Ruína", name: "Forno da Cal" }
    },
    {
      time: "11:00 - 12:00",
      title: "Trilha Cultural e Ecológica guiada.",
      description: "(Valorização cultural e ecológica do território).",
      location: { type: "Ruína", name: "Forno da Cal" }
    },
    {
      time: "12:00 - 13:00",
      title: "Intervalo / Picnick",
      location: { type: "Ruína", name: "Forno da Cal" }
    },
    {
      time: "13:00 - 14:00",
      title: "Apresentação Ciranda",
      location: { type: "Ruína", name: "São Bento" }
    },
    {
      time: "14:00 - 15:00",
      title: "Intervenção visual Live Paint, Barbara Andrade.",
      location: { type: "Ruína", name: "São Bento" }
    },
    {
      time: "15:00 - 16:00",
      title: "Apresentação e gravação audiovisual youtube, DJ set cultural Barreto Selector",
      location: { type: "Ruína", name: "Forno da Cal" }
    },
    {
      time: "16:00 - 17:00",
      title: "Projeção audiovisual na Ruína da Igreja, encerramento, Registro coletivo e falas finais.",
      location: { type: "Ruína", name: "São Bento" }
    }
  ];

  return (
    <section className={styles.section} id="programacao">
      <div className="container">
        <div className={styles.containerBox}>
          
          {/* Cabeçalho da Seção com Ícone de Seta Pixelado do Mockup */}
          <div className={styles.titleRow}>
            <div className={styles.titleWrapper}>
              <svg className={styles.pixelArrow} width="48" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="10" width="32" height="4" fill="#0b4728" />
                <rect x="36" y="8" width="4" height="8" fill="#0b4728" />
                <rect x="40" y="6" width="4" height="12" fill="#0b4728" />
                <rect x="44" y="4" width="4" height="16" fill="#0b4728" />
                <rect x="48" y="10" width="4" height="4" fill="#0b4728" />
              </svg>
              <h2 className={styles.sectionTitle}>PROGRAMAÇÃO</h2>
            </div>
          </div>
          
          {/* Lista com Barra de Rolagem */}
          <div className={styles.listScrollContainer}>
            {scheduleData.map((item, index) => (
              <div key={index} className={styles.itemRow}>
                
                {/* Lado Esquerdo: Hora, Título e Descrição */}
                <div className={styles.itemInfo}>
                  <span className={styles.itemTime}>{item.time}</span>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  {item.description && (
                    <p className={styles.itemDescription}>{item.description}</p>
                  )}
                </div>
                
                {/* Lado Direito: Pin de Localização e Texto Stacked */}
                <div className={styles.itemLocation}>
                  <div className={styles.locationWrapper}>
                    <svg className={styles.locationPin} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <div className={styles.locationText}>
                      <span className={styles.locType}>{item.location.type}</span>
                      <span className={styles.locName}>{item.location.name}</span>
                    </div>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
          
          {/* Botão sutil para baixar o PDF completo */}
          <div className={styles.downloadWrapper}>
            <a 
              href="/assets/cronograma.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.downloadBtn}
            >
              Baixar Cronograma em PDF
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
}
