'use client';

import { useState, useEffect } from 'react';
import Modal from './Modal';
import { useCars } from '../hooks/useBackend';
import styles from './BrandCarsModal.module.css';

// Base de dados dos carros (mesma do CarList)
const carsDatabase = [
  {
    id: 1,
    brand: 'Nissan',
    model: 'GT-R',
    year: 2023,
    image: '',
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
    image: '',
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
    image: '',
    power: 310,
    torque: 393,
    acceleration: 5.2,
    price: 280000,
    category: 'esportivo',
    engine: '2.5L Boxer Turbo',
    drivetrain: 'AWD',
    transmission: 'Manual',
    topSpeed: 250,
    description: 'Ícone do rally, com tração integral e motor boxer característico.'
  },
  {
    id: 4,
    brand: 'Mitsubishi',
    model: 'Lancer Evolution X',
    year: 2015,
    image: '',
    power: 291,
    torque: 407,
    acceleration: 5.4,
    price: 180000,
    category: 'esportivo',
    engine: '2.0L I4 Turbo',
    drivetrain: 'AWD',
    transmission: 'Manual',
    topSpeed: 240,
    description: 'A última evolução da linhagem EVO, perfeita para preparações.'
  },
  {
    id: 5,
    brand: 'Honda',
    model: 'Civic Type R',
    year: 2023,
    image: '',
    power: 315,
    torque: 420,
    acceleration: 5.0,
    price: 320000,
    category: 'esportivo',
    engine: '2.0L I4 Turbo',
    drivetrain: 'FWD',
    transmission: 'Manual',
    topSpeed: 270,
    description: 'O hot hatch mais radical da Honda, com foco em pista.'
  },
  {
    id: 6,
    brand: 'BMW',
    model: 'M3 Competition',
    year: 2023,
    image: '',
    power: 510,
    torque: 650,
    acceleration: 3.8,
    price: 750000,
    category: 'esportivo',
    engine: '3.0L I6 Twin-Turbo',
    drivetrain: 'RWD',
    transmission: 'Automático',
    topSpeed: 290,
    description: 'Berlina esportiva bávara com DNA de corrida.'
  },
  {
    id: 7,
    brand: 'Mercedes',
    model: 'AMG GT 63 S',
    year: 2023,
    image: '',
    power: 630,
    torque: 900,
    acceleration: 3.2,
    price: 1200000,
    category: 'supercar',
    engine: '4.0L V8 Twin-Turbo',
    drivetrain: 'AWD',
    transmission: 'DCT',
    topSpeed: 315,
    description: 'Gran Turismo alemão com potência brutal e luxo incomparável.'
  },
  {
    id: 8,
    brand: 'Audi',
    model: 'RS6 Avant',
    year: 2023,
    image: '',
    power: 600,
    torque: 800,
    acceleration: 3.6,
    price: 900000,
    category: 'esportivo',
    engine: '4.0L V8 Twin-Turbo',
    drivetrain: 'AWD',
    transmission: 'Automático',
    topSpeed: 305,
    description: 'A perua mais rápida do mundo, versatilidade com performance extrema.'
  },
  {
    id: 9,
    brand: 'Porsche',
    model: '911 Turbo S',
    year: 2023,
    image: '',
    power: 650,
    torque: 800,
    acceleration: 2.7,
    price: 1500000,
    category: 'supercar',
    engine: '3.8L Flat-6 Twin-Turbo',
    drivetrain: 'AWD',
    transmission: 'PDK',
    topSpeed: 330,
    description: 'O ícone alemão em sua forma mais potente, perfeição em engenharia.'
  },
  {
    id: 10,
    brand: 'Chevrolet',
    model: 'Camaro ZL1',
    year: 2023,
    image: '',
    power: 650,
    torque: 881,
    acceleration: 3.5,
    price: 450000,
    category: 'muscle',
    engine: '6.2L V8 Supercharged',
    drivetrain: 'RWD',
    transmission: 'Manual',
    topSpeed: 320,
    description: 'Muscle car americano com coração supercarregado, pura brutalidade.'
  },
  {
    id: 11,
    brand: 'Ford',
    model: 'Mustang Shelby GT500',
    year: 2023,
    image: '',
    power: 760,
    torque: 847,
    acceleration: 3.3,
    price: 520000,
    category: 'muscle',
    engine: '5.2L V8 Supercharged',
    drivetrain: 'RWD',
    transmission: 'DCT',
    topSpeed: 290,
    description: 'A serpente mais venenosa da Ford, poder bruto americano.'
  },
  {
    id: 12,
    brand: 'Dodge',
    model: 'Challenger SRT Hellcat',
    year: 2023,
    image: '',
    power: 717,
    torque: 881,
    acceleration: 3.4,
    price: 400000,
    category: 'muscle',
    engine: '6.2L V8 Supercharged',
    drivetrain: 'RWD',
    transmission: 'Automático',
    topSpeed: 315,
    description: 'Demônio americano com alma supercarregada, terror nas ruas.'
  },
  {
    id: 13,
    brand: 'Volkswagen',
    model: 'Golf R',
    year: 2023,
    image: '',
    power: 320,
    torque: 420,
    acceleration: 4.7,
    price: 250000,
    category: 'esportivo',
    engine: '2.0L I4 Turbo',
    drivetrain: 'AWD',
    transmission: 'DSG',
    topSpeed: 250,
    description: 'O Golf mais potente já criado, eficiência alemã turbinada.'
  },
  {
    id: 14,
    brand: 'Hyundai',
    model: 'i30 N',
    year: 2023,
    image: '',
    power: 280,
    torque: 392,
    acceleration: 5.9,
    price: 180000,
    category: 'esportivo',
    engine: '2.0L I4 Turbo',
    drivetrain: 'FWD',
    transmission: 'Manual',
    topSpeed: 250,
    description: 'Hot hatch coreano com personalidade esportiva autêntica.'
  },
  {
    id: 15,
    brand: 'Mazda',
    model: 'MX-5 Miata',
    year: 2023,
    image: '',
    power: 181,
    torque: 205,
    acceleration: 6.5,
    price: 150000,
    category: 'esportivo',
    engine: '2.0L I4 Aspirado',
    drivetrain: 'RWD',
    transmission: 'Manual',
    topSpeed: 218,
    description: 'Roadster puro-sangue, diversão garantida em cada curva.'
  },
  {
    id: 16,
    brand: 'Renault',
    model: 'Megane RS',
    year: 2023,
    image: '',
    power: 300,
    torque: 390,
    acceleration: 5.8,
    price: 200000,
    category: 'esportivo',
    engine: '1.8L I4 Turbo',
    drivetrain: 'FWD',
    transmission: 'DCT',
    topSpeed: 260,
    description: 'Hot hatch francês com chassi afiado para circuitos.'
  }
];

