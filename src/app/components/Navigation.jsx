"use client";

import styles from './Navigation.module.css';

export default function Navigation({ currentPage, navigateTo, isLoggedIn, user, onLogout }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'cars', label: 'Carros', icon: '🚗' },
    { id: 'about', label: 'Sobre Mim', icon: '👤' },
  ];

  const handleAuthAction = () => {
    if (isLoggedIn) {
      onLogout();
    } else {
      navigateTo('login');
    }
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.logo} onClick={() => navigateTo('home')}>
        <span className={styles.turbo}>TURBO</span>
        <span className={styles.x}>X</span>
      </div>
      
      <div className={styles.navItems}>
        {navItems.map(item => (
          <button
            key={item.id}
            className={`${styles.navItem} ${currentPage === item.id ? styles.active : ''}`}
            onClick={() => navigateTo(item.id)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.userSection}>
        {isLoggedIn && user ? (
          <div className={styles.userInfo}>
            <span className={styles.userIcon}>👨‍💻</span>
            <span className={styles.userName}>{user.name}</span>
          </div>
        ) : null}
        
        <button
          className={`${styles.authButton} ${isLoggedIn ? styles.logout : styles.login}`}
          onClick={handleAuthAction}
        >
          {isLoggedIn ? (
            <>
              <span className={styles.authIcon}>🚪</span>
              <span className={styles.authLabel}>Sair</span>
            </>
          ) : (
            <>
              <span className={styles.authIcon}>🔑</span>
              <span className={styles.authLabel}>Entrar</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
}
