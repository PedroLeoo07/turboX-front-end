"use client";

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCars, useUsers } from '../../hooks/useBackend';
import styles from '../../home/Home.module.css';

export default function HomePage() {
  const { brands, fetchCars } = useCars();
  const { stats, fetchUsers } = useUsers();

  useEffect(() => {
    // Carregar dados iniciais do backend
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className={styles.container}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            {/* TÍTULO PRINCIPAL */}
            <h1 className={styles.heroTitle}>
              <span className={styles.titleWord1}>Simule.</span>
              <span className={styles.titleWord2}>Prepare.</span>
              <span className={styles.titleWord3}>Acelere.</span>
            </h1>
            
            {/* SUBTÍTULO */}
            <p className={styles.heroSubtitle}>
              O simulador de preparações automotivas mais avançado do Brasil. 
              Transforme qualquer carro em uma máquina de alta performance 
              com nossa tecnologia de ponta.
            </p>

            {/* BOTÕES HERO */}
            <div className={styles.heroButtons}>
              <button className={styles.primaryBtn}>
                <span>🚗</span>
                <span>Explorar Carros</span>
              </button>
              <button className={styles.secondaryBtn}>
                <span>⚡</span>
                <span>Simular Agora</span>
              </button>
            </div>

            {/* ESTATÍSTICAS RÁPIDAS */}
            <div className={styles.quickStats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>{stats?.totalCars || '50+'}</div>
                <div className={styles.statLabel}>Carros</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>{stats?.totalUsers || '1.2K+'}</div>
                <div className={styles.statLabel}>Usuários</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>{stats?.totalBuilds || '3.5K+'}</div>
                <div className={styles.statLabel}>Builds</div>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroImage}>
              <div className={styles.carShowcase}>
                🏎️
              </div>
              <div className={styles.heroImageGlow}></div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO FEATURES */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Por que TurboX?</h2>
        <p className={styles.sectionSubtitle}>
          Tecnologia de ponta para transformar sua paixão por carros em realidade
        </p>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔧</div>
            <h3 className={styles.featureTitle}>Simulação Realista</h3>
            <p className={styles.featureDescription}>
              Engine de simulação baseada em dados reais de dinamômetro e telemetria profissional.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3 className={styles.featureTitle}>Análise Detalhada</h3>
            <p className={styles.featureDescription}>
              Gráficos e relatórios completos sobre performance, custos e viabilidade das modificações.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h3 className={styles.featureTitle}>Precisão Total</h3>
            <p className={styles.featureDescription}>
              Algoritmos avançados que consideram todos os aspectos técnicos para resultados precisos.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO MARCAS */}
      <section className={styles.brands}>
        <h2 className={styles.sectionTitle}>Marcas Disponíveis</h2>
        <p className={styles.sectionSubtitle}>
          Trabalhamos com as principais marcas do mercado automotivo
        </p>

        <div className={styles.brandsGrid}>
          {brands?.slice(0, 6).map((brand, index) => (
            <div key={index} className={styles.brandCard}>
              <div className={styles.brandLogo}>
                {brand.logo || '🚗'}
              </div>
              <h3 className={styles.brandName}>{brand}</h3>
            </div>
          )) || 
          // Fallback estático se brands não estiver carregado
          [
            { name: 'BMW', logo: '🔷' },
            { name: 'Audi', logo: '⭕' },
            { name: 'Mercedes', logo: '⭐' },
            { name: 'Toyota', logo: '🔺' },
            { name: 'Honda', logo: '🅷' },
            { name: 'Nissan', logo: '🔴' }
          ].map((brand, index) => (
            <div key={index} className={styles.brandCard}>
              <div className={styles.brandLogo}>
                {brand.logo}
              </div>
              <h3 className={styles.brandName}>{brand.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Pronto para acelerar?</h2>
          <p className={styles.ctaSubtitle}>
            Junte-se a milhares de entusiastas e transforme seu carro em uma máquina de alta performance.
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.ctaPrimaryBtn}>
              <span>🚀</span>
              <span>Começar Agora</span>
            </button>
            <button className={styles.ctaSecondaryBtn}>
              <span>📱</span>
              <span>Baixar App</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}