"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navigation from '../components/Navigation';
import styles from './CarList.module.css';

// Base de dados dos carros expandida
const carsDatabase = [
  {
    id: 1,
    brand: 'Nissan',
    model: 'GT-R',
    year: 2023,
    image: 'car-icon',
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
    image: 'car-icon',
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
    image: 'car-icon',
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
    image: 'car-icon',
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
    image: 'car-icon',
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
    image: 'car-icon',
    power: 510,
    torque: 650,
    acceleration: 3.8,
    price: 650000,
    category: 'supercar',
    engine: '3.0L I6 Twin-Turbo',
    drivetrain: 'RWD',
    transmission: 'Automático',
    topSpeed: 290,
    description: 'Sedã esportivo de alta performance com tecnologia de F1.'
  },
  {
    id: 7,
    brand: 'Audi',
    model: 'RS6 Avant',
    year: 2023,
    image: 'car-icon',
    power: 600,
    torque: 800,
    acceleration: 3.6,
    price: 750000,
    category: 'supercar',
    engine: '4.0L V8 Twin-Turbo',
    drivetrain: 'AWD',
    transmission: 'Automático',
    topSpeed: 305,
    description: 'A wagon mais rápida do mundo, combinando luxo e performance.'
  },
  {
    id: 8,
    brand: 'Mercedes-AMG',
    model: 'A45 S',
    year: 2023,
    image: 'car-icon',
    power: 421,
    torque: 500,
    acceleration: 3.9,
    price: 480000,
    category: 'esportivo',
    engine: '2.0L I4 Turbo',
    drivetrain: 'AWD',
    transmission: 'DCT',
    topSpeed: 270,
    description: 'O motor 4 cilindros mais potente do mundo em um compacto.'
  },
  {
    id: 9,
    brand: 'Porsche',
    model: '911 Turbo S',
    year: 2023,
    image: 'car-icon',
    power: 650,
    torque: 800,
    acceleration: 2.6,
    price: 1200000,
    category: 'supercar',
    engine: '3.8L Flat-6 Twin-Turbo',
    drivetrain: 'AWD',
    transmission: 'PDK',
    topSpeed: 330,
    description: 'O ícone alemão de performance, referência mundial em supercarros.'
  },
  {
    id: 10,
    brand: 'Volkswagen',
    model: 'Golf R',
    year: 2023,
    image: 'car-icon',
    power: 320,
    torque: 420,
    acceleration: 4.7,
    price: 350000,
    category: 'esportivo',
    engine: '2.0L I4 Turbo',
    drivetrain: 'AWD',
    transmission: 'DSG',
    topSpeed: 250,
    description: 'Hot hatch alemão com tração integral e tecnologia avançada.'
  },
  {
    id: 11,
    brand: 'Ford',
    model: 'Mustang Shelby GT500',
    year: 2023,
    image: 'car-icon',
    power: 760,
    torque: 847,
    acceleration: 3.3,
    price: 580000,
    category: 'muscle',
    engine: '5.2L V8 Supercharged',
    drivetrain: 'RWD',
    transmission: 'DCT',
    topSpeed: 290,
    description: 'Muscle car americano com motor V8 supercharged brutal.'
  },
  {
    id: 12,
    brand: 'Chevrolet',
    model: 'Camaro ZL1',
    year: 2023,
    image: 'car-icon',
    power: 650,
    torque: 881,
    acceleration: 3.5,
    price: 520000,
    category: 'muscle',
    engine: '6.2L V8 Supercharged',
    drivetrain: 'RWD',
    transmission: 'Manual',
    topSpeed: 320,
    description: 'O Camaro mais extremo já produzido, puro poder americano.'
  },
  {
    id: 13,
    brand: 'McLaren',
    model: '720S',
    year: 2023,
    image: 'car-icon',
    power: 720,
    torque: 770,
    acceleration: 2.8,
    price: 1800000,
    category: 'hypercar',
    engine: '4.0L V8 Twin-Turbo',
    drivetrain: 'RWD',
    transmission: 'DCT',
    topSpeed: 341,
    description: 'Supercar britânico com tecnologia de F1 e design futurista.'
  },
  {
    id: 14,
    brand: 'Ferrari',
    model: 'F8 Tributo',
    year: 2023,
    image: 'car-icon',
    power: 720,
    torque: 770,
    acceleration: 2.9,
    price: 2200000,
    category: 'hypercar',
    engine: '3.9L V8 Twin-Turbo',
    drivetrain: 'RWD',
    transmission: 'DCT',
    topSpeed: 340,
    description: 'A essência italiana da velocidade com motor V8 premiado.'
  },
  {
    id: 15,
    brand: 'Hyundai',
    model: 'i30N',
    year: 2023,
    image: 'car-icon',
    power: 280,
    torque: 392,
    acceleration: 6.0,
    price: 180000,
    category: 'esportivo',
    engine: '2.0L I4 Turbo',
    drivetrain: 'FWD',
    transmission: 'Manual',
    topSpeed: 250,
    description: 'Hot hatch coreano com foco em performance e diversão.'
  },
  {
    id: 16,
    brand: 'Hyundai',
    model: 'Veloster N',
    year: 2022,
    image: 'car-icon',
    power: 275,
    torque: 378,
    acceleration: 5.6,
    price: 160000,
    category: 'esportivo',
    engine: '2.0L I4 Turbo',
    drivetrain: 'FWD',
    transmission: 'Manual',
    topSpeed: 240,
    description: 'Coupé esportivo assimétrico com tecnologia de pista.'
  },
  {
    id: 17,
    brand: 'Lamborghini',
    model: 'Huracán EVO',
    year: 2023,
    image: 'car-icon',
    power: 640,
    torque: 600,
    acceleration: 2.9,
    price: 2000000,
    category: 'hypercar',
    engine: '5.2L V10',
    drivetrain: 'AWD',
    transmission: 'DCT',
    topSpeed: 325,
    description: 'V10 atmosférico com som inconfundível e design agressivo.'
  }
];

