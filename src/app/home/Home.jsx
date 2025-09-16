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
                <span>🚗</span>
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
              <img src="/carro/golf.png" alt="Golf" className={styles.carIcon} />
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
                <div className={styles.featureIcon}>🚗</div>
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
              16 marcas disponíveis - Encontre o carro perfeito da sua marca favorita
            </p>
          </div>
          
          <div className={styles.brandsGrid}>
            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Volkswagen' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/volks.png" alt="Volkswagen Logo" className={styles.brandLogo} />
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
                <img src="/logos/BMW.png" alt="BMW Logo" className={styles.brandLogo} />
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
                <img src="/logos/Ford.png" alt="Ford Logo" className={styles.brandLogo} />
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
                <img src="/logos/hyundai.png" alt="Hyundai Logo" className={styles.brandLogo} />
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
                <img src="/logos/toyot.png" alt="Toyota Logo" className={styles.brandLogo} />
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
                <img src="/logos/chevrolet.png" alt="Chevrolet Logo" className={styles.brandLogo} />
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

            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Honda' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/honda.webp" alt="Honda Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>Honda</h3>
              <p className={styles.brandDesc}>Engenharia japonesa VTEC</p>
              <div className={styles.brandArrow}>→</div>
            </div>

            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Mercedes-AMG' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/mercedes.png" alt="Mercedes Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>Mercedes-AMG</h3>
              <p className={styles.brandDesc}>Luxo e performance alemã</p>
              <div className={styles.brandArrow}>→</div>
            </div>

            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Audi' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/audi.png" alt="Audi Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>Audi</h3>
              <p className={styles.brandDesc}>Quattro e tecnologia avançada</p>
              <div className={styles.brandArrow}>→</div>
            </div>

            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Dodge' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/dodge.png" alt="Dodge Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>Dodge</h3>
              <p className={styles.brandDesc}>Muscle cars americanos</p>
              <div className={styles.brandArrow}>→</div>
            </div>

            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Renault' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/renault.png" alt="Renault Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>Renault</h3>
              <p className={styles.brandDesc}>Esportivos franceses</p>
              <div className={styles.brandArrow}>→</div>
            </div>

            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Subaru' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/subaru.png" alt="Subaru Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>Subaru</h3>
              <p className={styles.brandDesc}>Boxer e tração integral</p>
              <div className={styles.brandArrow}>→</div>
            </div>

            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Mazda' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/mazda.png  " alt="Mazda Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>Mazda</h3>
              <p className={styles.brandDesc}>Rotary e design Kodo</p>
              <div className={styles.brandArrow}>→</div>
            </div>

            <div 
              className={styles.brandCard} 
              onClick={() => navigateTo('carList', null, { brand: 'Porsche' })}
            >
              <div className={styles.brandIcon}>
                <img src="/logos/porsche.svg" alt="Porsche Logo" className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>Porsche</h3>
              <p className={styles.brandDesc}>Ícone alemão de performance</p>
              <div className={styles.brandArrow}>→</div>
            </div>
          </div>
        </div>
      </section>

      {/* i30 SHOWCASE SECTION */}
      <section className={styles.i30Showcase}>
        <div className={styles.container}>
          <div className={styles.i30Content}>
            {/* LADO ESQUERDO - IMAGEM */}
            <div className={styles.i30ImageContainer}>
              <div className={styles.i30ImageWrapper}>
                <img 
                  src="/carro/i30.png" 
                  alt="Hyundai i30 - Carro em Destaque"
                  className={styles.i30Image}
                />
              </div>
            </div>

            {/* LADO DIREITO - INFORMAÇÕES */}
            <div className={styles.i30Info}>
              <div className={styles.i30Header}>
                <h2 className={styles.i30Title}>
                  <span className={styles.i30Brand}>Hyundai</span>
                  <span className={styles.i30Model}>i30</span>
                </h2>
                <p className={styles.i30Subtitle}>
                  O hatchback esportivo que combina design europeu, 
                  tecnologia avançada e performance excepcional.
                </p>
              </div>

              <div className={styles.i30Features}>
                <div className={styles.i30Feature}>
                  <div className={styles.featureIcon}>🚀</div>
                  <div className={styles.featureContent}>
                    <h4>Motor Turbo</h4>
                    <p>1.0 T-GDI com até 120 cv de potência</p>
                  </div>
                </div>

                <div className={styles.i30Feature}>
                  <div className={styles.featureIcon}>⚡</div>
                  <div className={styles.featureContent}>
                    <h4>Performance</h4>
                    <p>0-100 km/h em 11.2 segundos</p>
                  </div>
                </div>

                <div className={styles.i30Feature}>
                  <div className={styles.featureIcon}>💨</div>
                  <div className={styles.featureContent}>
                    <h4>Velocidade Máxima</h4>
                    <p>185 km/h de velocidade final</p>
                  </div>
                </div>

                <div className={styles.i30Feature}>
                  <div className={styles.featureIcon}>🎯</div>
                  <div className={styles.featureContent}>
                    <h4>Eficiência</h4>
                    <p>13.7 km/l na cidade, 15.2 km/l na estrada</p>
                  </div>
                </div>
              </div>

              <div className={styles.i30Description}>
                <p>
                  O <strong>Hyundai i30</strong> representa a perfeita harmonia entre 
                  <span className={styles.highlight}> design sofisticado</span> e 
                  <span className={styles.highlight}> tecnologia de ponta</span>. 
                  Com seu motor turbo T-GDI, oferece uma experiência de condução 
                  dinâmica e econômica, ideal para quem busca performance sem 
                  abrir mão do conforto e da praticidade no dia a dia.
                </p>
                
                <p>
                  Equipado com sistema de infoentretenimento avançado, 
                  controles de estabilidade e assistência ao condutor, 
                  o i30 está pronto para ser seu próximo projeto de preparação 
                  no <strong>TurboX</strong>.
                </p>
              </div>

              <div className={styles.i30Actions}>
                <button 
                  onClick={() => navigateTo('simulation', null, { car: 'Hyundai i30' })}
                  className={styles.i30PrimaryBtn}
                >
                  <span>🔧</span>
                  Simular Preparação
                  <div className={styles.btnShine}></div>
                </button>
                
                <button 
                  onClick={() => navigateTo('car', { brand: 'Hyundai', model: 'i30' })}
                  className={styles.i30SecondaryBtn}
                >
                  <span>📋</span>
                  Ver Detalhes Completos
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USERS SECTION */}
      <section className={styles.users}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleIcon}>👥</span>
              Comunidade TurboX
            </h2>
            <p className={styles.sectionSubtitle}>
              Gerencie usuários e acompanhe suas coleções de carros personalizados
            </p>
          </div>

          <div className={styles.usersContent}>
            <div className={styles.usersStats}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>👨‍💻</div>
                <div className={styles.statInfo}>
                  <div className={styles.statNumber}>1.2k+</div>
                  <div className={styles.statLabel}>Usuários Ativos</div>
                </div>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statIcon}>🚗</div>
                <div className={styles.statInfo}>
                  <div className={styles.statNumber}>5.8k+</div>
                  <div className={styles.statLabel}>Carros Cadastrados</div>
                </div>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statIcon}>⚙️</div>
                <div className={styles.statInfo}>
                  <div className={styles.statNumber}>15k+</div>
                  <div className={styles.statLabel}>Modificações Feitas</div>
                </div>
              </div>
            </div>

            <div className={styles.usersFeatures}>
              <div className={styles.userFeature}>
                <div className={styles.userFeatureIcon}>📊</div>
                <h3 className={styles.userFeatureTitle}>Dashboard Completo</h3>
                <p className={styles.userFeatureDesc}>
                  Visualize estatísticas detalhadas de todos os usuários, 
                  carros cadastrados e modificações realizadas.
                </p>
              </div>

              <div className={styles.userFeature}>
                <div className={styles.userFeatureIcon}>🔍</div>
                <h3 className={styles.userFeatureTitle}>Busca Avançada</h3>
                <p className={styles.userFeatureDesc}>
                  Encontre usuários por nome, email, marca de carro preferida 
                  ou número de veículos cadastrados.
                </p>
              </div>

              <div className={styles.userFeature}>
                <div className={styles.userFeatureIcon}>🎯</div>
                <h3 className={styles.userFeatureTitle}>Gestão Inteligente</h3>
                <p className={styles.userFeatureDesc}>
                  Adicione, remova e gerencie carros dos usuários com 
                  interface intuitiva e ações em tempo real.
                </p>
              </div>
            </div>

            <div className={styles.usersAction}>
              <button 
                onClick={() => navigateTo('users')}
                className={styles.usersBtn}
              >
                <span className={styles.btnIcon}>👥</span>
                Gerenciar Usuários
                <span className={styles.btnArrow}>→</span>
              </button>
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
              <span>🚗</span>
              Ver Carros
            </button>
          </div>
        </div>
      </section>

      {/* STORAGE SECTION */}
      <section className={styles.storage}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleIcon}>🏢</span>
              Garagem Virtual
            </h2>
            <p className={styles.sectionSubtitle}>
              Salve suas configurações, compare builds e gerencie sua coleção de carros
            </p>
          </div>
          
          <div className={styles.storageGrid}>
            {/* Garagem Pessoal */}
            <div className={styles.storageCard}>
              <div className={styles.storageHeader}>
                <div className={styles.storageIcon}>🏠</div>
                <div className={styles.storageBadge}>Ilimitado</div>
              </div>
              <h3 className={styles.storageTitle}>Minha Garagem</h3>
              <p className={styles.storageDesc}>
                Salve quantos carros quiser com todas as suas configurações. 
                Acesse seus projetos a qualquer momento.
              </p>
              <div className={styles.storageStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>0</span>
                  <span className={styles.statLabel}>Carros Salvos</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>0</span>
                  <span className={styles.statLabel}>Builds</span>
                </div>
              </div>
              <button 
                onClick={() => navigateTo('storage')}
                className={styles.storageBtn}
              >
                Ver Garagem →
              </button>
            </div>

            {/* Builds Favoritas */}
            <div className={styles.storageCard}>
              <div className={styles.storageHeader}>
                <div className={styles.storageIcon}>⭐</div>
                <div className={styles.storageBadge}>Premium</div>
              </div>
              <h3 className={styles.storageTitle}>Builds Favoritas</h3>
              <p className={styles.storageDesc}>
                Salve suas configurações mais épicas e compartilhe 
                com a comunidade TurboX.
              </p>
              <div className={styles.storageFeatures}>
                <div className={styles.feature}>✓ Backup na nuvem</div>
                <div className={styles.feature}>✓ Compartilhamento social</div>
                <div className={styles.feature}>✓ Histórico completo</div>
              </div>
              <button 
                onClick={() => navigateTo('favorites')}
                className={styles.storageBtn}
              >
                Ver Favoritas →
              </button>
            </div>

            {/* Comparador */}
            <div className={styles.storageCard}>
              <div className={styles.storageHeader}>
                <div className={styles.storageIcon}>⚖️</div>
                <div className={styles.storageBadge}>Novo</div>
              </div>
              <h3 className={styles.storageTitle}>Comparador</h3>
              <p className={styles.storageDesc}>
                Compare até 4 carros lado a lado com todas as 
                especificações e modificações.
              </p>
              <div className={styles.storagePreview}>
                <div className={styles.previewCar}>🚗</div>
                <div className={styles.previewVs}>VS</div>
                <div className={styles.previewCar}>🚗</div>
              </div>
              <button 
                onClick={() => navigateTo('compare')}
                className={styles.storageBtn}
              >
                Comparar →
              </button>
            </div>

            {/* Comunidade */}
            <div className={styles.storageCard}>
              <div className={styles.storageHeader}>
                <div className={styles.storageIcon}>👥</div>
                <div className={styles.storageBadge}>Social</div>
              </div>
              <h3 className={styles.storageTitle}>Builds da Comunidade</h3>
              <p className={styles.storageDesc}>
                Explore builds criadas por outros usuários, 
                curta e salve suas favoritas.
              </p>
              <div className={styles.communityStats}>
                <div className={styles.communityStat}>
                  <span>1.2K+</span>
                  <span>Builds</span>
                </div>
                <div className={styles.communityStat}>
                  <span>350+</span>
                  <span>Usuários</span>
                </div>
              </div>
              <button 
                onClick={() => navigateTo('community')}
                className={styles.storageBtn}
              >
                Explorar →
              </button>
            </div>
          </div>

          {/* Call to Action da Storage */}
          <div className={styles.storageCta}>
            <h3 className={styles.ctaTitle}>
              Comece sua coleção hoje mesmo!
            </h3>
            <p className={styles.ctaDesc}>
              Crie sua conta gratuita e tenha acesso completo ao sistema de armazenamento
            </p>
            <div className={styles.ctaButtons}>
              <button 
                onClick={() => navigateTo('login')}
                className={styles.ctaPrimary}
              >
                <span>🚀</span>
                Criar Conta
              </button>
              <button 
                onClick={() => navigateTo('simulation')}
                className={styles.ctaSecondary}
              >
                <span>🔧</span>
                Começar Build
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerLeft}>
              <div className={styles.footerLogo}>
                <img 
                  src="/images/logo.png" 
                  alt="TurboX - Simulador de Preparações Automotivas" 
                  className={styles.footerLogoImage}
                />
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

