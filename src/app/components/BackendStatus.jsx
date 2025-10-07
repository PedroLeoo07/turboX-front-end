'use client';

import styles from './BackendStatus.module.css';

const BackendStatus = () => {
  // Hook removido - componente desabilitado
  const isOnline = true;
  const loading = false;
  const lastCheck = null;
  const checkStatus = () => {};

  if (loading && !lastCheck) {
    return (
      <div className={styles.status}>
        <div className={styles.indicator} data-status="checking">
          <div className={styles.pulse}></div>
        </div>
        <span className={styles.text}>Verificando conexão...</span>
      </div>
    );
  }

  return (
    <div className={styles.status}>
      <div 
        className={styles.indicator} 
        data-status={isOnline ? 'online' : 'offline'}
        onClick={checkStatus}
        title="Clique para verificar novamente"
      >
        <div className={styles.dot}></div>
      </div>
      
      <div className={styles.info}>
        <span className={styles.text}>
          {isOnline ? 'Backend Online' : 'Backend Offline'}
        </span>
        
        {lastCheck && (
          <span className={styles.lastCheck}>
            Última verificação: {lastCheck.toLocaleTimeString('pt-BR')}
          </span>
        )}
      </div>

      {!isOnline && (
        <div className={styles.warning}>
          <span>!</span>
          <span>Algumas funcionalidades podem não estar disponíveis</span>
        </div>
      )}
    </div>
  );
};

export default BackendStatus;