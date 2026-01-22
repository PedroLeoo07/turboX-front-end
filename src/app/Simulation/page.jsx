"use client";

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import styles from './Simulation.module.css';

const API_URL = 'http://localhost:3001/api';

export default function Simulation({ car, navigateTo, isLoggedIn, user, onLogout }) {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableUpgrades, setAvailableUpgrades] = useState([]);

  const fetchUpgrades = async () => {
    try {
      const response = await fetch(`${API_URL}/upgrades`);
      if (!response.ok) throw new Error('API não disponível');
      const data = await response.json();
      setAvailableUpgrades(data);
    } catch (error) {
      console.error('Erro ao carregar upgrades:', error);
      setAvailableUpgrades([]);
    }
  };

  useEffect(() => {
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
  const baseCar = car || {
    brand: 'Nissan',
    model: 'GT-R',
    power: 565,
    torque: 637,
    acceleration: 2.7,
    image: 'GT-R',
    engine: '3.8L V6 Twin-Turbo',
    drivetrain: 'AWD',
    category: 'supercar'
  };

  // Detecta características do motor baseado na string do engine
  const getEngineCharacteristics = () => {
    const engine = baseCar.engine || '';
    const isTurbo = engine.toLowerCase().includes('turbo');
    const isSupercharged = engine.toLowerCase().includes('supercharged');
    const isNaturallyAspirated = !isTurbo && !isSupercharged;
    
    // Detecta cilindros
    const cylinderMatch = engine.match(/V(\d+)|I(\d+)|Flat-(\d+)|Boxer/i);
    let cylinders = 4; // padrão
    if (cylinderMatch) {
      cylinders = parseInt(cylinderMatch[1] || cylinderMatch[2] || cylinderMatch[3] || 4);
    }
    if (engine.toLowerCase().includes('boxer')) cylinders = 4;
    
    // Detecta deslocamento
    const displacementMatch = engine.match(/(\d+\.?\d*)[Ll]/);
    const displacement = displacementMatch ? parseFloat(displacementMatch[1]) : 2.0;
    
    return { isTurbo, isSupercharged, isNaturallyAspirated, cylinders, displacement };
  };

  const calculatePerformance = () => {
    let powerBonus = 0;
    let torqueBonus = 0;
    let accelImprovement = 0;
    
    const engineChar = getEngineCharacteristics();
    const basePower = baseCar.power;
    const baseTorque = baseCar.torque;
    
    // Multiplicadores por categoria
    const categoryMultipliers = {
      'hypercar': 1.15,    // Carros de alto desempenho respondem melhor
      'supercar': 1.10,
      'esportivo': 1.00,
      'muscle': 0.95,
      'default': 1.00
    };
    const categoryMult = categoryMultipliers[baseCar.category] || 1.00;
    
    // ESTÁGIOS - baseados em potência base e tipo de aspiração
    const stageMultipliers = [
      { power: 0, torque: 0, accel: 0 }, // Stock
      // Stage 1 - Remapeamento + básico
      engineChar.isTurbo ? 
        { power: basePower * 0.12, torque: baseTorque * 0.15, accel: 0.25 } :
        engineChar.isSupercharged ?
          { power: basePower * 0.10, torque: baseTorque * 0.12, accel: 0.20 } :
          { power: basePower * 0.08, torque: baseTorque * 0.10, accel: 0.15 },
      // Stage 2 - Hardware médio
      engineChar.isTurbo ?
        { power: basePower * 0.25, torque: baseTorque * 0.30, accel: 0.60 } :
        engineChar.isSupercharged ?
          { power: basePower * 0.22, torque: baseTorque * 0.25, accel: 0.50 } :
          { power: basePower * 0.15, torque: baseTorque * 0.18, accel: 0.35 },
      // Stage 3 - Hardware pesado
      engineChar.isTurbo ?
        { power: basePower * 0.45, torque: baseTorque * 0.50, accel: 1.10 } :
        engineChar.isSupercharged ?
          { power: basePower * 0.40, torque: baseTorque * 0.45, accel: 0.95 } :
          { power: basePower * 0.25, torque: baseTorque * 0.28, accel: 0.60 }
    ];

    const stageBonus = stageMultipliers[selectedStage];
    powerBonus += stageBonus.power * categoryMult;
    torqueBonus += stageBonus.torque * categoryMult;
    accelImprovement += stageBonus.accel;

    // UPGRADES INDIVIDUAIS - Realistas por tipo de motor
    
    // Filtro de ar - maior ganho em NA, menor em turbo
    if (selectedUpgrades.intake) {
      if (engineChar.isNaturallyAspirated) {
        powerBonus += basePower * 0.04; // 4% em NA
        torqueBonus += baseTorque * 0.03;
        accelImprovement += 0.12;
      } else if (engineChar.isTurbo) {
        powerBonus += basePower * 0.02; // 2% em turbo
        torqueBonus += baseTorque * 0.025;
        accelImprovement += 0.08;
      } else {
        powerBonus += basePower * 0.03;
        torqueBonus += baseTorque * 0.035;
        accelImprovement += 0.10;
      }
    }

    // Escape - bom ganho em todos
    if (selectedUpgrades.exhaust) {
      if (engineChar.isNaturallyAspirated) {
        powerBonus += basePower * 0.07; // 7% em NA
        torqueBonus += baseTorque * 0.06;
        accelImprovement += 0.20;
      } else if (engineChar.isTurbo) {
        powerBonus += basePower * 0.05; // 5% em turbo
        torqueBonus += baseTorque * 0.06;
        accelImprovement += 0.18;
      } else {
        powerBonus += basePower * 0.06;
        torqueBonus += baseTorque * 0.07;
        accelImprovement += 0.22;
      }
    }

    // Turbo upgrade - APENAS para carros turbo, ganho massivo
    if (selectedUpgrades.turbo) {
      if (engineChar.isTurbo) {
        powerBonus += basePower * 0.35; // 35% com turbo maior
        torqueBonus += baseTorque * 0.40;
        accelImprovement += 0.65;
      } else if (engineChar.isNaturallyAspirated) {
        // Turbo kit em NA - ganho gigante mas caro
        powerBonus += basePower * 0.50; // 50% com turbo kit completo
        torqueBonus += baseTorque * 0.45;
        accelImprovement += 0.80;
      }
      // Supercharged não se beneficia de turbo
    }

    // Intercooler - só funciona em turbo/supercharged
    if (selectedUpgrades.intercooler) {
      if (engineChar.isTurbo) {
        powerBonus += basePower * 0.08; // 8% com intercooler melhor
        torqueBonus += baseTorque * 0.09;
        accelImprovement += 0.15;
      } else if (engineChar.isSupercharged) {
        powerBonus += basePower * 0.06;
        torqueBonus += baseTorque * 0.07;
        accelImprovement += 0.12;
      }
      // NA não tem intercooler
    }

    // ECU Remap - excelente em turbo, bom em todos
    if (selectedUpgrades.ecu) {
      if (engineChar.isTurbo) {
        powerBonus += basePower * 0.15; // 15% só com remap em turbo
        torqueBonus += baseTorque * 0.18;
        accelImprovement += 0.30;
      } else if (engineChar.isSupercharged) {
        powerBonus += basePower * 0.12;
        torqueBonus += baseTorque * 0.14;
        accelImprovement += 0.25;
      } else {
        powerBonus += basePower * 0.06; // 6% em NA
        torqueBonus += baseTorque * 0.08;
        accelImprovement += 0.15;
      }
    }

    // Sistema de combustível - necessário para altas potências
    if (selectedUpgrades.fuel) {
      const currentPower = basePower + powerBonus;
      if (currentPower > basePower * 1.3) { // Mais de 30% de ganho
        powerBonus += basePower * 0.05; // Destrava mais 5%
        torqueBonus += baseTorque * 0.05;
        accelImprovement += 0.10;
      } else {
        powerBonus += basePower * 0.02; // Ganho mínimo
        torqueBonus += baseTorque * 0.02;
        accelImprovement += 0.05;
      }
    }

    // Suspensão - melhora handling, não potência
    if (selectedUpgrades.suspension) {
      if (baseCar.drivetrain === 'AWD') {
        accelImprovement += 0.15; // AWD aproveita melhor
      } else if (baseCar.drivetrain === 'RWD') {
        accelImprovement += 0.20; // RWD precisa mais de tração
      } else {
        accelImprovement += 0.12; // FWD tem limitação
      }
    }

    // Pneus - crucial para tração
    if (selectedUpgrades.tires) {
      if (baseCar.drivetrain === 'AWD') {
        accelImprovement += 0.25;
      } else if (baseCar.drivetrain === 'RWD') {
        accelImprovement += 0.35; // RWD ganha muito com grip
      } else {
        accelImprovement += 0.20; // FWD limitado por wheelspin
      }
    }

    // Freios - não afeta aceleração diretamente
    if (selectedUpgrades.brakes) {
      accelImprovement += 0.08; // Confiança para entrar mais forte
    }

    // Embreagem - crucial para manual, menos para automático
    if (selectedUpgrades.clutch) {
      if (baseCar.transmission?.toLowerCase().includes('manual')) {
        accelImprovement += 0.18; // Manual aproveita muito
      } else {
        accelImprovement += 0.08; // DCT/Auto já é eficiente
      }
    }

    // Redução de peso - universal, escala com peso presumido
    if (selectedUpgrades.lightweight) {
      const weightReduction = engineChar.cylinders >= 8 ? 0.05 : 0.04; // V8+ são mais pesados
      powerBonus += basePower * weightReduction; // Peso reduzido = mais potência útil
      accelImprovement += baseCar.category === 'hypercar' ? 0.25 : 0.35;
    }

    // Aerodinâmica - melhor em alta velocidade
    if (selectedUpgrades.aerodynamics) {
      if (baseCar.category === 'hypercar' || baseCar.category === 'supercar') {
        powerBonus += basePower * 0.03; // Menos arrasto
        accelImprovement += 0.20;
      } else {
        powerBonus += basePower * 0.02;
        accelImprovement += 0.15;
      }
    }

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
      for (const [upgradeKey, isSelected] of Object.entries(selectedUpgrades)) {
        if (isSelected) {
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
    const buildUpgradesData = await getBuildUpgrades(build.id);
    const upgradesObj = {};
    buildUpgradesData.forEach(item => {
      upgradesObj[item.upgrade.type] = true;
    });
    setSelectedUpgrades(upgradesObj);
  };

  const shareableLink = `turbox.dev/build/${btoa(JSON.stringify({ stage: selectedStage, upgrades: selectedUpgrades, car: baseCar.model }))}`;

  // Função para calcular ganho estimado de cada upgrade
  const getUpgradeGains = (upgradeId) => {
    const engineChar = getEngineCharacteristics();
    const basePower = baseCar.power;
    
    switch(upgradeId) {
      case 'intake':
        return engineChar.isNaturallyAspirated ? 
          `+${Math.round(basePower * 0.04)}CV` : 
          `+${Math.round(basePower * 0.02)}CV`;
      case 'exhaust':
        return engineChar.isNaturallyAspirated ? 
          `+${Math.round(basePower * 0.07)}CV` : 
          `+${Math.round(basePower * 0.05)}CV`;
      case 'turbo':
        return engineChar.isTurbo ? 
          `+${Math.round(basePower * 0.35)}CV` : 
          engineChar.isNaturallyAspirated ? 
            `+${Math.round(basePower * 0.50)}CV (Kit)` : 
            'N/A';
      case 'intercooler':
        return engineChar.isTurbo || engineChar.isSupercharged ? 
          `+${Math.round(basePower * 0.08)}CV` : 
          'N/A (Apenas Turbo)';
      case 'ecu':
        return engineChar.isTurbo ? 
          `+${Math.round(basePower * 0.15)}CV` : 
          `+${Math.round(basePower * 0.06)}CV`;
      case 'fuel':
        return `+${Math.round(basePower * 0.05)}CV`;
      case 'suspension':
        return 'Melhor Tração';
      case 'tires':
        return baseCar.drivetrain === 'RWD' ? '-0.35s (0-100)' : '-0.25s (0-100)';
      case 'brakes':
        return 'Frenagem +40%';
      case 'clutch':
        return baseCar.transmission?.includes('Manual') ? 'Shift -30%' : 'Shift -15%';
      case 'lightweight':
        return `-${engineChar.cylinders >= 8 ? '150kg' : '100kg'}`;
      case 'aerodynamics':
        return 'Downforce +25%';
      default:
        return '';
    }
  };

  const upgradeOptions = [
    { 
      id: 'intake', 
      name: 'Filtro de Ar Esportivo', 
      cost: 'R$ 500', 
      icon: 'Filtro',
      gain: getUpgradeGains('intake')
    },
    { 
      id: 'exhaust', 
      name: 'Escape Esportivo', 
      cost: 'R$ 2.500', 
      icon: 'Escape',
      gain: getUpgradeGains('exhaust')
    },
    { 
      id: 'turbo', 
      name: getEngineCharacteristics().isTurbo ? 'Turbo Upgrade' : 'Turbo Kit', 
      cost: getEngineCharacteristics().isTurbo ? 'R$ 8.000' : 'R$ 25.000', 
      icon: 'Turbo',
      gain: getUpgradeGains('turbo'),
      disabled: getEngineCharacteristics().isSupercharged
    },
    { 
      id: 'intercooler', 
      name: 'Intercooler HD', 
      cost: 'R$ 3.000', 
      icon: 'Intercooler',
      gain: getUpgradeGains('intercooler'),
      disabled: getEngineCharacteristics().isNaturallyAspirated
    },
    { 
      id: 'ecu', 
      name: 'Reprogramação ECU', 
      cost: 'R$ 1.500', 
      icon: 'ECU',
      gain: getUpgradeGains('ecu')
    },
    { 
      id: 'fuel', 
      name: 'Sistema Combustível', 
      cost: 'R$ 4.000', 
      icon: 'Combustível',
      gain: getUpgradeGains('fuel')
    },
    { 
      id: 'suspension', 
      name: 'Suspensão Esportiva', 
      cost: 'R$ 2.200', 
      icon: 'Suspensão',
      gain: getUpgradeGains('suspension')
    },
    { 
      id: 'tires', 
      name: 'Pneus Semi-Slick', 
      cost: 'R$ 3.500', 
      icon: 'Pneus',
      gain: getUpgradeGains('tires')
    },
    { 
      id: 'brakes', 
      name: 'Freios de Alta Performance', 
      cost: 'R$ 2.800', 
      icon: 'Freios',
      gain: getUpgradeGains('brakes')
    },
    { 
      id: 'clutch', 
      name: 'Embreagem Reforçada', 
      cost: 'R$ 1.800', 
      icon: 'Embreagem',
      gain: getUpgradeGains('clutch')
    },
    { 
      id: 'lightweight', 
      name: 'Alívio de Peso', 
      cost: 'R$ 4.500', 
      icon: 'Peso',
      gain: getUpgradeGains('lightweight')
    },
    { 
      id: 'aerodynamics', 
      name: 'Kit Aerodinâmico', 
      cost: 'R$ 3.200', 
      icon: 'Aero',
      gain: getUpgradeGains('aerodynamics')
    }
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
                    className={`${styles.upgradeCard} ${selectedUpgrades[upgrade.id] ? styles.selected : ''} ${upgrade.disabled ? styles.disabled : ''}`}
                    onClick={() => !upgrade.disabled && handleUpgradeToggle(upgrade.id)}
                    title={upgrade.disabled ? 'Incompatível com este motor' : ''}
                  >
                    <div className={styles.upgradeIcon}>{upgrade.icon}</div>
                    <div className={styles.upgradeInfo}>
                      <h4>{upgrade.name}</h4>
                      <p className={styles.upgradeCost}>{upgrade.cost}</p>
                      {upgrade.gain && !upgrade.disabled && (
                        <p className={styles.upgradeGain}>{upgrade.gain}</p>
                      )}
                      {upgrade.disabled && (
                        <p className={styles.upgradeDisabled}>N/A</p>
                      )}
                    </div>
                    <div className={styles.upgradeCheckbox}>
                      {upgrade.disabled ? '✗' : selectedUpgrades[upgrade.id] ? '✓' : '□'}
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

