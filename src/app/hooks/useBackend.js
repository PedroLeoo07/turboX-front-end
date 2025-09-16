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
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar carros:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBrands = useCallback(async () => {
    try {
      const data = await carsAPI.getBrands();
      setBrands(data);
    } catch (err) {
      console.error('Erro ao buscar marcas:', err);
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
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setUser(user);
      setIsAuthenticated(true);
      
      return response;
    } catch (err) {
      console.error('Erro no login:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    try {
      const response = await authAPI.register(userData);
      return response;
    } catch (err) {
      console.error('Erro no registro:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authAPI.logout();
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Erro no logout:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAuth = useCallback(() => {
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`, {
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
      console.warn('Backend não está disponível:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkBackendStatus();
    
    // Verificar status a cada 30 segundos
    const interval = setInterval(checkBackendStatus, 30000);
    
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