"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./IdeasSection.module.css";
import { ExternalLink, PlusCircle, RefreshCw, CheckCircle2 } from "lucide-react";
import { supabase } from "@/utils/supabaseClient";

export interface IdeaItem {
  id: string | number;
  description: string;
  author: string;
  timestamp?: string;
}

// Initial 12 ideas from the event (First item matches the exact reference screenshot from Illustrator!)
const INITIAL_IDEAS: IdeaItem[] = [
  {
    id: 1,
    description: "Portal Digital de agenda cultural com atrações culturais locais Semanal.",
    author: "Andressa Santos",
  },
  {
    id: 2,
    description: "Oficinas gratuitas de Maracatu e Afoxé nas Ruínas aos finais de semana.",
    author: "Carlos Eduardo",
  },
  {
    id: 3,
    description: "Aplicativo com mapa interativo e realidade aumentada das Ruínas de São Bento.",
    author: "Mariana Lima",
  },
  {
    id: 4,
    description: "Feira de Gastronomia Criativa e produtos artesanais do Litoral Norte.",
    author: "João Pedro Silva",
  },
  {
    id: 5,
    description: "Trilha ecológica noturna guiada com iluminação sustentável de baixo impacto.",
    author: "Fernanda Oliveira",
  },
  {
    id: 6,
    description: "Sinalização tátil, em Braille e QR Codes com áudio ao longo do percurso.",
    author: "Lucas Mendes",
  },
  {
    id: 7,
    description: "Ponto de coleta seletiva e compostagem comunitária no Forno da Cal.",
    author: "Beatriz Souza",
  },
  {
    id: 8,
    description: "Cineclube comunitário ao ar livre projetando filmes e memórias da região.",
    author: "Gabriel Torres",
  },
  {
    id: 9,
    description: "Estação de bicicletas ecológicas para percorrer a Trilha Jaguarana-Ruínas.",
    author: "Camila Ribeiro",
  },
  {
    id: 10,
    description: "Oficinas de fotografia patrimonial para jovens estudantes da rede pública.",
    author: "Rafael Costa",
  },
  {
    id: 11,
    description: "Horta comunitária de mudas medicinais e nativas da Mata Atlântica.",
    author: "Patricia Gomes",
  },
  {
    id: 12,
    description: "Rodada de mentorias e aceleração para startups e coletivos culturais locais.",
    author: "Thiago Nascimento",
  },
];

const GOOGLE_FORM_URL = "https://forms.gle/VMGwrMtQ5pLFZnrDA";

