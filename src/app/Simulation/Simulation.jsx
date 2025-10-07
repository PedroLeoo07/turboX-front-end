"use client";

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import styles from './Simulation.module.css';

const API_URL = 'http://localhost:3001/api';

export default function Simulation({ car, navigateTo, isLoggedIn, user, onLogout }) {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableUpgrades, setAvailableUpgrades] = useState([]);

  const fetchBuilds = async () => {
    try {
      const response = await fetch(`${API_URL}/builds`);
      const data = await response.json();
      setBuilds(data);
    } catch (error) {
      console.error('Erro ao carregar builds:', error);
    }
  };

  const fetchUpgrades = async () => {
    try {
      const response = await fetch(`${API_URL}/upgrades`);
      const data = await response.json();
      setAvailableUpgrades(data);
    } catch (error) {
      console.error('Erro ao carregar upgrades:', error);
    }
  };

  const createBuild = async (buildData) => {
    try {
      const response = await fetch(`${API_URL}/builds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildData)
      });
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar build:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchBuilds();
    fetchUpgrades();
  }, []);
  const [selectedStage, setSelectedStage] = useState(0);
  const [selectedUpgrades, setSelectedUpgrades] = useState({
    intake: false,
    exhaust: false,
    turbo: false,
    intercooler: false,
    ecu: false,
    fuel: false,
    suspension: false,
    tires: false,
    brakes: false,
    clutch: false,
    lightweight: false,
    aerodynamics: false
  });
  const [buildName, setBuildName] = useState('');

  // Configurações base do carro (usando dados mock se não houver carro selecionado)
  const baseCar = car || {
    brand: 'Nissan',
    model: 'GT-R',
    power: 565,
    torque: 637,
    acceleration: 2.7,
    image: 'GT-R'
  };

  // Cálculos de performance baseados nos upgrades
  const calculatePerformance = () => {
    let powerBonus = 0;
    let torqueBonus = 0;
    let accelImprovement = 0;

    // Stage bonuses
    const stageBonuses = [
      { power: 0, torque: 0, accel: 0 },      // Stage 0 (stock)
      { power: 50, torque: 80, accel: 0.3 },  // Stage 1
      { power: 120, torque: 160, accel: 0.7 }, // Stage 2
      { power: 200, torque: 250, accel: 1.2 }  // Stage 3
    ];

    const stageBonus = stageBonuses[selectedStage];
    powerBonus += stageBonus.power;
    torqueBonus += stageBonus.torque;
    accelImprovement += stageBonus.accel;

    // Individual upgrade bonuses
  if (selectedUpgrades.intake) { powerBonus += 30; torqueBonus += 40; accelImprovement += 0.18; }
  if (selectedUpgrades.exhaust) { powerBonus += 50; torqueBonus += 60; accelImprovement += 0.28; }
  if (selectedUpgrades.turbo) { powerBonus += 180; torqueBonus += 200; accelImprovement += 0.7; }
  if (selectedUpgrades.intercooler) { powerBonus += 40; torqueBonus += 50; accelImprovement += 0.22; }
  if (selectedUpgrades.ecu) { powerBonus += 80; torqueBonus += 100; accelImprovement += 0.38; }
  if (selectedUpgrades.fuel) { powerBonus += 25; torqueBonus += 30; accelImprovement += 0.12; }
  if (selectedUpgrades.suspension) { accelImprovement += 0.18; }
  if (selectedUpgrades.tires) { accelImprovement += 0.28; }
  if (selectedUpgrades.brakes) { accelImprovement += 0.15; }
  if (selectedUpgrades.clutch) { accelImprovement += 0.13; }
  if (selectedUpgrades.lightweight) { powerBonus += 30; accelImprovement += 0.32; }
  if (selectedUpgrades.aerodynamics) { powerBonus += 18; accelImprovement += 0.19; }

    return {
      power: Math.round(baseCar.power + powerBonus),
      torque: Math.round(baseCar.torque + torqueBonus),
      acceleration: Math.max(0.5, baseCar.acceleration - accelImprovement).toFixed(1)
    };
  };

  const currentPerformance = calculatePerformance();
  const powerGain = currentPerformance.power - baseCar.power;
  const torqueGain = currentPerformance.torque - baseCar.torque;
  const accelGain = (baseCar.acceleration - parseFloat(currentPerformance.acceleration)).toFixed(1);

  const handleUpgradeToggle = (upgrade) => {
    setSelectedUpgrades(prev => ({
      ...prev,
      [upgrade]: !prev[upgrade]
    }));
  };

  const handleSaveBuild = async () => {
    if (!buildName.trim()) {
      alert('Por favor, digite um nome para a build!');
      return;
    }

    const buildData = {
      name: buildName,
      carId: baseCar.id || 1,
      carModel: `${baseCar.brand} ${baseCar.model}`,
      stage: selectedStage,
      performance: currentPerformance
    };

    try {
      const newBuild = await createBuild(buildData);
      
      // Adicionar upgrades selecionados à build
      for (const [upgradeKey, isSelected] of Object.entries(selectedUpgrades)) {
        if (isSelected) {
          // Procurar o upgrade correspondente na lista de upgrades disponíveis
          const upgrade = availableUpgrades.find(u => u.type === upgradeKey);
          if (upgrade) {
            await addUpgradeToBuild(newBuild.id, upgrade.id);
          }
        }
      }
      
      setBuildName('');
      alert('Build salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar build:', error);
      alert('Erro ao salvar build. Tente novamente.');
    }
  };

  const loadBuild = async (build) => {
    setSelectedStage(build.stage);
    // Carregar upgrades da build
    const buildUpgradesData = await getBuildUpgrades(build.id);
    const upgradesObj = {};
    buildUpgradesData.forEach(item => {
      upgradesObj[item.upgrade.type] = true;
    });
    setSelectedUpgrades(upgradesObj);
  };

  const shareableLink = `turbox.dev/build/${btoa(JSON.stringify({ stage: selectedStage, upgrades: selectedUpgrades, car: baseCar.model }))}`;

  const upgradeOptions = [
    { id: 'intake', name: 'Filtro de Ar Esportivo', cost: 'R$ 500', icon: 'Filtro' },
    { id: 'exhaust', name: 'Escape Esportivo', cost: 'R$ 2.500', icon: 'Escape' },
    { id: 'turbo', name: 'Turbo Upgrade', cost: 'R$ 8.000', icon: 'Turbo' },
    { id: 'intercooler', name: 'Intercooler HD', cost: 'R$ 3.000', icon: 'Intercooler' },
    { id: 'ecu', name: 'Reprogramação ECU', cost: 'R$ 1.500', icon: 'ECU' },
    { id: 'fuel', name: 'Sistema Combustível', cost: 'R$ 4.000', icon: 'Combustível' },
    { id: 'suspension', name: 'Suspensão Esportiva', cost: 'R$ 2.200', icon: 'Suspensão' },
    { id: 'tires', name: 'Pneus Semi-Slick', cost: 'R$ 3.500', icon: 'Pneus' },
    { id: 'brakes', name: 'Freios de Alta Performance', cost: 'R$ 2.800', icon: 'Freios' },
    { id: 'clutch', name: 'Embreagem Reforçada', cost: 'R$ 1.800', icon: 'Embreagem' },
    { id: 'lightweight', name: 'Alívio de Peso', cost: 'R$ 4.500', icon: 'Peso' },
    { id: 'aerodynamics', name: 'Kit Aerodinâmico', cost: 'R$ 3.200', icon: 'Aero' }
  ];

  return (
    <div className={styles.simulationContainer}>
      <Navigation 
        currentPage="simulation" 
        navigateTo={navigateTo} 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLogout={onLogout} 
      />
      
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Simulação de Performance</h1>
          <p className={styles.subtitle}>
            Configure upgrades e veja como afetam a performance do seu carro
          </p>
        </div>

        <div className={styles.carSelection}>
          <div className={styles.selectedCar}>
            <div className={styles.carImage}>{baseCar.image}</div>
            <div className={styles.carInfo}>
              <h2>{baseCar.brand} {baseCar.model}</h2>
              <p>Configuração atual</p>
            </div>
          </div>
          
          {!car && (
            <button 
              onClick={() => navigateTo('cars')} 
              className={styles.selectCarButton}
            >
              Escolher Outro Carro
            </button>
          )}
        </div>

        <div className={styles.simulationContent}>
          <div className={styles.leftPanel}>
            <section className={styles.stageSelection}>
              <h3 className={styles.sectionTitle}>Estágio de Preparação</h3>
              <div className={styles.stageButtons}>
                {['Stock', 'Stage 1', 'Stage 2', 'Stage 3'].map((stage, index) => (
                  <button
                    key={index}
                    className={`${styles.stageButton} ${selectedStage === index ? styles.active : ''}`}
                    onClick={() => setSelectedStage(index)}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </section>

            <section className={styles.upgrades}>
              <h3 className={styles.sectionTitle}>Upgrades Individuais</h3>
              <div className={styles.upgradeGrid}>
                {upgradeOptions.map(upgrade => (
                  <div
                    key={upgrade.id}
                    className={`${styles.upgradeCard} ${selectedUpgrades[upgrade.id] ? styles.selected : ''}`}
                    onClick={() => handleUpgradeToggle(upgrade.id)}
                  >
                    <div className={styles.upgradeIcon}>{upgrade.icon}</div>
                    <div className={styles.upgradeInfo}>
                      <h4>{upgrade.name}</h4>
                      <p>{upgrade.cost}</p>
                    </div>
                    <div className={styles.upgradeCheckbox}>
                      {selectedUpgrades[upgrade.id] ? '✓' : '□'}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className={styles.rightPanel}>
            <section className={styles.performance}>
              <h3 className={styles.sectionTitle}>Performance Resultante</h3>
              
              <div className={styles.performanceComparison}>
                <div className={styles.performanceColumn}>
                  <h4>Original</h4>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>{baseCar.power}</div>
                    <div className={styles.statLabel}>CV</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>{baseCar.torque}</div>
                    <div className={styles.statLabel}>Nm</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>{baseCar.acceleration}</div>
                    <div className={styles.statLabel}>0-100s</div>
                  </div>
                </div>

                <div className={styles.arrow}>→</div>

                <div className={styles.performanceColumn}>
                  <h4>Modificado</h4>
                  <div className={`${styles.statCard} ${styles.modified}`}>
                    <div className={styles.statValue}>{currentPerformance.power}</div>
                    <div className={styles.statLabel}>CV</div>
                    {powerGain > 0 && (
                      <div className={styles.statGain}>+{powerGain}</div>
                    )}
                  </div>
                  <div className={`${styles.statCard} ${styles.modified}`}>
                    <div className={styles.statValue}>{currentPerformance.torque}</div>
                    <div className={styles.statLabel}>Nm</div>
                    {torqueGain > 0 && (
                      <div className={styles.statGain}>+{torqueGain}</div>
                    )}
                  </div>
                  <div className={`${styles.statCard} ${styles.modified}`}>
                    <div className={styles.statValue}>{currentPerformance.acceleration}</div>
                    <div className={styles.statLabel}>0-100s</div>
                    {accelGain > 0 && (
                      <div className={styles.statGain}>-{accelGain}s</div>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.performanceChart}>
                <h4>Ganho de Performance</h4>
                <div className={styles.chartBars}>
                  <div className={styles.chartBar}>
                    <div className={styles.barLabel}>Potência</div>
                    <div className={styles.barContainer}>
                      <div 
                        className={styles.barFill}
                        style={{ width: `${Math.min((powerGain / 200) * 100, 100)}%` }}
                      />
                    </div>
                    <div className={styles.barValue}>+{powerGain} CV</div>
                  </div>
                  
                  <div className={styles.chartBar}>
                    <div className={styles.barLabel}>Torque</div>
                    <div className={styles.barContainer}>
                      <div 
                        className={styles.barFill}
                        style={{ width: `${Math.min((torqueGain / 250) * 100, 100)}%` }}
                      />
                    </div>
                    <div className={styles.barValue}>+{torqueGain} Nm</div>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.saveShare}>
              <h3 className={styles.sectionTitle}>Salvar & Compartilhar</h3>
              
              <div className={styles.saveForm}>
                <input
                  type="text"
                  placeholder="Nome da build..."
                  value={buildName}
                  onChange={(e) => setBuildName(e.target.value)}
                  className={styles.buildNameInput}
                />
                <button onClick={handleSaveBuild} className={styles.saveButton}>
                  Salvar Build
                </button>
              </div>

              <div className={styles.shareSection}>
                <p>Link compartilhável:</p>
                <div className={styles.shareLink}>
                  <input
                    type="text"
                    value={shareableLink}
                    readOnly
                    className={styles.shareLinkInput}
                  />
                  <button 
                    onClick={() => navigator.clipboard.writeText(shareableLink)}
                    className={styles.copyButton}
                  >
                    ⎘
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {builds.length > 0 && (
          <section className={styles.savedBuilds}>
            <h3 className={styles.sectionTitle}>Builds Salvos</h3>
            <div className={styles.buildsGrid}>
              {builds.map(build => (
                <div key={build.id} className={styles.buildCard}>
                  <div className={styles.buildHeader}>
                    <h4>{build.name}</h4>
                    <span className={styles.buildDate}>{build.date}</span>
                  </div>
                  <p className={styles.buildCar}>{build.car}</p>
                  <div className={styles.buildStats}>
                    <span>{build.performance.power} CV</span>
                    <span>{build.performance.torque} Nm</span>
                    <span>{build.performance.acceleration}s</span>
                  </div>
                  <div className={styles.buildActions}>
                    <button 
                      onClick={() => loadBuild(build)}
                      className={styles.loadButton}
                    >
                      Carregar
                    </button>
                    <button 
                      onClick={() => deleteBuild(build.id)}
                      className={styles.deleteButton}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className={styles.navigationActions}>
          <button 
            onClick={() => navigateTo('cars')}
            className={styles.navActionButton}
          >
            Escolher Outro Carro
          </button>
          
          <button 
            onClick={() => navigateTo('home')}
            className={styles.navActionButton}
          >
            Voltar ao Início
          </button>
          
          {car && (
            <button 
              onClick={() => navigateTo('details', car)}
              className={styles.navActionButton}
            >
              Ver Detalhes do Carro
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
