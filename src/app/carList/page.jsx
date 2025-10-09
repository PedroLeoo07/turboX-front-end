"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navigation from '../components/Navigation';
import styles from './CarList.module.css';

const API_URL = 'http://localhost:3001/api';
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
  const [cars, setCars] = useState(carsDatabase);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(filterOptions.brand || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('power');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    ano: '',
    potencia: '',
    torque: '',
    peso: '',
    zeroACem: '',
    preco: '',
    imagem: ''
  });
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/cars`)
      .then(res => {
        if (!res.ok) throw new Error('API não disponível');
        return res.json();
      })
      .then(data => {
        setCars(data.length > 0 ? data : carsDatabase);
      })
      .catch(err => {
        console.error('Erro ao carregar carros:', err);
        setCars(carsDatabase);
      })
      .finally(() => setLoading(false));
    fetch(`${API_URL}/cars`)
      .then(res => {
        if (!res.ok) throw new Error('API não disponível');
        return res.json();
      })
      .then(data => {
        const uniqueBrands = [...new Set(data.map(car => car.brand || car.marca).filter(Boolean))];
        const uniqueCategories = [...new Set(data.map(car => car.category).filter(Boolean))];
        setBrands(uniqueBrands);
        setCategories(uniqueCategories);
      })
      .catch(err => {
        console.error('Erro ao carregar carros para marcas:', err);
        const uniqueCategories = [...new Set(carsDatabase.map(car => car.category).filter(Boolean))];
        setCategories(uniqueCategories);
      });
  }, []);
  useEffect(() => {
    if (filterOptions.brand) {
      setSelectedBrand(filterOptions.brand);
    }
  }, [filterOptions]);
  const filteredCars = cars.filter(car => {
    const brand = car.brand || car.marca;
    const model = car.model || car.modelo;
    const price = car.price || parseFloat(car.preco);
    
    return (
      (!searchTerm || model.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     brand.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedBrand || brand === selectedBrand) &&
      (!selectedCategory || car.category === selectedCategory) &&
      (price >= priceRange[0] && price <= priceRange[1])
    );
  }).sort((a, b) => {
    const priceA = a.price || parseFloat(a.preco);
    const priceB = b.price || parseFloat(b.preco);
    const yearA = a.year || a.ano;
    const yearB = b.year || b.ano;
    const powerA = a.power || a.potencia;
    const powerB = b.power || b.potencia;
    const modelA = a.model || a.modelo;
    const modelB = b.model || b.modelo;
    
    switch (sortBy) {
      case 'price': return priceA - priceB;
      case 'year': return yearB - yearA;
      case 'power': return powerB - powerA;
      case 'name': return modelA.localeCompare(modelB);
      default: return powerB - powerA;
    }
  });

  const loadCars = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/cars`);
      if (!response.ok) throw new Error('API não disponível');
      const data = await response.json();
      setCars(data.length > 0 ? data : carsDatabase);
    } catch (error) {
      console.error('Erro ao carregar carros:', error);
      setCars(carsDatabase);
    } finally {
      setLoading(false);
    }
  };

  const handleCarSelect = (car) => {
    const brand = car.brand || car.marca;
    const model = car.model || car.modelo;
    toast.success(`${brand} ${model} selecionado!`);
    navigateTo('car', car);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openCreateModal = () => {
    setEditingCar(null);
    setFormData({
      marca: '',
      modelo: '',
      ano: '',
      potencia: '',
      torque: '',
      peso: '',
      zeroACem: '',
      preco: '',
      imagem: ''
    });
    setShowModal(true);
  };

  const openEditModal = (car, e) => {
    e.stopPropagation();
    setEditingCar(car);
    setFormData({
      marca: car.brand || car.marca || '',
      modelo: car.model || car.modelo || '',
      ano: car.year || car.ano || '',
      potencia: car.power || car.potencia || '',
      torque: car.torque || '',
      peso: car.weight || car.peso || '',
      zeroACem: car.acceleration || car.zeroACem || '',
      preco: car.price || car.preco || '',
      imagem: car.image || car.imagem || ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const carData = {
      brand: formData.marca,
      model: formData.modelo,
      year: parseInt(formData.ano),
      power: parseInt(formData.potencia),
      torque: parseInt(formData.torque),
      weight: parseInt(formData.peso),
      acceleration: parseFloat(formData.zeroACem),
      price: parseFloat(formData.preco),
      image: formData.imagem
    };

    try {
      let response;
      if (editingCar) {
        response = await fetch(`${API_URL}/cars/${editingCar.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(carData)
        });
        toast.success('Carro atualizado com sucesso!');
      } else {
        response = await fetch(`${API_URL}/cars`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(carData)
        });
        toast.success('Carro criado com sucesso!');
      }

      if (!response.ok) throw new Error('Erro ao salvar carro');
      
      setShowModal(false);
      loadCars();
    } catch (error) {
      console.error('Erro ao salvar carro:', error);
      toast.error('Erro ao salvar carro');
    }
  };

  const handleDelete = async (carId, e) => {
    e.stopPropagation();
    if (!window.confirm('Tem certeza que deseja excluir este carro?')) return;

    try {
      const response = await fetch(`${API_URL}/cars/${carId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Erro ao deletar carro');
      
      toast.success('Carro excluído com sucesso!');
      loadCars();
    } catch (error) {
      console.error('Erro ao deletar carro:', error);
      toast.error('Erro ao deletar carro');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setSelectedCategory('');
    setPriceRange([0, 3000000]);
    setSortBy('power');
  };
  useEffect(() => {
    return () => {
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
              {selectedBrand ? `Carros ${selectedBrand}` : 'Garagem TurboX'}
            </h1>
            <p className={styles.subtitle}>
              {selectedBrand 
                ? `Explore toda a linha ${selectedBrand} de alto desempenho` 
                : 'Escolha seu carro e descubra seu potencial máximo de performance'
              }
            </p>
            {selectedBrand && (
              <div className={styles.brandFilterBadge}>
                <span>Filtrando por: {selectedBrand}</span>
                <button 
                  onClick={() => setSelectedBrand('')}
                  className={styles.clearFilterBtn}
                >
                  ✕ Limpar filtro
                </button>
              </div>
            )}
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
                <option key="all-brands" value="">Todas as Marcas</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.filterSelect}
              >
                <option key="all-categories" value="">Todas as Categorias</option>
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
                <option key="power" value="power">Maior Potência</option>
                <option key="acceleration" value="acceleration">Menor 0-100</option>
                <option key="topSpeed" value="topSpeed">Maior V.Max</option>
                <option key="price" value="price">Maior Preço</option>
                <option key="year" value="year">Mais Novo</option>
                <option key="brand" value="brand">Marca A-Z</option>
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
                        {(car.imagem || car.image) && typeof (car.imagem || car.image) === 'string' && (car.imagem || car.image).startsWith('http') ? (
                          <img 
                            src={car.imagem || car.image} 
                            alt={`${car.brand || car.marca} ${car.model || car.modelo}`}
                            onError={(e) => {
                              e.target.src = '/images/car-placeholder.svg';
                            }}
                          />
                        ) : (
                          <div className={styles.carPlaceholder}>
                            <span className={styles.carIcon}>{(car.brand || car.marca)?.charAt(0) || 'C'}</span>
                          </div>
                        )}
                      </div>
                      <div className={styles.carBadge}>{car.category}</div>
                    </div>
                    
                    <div className={styles.carInfo}>
                      <h3 className={styles.carTitle}>
                        {car.brand || car.marca} {car.model || car.modelo}
                      </h3>
                      <p className={styles.carYear}>{car.year || car.ano}</p>
                    </div>
                    
                    <div className={styles.carSpecs}>
                      <div className={styles.spec}>
                        <span className={styles.specLabel}>Potência</span>
                        <span className={styles.specValue}>{car.power || car.potencia}hp</span>
                      </div>
                      <div className={styles.spec}>
                        <span className={styles.specLabel}>Torque</span>
                        <span className={styles.specValue}>{car.torque}Nm</span>
                      </div>
                      <div className={styles.spec}>
                        <span className={styles.specLabel}>Peso</span>
                        <span className={styles.specValue}>{car.weight || car.peso}kg</span>
                      </div>
                      <div className={styles.spec}>
                        <span className={styles.specLabel}>0-100km/h</span>
                        <span className={styles.specValue}>{car.acceleration || car.zeroACem}s</span>
                      </div>
                    </div>
                    
                    <div className={styles.carFooter}>
                      <div className={styles.carPrice}>{formatPrice(car.price || car.preco)}</div>
                      <div className={styles.carAction}>
                        <span>Ver Detalhes</span>
                        <span className={styles.arrow}>→</span>
                      </div>
                    </div>

                    {isLoggedIn && user && user.role === 'admin' && (
                      <div className={styles.carAdminActions}>
                        <button 
                          onClick={(e) => openEditModal(car, e)}
                          className={styles.editBtn}
                          title="Editar"
                        >
                          ✏️ Editar
                        </button>
                        <button 
                          onClick={(e) => handleDelete(car.id, e)}
                          className={styles.deleteBtn}
                          title="Excluir"
                        >
                          🗑️ Excluir
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {isLoggedIn && user && user.role === 'admin' && (
        <button onClick={openCreateModal} className={styles.fabButton} title="Adicionar novo carro">
          + Novo Carro
        </button>
      )}

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editingCar ? 'Editar Carro' : 'Adicionar Novo Carro'}</h2>
              <button 
                onClick={() => setShowModal(false)}
                className={styles.closeButton}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Marca *</label>
                  <input
                    type="text"
                    name="marca"
                    value={formData.marca}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: Volkswagen"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Modelo *</label>
                  <input
                    type="text"
                    name="modelo"
                    value={formData.modelo}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: Golf GTI"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Ano *</label>
                  <input
                    type="number"
                    name="ano"
                    value={formData.ano}
                    onChange={handleInputChange}
                    required
                    placeholder="2023"
                    min="1900"
                    max="2099"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Potência (hp) *</label>
                  <input
                    type="number"
                    name="potencia"
                    value={formData.potencia}
                    onChange={handleInputChange}
                    required
                    placeholder="320"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Torque (Nm) *</label>
                  <input
                    type="number"
                    name="torque"
                    value={formData.torque}
                    onChange={handleInputChange}
                    required
                    placeholder="400"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Peso (kg) *</label>
                  <input
                    type="number"
                    name="peso"
                    value={formData.peso}
                    onChange={handleInputChange}
                    required
                    placeholder="1500"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>0-100 km/h (s) *</label>
                  <input
                    type="number"
                    step="0.1"
                    name="zeroACem"
                    value={formData.zeroACem}
                    onChange={handleInputChange}
                    required
                    placeholder="5.5"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Preço (R$) *</label>
                  <input
                    type="number"
                    name="preco"
                    value={formData.preco}
                    onChange={handleInputChange}
                    required
                    placeholder="350000"
                  />
                </div>

                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                  <label>URL da Imagem *</label>
                  <input
                    type="url"
                    name="imagem"
                    value={formData.imagem}
                    onChange={handleInputChange}
                    required
                    placeholder="https://exemplo.com/carro.jpg"
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className={styles.cancelButton}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className={styles.submitButton}
                >
                  {editingCar ? 'Atualizar' : 'Criar'} Carro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

