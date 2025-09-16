"use client";

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { useSimulations } from '../hooks/useBackend';
import styles from './Simulation.module.css';

export default function Simulation({ car, navigateTo }) {
  const { simulations, loading, createSimulation, fetchUserSimulations } = useSimulations();
  const [selectedStage, setSelectedStage] = useState(0);
  const [upgrades, setUpgrades] = useState({
    intake: false,
    exhaust: false,
    turbo: false,
    intercooler: false,
    ecu: false,
    fuel: false
  });
  const [buildName, setBuildName] = useState('');

  // Carregar simulações do usuário
  useEffect(() => {
    fetchUserSimulations();
  }, [fetchUserSimulations]);

  // Configurações base do carro (usando dados mock se não houver carro selecionado)
  const baseCar = car || {
    brand: 'Nissan',
    model: 'GT-R',
    power: 565,
    torque: 637,
    acceleration: 2.7,
    image: '🚗'
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
    if (upgrades.intake) { powerBonus += 15; torqueBonus += 20; accelImprovement += 0.1; }
    if (upgrades.exhaust) { powerBonus += 25; torqueBonus += 30; accelImprovement += 0.2; }
    if (upgrades.turbo) { powerBonus += 80; torqueBonus += 100; accelImprovement += 0.4; }
    if (upgrades.intercooler) { powerBonus += 20; torqueBonus += 25; accelImprovement += 0.15; }
    if (upgrades.ecu) { powerBonus += 40; torqueBonus += 50; accelImprovement += 0.25; }
    if (upgrades.fuel) { powerBonus += 10; torqueBonus += 15; accelImprovement += 0.05; }

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
    setUpgrades(prev => ({
      ...prev,
      [upgrade]: !prev[upgrade]
    }));
  };

  const handleSaveBuild = async () => {
    if (!buildName.trim()) {
      alert('Por favor, digite um nome para a build!');
      return;
    }

    const simulationData = {
      carId: baseCar.id || 1,
      carModel: `${baseCar.brand} ${baseCar.model}`,
      buildName: buildName,
      stage: selectedStage,
      upgrades: upgrades,
      performance: currentPerformance
    };

    const success = await createSimulation(simulationData);
    if (success) {
      setBuildName('');
      alert('Build salva com sucesso!');
    }
  };

  const loadBuild = (build) => {
    setSelectedStage(build.stage);
    setUpgrades({ ...build.upgrades });
  };

  const deleteBuild = (id) => {
    setSavedBuilds(prev => prev.filter(build => build.id !== id));
  };

  const shareableLink = `turbox.dev/build/${btoa(JSON.stringify({ stage: selectedStage, upgrades, car: baseCar.model }))}`;

  const upgradeOptions = [
    { id: 'intake', name: 'Filtro de Ar Esportivo', cost: 'R$ 500', icon: '🌪️' },
    { id: 'exhaust', name: 'Escape Esportivo', cost: 'R$ 2.500', icon: '💨' },
    { id: 'turbo', name: 'Turbo Upgrade', cost: 'R$ 8.000', icon: '🌀' },
    { id: 'intercooler', name: 'Intercooler HD', cost: 'R$ 3.000', icon: '❄️' },
    { id: 'ecu', name: 'Reprogramação ECU', cost: 'R$ 1.500', icon: '🧠' },
    { id: 'fuel', name: 'Sistema Combustível', cost: 'R$ 4.000', icon: '⛽' }
  ];

  return (
    <div className={styles.simulationContainer}>
      <Navigation currentPage="simulation" navigateTo={navigateTo} />
      
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
              🚗 Escolher Outro Carro
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
                    className={`${styles.upgradeCard} ${upgrades[upgrade.id] ? styles.selected : ''}`}
                    onClick={() => handleUpgradeToggle(upgrade.id)}
                  >
                    <div className={styles.upgradeIcon}>{upgrade.icon}</div>
                    <div className={styles.upgradeInfo}>
                      <h4>{upgrade.name}</h4>
                      <p>{upgrade.cost}</p>
                    </div>
                    <div className={styles.upgradeCheckbox}>
                      {upgrades[upgrade.id] ? '✅' : '⬜'}
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

                <div className={styles.arrow}>➡️</div>

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
                  💾 Salvar Build
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
                    📋
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {savedBuilds.length > 0 && (
          <section className={styles.savedBuilds}>
            <h3 className={styles.sectionTitle}>Builds Salvos</h3>
            <div className={styles.buildsGrid}>
              {savedBuilds.map(build => (
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
                      📂 Carregar
                    </button>
                    <button 
                      onClick={() => deleteBuild(build.id)}
                      className={styles.deleteButton}
                    >
                      🗑️
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
            🚗 Escolher Outro Carro
          </button>
          
          <button 
            onClick={() => navigateTo('home')}
            className={styles.navActionButton}
          >
            🏠 Voltar ao Início
          </button>
          
          {car && (
            <button 
              onClick={() => navigateTo('details', car)}
              className={styles.navActionButton}
            >
              📊 Ver Detalhes do Carro
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
