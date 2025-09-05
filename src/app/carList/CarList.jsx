"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { carsAPI } from '../services/api';
import Navigation from '../components/Navigation';
import styles from './CarList.module.css';

// Dados mock dos carros
const carsData = [
  {
    id: 1,
    brand: 'Nissan',
    model: 'GT-R',
    year: 2023,
    image: '🚗',
    power: 565,
    torque: 637,
    acceleration: 2.7,
    price: 'R$ 850.000',
    category: 'supercar'
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
    price: 'R$ 450.000',
    category: 'esportivo'
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
    price: 'R$ 280.000',
    category: 'esportivo'
  },
  {
    id: 4,
    brand: 'Mitsubishi',
    model: 'Lancer Evolution',
    year: 2015,
    image: '🚗',
    power: 291,
    torque: 407,
    acceleration: 5.4,
    price: 'R$ 180.000',
    category: 'esportivo'
  },
  {
    id: 5,
    brand: 'Honda',
    model: 'Civic Type R',
    year: 2023,
    image: '🏁',
    power: 315,
    torque: 420,
    acceleration: 5.0,
    price: 'R$ 320.000',
    category: 'esportivo'
  },
  {
    id: 6,
    brand: 'BMW',
    model: 'M3 Competition',
    year: 2023,
    image: '🚗',
    power: 510,
    torque: 650,
    acceleration: 3.8,
    price: 'R$ 650.000',
    category: 'supercar'
  }
];

export default function CarList({ navigateTo }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('power');

  // Buscar carros da API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await carsAPI.getAll();
        setCars(response.cars || carsData); // Fallback para dados mock se API falhar
        toast.success('Carros carregados com sucesso!');
      } catch (error) {
        console.error('Erro ao carregar carros:', error);
        // Se a API falhar, usar dados mock
        setCars(carsData);
        toast.info('Usando dados locais (API indisponível)');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const brands = [...new Set(cars.map(car => car.brand))];
  const categories = [...new Set(cars.map(car => car.category))];

  const filteredCars = cars
    .filter(car => {
      const matchesSearch = car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = !selectedBrand || car.brand === selectedBrand;
      const matchesCategory = !selectedCategory || car.category === selectedCategory;
      return matchesSearch && matchesBrand && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'power':
          return b.power - a.power;
        case 'acceleration':
          return a.acceleration - b.acceleration;
        case 'year':
          return b.year - a.year;
        case 'price':
          return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''));
        default:
          return 0;
      }
    });

  const handleCarClick = (car) => {
    navigateTo('details', car);
  };

  if (loading) {
    return (
      <div className={styles.carListContainer}>
        <Navigation currentPage="cars" navigateTo={navigateTo} />
        <main className={styles.main}>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Carregando carros...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.carListContainer}>
      <Navigation currentPage="cars" navigateTo={navigateTo} />
      
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Catálogo de Carros Turbo</h1>
          <p className={styles.subtitle}>
            Explore nossa coleção de carros esportivos com especificações detalhadas
          </p>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Buscar por marca ou modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterControls}>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Todas as marcas</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">Todas as categorias</option>
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
              <option value="power">Ordenar por Potência</option>
              <option value="acceleration">Ordenar por Aceleração</option>
              <option value="year">Ordenar por Ano</option>
              <option value="price">Ordenar por Preço</option>
            </select>
          </div>
        </div>

        <div className={styles.results}>
          <p className={styles.resultCount}>
            {filteredCars.length} carro{filteredCars.length !== 1 ? 's' : ''} encontrado{filteredCars.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className={styles.carGrid}>
          {filteredCars.map(car => (
            <div
              key={car.id}
              className={styles.carCard}
              onClick={() => handleCarClick(car)}
            >
              <div className={styles.carImage}>{car.image}</div>
              <div className={styles.carInfo}>
                <h3 className={styles.carTitle}>{car.brand} {car.model}</h3>
                <p className={styles.carYear}>{car.year}</p>
                
                <div className={styles.carSpecs}>
                  <div className={styles.spec}>
                    <span className={styles.specLabel}>Potência</span>
                    <span className={styles.specValue}>{car.power} cv</span>
                  </div>
                  <div className={styles.spec}>
                    <span className={styles.specLabel}>Torque</span>
                    <span className={styles.specValue}>{car.torque} Nm</span>
                  </div>
                  <div className={styles.spec}>
                    <span className={styles.specLabel}>0-100 km/h</span>
                    <span className={styles.specValue}>{car.acceleration}s</span>
                  </div>
                </div>

                <div className={styles.carPrice}>{car.price}</div>
                <button className={styles.viewDetailsBtn}>
                  Ver Detalhes →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>🔍</div>
            <h3>Nenhum carro encontrado</h3>
            <p>Tente ajustar os filtros ou termo de busca</p>
          </div>
        )}
      </main>
    </div>
  );
}
