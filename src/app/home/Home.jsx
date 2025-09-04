"use client";

import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.turbo}>TURBO</span>
          <span className={styles.x}>X</span>
        </div>
        <nav className={styles.nav}>
          <a href="#carros" className={styles.navLink}>Carros</a>
          <a href="#sobre" className={styles.navLink}>Sobre</a>
          <a href="#contato" className={styles.navLink}>Contato</a>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Bem-vindo à <span className={styles.highlight}>TurboX</span>
          </h1>
          <p className={styles.subtitle}>
            Acelere sua paixão por carros turbinados
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.primaryButton}>
              Explorar Carros
            </button>
            <button className={styles.secondaryButton}>
              Ver Catálogo
            </button>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🏎️</div>
            <h3>Carros Esportivos</h3>
            <p>Os melhores carros turbo do mercado com máxima performance</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Alta Performance</h3>
            <p>Potência e velocidade extremas para os verdadeiros entusiastas</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🏁</div>
            <h3>Experiência Única</h3>
            <p>Adrenalina pura em cada curva e aceleração</p>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>Carros Disponíveis</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>98%</div>
            <div className={styles.statLabel}>Clientes Satisfeitos</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>15</div>
            <div className={styles.statLabel}>Anos de Experiência</div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 TurboX. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
