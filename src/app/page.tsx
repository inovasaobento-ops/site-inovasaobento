import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import ScheduleSection from "@/components/ScheduleSection";
import MapSection from "@/components/MapSection";
import RegistrationForm from "@/components/RegistrationForm";
import { Compass, ShieldCheck, Heart, Award, ArrowDown, Users, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className={styles.appWrapper}>
      
      {/* 1. Header / Navbar */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.navWrapper}>
            <div className={styles.logoWrapper}>
              <Image 
                src="/assets/logo-horizontal.svg" 
                alt="Inova São Bento Logo" 
                width={180} 
                height={50}
                className={styles.logoImg}
                priority
              />
            </div>
            
            <nav className={styles.nav}>
              <a href="#sobre" className={styles.navLink}>Sobre</a>
              <a href="#pilares" className={styles.navLink}>Pilares</a>
              <a href="#programacao" className={styles.navLink}>Programação</a>
              <a href="#localizacao" className={styles.navLink}>Como Chegar</a>
            </nav>
            
            <a href="#inscricao" className={styles.navActionBtn}>
              Fazer Inscrição
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroLayout}>
            
            {/* Left Column: Title & Text */}
            <div className={styles.heroInfo}>
              <span className={styles.heroTagline}>LITORAL NORTE DE PERNAMBUCO</span>
              <h1 className={styles.heroTitle}>
                Inova <span className={styles.heroAccent}>São Bento</span>
              </h1>
              <p className={styles.heroSubtitle}>
                O mais novo laboratório vivo de inovação, patrimônio histórico, turismo sustentável 
                e economia criativa da nossa região.
              </p>
              
              <div className={styles.heroMeta}>
                <div className={styles.metaItem}>
                  <strong>Data:</strong> Em breve (Consulte cronograma)
                </div>
                <div className={styles.metaItem}>
                  <strong>Local:</strong> Ruínas de São Bento, Abreu e Lima - PE
                </div>
              </div>

              <div className={styles.heroBtnGroup}>
                <a href="#inscricao" className={styles.heroBtnPrimary}>
                  Inscrever-se Grátis
                </a>
                <a href="#sobre" className={styles.heroBtnSecondary}>
                  Conhecer Projeto <ArrowDown size={16} />
                </a>
              </div>
            </div>

            {/* Right Column: Vertical Logo */}
            <div className={styles.heroVisual}>
              <div className={styles.logoVerticalContainer}>
                <Image 
                  src="/assets/logo-vertical.svg" 
                  alt="Inova São Bento Logo Vertical" 
                  width={260} 
                  height={260}
                  className={styles.logoVertical}
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. About Section (Sobre) */}
      <section id="sobre" className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutLayout}>
            {/* Left: Silhouette Watermark Graphic */}
            <div className={styles.aboutVisual}>
              <div className={styles.watermarkWrapper}>
                <Image 
                  src="/assets/ruinas-sao-bento.png" 
                  alt="Ruínas da Igreja de São Bento" 
                  width={400} 
                  height={450}
                  className={styles.ruinsWatermark}
                />
              </div>
            </div>
            
            {/* Right: Info */}
            <div className={styles.aboutContent}>
              <span className={styles.sectionTagline}>O PROJETO</span>
              <h2 className={styles.sectionTitle}>Laboratório Vivo de Inovação Territorial</h2>
              <p className={styles.aboutText}>
                O <strong>Inova São Bento</strong> nasceu com o propósito de unir o passado e o futuro. 
                Utilizando metodologias inovadoras e tecnologias sustentáveis, transformamos o sítio histórico 
                das Ruínas de São Bento e Forno da Cal em um hub de cocriação comunitária, valorização cultural 
                e preservação ecológica.
              </p>
              <p className={styles.aboutText}>
                Juventude local, empreendedores criativos, pesquisadores e a comunidade trabalham juntos 
                para criar soluções que impulsionem o turismo de base comunitária, preservem o nosso patrimônio 
                e promovam a geração de renda sustentável no Litoral Norte de Pernambuco.
              </p>

              <div className={styles.aboutStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>1660</span>
                  <span className={styles.statLabel}>Fundação da Antiga Igreja</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>940m</span>
                  <span className={styles.statLabel}>Trilha Cultural e Ecológica</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>100%</span>
                  <span className={styles.statLabel}>Sustentável e Gratuito</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pillars Section (Pilares) */}
      <section id="pilares" className={styles.pillarsSection}>
        <div className="container">
          <div className={styles.pillarsHeader}>
            <span className={styles.sectionTagline}>COMO TRABALHAMOS</span>
            <h2 className={styles.sectionTitleInverse}>Nossos Quatro Pilares Operacionais</h2>
            <p className={styles.pillarsSubtitle}>
              O laboratório atua na intersecção de áreas estratégicas para impulsionar o desenvolvimento territorial sustentável.
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
                Integração de ferramentas digitais, inteligência e tecnologia para a preservação histórica 
                e resolução de desafios ambientais e comunitários locais.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrapper}>
                <ShieldCheck size={24} />
              </div>
              <h3 className={styles.pillarTitle}>Patrimônio e História</h3>
              <p className={styles.pillarText}>
                Valorização e salvaguarda da história da Igreja de São Bento (1660) e do Engenho Jaguaribe, 
                conectando as novas gerações às suas raízes.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrapper}>
                <Heart size={24} />
              </div>
              <h3 className={styles.pillarTitle}>Turismo Sustentável</h3>
              <p className={styles.pillarText}>
                Fomento a roteiros eco-turísticos e turismo de base comunitária, valorizando as paisagens 
                da Mata de Jaguarana e o patrimônio edificado.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrapper}>
                <Award size={24} />
              </div>
              <h3 className={styles.pillarTitle}>Economia Criativa</h3>
              <p className={styles.pillarText}>
                Fortalecimento de artesãos locais, produtores culturais, grupos de capoeira, maracatu e afoxé, 
                gerando renda por meio da arte e cultura.
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
                Um projeto desenvolvido para transformar o território através do protagonismo juvenil e comunitário.
              </p>
            </div>
            
            <div className={styles.footerLinks}>
              <h4 className={styles.footerTitle}>Mapa do Site</h4>
              <ul className={styles.linksList}>
                <li><a href="#sobre">O Projeto</a></li>
                <li><a href="#pilares">Pilares</a></li>
                <li><a href="#programacao">Cronograma</a></li>
                <li><a href="#localizacao">Como Chegar</a></li>
                <li><a href="#inscricao">Inscrições</a></li>
              </ul>
            </div>

            <div className={styles.footerContact}>
              <h4 className={styles.footerTitle}>Parceiros e Realização</h4>
              <p className={styles.contactText}>
                <strong>Realização:</strong> epec (Empresa Pernambucana de Empreendimentos Culturais)<br />
                <strong>Cooperação:</strong> Lideranças Juvenis e Empreendedores do Litoral Norte PE
              </p>
              <p className={styles.contactDetails}>
                Paulista / Abreu e Lima - PE, Brasil
              </p>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} Inova São Bento. Todos os direitos reservados. Projeto IdeaThon.</p>
            <p className={styles.footerCredits}>Desenvolvido com Next.js, Supabase e Vercel</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
