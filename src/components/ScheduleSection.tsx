"use client";

import React, { useState } from "react";
import styles from "./ScheduleSection.module.css";
import { Clock, Award, BookOpen, Music, Compass, Eye, Download } from "lucide-react";

interface ScheduleItem {
  time: string;
  title: string;
  subtitle?: string;
  details: string[];
  icon: React.ReactNode;
  category: "culture" | "innovation" | "ecology" | "lunch" | "art" | "music";
}

export default function ScheduleSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const scheduleData: ScheduleItem[] = [
    {
      time: "09:00 – 10:00",
      title: "Abertura Cultural + Apresentação do Maracatu Malunguinho",
      subtitle: "Recepção do público e apresentação do projeto",
      details: ["Credenciamento de participantes", "Boas-vindas da equipe organizadora", "Apresentação de boas-vindas do Maracatu Malunguinho"],
      icon: <Music size={18} />,
      category: "culture",
    },
    {
      time: "10:00 – 11:00",
      title: "IdeaThon - Inova São Bento",
      subtitle: "Joseph Nascimento - epec",
      details: [
        "Pensando ideias criativas, culturais e ambientais com uso de tecnologia para a região",
        "Participação ativa da juventude local e moradores",
        "Apresentação especial do Grupo de Capoeira do Mestre Canela"
      ],
      icon: <Award size={18} />,
      category: "innovation",
    },
    {
      time: "11:00 – 12:00",
      title: "Trilha Cultural e Ecológica Guiada",
      subtitle: "Valorização cultural e ecológica do território",
      details: [
        "Caminhada interpretativa de aproximadamente 940m",
        "Conexão histórica entre Paulista e Abreu e Lima",
        "Explicação sobre a fauna local e a importância histórica das Ruínas de São Bento e Forno da Cal"
      ],
      icon: <Compass size={18} />,
      category: "ecology",
    },
    {
      time: "12:00 – 13:00",
      title: "Intervalo / Pausa para Almoço",
      details: ["Momento de descanso", "Conexão livre entre participantes"],
      icon: <Clock size={18} />,
      category: "lunch",
    },
    {
      time: "13:00 – 14:00",
      title: "Apresentação Cultural Afoxé",
      subtitle: "Conexão com as raízes e herança cultural",
      details: ["Interação rítmica com o público", "Celebração das manifestações tradicionais afro-brasileiras"],
      icon: <Music size={18} />,
      category: "culture",
    },
    {
      time: "14:00 – 15:00",
      title: "Intervenção Visual ao Vivo",
      subtitle: "Barbara Andrade",
      details: ["Produção artística ao vivo", "Criação de obra visual dialogando com a história e a paisagem local"],
      icon: <BookOpen size={18} />,
      category: "art",
    },
    {
      time: "15:00 – 16:00",
      title: "Gravação Audiovisual e DJ Set Cultural",
      subtitle: "Barreto Selector",
      details: ["Apresentação musical e curadoria sonora regional", "Gravação oficial de set audiovisual para o Youtube"],
      icon: <Music size={18} />,
      category: "music",
    },
    {
      time: "16:00 – 17:00",
      title: "Projeção Audiovisual + Encerramento Cultural",
      subtitle: "Registro coletivo e falas finais",
      details: ["Exibição de materiais capturados durante o dia", "Reflexões coletivas e falas institucionais de encerramento"],
      icon: <Eye size={18} />,
      category: "culture",
    },
  ];

  const categories = [
    { id: "all", name: "Todos" },
    { id: "innovation", name: "Inovação" },
    { id: "culture", name: "Cultura" },
    { id: "ecology", name: "Ecológico" },
    { id: "art", name: "Arte / Música" }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "innovation": return styles.badgeInnovation;
      case "culture": return styles.badgeCulture;
      case "ecology": return styles.badgeEcology;
      case "lunch": return styles.badgeLunch;
      case "art": return styles.badgeArt;
      case "music": return styles.badgeMusic;
      default: return "";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "innovation": return "Inovação";
      case "culture": return "Cultura";
      case "ecology": return "Trilha & Ecologia";
      case "lunch": return "Intervalo";
      case "art": return "Artes Visuais";
      case "music": return "Música / DJ Set";
      default: return "";
    }
  };

  return (
    <div className={styles.section} id="programacao">
      {/* Subtle radial glow under the timeline */}
      <div className={styles.sectionGlow}></div>
      
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tagline}>CRONOGRAMA DO EVENTO</span>
          <h2 className={styles.title}>Atividades do Laboratório</h2>
          <p className={styles.description}>
            Programação completa para o dia do evento nas Ruínas de São Bento e Forno da Cal. 
            Participe, aprenda e colabore.
          </p>
        </div>

        {/* Filters in Dashboard style */}
        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                if (cat.id === "art") {
                  setActiveCategory(activeCategory === "art_music" ? "all" : "art_music");
                } else {
                  setActiveCategory(cat.id);
                }
              }}
              className={`${styles.filterBtn} ${
                (cat.id === "art" && activeCategory === "art_music") || activeCategory === cat.id 
                  ? styles.filterBtnActive 
                  : ""
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Linear Timeline (Dashboard Style) */}
        <div className={styles.timelineList}>
          <div className={styles.verticalBar}></div>
          
          {scheduleData
            .filter(item => {
              if (activeCategory === "all") return true;
              if (activeCategory === "art_music") return item.category === "art" || item.category === "music";
              return item.category === activeCategory;
            })
            .map((item, index) => (
              <div 
                key={index} 
                className={styles.timelineRow}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Left side: Time indicator */}
                <div className={styles.timeCol}>
                  <Clock size={12} className={styles.clockIcon} />
                  <span className={styles.timeText}>{item.time}</span>
                </div>

                {/* Center: Glowing bullet */}
                <div className={styles.nodeCol}>
                  <div className={`${styles.nodeDot} ${getCategoryColor(item.category)}`}>
                    {item.icon}
                  </div>
                </div>

                {/* Right side: Detailed card */}
                <div className={styles.contentCol}>
                  <div className={styles.card}>
                    <div className={styles.cardHeader}>
                      <span className={`${styles.badge} ${getCategoryColor(item.category)}`}>
                        {getCategoryLabel(item.category)}
                      </span>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                    </div>
                    
                    {item.subtitle && <h4 className={styles.itemSubtitle}>{item.subtitle}</h4>}
                    
                    <ul className={styles.detailsList}>
                      {item.details.map((detail, idx) => (
                        <li key={idx} className={styles.detailItem}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {/* PDF Download Button in modern outline */}
        <div className={styles.downloadWrapper}>
          <a 
            href="/assets/cronograma.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.downloadBtn}
          >
            <Download size={16} /> Baixar PDF do Cronograma
          </a>
        </div>
      </div>
    </div>
  );
}