const BrandCarsModal = ({ isOpen, onClose, selectedBrand }) => {
  const { cars: backendCars, loading } = useCars();
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('todos');

  // Filtrar carros da marca selecionada
  const getBrandCars = () => {
    const allCars = backendCars && backendCars.length > 0 ? backendCars : carsDatabase;
    const filtered = allCars.filter(car => 
      car.brand?.toLowerCase() === selectedBrand?.toLowerCase()
    );
    console.log('✓ Carros encontrados para', selectedBrand + ':', filtered.length);
    return filtered;
  };

  const brandCars = getBrandCars();

  // Aplicar filtros
  const filteredCars = brandCars.filter(car => {
    if (filterBy === 'todos') return true;
    return car.category === filterBy;
  });

  // Aplicar ordenação
  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.model.localeCompare(b.model);
      case 'year':
        return b.year - a.year;
      case 'power':
        return b.power - a.power;
      case 'price':
        return a.price - b.price;
      default:
        return 0;
    }
  });

  // Categorias disponíveis
  const categories = ['todos', ...new Set(brandCars.map(car => car.category))];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!selectedBrand) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Carros ${selectedBrand}`}
      size="fullscreen"
      className={styles.brandCarsModal}
    >
      <div className={styles.modalContent}>
        {/* Filtros e Ordenação */}
        <div className={styles.controls}>
          <div className={styles.filterGroup}>
            <label>Filtrar por categoria:</label>
            <select 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
              className={styles.select}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'todos' ? 'Todas as categorias' : 
                   category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Ordenar por:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.select}
            >
              <option value="name">Nome</option>
              <option value="year">Ano</option>
              <option value="power">Potência</option>
              <option value="price">Preço</option>
            </select>
          </div>

          <div className={styles.resultsCount}>
            {sortedCars.length} carro{sortedCars.length !== 1 ? 's' : ''} encontrado{sortedCars.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Lista de Carros */}
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Carregando carros...</p>
          </div>
        ) : sortedCars.length === 0 ? (
          <div className={styles.noCars}>
            <div className={styles.noCarIcon}></div>
            <h3>Nenhum carro encontrado</h3>
            <p>Não há carros da marca {selectedBrand} disponíveis no momento.</p>
          </div>
        ) : (
          <div className={styles.carsGrid}>
            {sortedCars.map((car) => (
              <div key={car.id} className={styles.carCard}>
                <div className={styles.carImage}>
                  {car.image ? (
                    <img 
                      src={car.image} 
                      alt={`${car.brand} ${car.model}`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : (
                    <div className={styles.carPlaceholder}>
                      <span className={styles.carIcon}>{car.brand.charAt(0)}</span>
                    </div>
                  )}
                  <div className={styles.carCategory}>{car.category}</div>
                </div>
                
                <div className={styles.carInfo}>
                  <h3 className={styles.carName}>
                    {car.brand} {car.model}
                  </h3>
                  <p className={styles.carYear}>{car.year}</p>
                  <p className={styles.carDescription}>{car.description}</p>
                  
                  <div className={styles.carSpecs}>
                    <div className={styles.spec}>
                      <span className={styles.specLabel}>Potência:</span>
                      <span className={styles.specValue}>{car.power} cv</span>
                    </div>
                    <div className={styles.spec}>
                      <span className={styles.specLabel}>Torque:</span>
                      <span className={styles.specValue}>{car.torque} Nm</span>
                    </div>
                    <div className={styles.spec}>
                      <span className={styles.specLabel}>0-100 km/h:</span>
                      <span className={styles.specValue}>{car.acceleration}s</span>
                    </div>
                    <div className={styles.spec}>
                      <span className={styles.specLabel}>V. Máxima:</span>
                      <span className={styles.specValue}>{car.topSpeed} km/h</span>
                    </div>
                  </div>
                  
                  <div className={styles.carEngine}>
                    <strong>Motor:</strong> {car.engine} | {car.drivetrain} | {car.transmission}
                  </div>
                  
                  <div className={styles.carPrice}>
                    {formatPrice(car.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BrandCarsModal;
