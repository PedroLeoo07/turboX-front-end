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

// Log para debug das rotas
console.log('API Base URL:', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api');

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    // Verificar se está no client-side antes de acessar localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
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
      // Tentar login no backend primeiro
      const response = await api.post('/auth/login', credentials);
      toast.success('Login realizado com sucesso!');
      return response.data;
    } catch (error) {
      // Fallback para sistema de demo se o backend não estiver disponível
      console.log('Backend indisponível, usando sistema de demo...');
      
      // Credenciais de demo
      const demoCredentials = {
        email: 'leonardopedrodeoliveira07@gmail.com',
        password: '74185201'
      };
      
      if (credentials.email.toLowerCase() === demoCredentials.email.toLowerCase() && 
          credentials.password === demoCredentials.password) {
        const demoUser = {
          id: 'leonardo-profile',
          name: 'Leonardo Pedro de Oliveira',
          email: 'leonardopedrodeoliveira07@gmail.com',
          avatar: '',
          memberSince: '01/01/2024',
          profile: 'admin'
        };
        
        const demoToken = 'leonardo-auth-token-2025';
        
        toast.success('Login realizado com sucesso! (Demo)');
        return { user: demoUser, token: demoToken };
      } else {
        toast.error('Email ou senha incorretos!');
        throw new Error('Credenciais inválidas');
      }
    }
  },

  register: async (userData) => {
    try {
      // Tentar registro no backend primeiro
      const response = await api.post('/auth/register', userData);
      toast.success('Cadastro realizado com sucesso!');
      return response.data;
    } catch (error) {
      // Fallback para sistema de demo
      console.log('Backend indisponível, usando sistema de demo...');
      
      const demoUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
  avatar: '',
        memberSince: new Date().toLocaleDateString('pt-BR'),
        profile: 'user'
      };
      
      const demoToken = `demo-token-${Date.now()}`;
      
      toast.success('Cadastro realizado com sucesso! (Demo)');
      return { user: demoUser, token: demoToken };
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('authToken');
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
      // Fallback para logout local
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      toast.success('Logout realizado com sucesso!');
      console.log('Logout local realizado');
    }
  }
};

