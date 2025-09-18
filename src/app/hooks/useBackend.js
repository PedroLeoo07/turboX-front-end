'use client';

import { useState, useEffect, useCallback } from 'react';
import { carsAPI, usersAPI, buildsAPI, upgradesAPI, buildsUpgradesAPI, authAPI } from '../services/api';
import { toast } from 'react-toastify';

// Hook para gerenciar carros
export const useCars = () => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCars = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await carsAPI.getAll(filters);
      setCars(data);
      console.log('✅ Carros carregados com sucesso:', data.length);
    } catch (err) {
      console.error('❌ Erro ao buscar carros:', err);
      // Em caso de erro de rede, definir carros padrão
      if (err.code === 'NETWORK_ERROR' || err.message === 'Network Error' || !err.response) {
        const defaultCars = [
          { id: 1, brand: 'Volkswagen', model: 'Golf GTI', year: 2023, price: 180000, category: 'Hatch' },
          { id: 2, brand: 'BMW', model: 'M3', year: 2023, price: 450000, category: 'Sedan' },
          { id: 3, brand: 'Ford', model: 'Mustang GT', year: 2023, price: 350000, category: 'Coupe' }
        ];
        setCars(defaultCars);
        console.log('🔄 Usando carros padrão como fallback');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBrands = useCallback(async () => {
    try {
      const data = await carsAPI.getBrands();
      setBrands(data);
      console.log('✅ Marcas carregadas com sucesso:', data.length);
    } catch (err) {
      console.error('❌ Erro ao buscar marcas:', err);
      // Definir marcas padrão em caso de erro
      const defaultBrands = [
        { name: 'Volkswagen', logo: '/logos/volks.png', description: 'Tradição alemã em engenharia' },
        { name: 'BMW', logo: '/logos/BMW.png', description: 'Prazer em dirigir' },
        { name: 'Ford', logo: '/logos/Ford.png', description: 'Inovação americana' },
        { name: 'Toyota', logo: '/logos/toyot.png', description: 'Confiabilidade japonesa' },
        { name: 'Honda', logo: '/logos/honda.svg', description: 'Engenharia japonesa premium' }
      ];
      setBrands(defaultBrands);
      console.log('🔄 Usando marcas padrão como fallback');
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await carsAPI.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
    }
  }, []);

  const getCarsByBrand = useCallback(async (brand) => {
    setLoading(true);
    setError(null);
    try {
      const data = await carsAPI.getByBrand(brand);
      setCars(data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar carros por marca:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCarById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await carsAPI.getById(id);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar carro:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, [fetchBrands, fetchCategories]);

  return {
    cars,
    brands,
    categories,
    loading,
    error,
    fetchCars,
    fetchBrands,
    getCarsByBrand,
    getCarById,
    refreshBrands: fetchBrands,
    refreshCategories: fetchCategories
  };
};

// Hook para gerenciar usuários
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await usersAPI.getAllWithCars(filters);
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar usuários:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const data = await usersAPI.getStats();
      setStats(data);
    } catch (err) {
      console.error('Erro ao buscar estatísticas:', err);
    }
  }, []);

  const getUserWithCars = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await usersAPI.getByIdWithCars(userId);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar usuário:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addCarToUser = useCallback(async (userId, carData) => {
    try {
      await usersAPI.addCarToUser(userId, carData);
      // Refresh users list
      await fetchUsers();
      await fetchStats();
    } catch (err) {
      console.error('Erro ao adicionar carro ao usuário:', err);
      throw err;
    }
  }, [fetchUsers, fetchStats]);

  const removeCarFromUser = useCallback(async (userId, carId) => {
    try {
      await usersAPI.removeCarFromUser(userId, carId);
      // Refresh users list
      await fetchUsers();
      await fetchStats();
    } catch (err) {
      console.error('Erro ao remover carro do usuário:', err);
      throw err;
    }
  }, [fetchUsers, fetchStats]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    users,
    stats,
    loading,
    error,
    fetchUsers,
    getUserWithCars,
    addCarToUser,
    removeCarFromUser,
    refreshStats: fetchStats
  };
};

