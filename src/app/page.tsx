import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import ScheduleSection from "@/components/ScheduleSection";
import MapSection from "@/components/MapSection";
import RegistrationForm from "@/components/RegistrationForm";
import { Compass, ShieldCheck, Heart, Award, ArrowDown, Users, Activity, Layers, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className={styles.appWrapper}>
      
      {/* 1. Header / Navbar (Efeito Glassmorphism iOS Suspenso) */}
      <header className={styles.header}>
        <div className={styles.navWrapper}>
          <div className={styles.logoWrapper}>
            <a href="#">
              <Image 
                src="/assets/logo-horizontal.svg" 
                alt="Inova São Bento Logo" 
                width={218} 
                height={40}
                className={styles.logoImg}
                priority
              />
            </a>
          </div>
          
          {/* Checkbox Hack para Menu Hamburguer Mobile */}
          <input type="checkbox" id="menuToggle" className={styles.menuToggleInput} />
          
          <label htmlFor="menuToggle" className={styles.hamburgerButton}>
            <span></span>
            <span></span>
            <span></span>
          </label>
          
          {/* Menu Desktop */}
          <nav className={styles.nav}>
            <a href="#sobre" className={styles.navLink}>Sobre</a>
            <a href="#dashboard" className={styles.navLink}>Telemetria</a>
            <a href="#pilares" className={styles.navLink}>Pilares</a>
            <a href="#programacao" className={styles.navLink}>Programação</a>
            <a href="#localizacao" className={styles.navLink}>Como Chegar</a>
          </nav>
          
          {/* Botão Desktop */}
          <a href="#inscricao" className={styles.navActionBtn}>
            Increver-se
          </a>
          
          {/* Menu Mobile Dropdown */}
          <nav className={styles.mobileNav}>
            <a href="#sobre" className={styles.mobileNavLink}>Sobre</a>
            <a href="#dashboard" className={styles.mobileNavLink}>Telemetria</a>
            <a href="#pilares" className={styles.mobileNavLink}>Pilares</a>
            <a href="#programacao" className={styles.mobileNavLink}>Programação</a>
            <a href="#localizacao" className={styles.mobileNavLink}>Como Chegar</a>
            <a href="#inscricao" className={styles.mobileNavActionBtn}>
              Increver-se
            </a>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section (Video Background) */}
      <section className={styles.heroSection}>
        {/* Background Video in Loop */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={styles.videoBackground}
        >
          <source src="/assets/video-bg.mp4" type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>
        
        {/* Overlay to darken video slightly and ensure contrast */}
        <div className={styles.videoOverlay}></div>
        
        <div className="container">
          <div className={styles.heroLayout}>
            
            {/* Left Column: Descriptive Text & Metadata (Illustrator layout) */}
            <div className={styles.heroInfo}>
              <h1 className={styles.heroTitle}>Inova São Bento</h1>
              <p className={styles.heroDescriptionText}>
                Laboratório vivo de inovação, patrimônio histórico, turismo sustentável 
                e economia criativa. Unindo tecnologia e cultura para transformar 
                a comunidade.
              </p>
              
              <div className={styles.heroMetadataBlock}>
                <div className={styles.metaLine}>
                  Realização Epec - Escola Pernambucana de Economia Criativa
                </div>
                <div className={styles.metaLine}>
                  Sítio Histórico: Ruínas de São Bento, Abreu e Lima - PE
                </div>
              </div>

              <div className={styles.heroBtnGroup}>
                <a href="#inscricao" className={styles.heroBtnPrimary}>
                  Inscrever-se Grátis
                </a>
                <a href="#sobre" className={styles.heroBtnSecondary}>
                  Conhecer o Projeto
                </a>
              </div>
            </div>

            {/* Right Column: Vertical Logo */}
            <div className={styles.heroVisual}>
              <div className={styles.logoVerticalContainer}>
                <Image 
                  src="/assets/logo-vertical.svg" 
                  alt="Inova São Bento Logo Vertical" 
                  width={280} 
                  height={280}
                  className={styles.logoVertical}
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. About Section (Sobre) & Dashboard Integration */}
      <section id="sobre" className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutLayout}>
            
            {/* Left: Interactive Dashboard Monitor (Sonar Style) */}
            <div className={styles.aboutVisual} id="dashboard">
              <div className={styles.dashboardWidget}>
                <div className={styles.widgetHeader}>
                  <div className={styles.widgetIndicator}></div>
                  <h3>Monitor de Impacto Territorial - Realtime</h3>
                </div>
                
                {/* Silhouette background */}
                <div className={styles.widgetWatermark}>
                  <Image 
                    src="/assets/ruinas-sao-bento.png" 
                    alt="Ruínas Silhueta" 
                    width={320} 
                    height={320}
                    className={styles.widgetWatermarkImg}
                  />
                </div>

                <div className={styles.widgetGrid}>
                  {/* KPI 1 */}
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Vitalidade Ecológica</span>
                    <div className={styles.kpiCircleWrapper}>
                      <svg width="60" height="60" viewBox="0 0 36 36" className={styles.circularChart}>
                        <path className={styles.circleBg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className={styles.circle} strokeDasharray="94, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className={styles.circlePercentage}>94%</div>
                    </div>
                  </div>
                  
                  {/* KPI 2 */}
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Juventude Conectada</span>
                    <span className={styles.kpiNumber}>+120</span>
                    <span className={styles.kpiTrend}>▲ 14% este mês</span>
                  </div>

                  {/* KPI 3 */}
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Preservação Sítio</span>
                    <div className={styles.kpiCircleWrapper}>
                      <svg width="60" height="60" viewBox="0 0 36 36" className={styles.circularChart}>
                        <path className={styles.circleBg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className={`${styles.circle} ${styles.circleLime}`} strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className={styles.circlePercentage}>100%</div>
                    </div>
                  </div>

                  {/* KPI 4 */}
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Economia Local</span>
                    <span className={styles.kpiNumber}>R$ 15K+</span>
                    <span className={styles.kpiTrend}>Projeção Rodada</span>
                  </div>
                </div>

                {/* SVG Live Graph */}
                <div className={styles.chartWrapper}>
                  <div className={styles.chartLegend}>
                    <span>Índice de Engajamento por Horário</span>
                    <span className={styles.chartLive}>LIVE</span>
                  </div>
                  <svg viewBox="0 0 320 80" className={styles.svgChart}>
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8fc95d" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8fc95d" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 60 Q 40 20 80 40 T 160 15 T 240 50 T 320 10 L 320 80 L 0 80 Z"
                      fill="url(#chartGlow)"
                    />
                    <path
                      d="M 0 60 Q 40 20 80 40 T 160 15 T 240 50 T 320 10"
                      fill="none"
                      stroke="#8fc95d"
                      strokeWidth="2.5"
                    />
                    <circle cx="160" cy="15" r="4" fill="#030f07" stroke="#8fc95d" strokeWidth="2" />
                    <text x="165" y="10" className={styles.chartText} fill="#8fc95d">Pico Trilha (11:00)</text>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Right: Info */}
            <div className={styles.aboutContent}>
              <span className={styles.sectionTagline}>O PROJETO</span>
              <h2 className={styles.sectionTitle}>Conectando Passado, Presente e Futuro</h2>
              <p className={styles.aboutText}>
                O **Inova São Bento** é uma iniciativa transformadora da **[epec (Escola Pernambucana de Economia Criativa)](https://epec.art.br)**. 
                Focada em desenvolvimento territorial, a proposta converte marcos históricos como as Ruínas de São Bento (1660) 
                e o Forno da Cal em laboratórios vivos para soluções ecológicas e empreendedoras.
              </p>
              <p className={styles.aboutText}>
                Por meio do IdeaThon, jovens e moradores desenvolvem soluções baseadas em tecnologia aberta para impulsionar 
                a valorização ecológica, a salvaguarda patrimonial e o fomento ao turismo sustentável na região.
              </p>

              <div className={styles.aboutStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>1660</span>
                  <span className={styles.statLabel}>Fundação do Sítio</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>940m</span>
                  <span className={styles.statLabel}>Trilha Cultural</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>EPEC</span>
                  <span className={styles.statLabel}>Realização epec.art.br</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Pillars Section (Pilares com Grid Sonar) */}
      <section id="pilares" className={styles.pillarsSection}>
        <div className="container">
          <div className={styles.pillarsHeader}>
            <span className={styles.sectionTagline}>COMO TRABALHAMOS</span>
            <h2 className={styles.sectionTitleInverse}>Áreas Estratégicas do Ecossistema</h2>
            <p className={styles.pillarsSubtitle}>
              Quatro pilares interconectados que impulsionam o desenvolvimento territorial sustentável do Litoral Norte.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            {/* Pillar 1 */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrapper}>
                <Compass size={24} />
              </div>
              <h3 className={styles.pillarTitle}>Inovação Tecnológica</h3>
              <p className={styles.pillarText}>
                Utilização de inteligência de dados, tecnologia limpa e soluções abertas para enfrentar 
                desafios socioambientais locais.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrapper}>
                <ShieldCheck size={24} />
              </div>
              <h3 className={styles.pillarTitle}>Patrimônio e História</h3>
              <p className={styles.pillarText}>
                Documentação e valorização das memórias da Igreja de São Bento e do Engenho Jaguaribe, 
                trazendo a história à tona.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrapper}>
                <Heart size={24} />
              </div>
              <h3 className={styles.pillarTitle}>Turismo Sustentável</h3>
              <p className={styles.pillarText}>
                Estruturação e fomento do turismo ecológico e de base comunitária, gerando conscientização 
                e preservação ativa.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrapper}>
                <Award size={24} />
              </div>
              <h3 className={styles.pillarTitle}>Economia Criativa</h3>
              <p className={styles.pillarText}>
                Capacitação empreendedora pela epec e apoio ao artesanato, maracatu, afoxé e capoeira da nossa região.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Schedule Section (Timeline) */}
      <ScheduleSection />

      {/* 6. Location Section (Map) */}
      <MapSection />

      {/* 7. Registration Section (Form) */}
      <RegistrationForm />

      {/* 8. Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Image 
                src="/assets/logo-horizontal.svg" 
                alt="Inova São Bento Logo Footer" 
                width={200} 
                height={55}
                className={styles.footerLogo}
              />
              <p className={styles.brandDesc}>
                Conectando inovação, preservação histórica e sustentabilidade no Litoral Norte de Pernambuco. 
                Uma iniciativa para criar soluções tecnológicas a partir da nossa identidade e do nosso território.
              </p>
            </div>
            
            <div className={styles.footerLinks}>
              <h4 className={styles.footerTitle}>Mapa do Site</h4>
              <ul className={styles.linksList}>
                <li><a href="#sobre">O Projeto</a></li>
                <li><a href="#sobre">Telemetria</a></li>
                <li><a href="#pilares">Pilares</a></li>
                <li><a href="#programacao">Cronograma</a></li>
                <li><a href="#localizacao">Como Chegar</a></li>
                <li><a href="#inscricao">Inscrições</a></li>
              </ul>
            </div>

            <div className={styles.footerContact}>
              <h4 className={styles.footerTitle}>Parceiros e Realização</h4>
              <p className={styles.contactText}>
                <strong>Realização:</strong> <a href="https://epec.art.br" target="_blank" rel="noopener noreferrer" className={styles.epecLink}>epec (Escola Pernambucana de Economia Criativa)</a><br />
                <strong>Cooperação:</strong> Lideranças Juvenis e Empreendedores do Litoral Norte PE
              </p>
              <p className={styles.contactDetails}>
                Paulista / Abreu e Lima - PE, Brasil
              </p>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} Inova São Bento. Todos os direitos reservados. Fomento à Economia Criativa.</p>
            <p className={styles.footerCredits}>Realizado pela epec | Acesse: <a href="https://epec.art.br" target="_blank" rel="noopener noreferrer" className={styles.epecLink}>epec.art.br</a></p>
          </div>
        </div>
      </footer>

    </div>
  );
}