export const carsAPI = {
  getAll: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      // Adicionar filtros como query parameters
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.category) params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.search) params.append('search', filters.search);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      
      const queryString = params.toString();
      const endpoint = queryString ? `/cars?${queryString}` : '/cars';
      
  console.log('Chamando API Cars:', `${api.defaults.baseURL}${endpoint}`);
      const response = await api.get(endpoint);
  console.log('Cars API Response:', response.data);
      return response.data;
    } catch (error) {
  console.error('Cars API Error:', error);
      
      // Fallback para dados estáticos quando há Network Error
      if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error' || !error.response) {
  console.log('Backend indisponível, usando carros fallback...');
        const fallbackCars = [
          { id: 1, brand: 'Volkswagen', model: 'Golf GTI', year: 2023, price: 180000, category: 'Hatch' },
          { id: 2, brand: 'BMW', model: 'M3', year: 2023, price: 450000, category: 'Sedan' },
          { id: 3, brand: 'Ford', model: 'Mustang GT', year: 2023, price: 350000, category: 'Coupe' },
          { id: 4, brand: 'Toyota', model: 'Supra', year: 2023, price: 400000, category: 'Coupe' },
          { id: 5, brand: 'Honda', model: 'Civic Type R', year: 2023, price: 320000, category: 'Hatch' }
        ];
        
        // Aplicar filtros nos dados fallback se necessário
        let filteredCars = fallbackCars;
        if (filters.brand) {
          filteredCars = filteredCars.filter(car => car.brand.toLowerCase() === filters.brand.toLowerCase());
        }
        
        return filteredCars;
      }
      
      throw error;
    }
  },

  getByBrand: async (brand) => {
    try {
      const response = await api.get(`/cars/brand/${encodeURIComponent(brand)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBrands: async () => {
    try {
  console.log('Chamando API Marcas:', `${api.defaults.baseURL}/cars/marcas`);
      const response = await api.get('/cars/marcas');
  console.log('Marcas API Response:', response.data);
      return response.data;
    } catch (error) {
  console.error('Marcas API Error:', error);
      
      // Fallback para dados estáticos quando há Network Error
      if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error' || !error.response) {
  console.log('Backend indisponível, usando marcas fallback...');
        const fallbackBrands = [
          { name: 'Volkswagen', logo: '/logos/volks.png', description: 'Tradição alemã em engenharia' },
          { name: 'BMW', logo: '/logos/BMW.png', description: 'Prazer em dirigir' },
          { name: 'Ford', logo: '/logos/Ford.png', description: 'Inovação americana' },
          { name: 'Hyundai', logo: '/logos/hyundai.png', description: 'Tecnologia sul-coreana' },
          { name: 'Toyota', logo: '/logos/toyot.png', description: 'Confiabilidade japonesa' },
          { name: 'Mitsubishi', logo: '/logos/mitsubishi.svg', description: 'Performance e durabilidade' },
          { name: 'Chevrolet', logo: '/logos/chevrolet.png', description: 'Força americana' },
          { name: 'Honda', logo: '/logos/honda.svg', description: 'Engenharia japonesa premium' },
          { name: 'Mercedes', logo: '/logos/mercedes.png', description: 'Luxo alemão incomparável' },
          { name: 'Audi', logo: '/logos/audi.png', description: 'Vorsprung durch Technik' },
          { name: 'Dodge', logo: '/logos/dodge.png', description: 'Muscle cars americanos' },
          { name: 'Renault', logo: '/logos/renault.png', description: 'Elegância francesa' },
          { name: 'Subaru', logo: '/logos/subaru.png', description: 'Confiança e aventura' },
          { name: 'Mazda', logo: '/logos/mazda.png', description: 'Zoom-Zoom japonês' },
          { name: 'Porsche', logo: '/logos/porsche.svg', description: 'Ícone alemão de performance' }
        ];
        return fallbackBrands;
      }
      
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get('/cars/categories');
      return response.data;
    } catch (error) {
      // Log silencioso para desenvolvimento, fallback direto para produção
      if (process.env.NODE_ENV === 'development') {
        console.debug('Categories API offline, using fallback');
      }
      
      // Fallback para dados estáticos quando há erro
      if (error.response?.status >= 500 || error.code === 'NETWORK_ERROR' || error.message === 'Network Error' || !error.response) {
        const fallbackCategories = [
          { name: 'Hatch', description: 'Carros compactos e versáteis' },
          { name: 'Sedan', description: 'Elegância e conforto' },
          { name: 'SUV', description: 'Espaço e aventura' },
          { name: 'Coupe', description: 'Esportividade e design' },
          { name: 'Conversível', description: 'Liberdade ao ar livre' },
          { name: 'Pickup', description: 'Força e utilidade' }
        ];
        return fallbackCategories;
      }
      
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

// Builds API
export const buildsAPI = {
  create: async (buildData) => {
    try {
      const response = await api.post('/builds', buildData);
      toast.success('Build criada com sucesso!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get('/builds');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/builds/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, buildData) => {
    try {
      const response = await api.put(`/builds/${id}`, buildData);
      toast.success('Build atualizada com sucesso!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/builds/${id}`);
      toast.success('Build removida com sucesso!');
    } catch (error) {
      throw error;
    }
  }
};

