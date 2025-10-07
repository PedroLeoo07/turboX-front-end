"use client";

import Navigation from '../components/Navigation';
import styles from './CarDetails.module.css';

export default function CarDetails({ car, navigateTo, isLoggedIn, user, onLogout }) {
  if (!car) {
    return (
      <div className={styles.carDetailsContainer}>
        <Navigation 
          currentPage="cars" 
          navigateTo={navigateTo} 
          isLoggedIn={isLoggedIn} 
          user={user} 
          onLogout={onLogout} 
        />
        <div className={styles.errorMessage}>
          <h2>Carro não encontrado</h2>
          <button onClick={() => navigateTo('cars')} className={styles.backButton}>
            Voltar para a lista
          </button>
        </div>
      </div>
    );
  }

  const specifications = [
    { label: 'Potência', value: `${car.power} cv`, icon: 'P' },
    { label: 'Torque', value: `${car.torque} Nm`, icon: 'T' },
    { label: 'Aceleração 0-100', value: `${car.acceleration}s`, icon: 'A' },
    { label: 'Ano', value: car.year, icon: 'Ano' },
    { label: 'Marca', value: car.brand, icon: 'Marca' },
    { label: 'Categoria', value: car.category, icon: 'Cat' }
  ];

  const features = [
    'Motor Turbo de Alta Performance',
    'Sistema de Tração Inteligente',
    'Freios de Alto Desempenho',
    'Suspensão Esportiva Ajustável',
    'Diferencial de Deslizamento Limitado',
    'Sistema de Escapamento Esportivo'
  ];

  return (
    <div className={styles.carDetailsContainer}>
      <Navigation 
        currentPage="cars" 
        navigateTo={navigateTo} 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLogout={onLogout} 
      />
      
      <main className={styles.main}>
        <div className={styles.header}>
          <button 
            onClick={() => navigateTo('cars')} 
            className={styles.backButton}
          >
            ← Voltar para Lista
          </button>
        </div>

        <div className={styles.carHero}>
          <div className={styles.carImageLarge}>
            {car.image && typeof car.image === 'string' && car.image.startsWith('http') ? (
              <img 
                src={car.image} 
                alt={`${car.brand} ${car.model}`}
                onError={(e) => {
                  e.target.src = '/images/car-placeholder.svg';
                }}
              />
            ) : (
              <div className={styles.carPlaceholder}>
                <span className={styles.carIcon}>{car.brand?.charAt(0) || 'C'}</span>
              </div>
            )}
          </div>
          <div className={styles.carMainInfo}>
            <h1 className={styles.carTitle}>
              {car.brand} <span className={styles.carModel}>{car.model}</span>
            </h1>
            <p className={styles.carYear}>{car.year}</p>
            <div className={styles.carPrice}>{car.price}</div>
            
            <div className={styles.quickStats}>
              <div className={styles.quickStat}>
                <div className={styles.quickStatValue}>{car.power}</div>
                <div className={styles.quickStatLabel}>CV</div>
              </div>
              <div className={styles.quickStat}>
                <div className={styles.quickStatValue}>{car.torque}</div>
                <div className={styles.quickStatLabel}>Nm</div>
              </div>
              <div className={styles.quickStat}>
                <div className={styles.quickStatValue}>{car.acceleration}</div>
                <div className={styles.quickStatLabel}>0-100s</div>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button 
                onClick={() => navigateTo('simulation', car)}
                className={styles.simulateButton}
              >
                Iniciar Simulação
              </button>
              <button className={styles.favoriteButton}>
                Adicionar aos Favoritos
              </button>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <section className={styles.specifications}>
            <h2 className={styles.sectionTitle}>Especificações Técnicas</h2>
            <div className={styles.specsGrid}>
              {specifications.map((spec, index) => (
                <div key={index} className={styles.specCard}>
                  <div className={styles.specIcon}>{spec.icon}</div>
                  <div className={styles.specInfo}>
                    <div className={styles.specLabel}>{spec.label}</div>
                    <div className={styles.specValue}>{spec.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.performance}>
            <h2 className={styles.sectionTitle}>Performance Base</h2>
            <div className={styles.performanceGrid}>
              <div className={styles.performanceCard}>
                <div className={styles.performanceIcon}>Pot</div>
                <h3>Potência Original</h3>
                <div className={styles.performanceValue}>{car.power} CV</div>
                <p>Configuração de fábrica otimizada</p>
              </div>
              
              <div className={styles.performanceCard}>
                <div className={styles.performanceIcon}>Tq</div>
                <h3>Torque Máximo</h3>
                <div className={styles.performanceValue}>{car.torque} Nm</div>
                <p>Força disponível em todas as RPM</p>
              </div>
              
              <div className={styles.performanceCard}>
                <div className={styles.performanceIcon}>Acel</div>
                <h3>Aceleração</h3>
                <div className={styles.performanceValue}>{car.acceleration}s</div>
                <p>Tempo de 0 a 100 km/h</p>
              </div>
            </div>
          </section>

          <section className={styles.features}>
            <h2 className={styles.sectionTitle}>Características Principais</h2>
            <div className={styles.featuresList}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <span className={styles.featureCheck}>-</span>
                  <span className={styles.featureText}>{feature}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.upgradeTeaser}>
            <h2 className={styles.sectionTitle}>Potencial de Upgrade</h2>
            <div className={styles.upgradeContent}>
              <div className={styles.upgradeInfo}>
                <h3>Transforme este carro em uma máquina!</h3>
                <p>
                  Com nossa simulação avançada, você pode testar diferentes configurações de upgrades
                  e ver como elas afetam a performance do seu carro em tempo real.
                </p>
                <ul className={styles.upgradeFeatures}>
                  <li>Simulação de Stage 1, 2 e 3</li>
                  <li>Upgrades de motor, turbo e escape</li>
                  <li>Gráficos de performance antes/depois</li>
                  <li>Salvar e compartilhar suas builds</li>
                </ul>
              </div>
              <div className={styles.upgradeActions}>
                  <button 
                    onClick={() => navigateTo('simulation', car)}
                    className={styles.startSimulationButton}
                  >
                    Começar Simulação
                  </button>
                <div className={styles.upgradeStats}>
                  <div className={styles.upgradeStat}>
                    <span>Potencial: +200 CV</span>
                  </div>
                  <div className={styles.upgradeStat}>
                    <span>Aceleração: -2.0s</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
