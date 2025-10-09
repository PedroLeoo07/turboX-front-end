"use client";

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import styles from './AdminPanel.module.css';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export default function AdminPanel({ navigateTo, isLoggedIn, user, onLogout }) {
  const [activeTab, setActiveTab] = useState('carros');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Estados para Carros
  const [carros, setCarros] = useState([]);
  const [carFormData, setCarFormData] = useState({
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

  // Estados para Peças
  const [pecas, setPecas] = useState([]);
  const [pecaFormData, setPecaFormData] = useState({
    nome: '',
    categoria: '',
    preco: '',
    descricao: '',
    compatibilidade: '',
    imagem: ''
  });

  // Estados para Estágios
  const [estagios, setEstagios] = useState([]);
  const [estagioFormData, setEstagioFormData] = useState({
    nome: '',
    nivel: '',
    ganho_potencia: '',
    ganho_torque: '',
    preco: '',
    descricao: '',
    pecas_incluidas: ''
  });

  useEffect(() => {
    if (activeTab === 'carros') loadCarros();
    if (activeTab === 'pecas') loadPecas();
    if (activeTab === 'estagios') loadEstagios();
  }, [activeTab]);

  // Funções para Carros
  const loadCarros = async () => {
    try {
      const response = await axios.get(`${API_URL}/carros`);
      setCarros(response.data);
    } catch (error) {
      console.error('Erro ao carregar carros:', error);
    }
  };

  const handleCarSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`${API_URL}/carros/${editingItem.id}`, carFormData);
      } else {
        await axios.post(`${API_URL}/carros`, carFormData);
      }
      loadCarros();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar carro:', error);
    }
  };

  const handleDeleteCar = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este carro?')) {
      try {
        await axios.delete(`${API_URL}/carros/${id}`);
        loadCarros();
      } catch (error) {
        console.error('Erro ao excluir carro:', error);
      }
    }
  };

  // Funções para Peças
  const loadPecas = async () => {
    try {
      const response = await axios.get(`${API_URL}/pecas`);
      setPecas(response.data);
    } catch (error) {
      console.error('Erro ao carregar peças:', error);
    }
  };

  const handlePecaSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`${API_URL}/pecas/${editingItem.id}`, pecaFormData);
      } else {
        await axios.post(`${API_URL}/pecas`, pecaFormData);
      }
      loadPecas();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar peça:', error);
    }
  };

  const handleDeletePeca = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta peça?')) {
      try {
        await axios.delete(`${API_URL}/pecas/${id}`);
        loadPecas();
      } catch (error) {
        console.error('Erro ao excluir peça:', error);
      }
    }
  };

  // Funções para Estágios
  const loadEstagios = async () => {
    try {
      const response = await axios.get(`${API_URL}/estagios`);
      setEstagios(response.data);
    } catch (error) {
      console.error('Erro ao carregar estágios:', error);
    }
  };

  const handleEstagioSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`${API_URL}/estagios/${editingItem.id}`, estagioFormData);
      } else {
        await axios.post(`${API_URL}/estagios`, estagioFormData);
      }
      loadEstagios();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar estágio:', error);
    }
  };

  const handleDeleteEstagio = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este estágio?')) {
      try {
        await axios.delete(`${API_URL}/estagios/${id}`);
        loadEstagios();
      } catch (error) {
        console.error('Erro ao excluir estágio:', error);
      }
    }
  };

  // Funções de Modal
  const openCreateModal = () => {
    setEditingItem(null);
    if (activeTab === 'carros') {
      setCarFormData({
        marca: '', modelo: '', ano: '', potencia: '', torque: '',
        peso: '', zeroACem: '', preco: '', imagem: ''
      });
    } else if (activeTab === 'pecas') {
      setPecaFormData({
        nome: '', categoria: '', preco: '', descricao: '',
        compatibilidade: '', imagem: ''
      });
    } else if (activeTab === 'estagios') {
      setEstagioFormData({
        nome: '', nivel: '', ganho_potencia: '', ganho_torque: '',
        preco: '', descricao: '', pecas_incluidas: ''
      });
    }
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    if (activeTab === 'carros') {
      setCarFormData(item);
    } else if (activeTab === 'pecas') {
      setPecaFormData(item);
    } else if (activeTab === 'estagios') {
      setEstagioFormData(item);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'carros') {
      setCarFormData(prev => ({ ...prev, [name]: value }));
    } else if (formType === 'pecas') {
      setPecaFormData(prev => ({ ...prev, [name]: value }));
    } else if (formType === 'estagios') {
      setEstagioFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className={styles.adminPanel}>
      <Navigation
        currentPage="admin-panel"
        navigateTo={navigateTo}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={onLogout}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Painel Administrativo</h1>
          <p className={styles.subtitle}>Gerencie carros, peças e estágios de preparação</p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'carros' ? styles.active : ''}`}
            onClick={() => setActiveTab('carros')}
          >
            Carros
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'pecas' ? styles.active : ''}`}
            onClick={() => setActiveTab('pecas')}
          >
            Peças
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'estagios' ? styles.active : ''}`}
            onClick={() => setActiveTab('estagios')}
          >
            Estágios
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Carros Tab */}
          {activeTab === 'carros' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Gerenciar Carros</h2>
                <button className={styles.addButton} onClick={openCreateModal}>
                  + Adicionar Carro
                </button>
              </div>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Ano</th>
                      <th>Potência</th>
                      <th>Torque</th>
                      <th>Preço</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carros.map(carro => (
                      <tr key={carro.id}>
                        <td>{carro.marca}</td>
                        <td>{carro.modelo}</td>
                        <td>{carro.ano}</td>
                        <td>{carro.potencia} cv</td>
                        <td>{carro.torque} Nm</td>
                        <td>R$ {Number(carro.preco).toLocaleString('pt-BR')}</td>
                        <td className={styles.actions}>
                          <button
                            className={styles.editBtn}
                            onClick={() => openEditModal(carro)}
                          >
                            Editar
                          </button>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleDeleteCar(carro.id)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Peças Tab */}
          {activeTab === 'pecas' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Gerenciar Peças</h2>
                <button className={styles.addButton} onClick={openCreateModal}>
                  + Adicionar Peça
                </button>
              </div>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Categoria</th>
                      <th>Preço</th>
                      <th>Compatibilidade</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pecas.map(peca => (
                      <tr key={peca.id}>
                        <td>{peca.nome}</td>
                        <td>{peca.categoria}</td>
                        <td>R$ {Number(peca.preco).toLocaleString('pt-BR')}</td>
                        <td>{peca.compatibilidade}</td>
                        <td className={styles.actions}>
                          <button
                            className={styles.editBtn}
                            onClick={() => openEditModal(peca)}
                          >
                            Editar
                          </button>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleDeletePeca(peca.id)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Estágios Tab */}
          {activeTab === 'estagios' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Gerenciar Estágios</h2>
                <button className={styles.addButton} onClick={openCreateModal}>
                  + Adicionar Estágio
                </button>
              </div>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Nível</th>
                      <th>Ganho Potência</th>
                      <th>Ganho Torque</th>
                      <th>Preço</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estagios.map(estagio => (
                      <tr key={estagio.id}>
                        <td>{estagio.nome}</td>
                        <td>{estagio.nivel}</td>
                        <td>+{estagio.ganho_potencia} cv</td>
                        <td>+{estagio.ganho_torque} Nm</td>
                        <td>R$ {Number(estagio.preco).toLocaleString('pt-BR')}</td>
                        <td className={styles.actions}>
                          <button
                            className={styles.editBtn}
                            onClick={() => openEditModal(estagio)}
                          >
                            Editar
                          </button>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleDeleteEstagio(estagio.id)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>
                {editingItem ? 'Editar' : 'Adicionar'}{' '}
                {activeTab === 'carros' ? 'Carro' : activeTab === 'pecas' ? 'Peça' : 'Estágio'}
              </h2>
              <button className={styles.closeBtn} onClick={closeModal}>×</button>
            </div>

            {/* Form para Carros */}
            {activeTab === 'carros' && (
              <form onSubmit={handleCarSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <input
                    type="text"
                    name="marca"
                    placeholder="Marca"
                    value={carFormData.marca}
                    onChange={(e) => handleInputChange(e, 'carros')}
                    required
                  />
                  <input
                    type="text"
                    name="modelo"
                    placeholder="Modelo"
                    value={carFormData.modelo}
                    onChange={(e) => handleInputChange(e, 'carros')}
                    required
                  />
                  <input
                    type="number"
                    name="ano"
                    placeholder="Ano"
                    value={carFormData.ano}
                    onChange={(e) => handleInputChange(e, 'carros')}
                    required
                  />
                  <input
                    type="number"
                    name="potencia"
                    placeholder="Potência (cv)"
                    value={carFormData.potencia}
                    onChange={(e) => handleInputChange(e, 'carros')}
                    required
                  />
                  <input
                    type="number"
                    name="torque"
                    placeholder="Torque (Nm)"
                    value={carFormData.torque}
                    onChange={(e) => handleInputChange(e, 'carros')}
                    required
                  />
                  <input
                    type="number"
                    name="peso"
                    placeholder="Peso (kg)"
                    value={carFormData.peso}
                    onChange={(e) => handleInputChange(e, 'carros')}
                    required
                  />
                  <input
                    type="number"
                    step="0.1"
                    name="zeroACem"
                    placeholder="0-100 km/h (s)"
                    value={carFormData.zeroACem}
                    onChange={(e) => handleInputChange(e, 'carros')}
                    required
                  />
                  <input
                    type="number"
                    name="preco"
                    placeholder="Preço (R$)"
                    value={carFormData.preco}
                    onChange={(e) => handleInputChange(e, 'carros')}
                    required
                  />
                  <input
                    type="text"
                    name="imagem"
                    placeholder="URL da Imagem"
                    value={carFormData.imagem}
                    onChange={(e) => handleInputChange(e, 'carros')}
                    className={styles.fullWidth}
                  />
                </div>
                <div className={styles.modalActions}>
                  <button type="button" className={styles.cancelBtn} onClick={closeModal}>
                    Cancelar
                  </button>
                  <button type="submit" className={styles.submitBtn}>
                    {editingItem ? 'Salvar' : 'Criar'}
                  </button>
                </div>
              </form>
            )}

            {/* Form para Peças */}
            {activeTab === 'pecas' && (
              <form onSubmit={handlePecaSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Nome da Peça"
                    value={pecaFormData.nome}
                    onChange={(e) => handleInputChange(e, 'pecas')}
                    required
                    className={styles.fullWidth}
                  />
                  <input
                    type="text"
                    name="categoria"
                    placeholder="Categoria"
                    value={pecaFormData.categoria}
                    onChange={(e) => handleInputChange(e, 'pecas')}
                    required
                  />
                  <input
                    type="number"
                    name="preco"
                    placeholder="Preço (R$)"
                    value={pecaFormData.preco}
                    onChange={(e) => handleInputChange(e, 'pecas')}
                    required
                  />
                  <textarea
                    name="descricao"
                    placeholder="Descrição"
                    value={pecaFormData.descricao}
                    onChange={(e) => handleInputChange(e, 'pecas')}
                    className={styles.fullWidth}
                    rows="3"
                  />
                  <input
                    type="text"
                    name="compatibilidade"
                    placeholder="Compatibilidade (ex: VW, Audi)"
                    value={pecaFormData.compatibilidade}
                    onChange={(e) => handleInputChange(e, 'pecas')}
                    className={styles.fullWidth}
                  />
                  <input
                    type="text"
                    name="imagem"
                    placeholder="URL da Imagem"
                    value={pecaFormData.imagem}
                    onChange={(e) => handleInputChange(e, 'pecas')}
                    className={styles.fullWidth}
                  />
                </div>
                <div className={styles.modalActions}>
                  <button type="button" className={styles.cancelBtn} onClick={closeModal}>
                    Cancelar
                  </button>
                  <button type="submit" className={styles.submitBtn}>
                    {editingItem ? 'Salvar' : 'Criar'}
                  </button>
                </div>
              </form>
            )}

            {/* Form para Estágios */}
            {activeTab === 'estagios' && (
              <form onSubmit={handleEstagioSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Nome do Estágio"
                    value={estagioFormData.nome}
                    onChange={(e) => handleInputChange(e, 'estagios')}
                    required
                    className={styles.fullWidth}
                  />
                  <input
                    type="number"
                    name="nivel"
                    placeholder="Nível (1, 2, 3...)"
                    value={estagioFormData.nivel}
                    onChange={(e) => handleInputChange(e, 'estagios')}
                    required
                  />
                  <input
                    type="number"
                    name="ganho_potencia"
                    placeholder="Ganho de Potência (cv)"
                    value={estagioFormData.ganho_potencia}
                    onChange={(e) => handleInputChange(e, 'estagios')}
                    required
                  />
                  <input
                    type="number"
                    name="ganho_torque"
                    placeholder="Ganho de Torque (Nm)"
                    value={estagioFormData.ganho_torque}
                    onChange={(e) => handleInputChange(e, 'estagios')}
                    required
                  />
                  <input
                    type="number"
                    name="preco"
                    placeholder="Preço (R$)"
                    value={estagioFormData.preco}
                    onChange={(e) => handleInputChange(e, 'estagios')}
                    required
                  />
                  <textarea
                    name="descricao"
                    placeholder="Descrição"
                    value={estagioFormData.descricao}
                    onChange={(e) => handleInputChange(e, 'estagios')}
                    className={styles.fullWidth}
                    rows="3"
                  />
                  <textarea
                    name="pecas_incluidas"
                    placeholder="Peças Incluídas (separadas por vírgula)"
                    value={estagioFormData.pecas_incluidas}
                    onChange={(e) => handleInputChange(e, 'estagios')}
                    className={styles.fullWidth}
                    rows="2"
                  />
                </div>
                <div className={styles.modalActions}>
                  <button type="button" className={styles.cancelBtn} onClick={closeModal}>
                    Cancelar
                  </button>
                  <button type="submit" className={styles.submitBtn}>
                    {editingItem ? 'Salvar' : 'Criar'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
