'use client';

import styles from './not-found.module.css';

const NotFound = ({ navigateTo }) => {

  const navigateHome = () => {
    if (navigateTo) {
      navigateTo('home');
    } else {
      window.location.href = '/'; 
    }
  };

  const navigateBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        
        {/* BACKGROUND EFFECTS */}
        <div className={styles.backgroundEffects}>
          <div className={styles.gradient1}></div>
          <div className={styles.gradient2}></div>
          <div className={styles.gradient3}></div>
        </div>

        {/* HEADER */}
        <div className={styles.header}>
          <img 
            src="/images/TurboX.png" 
            alt="TurboX Logo" 
            className={styles.logo}
          />
        </div>

        {/* MAIN CONTENT */}
        <div className={styles.main}>
          
          {/* 404 NUMBER */}
          <div className={styles.errorNumber}>
            <span className={styles.four}>4</span>
            <div className={styles.zeroContainer}>
              <img 
                src="/carro/golf.png" 
                alt="Golf" 
                className={styles.carZero}
              />
            </div>
            <span className={styles.four}>4</span>
          </div>

          {/* ERROR MESSAGE */}
          <div className={styles.errorMessage}>
            <h1 className={styles.title}>Página Não Encontrada</h1>
            <p className={styles.subtitle}>
              Ops! Parece que você saiu da pista principal. 
              Esta página não existe ou foi movida para outro lugar.
            </p>
          </div>

          {/* FEATURED CAR */}
          <div className={styles.featuredCar}>
            <div className={styles.carContainer}>
              <img 
                src="/carro/i30.png" 
                alt="Hyundai i30" 
                className={styles.i30}
              />
              <div className={styles.carInfo}>
                <h3>Que tal dar uma olhada no i30?</h3>
                <p>Enquanto isso, confira nosso carro em destaque</p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className={styles.actions}>
            <button 
              onClick={navigateHome}
              className={styles.primaryBtn}
            >
              <span>⌂</span>
              Voltar ao Início
            </button>
            
            <button 
              onClick={navigateBack}
              className={styles.secondaryBtn}
            >
              <span>↩️</span>
              Página Anterior
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className={styles.quickLinks}>
            <h3>Links Rápidos:</h3>
            <div className={styles.linkGrid}>
              <button 
                onClick={() => navigateTo && navigateTo('carList')}
                className={styles.quickLink}
              >
                Catálogo de Carros
              </button>
              
              <button 
                onClick={() => navigateTo && navigateTo('simulation')}
                className={styles.quickLink}
              >
                Simulação
              </button>
              
              <button 
                onClick={() => navigateTo && navigateTo('about')}
                className={styles.quickLink}
              >
                ℹ️ Sobre o TurboX
              </button>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          <p>&copy; 2025 TurboX. Todas as rotas levam ao desempenho.</p>
        </div>

      </div>
    </div>
  );
};

export default NotFound;