export default function IdeasSection() {
  const [ideas, setIdeas] = useState<IdeaItem[]>(INITIAL_IDEAS);
  const [showModal, setShowModal] = useState(false);
  const [newDesc, setNewDesc] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Fetch ideas from LocalStorage, Supabase, or published Google Sheets CSV if available
  const fetchLiveIdeas = useCallback(async () => {
    setIsSyncing(true);
    try {
      let combined: IdeaItem[] = [...INITIAL_IDEAS];

      // 1. Check LocalStorage for locally created ideas
      const savedLocal = localStorage.getItem("inova_ideas_local");
      if (savedLocal) {
        const parsed: IdeaItem[] = JSON.parse(savedLocal);
        combined = [...parsed, ...combined];
      }

      // 2. Fetch from Supabase if configured
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && supabase) {
        const { data, error } = await supabase
          .from("ideas")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          const supabaseMapped: IdeaItem[] = data.map((item: { id: string | number; description?: string; idea_text?: string; author?: string; author_name?: string }) => ({
            id: `sp_${item.id}`,
            description: item.description || item.idea_text || "",
            author: item.author || item.author_name || "Participante do Evento",
          }));
          combined = [...supabaseMapped, ...combined];
        }
      }

      // 3. Fetch from Google Sheets published CSV URL if provided in environment
      const csvUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CSV_URL || process.env.NEXT_PUBLIC_IDEAS_CSV_URL;
      if (csvUrl) {
        const res = await fetch(csvUrl);
        if (res.ok) {
          const text = await res.text();
          const lines = text.split("\n").filter((line) => line.trim() !== "");
          const sheetIdeas: IdeaItem[] = [];
          // Skip header row if present
          for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(",").map((c) => c.replace(/^"|"$/g, "").trim());
            if (cols.length >= 2) {
              const ideaText = cols[1] || cols[0];
              const authorText = cols[2] || cols[1] || "Participante";
              if (ideaText) {
                sheetIdeas.push({
                  id: `csv_${i}`,
                  description: ideaText,
                  author: authorText,
                });
              }
            }
          }
          if (sheetIdeas.length > 0) {
            combined = [...sheetIdeas.reverse(), ...combined];
          }
        }
      }

      // Deduplicate ideas by ID or description text
      const uniqueIdeas: IdeaItem[] = [];
      const seenTexts = new Set<string>();
      for (const item of combined) {
        const key = item.description.trim().toLowerCase();
        if (!seenTexts.has(key)) {
          seenTexts.add(key);
          uniqueIdeas.push(item);
        }
      }

      setIdeas(uniqueIdeas);
    } catch (err) {
      console.warn("Real-time ideas fetch simulation fallback active:", err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Sync on mount and poll every 10 seconds for real-time form submission updates!
  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
      if (isMounted) {
        fetchLiveIdeas();
      }
    }, 0);

    const interval = setInterval(() => {
      if (isMounted) {
        fetchLiveIdeas();
      }
    }, 10000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [fetchLiveIdeas]);

  // Handle direct idea submission inside modal
  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim() || !newAuthor.trim()) return;

    setIsSubmitting(true);
    const newIdeaObj: IdeaItem = {
      id: Date.now(),
      description: newDesc.trim(),
      author: newAuthor.trim(),
    };

    try {
      // Save locally
      const savedLocal = localStorage.getItem("inova_ideas_local");
      const currentLocal: IdeaItem[] = savedLocal ? JSON.parse(savedLocal) : [];
      const updatedLocal = [newIdeaObj, ...currentLocal];
      localStorage.setItem("inova_ideas_local", JSON.stringify(updatedLocal));

      // Attempt Supabase insert if available
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && supabase) {
        await supabase.from("ideas").insert([
          {
            description: newDesc.trim(),
            author: newAuthor.trim(),
          },
        ]);
      }

      setIdeas((prev) => [newIdeaObj, ...prev]);
      setSubmitSuccess(true);
      setNewDesc("");
      setNewAuthor("");
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowModal(false);
      }, 1500);
    } catch (err) {
      console.error("Direct submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section} id="ideias">
      <div className="container">
        <div className={styles.containerBox}>
          
          {/* Header Row with Pixel Arrow & Title matching reference layout */}
          <div className={styles.headerRow}>
            <div className={styles.titleWrapper}>
              <Image 
                src="/assets/icon-arrow.svg" 
                alt="Seta" 
                width={75} 
                height={24} 
                className={styles.pixelArrow}
                priority
              />
              <h2 className={styles.sectionTitle}>
                ESSAS SÃO ALGUMAS IDEIAS NOVADORAS PENSADAS NO EVENTO
              </h2>
            </div>

            {/* Google Form Action Buttons */}
            <div className={styles.headerActionGroup}>
              <span className={styles.liveBadge}>
                <span className={styles.liveDot}></span>
                EM TEMPO REAL
              </span>
              
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.googleFormBtn}
              >
                <span>Enviar Ideia no Form</span>
                <ExternalLink size={16} />
              </a>

              <button 
                onClick={() => setShowModal(true)} 
                className={styles.addDirectBtn}
                title="Cadastrar ideia diretamente no site"
              >
                <PlusCircle size={16} />
                <span>Rápido (+)</span>
              </button>
            </div>
          </div>

          {/* Scroll Container displaying 3 rows of 4 post-its with right scrollbar */}
          <div className={styles.scrollContainer}>
            <div className={styles.postitGrid}>
              {ideas.map((idea) => (
                <div key={idea.id} className={styles.postitCard}>
                  <div className={styles.postitContent}>
                    {idea.description}
                  </div>
                  <div className={styles.postitAuthor}>
                    {idea.author}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Link Row */}
          <div className={styles.bottomCtaRow}>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.formFooterLink}
            >
              Clique aqui para enviar sua ideia pelo Formulário Google oficial ↗
            </a>
            <button 
              onClick={fetchLiveIdeas} 
              className={styles.addDirectBtn}
              style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}
            >
              <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} />
              <span>Atualizar Mural</span>
            </button>
          </div>

        </div>
      </div>

      {/* Direct Add Idea Modal Overlay */}
      {showModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Cadastrar Ideia no Mural</h3>
            <p className={styles.modalDesc}>
              Sua ideia aparecerá instantaneamente no post-it em tempo real! Você também pode usar o{" "}
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
                Formulário Google oficial
              </a>.
            </p>

            {submitSuccess ? (
              <div style={{ textAlign: "center", padding: "1.5rem 0", color: "#0b4728" }}>
                <CheckCircle2 size={48} style={{ margin: "0 auto 0.5rem auto" }} />
                <h4>Ideia Adicionada ao Post-it!</h4>
              </div>
            ) : (
              <form onSubmit={handleDirectSubmit} className={styles.modalForm}>
                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#0b4728", display: "block", marginBottom: "0.3rem" }}>
                    Descrição da Ideia *
                  </label>
                  <textarea
                    className={styles.modalTextarea}
                    placeholder="Ex: Portal Digital de agenda cultural com atrações regionais..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#0b4728", display: "block", marginBottom: "0.3rem" }}>
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    className={styles.modalInput}
                    placeholder="Ex: Andressa Santos"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.modalActions}>
                  <button type="button" onClick={() => setShowModal(false)} className={styles.modalCloseBtn}>
                    Cancelar
                  </button>
                  <button type="submit" className={styles.modalSubmitBtn} disabled={isSubmitting}>
                    {isSubmitting ? "Publicando..." : "Publicar Post-it"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