// Upgrades API
export const upgradesAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/upgrades');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/upgrades/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (upgradeData) => {
    try {
      const response = await api.post('/upgrades', upgradeData);
      toast.success('Upgrade criado com sucesso!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, upgradeData) => {
    try {
      const response = await api.put(`/upgrades/${id}`, upgradeData);
      toast.success('Upgrade atualizado com sucesso!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/upgrades/${id}`);
      toast.success('Upgrade removido com sucesso!');
    } catch (error) {
      throw error;
    }
  }
};

// Builds Upgrades API (relacionamento entre builds e upgrades)
export const buildsUpgradesAPI = {
  getByBuildId: async (buildId) => {
    try {
      const response = await api.get(`/buildsUpgrades/build/${buildId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addUpgradeToBuild: async (buildId, upgradeId, quantity = 1) => {
    try {
      const response = await api.post('/buildsUpgrades', {
        buildId,
        upgradeId,
        quantity
      });
      toast.success('Upgrade adicionado à build!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  removeUpgradeFromBuild: async (buildId, upgradeId) => {
    try {
      await api.delete(`/buildsUpgrades/build/${buildId}/upgrade/${upgradeId}`);
      toast.success('Upgrade removido da build!');
    } catch (error) {
      throw error;
    }
  },

  updateUpgradeQuantity: async (buildId, upgradeId, quantity) => {
    try {
      const response = await api.put(`/buildsUpgrades/build/${buildId}/upgrade/${upgradeId}`, {
        quantity
      });
      toast.success('Quantidade atualizada!');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const usersAPI = {
  // Buscar todos os usuários
  getAll: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      // Adicionar filtros como query parameters
      if (filters.search) params.append('search', filters.search);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      
      const queryString = params.toString();
      const endpoint = queryString ? `/users?${queryString}` : '/users';
      
      console.log('👥 Chamando API Users:', `${api.defaults.baseURL}${endpoint}`);
      const response = await api.get(endpoint);
      console.log('✅ Users API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Users API Error:', error);
      throw error;
    }
  },

  // Buscar todos os usuários com seus carros (mantendo compatibilidade)
  getAllWithCars: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      // Adicionar filtros como query parameters
      if (filters.search) params.append('search', filters.search);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.hasCars) params.append('hasCars', filters.hasCars);
      if (filters.brand) params.append('brand', filters.brand);
      
      const queryString = params.toString();
      const endpoint = queryString ? `/users?${queryString}` : '/users';
      
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar um usuário específico com seus carros
  getByIdWithCars: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/with-cars`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar carros de um usuário específico
  getUserCars: async (userId, filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.category) params.append('category', filters.category);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      
      const queryString = params.toString();
      const endpoint = queryString ? `/users/${userId}/cars?${queryString}` : `/users/${userId}/cars`;
      
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Adicionar carro a um usuário
  addCarToUser: async (userId, carData) => {
    try {
      const response = await api.post(`/users/${userId}/cars`, carData);
      toast.success('Carro adicionado ao usuário com sucesso!');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Remover carro de um usuário
  removeCarFromUser: async (userId, carId) => {
    try {
      await api.delete(`/users/${userId}/cars/${carId}`);
      toast.success('Carro removido do usuário com sucesso!');
    } catch (error) {
      throw error;
    }
  },

  // Buscar estatísticas dos usuários e carros
  getStats: async () => {
    try {
      const response = await api.get('/users/stats');
      return response.data;
    } catch (error) {
      // Log silencioso para desenvolvimento, fallback direto para produção
      if (process.env.NODE_ENV === 'development') {
        console.debug('Stats API offline, using fallback');
      }
      
      // Fallback para dados estáticos quando há erro
      if (error.response?.status === 404 || error.code === 'NETWORK_ERROR' || error.message === 'Network Error' || !error.response) {
        const fallbackStats = {
          totalUsers: 1250,
          totalCars: 450,
          totalSimulations: 8300,
          totalUpgrades: 15600,
          activeUsers: 340,
          popularBrands: ['BMW', 'Volkswagen', 'Toyota', 'Honda', 'Ford']
        };
        return fallbackStats;
      }
      
      throw error;
    }
  }
};

export default api;
