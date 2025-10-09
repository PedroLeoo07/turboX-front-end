'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navigation from '../components/Navigation';
import styles from './AdminPanel.module.css';

const API_URL = 'http://localhost:3001/api';

export default function AdminPanel({ navigateTo, isLoggedIn, user, onLogout }) {
  const [activeTab, setActiveTab] = useState('cars');
  const [loading, setLoading] = useState(false);
  
  // Cars state
  const [cars, setCars] = useState([]);
  const [carModalOpen, setCarModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [carFormData, setCarFormData] = useState({
    brand: '',
    model: '',
    year: '',
    power: '',
    torque: '',
    weight: '',
    zeroToHundred: '',
    price: '',
    image: ''
  });

  // Parts state
  const [parts, setParts] = useState([]);
  const [partModalOpen, setPartModalOpen] = useState(false);
  const [editingPart, setEditingPart] = useState(null);
  const [partFormData, setPartFormData] = useState({
    name: '',
    type: '',
    brand: '',
    price: '',
    description: '',
    compatibility: '',
    performance_gain: ''
  });

  // Stages state
  const [stages, setStages] = useState([]);
  const [stageModalOpen, setStageModalOpen] = useState(false);
  const [editingStage, setEditingStage] = useState(null);
  const [stageFormData, setStageFormData] = useState({
    name: '',
    level: '',
    power_increase: '',
    torque_increase: '',
    price: '',
    description: '',
    required_parts: ''
  });

  // Load data on mount and tab change
  useEffect(() => {
    if (activeTab === 'cars') loadCars();
    else if (activeTab === 'parts') loadParts();
    else if (activeTab === 'stages') loadStages();
  }, [activeTab]);

  // Cars CRUD
  const loadCars = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/cars`);
      if (!response.ok) throw new Error('API não disponível');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Erro ao carregar carros:', error);
      toast.error('Erro ao carregar carros');
    } finally {
      setLoading(false);
    }
  };

  const handleCarSubmit = async (e) => {
    e.preventDefault();
    
    if (!carFormData.brand || !carFormData.model || !carFormData.year) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    try {
      const url = editingCar 
        ? `${API_URL}/cars/${editingCar.id}`
        : `${API_URL}/cars`;
      
      const method = editingCar ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carFormData)
      });

      if (!response.ok) throw new Error('Erro ao salvar');
      
      toast.success(`Carro ${editingCar ? 'atualizado' : 'criado'} com sucesso!`);
      setCarModalOpen(false);
      resetCarForm();
      loadCars();
    } catch (error) {
      console.error('Erro ao salvar carro:', error);
      toast.error('Erro ao salvar carro');
    }
  };

  const handleCarDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este carro?')) return;

    try {
      const response = await fetch(`${API_URL}/cars/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Erro ao excluir');
      
      toast.success('Carro excluído com sucesso!');
      loadCars();
    } catch (error) {
      console.error('Erro ao excluir carro:', error);
      toast.error('Erro ao excluir carro');
    }
  };

  const openCarModal = (car = null) => {
    setEditingCar(car);
    if (car) {
      setCarFormData({
        brand: car.brand || '',
        model: car.model || '',
        year: car.year || '',
        power: car.power || car.horsepower || '',
        torque: car.torque || '',
        weight: car.weight || '',
        zeroToHundred: car.zeroToHundred || car.acceleration || '',
        price: car.price || '',
        image: car.image || car.imageUrl || ''
      });
    }
    setCarModalOpen(true);
  };

  const resetCarForm = () => {
    setEditingCar(null);
    setCarFormData({
      brand: '',
      model: '',
      year: '',
      power: '',
      torque: '',
      weight: '',
      zeroToHundred: '',
      price: '',
      image: ''
    });
  };

  // Parts CRUD
  const loadParts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/parts`);
      if (!response.ok) throw new Error('API não disponível');
      const data = await response.json();
      setParts(data);
    } catch (error) {
      console.error('Erro ao carregar peças:', error);
      toast.error('Erro ao carregar peças');
      setParts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePartSubmit = async (e) => {
    e.preventDefault();
    
    if (!partFormData.name || !partFormData.type) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    try {
      const url = editingPart 
        ? `${API_URL}/parts/${editingPart.id}`
        : `${API_URL}/parts`;
      
      const method = editingPart ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partFormData)
      });

      if (!response.ok) throw new Error('Erro ao salvar');
      
      toast.success(`Peça ${editingPart ? 'atualizada' : 'criada'} com sucesso!`);
      setPartModalOpen(false);
      resetPartForm();
      loadParts();
    } catch (error) {
      console.error('Erro ao salvar peça:', error);
      toast.error('Erro ao salvar peça');
    }
  };

  const handlePartDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta peça?')) return;

    try {
      const response = await fetch(`${API_URL}/parts/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Erro ao excluir');
      
      toast.success('Peça excluída com sucesso!');
      loadParts();
    } catch (error) {
      console.error('Erro ao excluir peça:', error);
      toast.error('Erro ao excluir peça');
    }
  };

  const openPartModal = (part = null) => {
    setEditingPart(part);
    if (part) {
      setPartFormData({
        name: part.name || '',
        type: part.type || '',
        brand: part.brand || '',
        price: part.price || '',
        description: part.description || '',
        compatibility: part.compatibility || '',
        performance_gain: part.performance_gain || ''
      });
    }
    setPartModalOpen(true);
  };

  const resetPartForm = () => {
    setEditingPart(null);
    setPartFormData({
      name: '',
      type: '',
      brand: '',
      price: '',
      description: '',
      compatibility: '',
      performance_gain: ''
    });
  };

  // Stages CRUD
  const loadStages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/stages`);
      if (!response.ok) throw new Error('API não disponível');
      const data = await response.json();
      setStages(data);
    } catch (error) {
      console.error('Erro ao carregar estágios:', error);
      toast.error('Erro ao carregar estágios');
      setStages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStageSubmit = async (e) => {
    e.preventDefault();
    
    if (!stageFormData.name || !stageFormData.level) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    try {
      const url = editingStage 
        ? `${API_URL}/stages/${editingStage.id}`
        : `${API_URL}/stages`;
      
      const method = editingStage ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stageFormData)
      });

      if (!response.ok) throw new Error('Erro ao salvar');
      
      toast.success(`Estágio ${editingStage ? 'atualizado' : 'criado'} com sucesso!`);
      setStageModalOpen(false);
      resetStageForm();
      loadStages();
    } catch (error) {
      console.error('Erro ao salvar estágio:', error);
      toast.error('Erro ao salvar estágio');
    }
  };

  const handleStageDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este estágio?')) return;

    try {
      const response = await fetch(`${API_URL}/stages/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Erro ao excluir');
      
      toast.success('Estágio excluído com sucesso!');
      loadStages();
    } catch (error) {
      console.error('Erro ao excluir estágio:', error);
      toast.error('Erro ao excluir estágio');
    }
  };

  const openStageModal = (stage = null) => {
    setEditingStage(stage);
    if (stage) {
      setStageFormData({
        name: stage.name || '',
        level: stage.level || '',
        power_increase: stage.power_increase || '',
        torque_increase: stage.torque_increase || '',
        price: stage.price || '',
        description: stage.description || '',
        required_parts: stage.required_parts || ''
      });
    }
    setStageModalOpen(true);
  };

  const resetStageForm = () => {
    setEditingStage(null);
    setStageFormData({
      name: '',
      level: '',
      power_increase: '',
      torque_increase: '',
      price: '',
      description: '',
      required_parts: ''
    });
  };

  return (
    <div className={styles.container}>
      <Navigation 
        currentPage="admin-panel" 
        navigateTo={navigateTo}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={onLogout}
      />

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Painel Administrativo</h1>
          <p className={styles.subtitle}>Gerencie carros, peças e estágios de preparação</p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'cars' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('cars')}
          >
            Carros
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'parts' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('parts')}
          >
            Peças
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'stages' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('stages')}
          >
            Estágios
          </button>
        </div>

        {/* Cars Section */}
        {activeTab === 'cars' && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Gerenciar Carros</h2>
              <button 
                className={styles.addButton}
                onClick={() => openCarModal()}
              >
                + Adicionar Carro
              </button>
            </div>

            {loading ? (
              <div className={styles.loading}>Carregando...</div>
            ) : (
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Imagem</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Ano</th>
                      <th>Potência</th>
                      <th>Torque</th>
                      <th>Peso</th>
                      <th>0-100</th>
                      <th>Preço</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.map(car => (
                      <tr key={car.id}>
                        <td>
                          {car.image || car.imageUrl ? (
                            <img 
                              src={car.image || car.imageUrl} 
                              alt={`${car.brand} ${car.model}`}
                              className={styles.carImage}
                            />
                          ) : (
                            <div className={styles.noImage}>Sem imagem</div>
                          )}
                        </td>
                        <td>{car.brand}</td>
                        <td>{car.model}</td>
                        <td>{car.year}</td>
                        <td>{car.power || car.horsepower} cv</td>
                        <td>{car.torque} Nm</td>
                        <td>{car.weight} kg</td>
                        <td>{car.zeroToHundred || car.acceleration}s</td>
                        <td>R$ {(car.price || 0).toLocaleString()}</td>
                        <td className={styles.actions}>
                          <button 
                            className={styles.editButton}
                            onClick={() => openCarModal(car)}
                          >
                            Editar
                          </button>
                          <button 
                            className={styles.deleteButton}
                            onClick={() => handleCarDelete(car.id)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Parts Section */}
        {activeTab === 'parts' && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Gerenciar Peças</h2>
              <button 
                className={styles.addButton}
                onClick={() => openPartModal()}
              >
                + Adicionar Peça
              </button>
            </div>

            {loading ? (
              <div className={styles.loading}>Carregando...</div>
            ) : (
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Tipo</th>
                      <th>Marca</th>
                      <th>Preço</th>
                      <th>Descrição</th>
                      <th>Compatibilidade</th>
                      <th>Ganho de Performance</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parts.map(part => (
                      <tr key={part.id}>
                        <td>{part.name}</td>
                        <td>{part.type}</td>
                        <td>{part.brand}</td>
                        <td>R$ {(part.price || 0).toLocaleString()}</td>
                        <td>{part.description}</td>
                        <td>{part.compatibility}</td>
                        <td>{part.performance_gain}</td>
                        <td className={styles.actions}>
                          <button 
                            className={styles.editButton}
                            onClick={() => openPartModal(part)}
                          >
                            Editar
                          </button>
                          <button 
                            className={styles.deleteButton}
                            onClick={() => handlePartDelete(part.id)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Stages Section */}
        {activeTab === 'stages' && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Gerenciar Estágios</h2>
              <button 
                className={styles.addButton}
                onClick={() => openStageModal()}
              >
                + Adicionar Estágio
              </button>
            </div>

            {loading ? (
              <div className={styles.loading}>Carregando...</div>
            ) : (
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Nível</th>
                      <th>Aumento de Potência</th>
                      <th>Aumento de Torque</th>
                      <th>Preço</th>
                      <th>Descrição</th>
                      <th>Peças Necessárias</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stages.map(stage => (
                      <tr key={stage.id}>
                        <td>{stage.name}</td>
                        <td>{stage.level}</td>
                        <td>{stage.power_increase} cv</td>
                        <td>{stage.torque_increase} Nm</td>
                        <td>R$ {(stage.price || 0).toLocaleString()}</td>
                        <td>{stage.description}</td>
                        <td>{stage.required_parts}</td>
                        <td className={styles.actions}>
                          <button 
                            className={styles.editButton}
                            onClick={() => openStageModal(stage)}
                          >
                            Editar
                          </button>
                          <button 
                            className={styles.deleteButton}
                            onClick={() => handleStageDelete(stage.id)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Car Modal */}
        {carModalOpen && (
          <div className={styles.modal} onClick={() => setCarModalOpen(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>{editingCar ? 'Editar Carro' : 'Adicionar Carro'}</h2>
                <button 
                  className={styles.closeButton}
                  onClick={() => setCarModalOpen(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleCarSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Marca *</label>
                    <input
                      type="text"
                      value={carFormData.brand}
                      onChange={(e) => setCarFormData({...carFormData, brand: e.target.value})}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Modelo *</label>
                    <input
                      type="text"
                      value={carFormData.model}
                      onChange={(e) => setCarFormData({...carFormData, model: e.target.value})}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Ano *</label>
                    <input
                      type="number"
                      value={carFormData.year}
                      onChange={(e) => setCarFormData({...carFormData, year: e.target.value})}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Potência (cv)</label>
                    <input
                      type="number"
                      value={carFormData.power}
                      onChange={(e) => setCarFormData({...carFormData, power: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Torque (Nm)</label>
                    <input
                      type="number"
                      value={carFormData.torque}
                      onChange={(e) => setCarFormData({...carFormData, torque: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Peso (kg)</label>
                    <input
                      type="number"
                      value={carFormData.weight}
                      onChange={(e) => setCarFormData({...carFormData, weight: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>0-100 km/h (s)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={carFormData.zeroToHundred}
                      onChange={(e) => setCarFormData({...carFormData, zeroToHundred: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Preço (R$)</label>
                    <input
                      type="number"
                      value={carFormData.price}
                      onChange={(e) => setCarFormData({...carFormData, price: e.target.value})}
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label>URL da Imagem</label>
                    <input
                      type="url"
                      value={carFormData.image}
                      onChange={(e) => setCarFormData({...carFormData, image: e.target.value})}
                    />
                  </div>
                </div>
                <div className={styles.modalFooter}>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => setCarModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    {editingCar ? 'Atualizar' : 'Criar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Part Modal */}
        {partModalOpen && (
          <div className={styles.modal} onClick={() => setPartModalOpen(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>{editingPart ? 'Editar Peça' : 'Adicionar Peça'}</h2>
                <button 
                  className={styles.closeButton}
                  onClick={() => setPartModalOpen(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handlePartSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Nome *</label>
                    <input
                      type="text"
                      value={partFormData.name}
                      onChange={(e) => setPartFormData({...partFormData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Tipo *</label>
                    <input
                      type="text"
                      value={partFormData.type}
                      onChange={(e) => setPartFormData({...partFormData, type: e.target.value})}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Marca</label>
                    <input
                      type="text"
                      value={partFormData.brand}
                      onChange={(e) => setPartFormData({...partFormData, brand: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Preço (R$)</label>
                    <input
                      type="number"
                      value={partFormData.price}
                      onChange={(e) => setPartFormData({...partFormData, price: e.target.value})}
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label>Descrição</label>
                    <textarea
                      value={partFormData.description}
                      onChange={(e) => setPartFormData({...partFormData, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Compatibilidade</label>
                    <input
                      type="text"
                      value={partFormData.compatibility}
                      onChange={(e) => setPartFormData({...partFormData, compatibility: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Ganho de Performance</label>
                    <input
                      type="text"
                      value={partFormData.performance_gain}
                      onChange={(e) => setPartFormData({...partFormData, performance_gain: e.target.value})}
                    />
                  </div>
                </div>
                <div className={styles.modalFooter}>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => setPartModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    {editingPart ? 'Atualizar' : 'Criar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Stage Modal */}
        {stageModalOpen && (
          <div className={styles.modal} onClick={() => setStageModalOpen(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>{editingStage ? 'Editar Estágio' : 'Adicionar Estágio'}</h2>
                <button 
                  className={styles.closeButton}
                  onClick={() => setStageModalOpen(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleStageSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Nome *</label>
                    <input
                      type="text"
                      value={stageFormData.name}
                      onChange={(e) => setStageFormData({...stageFormData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Nível *</label>
                    <input
                      type="text"
                      value={stageFormData.level}
                      onChange={(e) => setStageFormData({...stageFormData, level: e.target.value})}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Aumento de Potência (cv)</label>
                    <input
                      type="number"
                      value={stageFormData.power_increase}
                      onChange={(e) => setStageFormData({...stageFormData, power_increase: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Aumento de Torque (Nm)</label>
                    <input
                      type="number"
                      value={stageFormData.torque_increase}
                      onChange={(e) => setStageFormData({...stageFormData, torque_increase: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Preço (R$)</label>
                    <input
                      type="number"
                      value={stageFormData.price}
                      onChange={(e) => setStageFormData({...stageFormData, price: e.target.value})}
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label>Descrição</label>
                    <textarea
                      value={stageFormData.description}
                      onChange={(e) => setStageFormData({...stageFormData, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label>Peças Necessárias</label>
                    <textarea
                      value={stageFormData.required_parts}
                      onChange={(e) => setStageFormData({...stageFormData, required_parts: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>
                <div className={styles.modalFooter}>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => setStageModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    {editingStage ? 'Atualizar' : 'Criar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
