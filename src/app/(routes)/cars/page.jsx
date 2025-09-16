"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useCars } from '../../hooks/useBackend';
import styles from '../../carList/CarList.module.css';

// Base de dados dos carros expandida
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
  },
  // ... mais carros podem ser adicionados
];

export default function CarsPage() {
  const router = useRouter();
  const { cars, brands, loading, fetchCars, fetchBrands } = useCars();
  const [filteredCars, setFilteredCars] = useState(carsDatabase);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchCars();
    fetchBrands();
  }, [fetchCars, fetchBrands]);

  useEffect(() => {
    let filtered = [...carsDatabase];

    // Filtrar por marca
    if (selectedBrand) {
      filtered = filtered.filter(car => car.brand === selectedBrand);
    }

    // Filtrar por categoria
    if (selectedCategory) {
      filtered = filtered.filter(car => car.category === selectedCategory);
    }

    // Filtrar por busca
    if (searchTerm) {
      filtered = filtered.filter(car => 
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.model.localeCompare(b.model);
        case 'price':
          return a.price - b.price;
        case 'power':
          return b.power - a.power;
        case 'year':
          return b.year - a.year;
        default:
          return 0;
      }
    });

    setFilteredCars(filtered);
  }, [selectedBrand, selectedCategory, searchTerm, sortBy]);

  const handleCarClick = (car) => {
    router.push(`/cars/${car.id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getUniqueCategories = () => {
    return [...new Set(carsDatabase.map(car => car.category))];
  };

  const getUniqueBrands = () => {
    return [...new Set(carsDatabase.map(car => car.brand))];
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingContent}>
            <div className={styles.spinner}>🏎️</div>
            <h2>Carregando Carros...</h2>
            <p>Preparando a garagem dos seus sonhos</p>
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
      <main className={styles.main}>
        {/* HEADER */}
        <header className={styles.header}>
          <h1 className={styles.title}>Catálogo de Carros</h1>
          <p className={styles.subtitle}>
            Descubra os carros mais incríveis e suas especificações detalhadas
          </p>
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{filteredCars.length}</div>
              <div className={styles.statLabel}>Carros</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{getUniqueBrands().length}</div>
              <div className={styles.statLabel}>Marcas</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{getUniqueCategories().length}</div>
              <div className={styles.statLabel}>Categorias</div>
            </div>
          </div>
        </header>

        {/* FILTROS */}
        <section className={styles.filters}>
          <div className={styles.filterControls}>
            <input
              type="text"
              placeholder="Buscar carros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />

            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Todas as Marcas</option>
              {getUniqueBrands().map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Todas as Categorias</option>
              {getUniqueCategories().map(category => (
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
              <option value="name">Ordenar por Nome</option>
              <option value="price">Ordenar por Preço</option>
              <option value="power">Ordenar por Potência</option>
              <option value="year">Ordenar por Ano</option>
            </select>

            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
                onClick={() => setViewMode('grid')}
              >
                ⊞
              </button>
              <button
                className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
                onClick={() => setViewMode('list')}
              >
                ☰
              </button>
            </div>
          </div>
        </section>

        {/* RESULTADOS */}
        <section className={styles.results}>
          <div className={`${styles.carsGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
            {filteredCars.map(car => (
              <div key={car.id} className={styles.carCard} onClick={() => handleCarClick(car)}>
                <div className={styles.carImage}>
                  <span className={styles.carEmoji}>{car.image}</span>
                  <div className={styles.carBadge}>{car.category}</div>
                </div>

                <div className={styles.carInfo}>
                  <div className={styles.carHeader}>
                    <h3 className={styles.carName}>{car.brand} {car.model}</h3>
                    <span className={styles.carYear}>{car.year}</span>
                  </div>

                  <p className={styles.carDescription}>{car.description}</p>

                  <div className={styles.carSpecs}>
                    <div className={styles.spec}>
                      <span className={styles.specIcon}>⚡</span>
                      <span className={styles.specValue}>{car.power} HP</span>
                    </div>
                    <div className={styles.spec}>
                      <span className={styles.specIcon}>🔄</span>
                      <span className={styles.specValue}>{car.torque} Nm</span>
                    </div>
                    <div className={styles.spec}>
                      <span className={styles.specIcon}>🚀</span>
                      <span className={styles.specValue}>{car.acceleration}s</span>
                    </div>
                    <div className={styles.spec}>
                      <span className={styles.specIcon}>🏁</span>
                      <span className={styles.specValue}>{car.topSpeed} km/h</span>
                    </div>
                  </div>

                  <div className={styles.carFooter}>
                    <div className={styles.carPrice}>{formatPrice(car.price)}</div>
                    <button className={styles.detailsButton}>
                      Ver Detalhes →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>🔍</div>
              <h3>Nenhum carro encontrado</h3>
              <p>Tente ajustar os filtros para encontrar o carro perfeito</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}