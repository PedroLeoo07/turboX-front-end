"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Navigation from '../components/Navigation';
import styles from './Comparador.module.css';

const API_URL = 'http://localhost:3001/api';

export default function ComparadorCarros({ navigateTo, isLoggedIn, user, onLogout }) {
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([null, null]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCars();
  }, []);

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

  const handleSelectCar = (index, carId) => {
    const car = cars.find(c => c.id === parseInt(carId));
    const newSelected = [...selectedCars];
    newSelected[index] = car;
    setSelectedCars(newSelected);
  };

  const clearComparison = () => {
    setSelectedCars([null, null]);
  };

  const getWinner = (value1, value2, higherIsBetter = true) => {
    if (!value1 || !value2) return null;
    if (higherIsBetter) {
      return value1 > value2 ? 'car1' : value1 < value2 ? 'car2' : 'tie';
    } else {
      return value1 < value2 ? 'car1' : value1 > value2 ? 'car2' : 'tie';
    }
  };

  const ComparisonRow = ({ label, value1, value2, unit, higherIsBetter = true }) => {
    const winner = getWinner(value1, value2, higherIsBetter);
    
    return (
      <div className={styles.comparisonRow}>
        <div className={`${styles.comparisonCell} ${winner === 'car1' ? styles.winner : ''}`}>
          <span className={styles.value}>{value1 || '-'}{value1 ? unit : ''}</span>
        </div>
        <div className={styles.comparisonLabel}>{label}</div>
        <div className={`${styles.comparisonCell} ${winner === 'car2' ? styles.winner : ''}`}>
          <span className={styles.value}>{value2 || '-'}{value2 ? unit : ''}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Navigation 
        currentPage="comparador" 
        navigateTo={navigateTo}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={onLogout}
      />

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Comparador de Carros</h1>
          <p className={styles.subtitle}>Compare lado a lado o desempenho de até 2 carros</p>
        </div>

        <div className={styles.selectionArea}>
          {[0, 1].map((index) => (
            <div key={index} className={styles.carSelector}>
              <h3>Carro {index + 1}</h3>
              <select
                value={selectedCars[index]?.id || ''}
                onChange={(e) => handleSelectCar(index, e.target.value)}
                className={styles.selectInput}
              >
                <option value="">Selecione um carro</option>
                {cars.map(car => (
                  <option key={car.id} value={car.id}>
                    {car.brand || car.marca} {car.model || car.modelo} ({car.year || car.ano})
                  </option>
                ))}
              </select>

              {selectedCars[index] && (
                <div className={styles.carPreview}>
                  <img 
                    src={selectedCars[index].image || selectedCars[index].imagem || '/images/car-placeholder.svg'} 
                    alt={`${selectedCars[index].brand || selectedCars[index].marca} ${selectedCars[index].model || selectedCars[index].modelo}`}
                    onError={(e) => {
                      e.target.src = '/images/car-placeholder.svg';
                    }}
                  />
                  <h4>{selectedCars[index].brand || selectedCars[index].marca} {selectedCars[index].model || selectedCars[index].modelo}</h4>
                  <p>{selectedCars[index].year || selectedCars[index].ano}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedCars[0] && selectedCars[1] && (
          <>
            <div className={styles.comparisonTable}>
              <h2 className={styles.sectionTitle}>Comparação de Performance</h2>
              
              <ComparisonRow 
                label="Potência"
                value1={selectedCars[0].power || selectedCars[0].potencia}
                value2={selectedCars[1].power || selectedCars[1].potencia}
                unit="hp"
                higherIsBetter={true}
              />
              
              <ComparisonRow 
                label="Torque"
                value1={selectedCars[0].torque}
                value2={selectedCars[1].torque}
                unit="Nm"
                higherIsBetter={true}
              />
              
              <ComparisonRow 
                label="Peso"
                value1={selectedCars[0].weight || selectedCars[0].peso}
                value2={selectedCars[1].weight || selectedCars[1].peso}
                unit="kg"
                higherIsBetter={false}
              />
              
              <ComparisonRow 
                label="0-100 km/h"
                value1={selectedCars[0].acceleration || selectedCars[0].zeroACem}
                value2={selectedCars[1].acceleration || selectedCars[1].zeroACem}
                unit="s"
                higherIsBetter={false}
              />
              
              <ComparisonRow 
                label="Preço"
                value1={selectedCars[0].price || selectedCars[0].preco}
                value2={selectedCars[1].price || selectedCars[1].preco}
                unit=" R$"
                higherIsBetter={false}
              />
            </div>

            <button onClick={clearComparison} className={styles.clearButton}>
              🔄 Nova Comparação
            </button>
          </>
        )}

        {!selectedCars[0] && !selectedCars[1] && (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🏁</span>
            <h3>Selecione 2 carros para comparar</h3>
            <p>Escolha os veículos acima e veja uma comparação detalhada de performance</p>
          </div>
        )}
      </main>
    </div>
  );
}
