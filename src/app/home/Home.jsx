"use client";

import Navigation from '../components/Navigation';
import styles from './Home.module.css';

export default function Home({ navigateTo }) {
  return (
    <div className={styles.homeContainer}>
      <Navigation currentPage="home" navigateTo={navigateTo} />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Bem-vindo à <span className={styles.highlight}>TurboX</span>
          </h1>
          <p className={styles.subtitle}>
            Acelere sua paixão por carros turbinados. Explore, simule e otimize a performance dos melhores carros esportivos.
          </p>
          <div className={styles.ctaButtons}>
            <button 
              className={styles.primaryButton}
              onClick={() => navigateTo('cars')}
            >
              🚗 Explorar Carros
            </button>
            <button 
              className={styles.secondaryButton}
              onClick={() => navigateTo('simulation')}
            >
              ⚡ Simulação Turbo
            </button>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.feature} onClick={() => navigateTo('cars')}>
            <div className={styles.featureIcon}>🏎️</div>
            <h3>Catálogo de Carros</h3>
            <p>Explore nossa coleção de carros esportivos com especificações detalhadas e histórico de performance.</p>
            <div className={styles.featureAction}>Ver Catálogo →</div>
          </div>
          
          <div className={styles.feature} onClick={() => navigateTo('simulation')}>
            <div className={styles.featureIcon}>⚙️</div>
            <h3>Simulação de Upgrades</h3>
            <p>Teste modificações virtuais e veja como afetam potência, torque e tempo de 0-100 km/h em tempo real.</p>
            <div className={styles.featureAction}>Iniciar Simulação →</div>
          </div>
          
          <div className={styles.feature} onClick={() => navigateTo('about')}>
            <div className={styles.featureIcon}>👨‍💻</div>
            <h3>Sobre o Desenvolvedor</h3>
            <p>Conheça mais sobre quem criou esta plataforma e a paixão por carros que motivou o projeto.</p>
            <div className={styles.featureAction}>Conhecer →</div>
          </div>
        </section>

        <section className={styles.quickAccess}>
          <h2 className={styles.sectionTitle}>Acesso Rápido</h2>
          <div className={styles.quickButtons}>
            <button 
              className={styles.quickButton}
              onClick={() => navigateTo('cars')}
            >
              <span className={styles.quickIcon}>📋</span>
              <div>
                <div className={styles.quickTitle}>Lista Completa</div>
                <div className={styles.quickDesc}>Todos os carros disponíveis</div>
              </div>
            </button>
            
            <button 
              className={styles.quickButton}
              onClick={() => navigateTo('simulation')}
            >
              <span className={styles.quickIcon}>🔧</span>
              <div>
                <div className={styles.quickTitle}>Builds Populares</div>
                <div className={styles.quickDesc}>Configurações mais usadas</div>
              </div>
            </button>
            
            <button 
              className={styles.quickButton}
              onClick={() => navigateTo('about')}
            >
              <span className={styles.quickIcon}>💼</span>
              <div>
                <div className={styles.quickTitle}>Portfólio</div>
                <div className={styles.quickDesc}>Outros projetos e contato</div>
              </div>
            </button>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 TurboX - Desenvolvido com paixão por carros esportivos</p>
      </footer>
    </div>
  );
}
