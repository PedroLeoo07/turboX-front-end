"use client";

import { useState } from 'react';
import styles from './Navigation.module.css';

export default function Navigation({ currentPage, navigateTo, isLoggedIn, user, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'cars', label: 'Carros', icon: '🚗' },
    { id: 'users', label: 'Usuários', icon: '👥' },
    { id: 'about', label: 'Sobre Mim', icon: '👤' },
  ];

  const handleAuthAction = () => {
    if (isLoggedIn) {
      onLogout();
    } else {
      navigateTo('login');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.logo} onClick={() => navigateTo('home')}>
        <img 
          src="/images/logo.png" 
          alt="TurboX - Simulador de Preparações Automotivas" 
          className={styles.logoImage}
        />
      </div>

      {/* Botão hamburger para mobile */}
      <button 
        className={styles.mobileMenuButton} 
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
      >
        <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      
      <div className={`${styles.navItems} ${isMobileMenuOpen ? styles.navItemsMobileOpen : ''}`}>
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