export default function CarList({ navigateTo, filterOptions = {}, isLoggedIn, user, onLogout }) {
  // Hook removido - usando dados locais
  const cars = carsDatabase;
  const brands = [];
  const loading = false;
  const fetchCars = () => {};
  const fetchBrands = () => {};
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(filterOptions.brand || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('power');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [categories, setCategories] = useState([]);

  // Carregar dados iniciais
  useEffect(() => {
    fetchCars();
    fetchBrands();
  }, [fetchCars, fetchBrands]);

  // Aplicar filtros quando filterOptions mudar
  useEffect(() => {
    if (filterOptions.brand) {
      setSelectedBrand(filterOptions.brand);
    }
  }, [filterOptions]);

  // Filtrar carros localmente
  const filteredCars = cars.filter(car => {
    return (
      (!searchTerm || car.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     car.brand.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedBrand || car.brand === selectedBrand) &&
      (!selectedCategory || car.category === selectedCategory) &&
      (car.price >= priceRange[0] && car.price <= priceRange[1])
    );
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price': return a.price - b.price;
      case 'year': return b.year - a.year;
      case 'power': return b.power - a.power;
      case 'name': return a.model.localeCompare(b.model);
      default: return b.power - a.power;
    }
  });

  const handleCarSelect = (car) => {
    toast.success(`${car.brand} ${car.model} selecionado!`);
    navigateTo('car', car);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setSelectedCategory('');
    setPriceRange([0, 3000000]);
    setSortBy('power');
  };

  // Resetar filtros quando sair da página
  useEffect(() => {
    return () => {
      // Cleanup - pode ser usado se necessário
    };
  }, []);

  const formatPrice = (price) => {
    return `R$ ${(price / 1000).toFixed(0)}k`;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Navigation 
          currentPage="carList" 
          navigateTo={navigateTo} 
          isLoggedIn={isLoggedIn} 
          user={user} 
          onLogout={onLogout} 
        />
        <div className={styles.loadingContainer}>
          <div className={styles.loadingContent}>
            <div className={styles.spinner}></div>
            <h2>Carregando Garagem TurboX...</h2>
            <p>Conectando ao servidor e carregando dados dos carros</p>
            <div className={styles.loadingBar}>
              <div className={styles.loadingProgress}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navigation 
        currentPage="carList" 
        navigateTo={navigateTo} 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLogout={onLogout} 
      />
      
      <main className={styles.main}>
        {/* HEADER */}
        <section className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>
              Garagem TurboX
            </h1>
            <p className={styles.subtitle}>
              Escolha seu carro e descubra seu potencial máximo de performance
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{cars.length}</span>
                <span className={styles.statLabel}>Carros Disponíveis</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{filteredCars.length}</span>
                <span className={styles.statLabel}>Resultados</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{brands.length}</span>
                <span className={styles.statLabel}>Marcas</span>
              </div>
            </div>
          </div>
        </section>

        {/* FILTROS */}
        <section className={styles.filters}>
          <div className={styles.filtersContainer}>
            {/* Busca */}
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Buscar por modelo, marca ou motor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            {/* Filtros */}
            <div className={styles.filterControls}>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">Todas as Marcas</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">Todas as Categorias</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="power">Maior Potência</option>
                <option value="acceleration">Menor 0-100</option>
                <option value="topSpeed">Maior V.Max</option>
                <option value="price">Maior Preço</option>
                <option value="year">Mais Novo</option>
                <option value="brand">Marca A-Z</option>
              </select>

              <div className={styles.viewControls}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                >
                  ≡
                </button>
              </div>

              <button onClick={clearFilters} className={styles.clearBtn}>
                Limpar
              </button>
            </div>
          </div>
        </section>

        {/* RESULTADOS */}
        <section className={styles.results}>
          <div className={styles.resultsContainer}>
            {filteredCars.length === 0 ? (
              <div className={styles.noResults}>
                <span className={styles.noResultsIcon}></span>
                <h3>Nenhum carro encontrado</h3>
                <p>Tente ajustar os filtros ou fazer uma nova busca</p>
                <button onClick={clearFilters} className={styles.tryAgainBtn}>
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div className={`${styles.carsGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
                {filteredCars.map(car => (
                  <div
                    key={car.id}
                    className={styles.carCard}
                    onClick={() => handleCarSelect(car)}
                  >
                    <div className={styles.carHeader}>
                      <div className={styles.carImage}>
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
                      <div className={styles.carBadge}>{car.category}</div>
                    </div>
                    
                    <div className={styles.carInfo}>
                      <h3 className={styles.carTitle}>
                        {car.brand} {car.model}
                      </h3>
                      <p className={styles.carYear}>{car.year}</p>
                      <p className={styles.carEngine}>{car.engine}</p>
                    </div>
                    
                    <div className={styles.carSpecs}>
                      <div className={styles.spec}>
                        <span className={styles.specIcon}></span>
                        <span className={styles.specValue}>{car.power}hp</span>
                      </div>
                      <div className={styles.spec}>
                        <span className={styles.specIcon}></span>
                        <span className={styles.specValue}>{car.acceleration}s</span>
                      </div>
                      <div className={styles.spec}>
                        <span className={styles.specIcon}></span>
                        <span className={styles.specValue}>{car.topSpeed}km/h</span>
                      </div>
                    </div>
                    
                    <div className={styles.carFooter}>
                      <div className={styles.carPrice}>{formatPrice(car.price)}</div>
                      <div className={styles.carAction}>
                        <span>Ver Detalhes</span>
                        <span className={styles.arrow}>→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
