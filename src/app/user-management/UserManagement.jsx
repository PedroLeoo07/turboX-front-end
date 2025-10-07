'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navigation from '../components/Navigation';
import Modal from '../components/Modal';
import styles from './UserManagement.module.css';

const API_URL = 'http://localhost:3001/api';

const UserManagement = ({ navigateTo, isLoggedIn, user: currentUser, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    phone: '',
    birthDate: '',
    avatar: ''
  });

  // Carregar usuários e carros
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await fetch(`${API_URL}/cars`);
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Erro ao carregar carros:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCars();
  }, []);

  // Filtrar e ordenar usuários
  const filteredAndSortedUsers = users
    .filter(user => {
      const matchesSearch = 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterBy === 'all') return matchesSearch;
      if (filterBy === 'admin') return matchesSearch && user.role === 'admin';
      if (filterBy === 'user') return matchesSearch && user.role === 'user';
      if (filterBy === 'withCars') return matchesSearch && user.cars?.length > 0;
      if (filterBy === 'withoutCars') return matchesSearch && (!user.cars || user.cars.length === 0);
      
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name?.localeCompare(b.name) || 0;
        case 'email':
          return a.email?.localeCompare(b.email) || 0;
        case 'role':
          return a.role?.localeCompare(b.role) || 0;
        case 'carCount':
          return (b.cars?.length || 0) - (a.cars?.length || 0);
        case 'createdAt':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

  // Abrir modal para criar/editar usuário
  const openModal = (user = null) => {
    setEditingUser(user);
    setFormData(user ? {
      name: user.name || '',
      email: user.email || '',
      password: '', // Sempre vazio para edição
      role: user.role || 'user',
      phone: user.phone || '',
      birthDate: user.birthDate || '',
      avatar: user.avatar || ''
    } : {
      name: '',
      email: '',
      password: '',
      role: 'user',
      phone: '',
      birthDate: '',
      avatar: ''
    });
    setIsModalOpen(true);
  };

  // Fechar modais
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user',
      phone: '',
      birthDate: '',
      avatar: ''
    });
  };

  const closeCarModal = () => {
    setIsCarModalOpen(false);
    setSelectedUser(null);
  };

  // Salvar usuário
  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Nome e email são obrigatórios');
      return;
    }

    if (!editingUser && !formData.password.trim()) {
      toast.error('Senha é obrigatória para novos usuários');
      return;
    }

    try {
      setLoading(true);
      const dataToSend = { ...formData };
      if (!dataToSend.password) delete dataToSend.password;
      
      if (editingUser) {
        await fetch(`${API_URL}/users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend)
        });
        toast.success('Usuário atualizado com sucesso!');
      } else {
        await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend)
        });
        toast.success('Usuário criado com sucesso!');
      }
      
      fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      toast.error('Erro ao salvar usuário');
    } finally {
      setLoading(false);
    }
  };

  // Deletar usuário
  const handleDelete = async (userId, userName) => {
    if (currentUser && currentUser.id === userId) {
      toast.error('Você não pode deletar seu próprio usuário');
      return;
    }

    if (!window.confirm(`Tem certeza que deseja deletar o usuário "${userName}"? Esta ação não pode ser desfeita.`)) {
      return;
    }

    try {
      setLoading(true);
      await fetch(`${API_URL}/users/${userId}`, { method: 'DELETE' });
      toast.success('Usuário deletado com sucesso!');
      fetchUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      toast.error('Erro ao deletar usuário');
    } finally {
      setLoading(false);
    }
  };

  // Gerenciar carros do usuário
  const openCarModal = (user) => {
    setSelectedUser(user);
    setIsCarModalOpen(true);
  };

  const addCarToUser = async (carId) => {
    if (!selectedUser) return;

    try {
      await fetch(`${API_URL}/users/${selectedUser.id}/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carId })
      });
      toast.success('Carro adicionado ao usuário com sucesso!');
      fetchUsers();
    } catch (error) {
      console.error('Erro ao adicionar carro:', error);
      toast.error('Erro ao adicionar carro ao usuário');
    }
  };

  const removeCarFromUser = async (carId) => {
    if (!selectedUser) return;

    try {
      await fetch(`${API_URL}/users/${selectedUser.id}/cars/${carId}`, {
        method: 'DELETE'
      });
      toast.success('Carro removido do usuário com sucesso!');
      fetchUsers();
    } catch (error) {
      console.error('Erro ao remover carro:', error);
      toast.error('Erro ao remover carro do usuário');
    }
  };

  // Alterar campo do formulário
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Obter carros disponíveis para adicionar
  const getAvailableCars = () => {
    if (!selectedUser) return cars;
    const userCarIds = selectedUser.cars?.map(car => car.id) || [];
    return cars.filter(car => !userCarIds.includes(car.id));
  };

  return (
    <div className={styles.userManagementContainer}>
      <Navigation 
        currentPage="user-management" 
        navigateTo={navigateTo} 
        isLoggedIn={isLoggedIn} 
        user={currentUser} 
        onLogout={onLogout} 
      />

      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Gerenciamento de Usuários</h1>
            <p className={styles.subtitle}>
              Gerencie todos os usuários da plataforma e seus carros
            </p>
          </div>
          
          <button 
            className={styles.addButton}
            onClick={() => openModal()}
            disabled={loading}
          >
            + Novo Usuário
          </button>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filters}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.select}
            >
              <option value="name">Ordenar por Nome</option>
              <option value="email">Ordenar por Email</option>
              <option value="role">Ordenar por Tipo</option>
              <option value="carCount">Ordenar por Qtd. Carros</option>
              <option value="createdAt">Ordenar por Data</option>
            </select>

            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className={styles.select}
            >
              <option value="all">Todos os Usuários</option>
              <option value="admin">Apenas Admins</option>
              <option value="user">Apenas Usuários</option>
              <option value="withCars">Com Carros</option>
              <option value="withoutCars">Sem Carros</option>
            </select>
          </div>
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{users.length}</span>
              <span className={styles.statLabel}>Total</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{filteredAndSortedUsers.length}</span>
              <span className={styles.statLabel}>Filtrados</span>
            </div>
          </div>
        </div>

        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Carregando usuários...</p>
          </div>
        )}

        {!loading && (
          <div className={styles.usersGrid}>
            {filteredAndSortedUsers.map((user) => (
              <div key={user.id} className={styles.userCard}>
                <div className={styles.userHeader}>
                  <div className={styles.userAvatar}>
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <span className={styles.avatarPlaceholder}>
                        {user.name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    )}
                  </div>
                  
                  <div className={styles.userInfo}>
                    <h3 className={styles.userName}>{user.name}</h3>
                    <p className={styles.userEmail}>{user.email}</p>
                    <div className={styles.userMeta}>
                      <span className={`${styles.userRole} ${styles[user.role]}`}>
                        {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                      </span>
                      {user.phone && (
                        <span className={styles.userPhone}>{user.phone}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.userStats}>
                  <div className={styles.userStat}>
                    <span className={styles.statValue}>{user.cars?.length || 0}</span>
                    <span className={styles.statLabel}>Carros</span>
                  </div>
                  {user.createdAt && (
                    <div className={styles.userStat}>
                      <span className={styles.statValue}>
                        {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                      <span className={styles.statLabel}>Cadastro</span>
                    </div>
                  )}
                </div>

                <div className={styles.userActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => openModal(user)}
                    disabled={loading}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.carsButton}
                    onClick={() => openCarModal(user)}
                    disabled={loading}
                  >
                    Carros ({user.cars?.length || 0})
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(user.id, user.name)}
                    disabled={loading || (currentUser && currentUser.id === user.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredAndSortedUsers.length === 0 && (
          <div className={styles.emptyState}>
            <h3>Nenhum usuário encontrado</h3>
            <p>Tente ajustar sua busca ou crie um novo usuário.</p>
          </div>
        )}
      </main>

      {/* Modal de Criar/Editar Usuário */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingUser ? 'Editar Usuário' : 'Novo Usuário'}>
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nome Completo *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={styles.input}
                placeholder="Nome do usuário"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={styles.input}
                placeholder="usuario@exemplo.com"
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                {editingUser ? 'Nova Senha (deixe vazio para manter)' : 'Senha *'}
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={styles.input}
                placeholder="••••••••"
                required={!editingUser}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Tipo de Usuário</label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className={styles.select}
              >
                <option value="user">Usuário</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Telefone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={styles.input}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Data de Nascimento</label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>URL do Avatar</label>
            <input
              type="url"
              value={formData.avatar}
              onChange={(e) => handleInputChange('avatar', e.target.value)}
              className={styles.input}
              placeholder="https://exemplo.com/avatar.jpg"
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={closeModal}
              className={styles.cancelButton}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={loading}
            >
              {loading ? 'Salvando...' : editingUser ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal de Gerenciar Carros do Usuário */}
      <Modal 
        isOpen={isCarModalOpen} 
        onClose={closeCarModal} 
        title={`Carros de ${selectedUser?.name || ''}`}
      >
        <div className={styles.carsModal}>
          {/* Carros do usuário */}
          <div className={styles.userCarsSection}>
            <h4>Carros Atuais ({selectedUser?.cars?.length || 0})</h4>
            {selectedUser?.cars && selectedUser.cars.length > 0 ? (
              <div className={styles.carsList}>
                {selectedUser.cars.map((car) => (
                  <div key={car.id} className={styles.carItem}>
                    <div className={styles.carInfo}>
                      <span className={styles.carName}>{car.brand} {car.model}</span>
                      <span className={styles.carYear}>{car.year}</span>
                    </div>
                    <button
                      className={styles.removeCarButton}
                      onClick={() => removeCarFromUser(car.id)}
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.noCars}>Usuário não possui carros</p>
            )}
          </div>

          {/* Carros disponíveis */}
          <div className={styles.availableCarsSection}>
            <h4>Adicionar Carros ({getAvailableCars().length} disponíveis)</h4>
            {getAvailableCars().length > 0 ? (
              <div className={styles.carsList}>
                {getAvailableCars().map((car) => (
                  <div key={car.id} className={styles.carItem}>
                    <div className={styles.carInfo}>
                      <span className={styles.carName}>{car.brand} {car.model}</span>
                      <span className={styles.carYear}>{car.year}</span>
                    </div>
                    <button
                      className={styles.addCarButton}
                      onClick={() => addCarToUser(car.id)}
                    >
                      Adicionar
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.noCars}>Todos os carros já foram adicionados</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;