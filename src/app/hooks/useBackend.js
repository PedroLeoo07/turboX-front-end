'use client';

import { useState, useEffect, useCallback } from 'react';
import { carsAPI, usersAPI, simulationAPI, authAPI } from '../services/api';
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

// Hook para gerenciar simulações
export const useSimulations = () => {
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSimulation = useCallback(async (simulationData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await simulationAPI.create(simulationData);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao criar simulação:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await simulationAPI.getHistory();
      setSimulations(data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar histórico:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    simulations,
    loading,
    error,
    createSimulation,
    fetchHistory
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