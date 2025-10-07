'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navigation from '../components/Navigation';
import Modal from '../components/Modal';
import styles from './BrandManagement.module.css';

const API_URL = 'http://localhost:3001/api';

const BrandManagement = ({ navigateTo, isLoggedIn, user, onLogout }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    description: '',
    country: '',
    foundedYear: '',
    website: ''
  });

  // Carregar marcas
  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/brands`);
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
      toast.error('Erro ao carregar marcas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Filtrar marcas por busca
  const filteredBrands = brands.filter(brand =>
    brand.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Abrir modal para criar/editar
  const openModal = (brand = null) => {
    setEditingBrand(brand);
    setFormData(brand ? {
      name: brand.name || '',
      logo: brand.logo || '',
      description: brand.description || '',
      country: brand.country || '',
      foundedYear: brand.foundedYear || '',
      website: brand.website || ''
    } : {
      name: '',
      logo: '',
      description: '',
      country: '',
      foundedYear: '',
      website: ''
    });
    setIsModalOpen(true);
  };

  // Fechar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBrand(null);
    setFormData({
      name: '',
      logo: '',
      description: '',
      country: '',
      foundedYear: '',
      website: ''
    });
  };

  // Salvar marca (criar ou editar)
  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Nome da marca é obrigatório');
      return;
    }

    try {
      setLoading(true);
      
      if (editingBrand) {
        await fetch(`${API_URL}/brands/${editingBrand.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        toast.success('Marca atualizada com sucesso!');
      } else {
        await fetch(`${API_URL}/brands`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        toast.success('Marca criada com sucesso!');
      }
      
      fetchBrands();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar marca:', error);
      toast.error('Erro ao salvar marca');
    } finally {
      setLoading(false);
    }
  };

  // Deletar marca
  const handleDelete = async (brandId, brandName) => {
    if (!window.confirm(`Tem certeza que deseja deletar a marca "${brandName}"? Esta ação não pode ser desfeita.`)) {
      return;
    }

    try {
      setLoading(true);
      await fetch(`${API_URL}/brands/${brandId}`, { method: 'DELETE' });
      toast.success('Marca deletada com sucesso!');
      fetchBrands();
    } catch (error) {
      console.error('Erro ao deletar marca:', error);
      toast.error('Erro ao deletar marca');
    } finally {
      setLoading(false);
    }
  };

  // Alterar campo do formulário
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={styles.brandManagementContainer}>
      <Navigation 
        currentPage="brand-management" 
        navigateTo={navigateTo} 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLogout={onLogout} 
      />

      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Gerenciamento de Marcas</h1>
            <p className={styles.subtitle}>
              Gerencie todas as marcas de carros disponíveis na plataforma
            </p>
          </div>
          
          <button 
            className={styles.addButton}
            onClick={() => openModal()}
            disabled={loading}
          >
            + Nova Marca
          </button>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Buscar marcas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{brands.length}</span>
              <span className={styles.statLabel}>Total de Marcas</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{filteredBrands.length}</span>
              <span className={styles.statLabel}>Resultados</span>
            </div>
          </div>
        </div>

        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Carregando marcas...</p>
          </div>
        )}

        {!loading && (
          <div className={styles.brandsGrid}>
            {filteredBrands.map((brand) => (
              <div key={brand.id} className={styles.brandCard}>
                <div className={styles.brandHeader}>
                  <div className={styles.brandLogo}>
                    {brand.logo ? (
                      <img 
                        src={brand.logo} 
                        alt={`Logo ${brand.name}`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className={styles.logoPlaceholder}>
                        {brand.name?.charAt(0)?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  
                  <div className={styles.brandInfo}>
                    <h3 className={styles.brandName}>{brand.name}</h3>
                    {brand.country && (
                      <p className={styles.brandCountry}>{brand.country}</p>
                    )}
                    {brand.foundedYear && (
                      <p className={styles.brandFounded}>Fundada em {brand.foundedYear}</p>
                    )}
                  </div>
                </div>

                <div className={styles.brandBody}>
                  {brand.description && (
                    <p className={styles.brandDescription}>{brand.description}</p>
                  )}
                  
                  {brand.website && (
                    <a 
                      href={brand.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.brandWebsite}
                    >
                      Visitar site
                    </a>
                  )}
                </div>

                <div className={styles.brandActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => openModal(brand)}
                    disabled={loading}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(brand.id, brand.name)}
                    disabled={loading}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredBrands.length === 0 && (
          <div className={styles.emptyState}>
            <h3>Nenhuma marca encontrada</h3>
            <p>Tente ajustar sua busca ou crie uma nova marca.</p>
          </div>
        )}
      </main>

      {/* Modal de Criar/Editar Marca */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingBrand ? 'Editar Marca' : 'Nova Marca'}>
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome da Marca *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={styles.input}
              placeholder="Ex: Toyota, BMW, Ford..."
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>URL do Logo</label>
            <input
              type="url"
              value={formData.logo}
              onChange={(e) => handleInputChange('logo', e.target.value)}
              className={styles.input}
              placeholder="https://exemplo.com/logo.png"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={styles.textarea}
              placeholder="Breve descrição da marca..."
              rows="3"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>País de Origem</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className={styles.input}
                placeholder="Ex: Alemanha, Japão..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Ano de Fundação</label>
              <input
                type="number"
                value={formData.foundedYear}
                onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                className={styles.input}
                placeholder="Ex: 1937"
                min="1800"
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className={styles.input}
              placeholder="https://www.marca.com"
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
              {loading ? 'Salvando...' : editingBrand ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BrandManagement;