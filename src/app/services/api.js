import axios from 'axios';
import { toast } from 'react-toastify';

// Configuração base do axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação se existir
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para respostas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratamento de erros globais
    const message = error.response?.data?.message || 'Erro na requisição';
    
    if (error.response?.status === 401) {
      toast.error('Sessão expirada. Faça login novamente.');
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    } else if (error.response?.status >= 500) {
      toast.error('Erro interno do servidor. Tente novamente mais tarde.');
    } else {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

// Funções de API específicas
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      toast.success('Login realizado com sucesso!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      toast.success('Cadastro realizado com sucesso!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('authToken');
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  }
};

export const carsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/cars');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (carData) => {
    try {
      const response = await api.post('/cars', carData);
      toast.success('Carro adicionado com sucesso!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, carData) => {
    try {
      const response = await api.put(`/cars/${id}`, carData);
      toast.success('Carro atualizado com sucesso!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/cars/${id}`);
      toast.success('Carro removido com sucesso!');
    } catch (error) {
      throw error;
    }
  }
};

export const simulationAPI = {
  create: async (simulationData) => {
    try {
      const response = await api.post('/simulations', simulationData);
      toast.success('Simulação criada com sucesso!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getHistory: async () => {
    try {
      const response = await api.get('/simulations/history');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;
