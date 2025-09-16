"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import styles from '../../../car/CarDetails.module.css';

// Base de dados dos carros (mesma do cars/page.jsx)
const carsDatabase = [
  {
    id: 1,
    brand: 'Nissan',
    model: 'GT-R',
    year: 2023,
    image: '🚗',
    power: 565,
    torque: 637,
    acceleration: 2.7,
    price: 850000,
    category: 'supercar',
    engine: '3.8L V6 Twin-Turbo',
    drivetrain: 'AWD',
    transmission: 'DCT',
    topSpeed: 315,
    description: 'O lendário Godzilla japonês, com tecnologia de ponta e performance brutal.'
  },
  {
    id: 2,
    brand: 'Toyota',
    model: 'Supra',
    year: 2023,
    image: '🏎️',
    power: 382,
    torque: 500,
    acceleration: 4.1,
    price: 450000,
    category: 'esportivo',
    engine: '3.0L I6 Turbo',
    drivetrain: 'RWD',
    transmission: 'Automático',
    topSpeed: 280,
    description: 'O retorno de uma lenda, co-desenvolvido com BMW para máxima performance.'
  },
  {
    id: 3,
    brand: 'Subaru',
    model: 'WRX STI',
    year: 2022,
    image: '🚙',
    power: 310,
    torque: 393,
    acceleration: 5.2,
    price: 280000,
    category: 'esportivo',
    engine: '2.5L H4 Turbo',
    drivetrain: 'AWD',
    transmission: 'Manual',
    topSpeed: 250,
    description: 'O rally legend com tração integral Symmetrical AWD e boxer turbo.'
  }
];

export default function CarDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carId = parseInt(params.id);
    const foundCar = carsDatabase.find(c => c.id === carId);
    
    setTimeout(() => {
      setCar(foundCar);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className={styles.carDetailsContainer}>
        <div className={styles.main}>
          <div className={styles.header}>
            <button onClick={() => router.push('/cars')} className={styles.backButton}>
              ← Voltar para Lista
            </button>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
            fontSize: '3rem'
          }}>
            🔄 Carregando...
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className={styles.carDetailsContainer}>
        <div className={styles.main}>
          <div className={styles.header}>
            <button onClick={() => router.push('/cars')} className={styles.backButton}>
              ← Voltar para Lista
            </button>
          </div>
          <div className={styles.errorMessage}>
            <h2>Carro não encontrado</h2>
            <button onClick={() => router.push('/cars')} className={styles.backButton}>
              Voltar para a lista
            </button>
          </div>
        </div>
      </div>
    );
  }

  const availableUpgrades = [
    'Chip de Potência Stage 1',
    'Sistema de Arrefecimento Esportivo',
    'Escape Esportivo Completo',
    'Filtro de Ar Esportivo',
    'Intercooler Maior',
    'Turbo Upgrade',
    'Suspensão Esportiva Ajustável',
    'Diferencial de Deslizamento Limitado',
    'Sistema de Escapamento Esportivo'
  ];

  return (
    <div className={styles.carDetailsContainer}>
      <main className={styles.main}>
        <div className={styles.header}>
          <button onClick={() => router.push('/cars')} className={styles.backButton}>
            ← Voltar para Lista
          </button>
        </div>

        <div className={styles.carHero}>
          <div className={styles.carImageLarge}>
            {car.image}
          </div>
          
          <div className={styles.carMainInfo}>
            <h1 className={styles.carTitle}>
              <span className={styles.carBrand}>{car.brand}</span>
              <span className={styles.carModel}>{car.model}</span>
            </h1>
            <div className={styles.carYear}>{car.year}</div>
            <div className={styles.carPrice}>{formatPrice(car.price)}</div>
            
            <div className={styles.quickStats}>
              <div className={styles.quickStat}>
                <div className={styles.quickStatValue}>{car.power}</div>
                <div className={styles.quickStatLabel}>HP</div>
              </div>
              <div className={styles.quickStat}>
                <div className={styles.quickStatValue}>{car.torque}</div>
                <div className={styles.quickStatLabel}>Nm</div>
              </div>
              <div className={styles.quickStat}>
                <div className={styles.quickStatValue}>{car.acceleration}</div>
                <div className={styles.quickStatLabel}>0-100km/h</div>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.simulateButton}>
                🔧 Simular Preparação
              </button>
              <button className={styles.favoriteButton}>
                ❤️ Favoritar
              </button>
            </div>
          </div>
        </div>

        <div className={styles.carContent}>
          <div className={styles.carDescription}>
            <h2>Sobre este carro</h2>
            <p>{car.description}</p>
          </div>

          <div className={styles.specifications}>
            <h2>Especificações Técnicas</h2>
            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Motor:</span>
                <span className={styles.specValue}>{car.engine}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Potência:</span>
                <span className={styles.specValue}>{car.power} HP</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Torque:</span>
                <span className={styles.specValue}>{car.torque} Nm</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Tração:</span>
                <span className={styles.specValue}>{car.drivetrain}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Transmissão:</span>
                <span className={styles.specValue}>{car.transmission}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Velocidade Máxima:</span>
                <span className={styles.specValue}>{car.topSpeed} km/h</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Aceleração:</span>
                <span className={styles.specValue}>{car.acceleration}s (0-100km/h)</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Categoria:</span>
                <span className={styles.specValue}>{car.category.charAt(0).toUpperCase() + car.category.slice(1)}</span>
              </div>
            </div>
          </div>

          <div className={styles.upgrades}>
            <h2>Upgrades Disponíveis</h2>
            <div className={styles.upgradesGrid}>
              {availableUpgrades.map((upgrade, index) => (
                <div key={index} className={styles.upgradeItem}>
                  <span className={styles.upgradeIcon}>⚡</span>
                  <span className={styles.upgradeName}>{upgrade}</span>
                  <button className={styles.addUpgradeButton}>
                    Adicionar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.callToAction}>
            <h2>Pronto para começar?</h2>
            <p>Transforme este carro em uma máquina de alta performance</p>
            <button className={styles.startSimulationButton}>
              🚀 Iniciar Simulação Completa
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}