"use client";

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Navigation from '../components/Navigation';
import styles from './Home.module.css';

export default function Home({ navigateTo, isLoggedIn, user }) {
  useEffect(() => {
    if (isLoggedIn && user) {
      toast.success(`Bem-vindo de volta, ${user.name}! 🏎️`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [isLoggedIn, user]);

  return (
    <div className={styles.container}>
      <Navigation currentPage="home" navigateTo={navigateTo} />
      
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            {/* LOGO PRINCIPAL */}
            <div className={styles.logo}>
              <span className={styles.logoTurbo}>TURBO</span>
              <span className={styles.logoX}>X</span>
              <div className={styles.logoGlow}></div>
            </div>
            
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
              com simulações realísticas e upgrades detalhados.
            </p>
            
            {/* BOTÕES DE AÇÃO */}
            <div className={styles.heroButtons}>
              <button 
                onClick={() => navigateTo('simulation')}
                className={styles.primaryBtn}
              >
                <span>🚀</span>
                Começar Simulação
                <div className={styles.btnRipple}></div>
              </button>
              <button 
                onClick={() => navigateTo('carList')}
                className={styles.secondaryBtn}
              >
                <span>🏎️</span>
                Explorar Carros
              </button>
            </div>
            
            {/* ESTATÍSTICAS */}
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Carros</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>200+</div>
                <div className={styles.statLabel}>Upgrades</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>∞</div>
                <div className={styles.statLabel}>Possibilidades</div>
              </div>
            </div>
          </div>
          
          {/* LADO DIREITO - VISUAL */}
          <div className={styles.heroRight}>
            <div className={styles.carDisplay}>
              <div className={styles.carIcon}>🏎️</div>
              <div className={styles.speedLines}></div>
              <div className={styles.particles}>
                <span className={styles.particle1}>✨</span>
                <span className={styles.particle2}>⭐</span>
                <span className={styles.particle3}>💫</span>
                <span className={styles.particle4}>✨</span>
                <span className={styles.particle5}>🔥</span>
              </div>
            </div>
            
            {/* PAINEL DE PERFORMANCE */}
            <div className={styles.performanceCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>⚡</span>
                <span>Performance Monitor</span>
              </div>
              <div className={styles.powerDisplay}>
                <div className={styles.powerNumber}>750</div>
                <div className={styles.powerUnit}>HP</div>
              </div>
              <div className={styles.gauges}>
                <div className={styles.gauge}>
                  <div className={styles.gaugeFill}></div>
                  <span>Torque</span>
                </div>
                <div className={styles.gauge}>
                  <div className={styles.gaugeFill}></div>
                  <span>Boost</span>
                </div>
                <div className={styles.gauge}>
                  <div className={styles.gaugeFill}></div>
                  <span>RPM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleIcon}>🚀</span>
              Por que escolher o TurboX?
            </h2>
            <p className={styles.sectionSubtitle}>
              A plataforma mais completa para simular preparações automotivas
            </p>
          </div>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard} onClick={() => navigateTo('carList')}>
              <div className={styles.cardTop}>
                <div className={styles.featureIcon}>🏎️</div>
                <div className={styles.featureBadge}>50+ Modelos</div>
              </div>
              <h3 className={styles.featureTitle}>Catálogo Completo</h3>
              <p className={styles.featureDesc}>
                Desde hatchbacks até supercarros. Cada modelo com 
                especificações técnicas reais e dados precisos de performance.
              </p>
              <div className={styles.featureFooter}>
                <span>Explorar modelos</span>
                <span className={styles.arrow}>→</span>
              </div>
            </div>

            <div className={styles.featureCard} onClick={() => navigateTo('simulation')}>
              <div className={styles.cardTop}>
                <div className={styles.featureIcon}>⚙️</div>
                <div className={styles.featureBadge}>200+ Peças</div>
              </div>
              <h3 className={styles.featureTitle}>Sistema de Upgrades</h3>
              <p className={styles.featureDesc}>
                Turbos, intercoolers, escape, injeção, suspensão e muito mais. 
                Cada upgrade calculado com precisão real.
              </p>
              <div className={styles.featureFooter}>
                <span>Começar upgrade</span>
                <span className={styles.arrow}>→</span>
              </div>
            </div>

            <div className={styles.featureCard} onClick={() => navigateTo('simulation')}>
              <div className={styles.cardTop}>
                <div className={styles.featureIcon}>📊</div>
                <div className={styles.featureBadge}>Tempo Real</div>
              </div>
              <h3 className={styles.featureTitle}>Simulação Avançada</h3>
              <p className={styles.featureDesc}>
                Veja instantaneamente como cada modificação impacta 
                potência, torque, 0-100km/h e consumo.
              </p>
              <div className={styles.featureFooter}>
                <span>Testar agora</span>
                <span className={styles.arrow}>→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS SECTION */}
      <section className={styles.brands}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleIcon}>🏭</span>
              Explore por Marca
            </h2>
            <p className={styles.sectionSubtitle}>
              Encontre o carro perfeito da sua marca favorita
            </p>
          </div>
          
          <div className={styles.brandsGrid}>
            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Volkswagen' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/volkswagen.svg" alt="Volkswagen Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>Volkswagen</h3>
              <p className={styles.brandDesc}>Tradição alemã em engenharia</p>
              <div className={styles.brandArrow}>→</div>
            </div>

            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'BMW' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/bmw.svg" alt="BMW Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>BMW</h3>
              <p className={styles.brandDesc}>Performance e luxo premium</p>
              <div className={styles.brandArrow}>→</div>
            </div>

            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Ford' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/ford.svg" alt="Ford Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>Ford</h3>
              <p className={styles.brandDesc}>Inovação americana clássica</p>
              <div className={styles.brandArrow}>→</div>
            </div>

            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Hyundai' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/hyundai.svg" alt="Hyundai Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>Hyundai</h3>
              <p className={styles.brandDesc}>Tecnologia coreana avançada</p>
              <div className={styles.brandArrow}>→</div>
            </div>

            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Toyota' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/toyota.svg" alt="Toyota Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>Toyota</h3>
              <p className={styles.brandDesc}>Confiabilidade japonesa</p>
              <div className={styles.brandArrow}>→</div>
            </div>

            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Nissan' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/nissan.svg" alt="Nissan Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>Nissan</h3>
              <p className={styles.brandDesc}>Esportividade e inovação</p>
              <div className={styles.brandArrow}>→</div>
            </div>

            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Chevrolet' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/chevrolet.svg" alt="Chevrolet Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>Chevrolet</h3>
              <p className={styles.brandDesc}>Potência americana pura</p>
              <div className={styles.brandArrow}>→</div>
            </div>

            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Mitsubishi' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/mitsubishi.svg" alt="Mitsubishi Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>Mitsubishi</h3>
              <p className={styles.brandDesc}>Legado do rally e evolução</p>
              <div className={styles.brandArrow}>→</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className={styles.about}>
        <div className={styles.container}>
          <div className={styles.aboutContent}>
            <div className={styles.aboutLeft}>
              <h2 className={styles.aboutTitle}>
                Revolução na Simulação Automotiva
              </h2>
              <p className={styles.aboutText}>
                O <strong>TurboX</strong> nasceu da paixão por carros e tecnologia. 
                Nossa missão é democratizar o acesso ao conhecimento sobre 
                preparações automotivas, permitindo que qualquer pessoa 
                experimente e aprenda sobre modificações de performance.
              </p>
              <div className={styles.aboutFeatures}>
                <div className={styles.aboutFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Cálculos baseados em dados reais</span>
                </div>
                <div className={styles.aboutFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Interface intuitiva e moderna</span>
                </div>
                <div className={styles.aboutFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Resultados instantâneos</span>
                </div>
                <div className={styles.aboutFeature}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Comparação entre configurações</span>
                </div>
              </div>
            </div>
            <div className={styles.aboutRight}>
              <div className={styles.techDisplay}>
                <div className={styles.techCard}>
                  <span className={styles.techIcon}>🔧</span>
                  <span>Engine Simulator</span>
                </div>
                <div className={styles.techCard}>
                  <span className={styles.techIcon}>📈</span>
                  <span>Performance Analytics</span>
                </div>
                <div className={styles.techCard}>
                  <span className={styles.techIcon}>⚡</span>
                  <span>Real-time Processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Pronto para Acelerar?</h2>
          <p className={styles.ctaSubtitle}>
            Comece agora e descubra o potencial máximo do seu carro dos sonhos
          </p>
          <div className={styles.ctaButtons}>
            <button 
              onClick={() => navigateTo('simulation')}
              className={styles.ctaPrimary}
            >
              <span>🚀</span>
              Simular Agora
            </button>
            <button 
              onClick={() => navigateTo('carList')}
              className={styles.ctaSecondary}
            >
              <span>🏎️</span>
              Ver Carros
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerLeft}>
              <div className={styles.footerLogo}>
                <span className={styles.logoTurbo}>TURBO</span>
                <span className={styles.logoX}>X</span>
              </div>
              <p className={styles.footerDesc}>
                Simulador de preparações automotivas
              </p>
            </div>
            <div className={styles.footerRight}>
              <div className={styles.footerLinks}>
                <button onClick={() => navigateTo('about')} className={styles.footerLink}>
                  Sobre
                </button>
                <button onClick={() => navigateTo('carList')} className={styles.footerLink}>
                  Carros
                </button>
                <button onClick={() => navigateTo('simulation')} className={styles.footerLink}>
                  Simulação
                </button>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2025 TurboX. Desenvolvido com ❤️ para os amantes da velocidade.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

