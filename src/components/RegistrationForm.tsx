"use client";

import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";
import { supabase } from "@/utils/supabaseClient";
import { User, Mail, Phone, Calendar, Send, CheckCircle2, AlertTriangle } from "lucide-react";

export default function RegistrationForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [activity, setActivity] = useState("all");
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const formatPhone = (value: string) => {
    // Basic Brazilian phone masking: (99) 99999-9999
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname || !email || !phone || !activity) {
      setStatus("error");
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const isConfigured = 
        process.env.NEXT_PUBLIC_SUPABASE_URL && 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!isConfigured) {
        // Fallback simulate submission for preview/mock setup
        console.log("Mocking registration save:", { fullname, email, phone, activity });
        await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulate delay
        setStatus("success");
      } else {
        // Actual Supabase insert
        const { error } = await supabase
          .from("registrations")
          .insert([
            {
              fullname,
              email,
              phone,
              activity,
            },
          ]);

        if (error) throw error;
        setStatus("success");
      }

      // Reset form fields on success
      setFullname("");
      setEmail("");
      setPhone("");
      setActivity("all");
    } catch (err: any) {
      console.error("Registration error:", err);
      setStatus("error");
      setErrorMessage(
        err.message || "Ocorreu um erro ao processar sua inscrição. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.section} id="inscricao">
      <div className="container">
        <div className={styles.wrapper}>
          
          {/* Left panel: Invitation details */}
          <div className={styles.invitationPanel}>
            <span className={styles.tagline}>INSCREVA-SE JÁ</span>
            <h2 className={styles.inviteTitle}>Faça Parte Desta Transformação</h2>
            <p className={styles.inviteDescription}>
              As vagas são limitadas! Participe das atividades do laboratório vivo de inovação, 
              sustentabilidade e cultura e receba certificado de participação ao final do evento.
            </p>
            
            <div className={styles.benefitList}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>✓</div>
                <div>
                  <strong>IdeaThon Premiado:</strong> Desenvolva ideias inovadoras com mentoria especializada.
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>✓</div>
                <div>
                  <strong>Trilha Guiada Gratuita:</strong> Conheça as riquezas e a biodiversidade local.
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>✓</div>
                <div>
                  <strong>Certificação de Horas:</strong> Ganhe certificado emitido pelo Laboratório Inova São Bento.
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Registration Form */}
          <div className={styles.formPanel}>
            {status === "success" ? (
              <div className={styles.successBox}>
                <CheckCircle2 className={styles.successIcon} size={56} />
                <h3 className={styles.successTitle}>Inscrição Confirmada!</h3>
                <p className={styles.successText}>
                  Sua inscrição foi registrada com sucesso. Preparamos uma experiência incrível 
                  para você no Inova São Bento! Nos vemos nas Ruínas.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className={styles.resetBtn}
                >
                  Registrar Outra Inscrição
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.formTitle}>Ficha de Inscrição</h3>
                
                {status === "error" && (
                  <div className={styles.errorBox}>
                    <AlertTriangle className={styles.errorIcon} size={20} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Fullname input */}
                <div className={styles.inputGroup}>
                  <label htmlFor="fullname" className={styles.label}>
                    Nome Completo *
                  </label>
                  <div className={styles.inputWrapper}>
                    <User className={styles.inputIcon} size={18} />
                    <input
                      type="text"
                      id="fullname"
                      className={styles.input}
                      placeholder="Seu nome e sobrenome"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Email input */}
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>
                    E-mail de Contato *
                  </label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} size={18} />
                    <input
                      type="email"
                      id="email"
                      className={styles.input}
                      placeholder="exemplo@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Phone input */}
                <div className={styles.inputGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Celular / WhatsApp *
                  </label>
                  <div className={styles.inputWrapper}>
                    <Phone className={styles.inputIcon} size={18} />
                    <input
                      type="tel"
                      id="phone"
                      className={styles.input}
                      placeholder="(81) 99999-9999"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Activity Selector */}
                <div className={styles.inputGroup}>
                  <label htmlFor="activity" className={styles.label}>
                    Atividade Desejada *
                  </label>
                  <div className={styles.inputWrapper}>
                    <Calendar className={styles.inputIcon} size={18} />
                    <select
                      id="activity"
                      className={styles.select}
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      required
                      disabled={loading}
                    >
                      <option value="all">Participar do Evento Completo (Abertura ao Encerramento)</option>
                      <option value="ideathon">Apenas IdeaThon - Inova São Bento (Manhã)</option>
                      <option value="trilha">Apenas Trilha Cultural e Ecológica Guiada (Manhã)</option>
                      <option value="cultura">Apenas Oficinas / Apresentações Culturais (Tarde)</option>
                    </select>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className={styles.btnSpinner}></div>
                      <span>Processando...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Confirmar Inscrição</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
