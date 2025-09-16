"use client";

import { useState, useEffect } from 'react';
import BackendStatus from './BackendStatus';
import styles from './Navigation.module.css';

export default function Navigation({ currentPage, navigateTo, isLoggedIn, user, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'cars', label: 'Carros', icon: '🚗' },
    { id: 'users', label: 'Usuários', icon: '👥' },
    { id: 'about', label: 'Sobre Mim', icon: '👤' },
  ];

  // Fechar menu ao redimensionar tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevenir scroll quando menu está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      onLogout();
    } else {
      navigateTo('login');
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigate = (page) => {
    navigateTo(page);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navigation}>
      {/* Header Principal */}
      <div className={styles.navHeader}>
        <div className={styles.logo} onClick={() => navigateTo('home')}>
          <span className={styles.logoIcon}>🏎️</span>
          <span className={styles.logoText}>TurboX</span>
        </div>

        {/* Menu Desktop */}
        <div className={styles.desktopMenu}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`${styles.desktopNavItem} ${currentPage === item.id ? styles.active : ''}`}
              onClick={() => handleNavigate(item.id)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Seção do Usuário Desktop */}
        <div className={styles.desktopUserSection}>
          <BackendStatus />
          
          {isLoggedIn && user && (
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>
                {(user.name || user.username || 'U').charAt(0).toUpperCase()}
              </div>
              <span className={styles.userName}>{user.name || user.username}</span>
            </div>
          )}
          
          <button
            className={`${styles.authButton} ${isLoggedIn ? styles.logout : styles.login}`}
            onClick={handleAuthAction}
          >
            <span className={styles.authIcon}>{isLoggedIn ? '🚪' : '🔑'}</span>
            <span className={styles.authLabel}>{isLoggedIn ? 'Sair' : 'Entrar'}</span>
          </button>
        </div>

        {/* Botão Menu Mobile */}
        <button 
          className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <div className={styles.hamburgerBox}>
            <div className={styles.hamburgerInner}></div>
          </div>
        </button>
      </div>

      {/* Menu Mobile Slide */}
      <div className={`${styles.mobileMenuSlide} ${isMobileMenuOpen ? styles.open : ''}`}>
        {/* Header do Menu Mobile */}
        <div className={styles.mobileHeader}>
          <div className={styles.mobileBrand}>
            <span className={styles.mobileBrandIcon}>🏎️</span>
            <div className={styles.mobileBrandText}>
              <h2>TurboX</h2>
              <p>Performance & Style</p>
            </div>
          </div>
          
          {isLoggedIn && user && (
            <div className={styles.mobileUserCard}>
              <div className={styles.mobileUserAvatar}>
                {(user.name || user.username || 'U').charAt(0).toUpperCase()}
              </div>
              <div className={styles.mobileUserInfo}>
                <span className={styles.mobileUserName}>
                  {user.name || user.username || 'Usuário'}
                </span>
                <span className={styles.mobileUserStatus}>● Online</span>
              </div>
            </div>
          )}
        </div>

        {/* Navegação Mobile */}
        <div className={styles.mobileNavSection}>
          <h3 className={styles.mobileSectionTitle}>Navegação</h3>
          <div className={styles.mobileNavGrid}>
            {navItems.map((item, index) => (
              <button
                key={item.id}
                className={`${styles.mobileNavCard} ${currentPage === item.id ? styles.activeCard : ''}`}
                onClick={() => handleNavigate(item.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.cardIcon}>{item.icon}</div>
                <span className={styles.cardLabel}>{item.label}</span>
                <div className={styles.cardIndicator}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Ações Mobile */}
        <div className={styles.mobileActions}>
          <button
            className={`${styles.mobileAuthButton} ${isLoggedIn ? styles.logoutButton : styles.loginButton}`}
            onClick={handleAuthAction}
          >
            <span className={styles.actionIcon}>
              {isLoggedIn ? '🚪' : '🔐'}
            </span>
            <span className={styles.actionText}>
              {isLoggedIn ? 'Sair da Conta' : 'Fazer Login'}
            </span>
          </button>
        </div>

        {/* Footer Mobile */}
        <div className={styles.mobileFooter}>
          <p>© 2024 TurboX - Todos os direitos reservados</p>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.overlay} 
          onClick={closeMobileMenu}
        />
      )}
    </nav>
  );
}
