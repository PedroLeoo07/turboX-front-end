"use client";

import styles from './Navigation.module.css';

export default function Navigation({ currentPage, navigateTo }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'cars', label: 'Carros', icon: '🚗' },
    { id: 'about', label: 'Sobre Mim', icon: '👤' },
  ];

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
    </nav>
  );
}
