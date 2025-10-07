"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navigation from '../components/Navigation';
import Loading from '../components/Loading';
import styles from './UsersCars.module.css';

const API_URL = 'http://localhost:3001/api';

export default function UsersCars({ navigateTo, isLoggedIn, user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [brandFilter, setBrandFilter] = useState('');
  const [showOnlyWithCars, setShowOnlyWithCars] = useState(false);
  const [stats, setStats] = useState(null);

  const brands = [
    'Volkswagen', 'BMW', 'Ford', 'Hyundai', 'Toyota', 'Nissan', 
    'Chevrolet', 'Mitsubishi', 'Honda', 'Mercedes', 'Audi', 
    'Dodge', 'Renault', 'Subaru', 'Mazda', 'Porsche'
  ];

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [searchTerm, sortBy, brandFilter, showOnlyWithCars]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search: searchTerm,
        sortBy: sortBy,
        brand: brandFilter,
        hasCars: showOnlyWithCars
      });
      const response = await fetch(`${API_URL}/users?${params}`);
      if (!response.ok) throw new Error('API não disponível');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const usersResponse = await fetch(`${API_URL}/users`);
      if (!usersResponse.ok) throw new Error('API não disponível');
      const usersData = await usersResponse.json();
      
      const totalUsers = usersData.length;
      const usersWithCars = usersData.filter(u => u.cars && u.cars.length > 0).length;
      const totalCars = usersData.reduce((sum, u) => sum + (u.cars?.length || 0), 0);
      const averageCarsPerUser = totalUsers > 0 ? (totalCars / totalUsers).toFixed(1) : 0;
      
      setStats({ totalUsers, usersWithCars, totalCars, averageCarsPerUser });
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  const handleRemoveCarFromUser = async (userId, carId) => {
    if (!window.confirm('Tem certeza que deseja remover este carro do usuário?')) {
      return;
    }

    try {
      await fetch(`${API_URL}/users/${userId}/cars/${carId}`, {
        method: 'DELETE'
      });
      fetchUsers();
      toast.success('Carro removido com sucesso');
    } catch (error) {
      console.error('Erro ao remover carro do usuário:', error);
      toast.error('Erro ao remover carro');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <Navigation currentPage="users" navigateTo={navigateTo} />
      
      {/* HEADER */}
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleContainer}>
            <img 
              src="/images/logo.png" 
              alt="TurboX" 
              className={styles.headerLogo}
            />
            <h1 className={styles.title}>
              <span className={styles.titleIcon}></span>
              Usuários & Carros
            </h1>
          </div>
          <p className={styles.subtitle}>
            Gerencie usuários e seus respectivos carros cadastrados
          </p>
          
          {/* ESTATÍSTICAS */}
          {stats && (
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{stats.totalUsers || 0}</div>
                <div className={styles.statLabel}>Total de Usuários</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{stats.totalCars || 0}</div>
                <div className={styles.statLabel}>Total de Carros</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{stats.usersWithCars || 0}</div>
                <div className={styles.statLabel}>Usuários com Carros</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{stats.averageCarsPerUser || 0}</div>
                <div className={styles.statLabel}>Média de Carros/Usuário</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FILTROS */}
      <section className={styles.filters}>
        <div className={styles.filtersContent}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>Buscar</span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="name">Ordenar por Nome</option>
            <option value="email">Ordenar por Email</option>
            <option value="carCount">Ordenar por Qtd. Carros</option>
            <option value="createdAt">Ordenar por Data de Cadastro</option>
          </select>

          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Todas as Marcas</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={showOnlyWithCars}
              onChange={(e) => setShowOnlyWithCars(e.target.checked)}
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>Apenas usuários com carros</span>
          </label>
        </div>
      </section>

      {/* LISTA DE USUÁRIOS */}
      <section className={styles.usersList}>
        <div className={styles.usersContent}>
          {users.length === 0 ? (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>:(</div>
              <h3>Nenhum usuário encontrado</h3>
              <p>Tente ajustar os filtros ou remover algumas restrições.</p>
            </div>
          ) : (
            <div className={styles.usersGrid}>
              {users.map(user => (
                <div key={user.id} className={styles.userCard}>
                  <div className={styles.userHeader}>
                    <div className={styles.userAvatar}>
                      <span className={styles.avatarText}>
                        {user.name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    </div>
                    <div className={styles.userInfo}>
                      <h3 className={styles.userName}>{user.name}</h3>
                      <p className={styles.userEmail}>{user.email}</p>
                      <span className={styles.carCount}>
                        {user.cars?.length || 0} carro(s)
                      </span>
                    </div>
                  </div>

                  {/* CARROS DO USUÁRIO */}
                  <div className={styles.userCars}>
                    {user.cars && user.cars.length > 0 ? (
                      <div className={styles.carsGrid}>
                        {user.cars.map(car => (
                          <div key={car.id} className={styles.carCard}>
                            <div className={styles.carImage}>
                              <img 
                                src={car.image || '/images/car-placeholder.jpg'} 
                                alt={`${car.brand} ${car.model}`}
                                onError={(e) => {
                                  e.target.src = '/images/car-placeholder.jpg';
                                }}
                              />
                            </div>
                            <div className={styles.carInfo}>
                              <div className={styles.carBrand}>{car.brand}</div>
                              <div className={styles.carModel}>{car.model}</div>
                              <div className={styles.carYear}>{car.year}</div>
                            </div>
                            <div className={styles.carActions}>
                              <button
                                className={styles.viewCarBtn}
                                onClick={() => navigateTo('car', { id: car.id })}
                                title="Ver detalhes do carro"
                              >
                                Ver
                              </button>
                              <button
                                className={styles.removeCarBtn}
                                onClick={() => handleRemoveCarFromUser(user.id, car.id)}
                                title="Remover carro do usuário"
                              >
                                Remover
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={styles.noCars}>
                        <span className={styles.noCarsIcon}>Carro</span>
                        <p>Nenhum carro cadastrado</p>
                      </div>
                    )}
                  </div>

                  {/* AÇÕES DO USUÁRIO */}
                  <div className={styles.userActions}>
                    <button
                      className={styles.viewUserBtn}
                      onClick={() => navigateTo('userProfile', { id: user.id })}
                    >
                      Ver Perfil
                    </button>
                    <button
                      className={styles.addCarBtn}
                      onClick={() => navigateTo('addCar', { userId: user.id })}
                    >
                      Adicionar Carro
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

