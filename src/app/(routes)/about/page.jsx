"use client";

import styles from '../../about/About.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.profileSection}>
            <div className={styles.avatar}>
              👨‍💻
            </div>
            <div className={styles.introText}>
              <h1 className={styles.name}>Leonardo Oliveira</h1>
              <h2 className={styles.title}>Desenvolvedor Full Stack</h2>
              <p className={styles.subtitle}>Especialista em React, Next.js e Node.js</p>
            </div>
          </div>
        </section>

        <section className={styles.about}>
          <h2 className={styles.sectionTitle}>Sobre Mim</h2>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <p>
                Sou um desenvolvedor apaixonado por tecnologia e automobilismo, com foco em 
                criar experiências digitais inovadoras. O projeto TurboX nasceu da minha 
                paixão por carros e pelo desafio de simular preparações automotivas de forma realista.
              </p>
              <p>
                Com anos de experiência em desenvolvimento web, especializo-me em React, 
                Next.js, Node.js e tecnologias modernas para criar aplicações robustas e performáticas.
              </p>
              <p>
                Este simulador de preparações automotivas representa a combinação perfeita entre 
                minha expertise técnica e minha paixão por automóveis, oferecendo uma ferramenta 
                única para entusiastas planejarem suas modificações.
              </p>
            </div>

            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <div className={styles.highlightIcon}>🚀</div>
                <div className={styles.highlightContent}>
                  <h3>Performance</h3>
                  <p>Aplicações otimizadas para máxima velocidade</p>
                </div>
              </div>
              
              <div className={styles.highlight}>
                <div className={styles.highlightIcon}>💡</div>
                <div className={styles.highlightContent}>
                  <h3>Inovação</h3>
                  <p>Sempre utilizando as tecnologias mais modernas</p>
                </div>
              </div>
              
              <div className={styles.highlight}>
                <div className={styles.highlightIcon}>🎯</div>
                <div className={styles.highlightContent}>
                  <h3>Precisão</h3>
                  <p>Código limpo e funcionalidades bem implementadas</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.skills}>
          <h2 className={styles.sectionTitle}>Tecnologias</h2>
          <div className={styles.skillsGrid}>
            <div className={styles.skillCard}>
              <div className={styles.skillIcon}>⚛️</div>
              <h3>React & Next.js</h3>
              <p>Desenvolvimento de interfaces modernas e performáticas</p>
            </div>
            
            <div className={styles.skillCard}>
              <div className={styles.skillIcon}>🟢</div>
              <h3>Node.js</h3>
              <p>APIs robustas e escaláveis para backend</p>
            </div>
            
            <div className={styles.skillCard}>
              <div className={styles.skillIcon}>🎨</div>
              <h3>UI/UX Design</h3>
              <p>Interfaces intuitivas e experiências excepcionais</p>
            </div>
            
            <div className={styles.skillCard}>
              <div className={styles.skillIcon}>🗄️</div>
              <h3>Banco de Dados</h3>
              <p>PostgreSQL, MongoDB e Redis</p>
            </div>
            
            <div className={styles.skillCard}>
              <div className={styles.skillIcon}>☁️</div>
              <h3>Cloud & DevOps</h3>
              <p>AWS, Docker e CI/CD</p>
            </div>
            
            <div className={styles.skillCard}>
              <div className={styles.skillIcon}>📱</div>
              <h3>Mobile</h3>
              <p>React Native e Progressive Web Apps</p>
            </div>
          </div>
        </section>

        <section className={styles.projects}>
          <h2 className={styles.sectionTitle}>Projetos em Destaque</h2>
          <div className={styles.projectsGrid}>
            <div className={styles.projectCard}>
              <div className={styles.projectImage}>🏎️</div>
              <h3>TurboX Simulator</h3>
              <p>
                Simulador avançado de preparações automotivas com cálculos 
                realistas de performance e custos.
              </p>
              <div className={styles.projectTech}>
                <span>Next.js</span>
                <span>React</span>
                <span>Node.js</span>
              </div>
            </div>
            
            <div className={styles.projectCard}>
              <div className={styles.projectImage}>📊</div>
              <h3>Dashboard Analytics</h3>
              <p>
                Plataforma completa de analytics com visualizações em tempo 
                real e relatórios customizáveis.
              </p>
              <div className={styles.projectTech}>
                <span>React</span>
                <span>D3.js</span>
                <span>PostgreSQL</span>
              </div>
            </div>
            
            <div className={styles.projectCard}>
              <div className={styles.projectImage}>🛒</div>
              <h3>E-commerce Platform</h3>
              <p>
                Sistema completo de e-commerce com pagamentos, estoque 
                e gestão de pedidos.
              </p>
              <div className={styles.projectTech}>
                <span>Next.js</span>
                <span>Stripe</span>
                <span>MongoDB</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contact}>
          <h2 className={styles.sectionTitle}>Vamos Conversar?</h2>
          <div className={styles.contactContent}>
            <p>
              Interessado em colaborar ou tem alguma pergunta sobre o projeto? 
              Ficarei feliz em conversar!
            </p>
            
            <div className={styles.contactLinks}>
              <a href="mailto:leonardo@example.com" className={styles.contactLink}>
                <span className={styles.contactIcon}>📧</span>
                <span>leonardo@example.com</span>
              </a>
              
              <a href="https://linkedin.com/in/leonardo" className={styles.contactLink}>
                <span className={styles.contactIcon}>💼</span>
                <span>LinkedIn</span>
              </a>
              
              <a href="https://github.com/leonardo" className={styles.contactLink}>
                <span className={styles.contactIcon}>🐙</span>
                <span>GitHub</span>
              </a>
              
              <a href="https://twitter.com/leonardo" className={styles.contactLink}>
                <span className={styles.contactIcon}>🐦</span>
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}