// Hook para gerenciar builds (simulações)
export const useBuilds = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBuild = useCallback(async (buildData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await buildsAPI.create(buildData);
      setBuilds(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao criar build:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBuilds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await buildsAPI.getAll();
      setBuilds(data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar builds:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBuild = useCallback(async (id, buildData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await buildsAPI.update(id, buildData);
      setBuilds(prev => prev.map(build => build.id === id ? data : build));
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao atualizar build:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBuild = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await buildsAPI.delete(id);
      setBuilds(prev => prev.filter(build => build.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Erro ao deletar build:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    builds,
    loading,
    error,
    createBuild,
    fetchBuilds,
    updateBuild,
    deleteBuild
  };
};

// Hook para gerenciar autenticação
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const response = await authAPI.login(credentials);
      const { user, token } = response;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      setUser(user);
      setIsAuthenticated(true);
      
      return true; // Retorna true para indicar sucesso
    } catch (err) {
      console.error('Erro no login:', err);
      return false; // Retorna false para indicar falha
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    try {
      const response = await authAPI.register(userData);
      const { user, token } = response;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      setUser(user);
      setIsAuthenticated(true);
      
      return true; // Retorna true para indicar sucesso
    } catch (err) {
      console.error('Erro no registro:', err);
      return false; // Retorna false para indicar falha
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authAPI.logout();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Erro no logout:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAuth = useCallback(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Erro ao parsear dados do usuário:', err);
          logout();
        }
      }
    }
  }, [logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth
  };
};

// Hook para gerenciar conectividade com o backend
export const useBackendStatus = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastCheck, setLastCheck] = useState(null);

  const checkBackendStatus = useCallback(async () => {
    setLoading(true);
    try {
      // Usar endpoint que sabemos que funciona: /api/cars/marcas
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/cars/marcas`, {
        method: 'GET',
        timeout: 5000
      });
      
      if (response.ok) {
        setIsOnline(true);
        setLastCheck(new Date());
      } else {
        setIsOnline(false);
      }
    } catch (err) {
      setIsOnline(false);
      // Log apenas quando necessário e silencioso
      if (process.env.NODE_ENV === 'development') {
        console.debug('Backend health check: offline');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkBackendStatus();
    
    // Verificar status a cada 5 minutos (mais otimizado)
    const interval = setInterval(checkBackendStatus, 300000);
    
    return () => clearInterval(interval);
  }, [checkBackendStatus]);

  return {
    isOnline,
    loading,
    lastCheck,
    checkStatus: checkBackendStatus
  };
};

// Hook para gerenciar upgrades
export const useUpgrades = () => {
  const [upgrades, setUpgrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUpgrades = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await upgradesAPI.getAll();
      setUpgrades(data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar upgrades:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUpgrade = useCallback(async (upgradeData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await upgradesAPI.create(upgradeData);
      setUpgrades(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao criar upgrade:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    upgrades,
    loading,
    error,
    fetchUpgrades,
    createUpgrade
  };
};

// Hook para gerenciar relacionamento builds-upgrades
export const useBuildUpgrades = () => {
  const [buildUpgrades, setBuildUpgrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getBuildUpgrades = useCallback(async (buildId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await buildsUpgradesAPI.getByBuildId(buildId);
      setBuildUpgrades(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar upgrades da build:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addUpgradeToBuild = useCallback(async (buildId, upgradeId, quantity = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await buildsUpgradesAPI.addUpgradeToBuild(buildId, upgradeId, quantity);
      setBuildUpgrades(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao adicionar upgrade à build:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeUpgradeFromBuild = useCallback(async (buildId, upgradeId) => {
    setLoading(true);
    setError(null);
    try {
      await buildsUpgradesAPI.removeUpgradeFromBuild(buildId, upgradeId);
      setBuildUpgrades(prev => prev.filter(item => !(item.buildId === buildId && item.upgradeId === upgradeId)));
    } catch (err) {
      setError(err.message);
      console.error('Erro ao remover upgrade da build:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    buildUpgrades,
    loading,
    error,
    getBuildUpgrades,
    addUpgradeToBuild,
    removeUpgradeFromBuild
  };
};