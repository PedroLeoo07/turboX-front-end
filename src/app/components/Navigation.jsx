"use client";

import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import Image from 'next/image';

export default function Navigation({ currentPage, navigateTo, isLoggedIn, user, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Home', icon: '' },
    { id: 'carList', label: 'Carros', icon: '' },
    { id: 'comparador', label: 'Comparador', icon: '' },
    { id: 'blog', label: 'Blog', icon: '' },
    { id: 'simulation', label: 'Simulação', icon: '' },
    { id: 'about', label: 'Sobre', icon: '' },
  ];
  const adminItems = [
    { id: 'admin-panel', label: 'Painel Admin', icon: '' },
    { id: 'user-management', label: 'Usuários', icon: '' },
    { id: 'brand-management', label: 'Marcas', icon: '' },
  ];

  const isAdmin = user && user.role === 'admin';
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
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
    if (navigateTo && typeof navigateTo === 'function') {
      navigateTo(page);
    }
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsMobileMenuOpen(false);
  };

  const handleOverlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen(false);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  return (
    <nav className={styles.navigation}>
      {/* Header Principal */}
      <div className={styles.navHeader}>
        <button onClick={() => navigateTo('home')} className={styles.logo}>
          <Image
            src="/images/TurboX.png"
            alt="Logo TurboX"
            width={110}
            height={110}
            className={styles.logoImg}
            priority
          />
        </button>

        {/* Menu Desktop */}
        <div className={styles.desktopMenu}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`${styles.desktopNavItem} ${currentPage === item.id ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          ))}
          
          {/* Menu Administrativo - só para admins */}
          {isAdmin && (
            <>
              <div className={styles.divider}></div>
              {adminItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`${styles.desktopNavItem} ${styles.adminItem} ${currentPage === item.id ? styles.active : ''}`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </button>
              ))}
            </>
          )}
        </div>

        {/* Seção do Usuário Desktop */}
        <div className={styles.desktopUserSection}>
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
            <span className={styles.authIcon}></span>
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
      <div 
        className={`${styles.mobileMenuSlide} ${isMobileMenuOpen ? styles.open : ''}`}
        onClick={handleMenuClick}
      >
        {/* Header do Menu Mobile */}
        <div className={styles.mobileHeader}>
          <div className={styles.mobileBrand} style={{ gap: 0 }}>
            <Image
              src="/images/TurboX.png"
              alt="Logo TurboX"
              width={40}
              height={40}
              priority
            />
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
                onClick={() => handleNavigate(item.id)}
                onTouchStart={() => handleNavigate(item.id)}
                className={`${styles.mobileNavCard} ${currentPage === item.id ? styles.activeCard : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                type="button"
              >
                <div className={styles.cardIcon}>{item.icon}</div>
                <span className={styles.cardLabel}>{item.label}</span>
                <div className={styles.cardIndicator}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Administração Mobile - só para admins */}
        {isAdmin && (
          <div className={styles.mobileNavSection}>
            <h3 className={styles.mobileSectionTitle}>Administração</h3>
            <div className={styles.mobileNavGrid}>
              {adminItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  onTouchStart={() => handleNavigate(item.id)}
                  className={`${styles.mobileNavCard} ${styles.adminCard} ${currentPage === item.id ? styles.activeCard : ''}`}
                  style={{ animationDelay: `${(navItems.length + index) * 0.1}s` }}
                  type="button"
                >
                  <div className={styles.cardIcon}>{item.icon}</div>
                  <span className={styles.cardLabel}>{item.label}</span>
                  <div className={styles.cardIndicator}></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ações Mobile */}
        <div className={styles.mobileActions}>
          <button
            className={`${styles.mobileAuthButton} ${isLoggedIn ? styles.logoutButton : styles.loginButton}`}
            onClick={handleAuthAction}
            onTouchStart={handleAuthAction}
            type="button"
          >
            <span className={styles.actionIcon}>
              {isLoggedIn ? 'Sair' : 'Login'}
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
          onClick={handleOverlayClick}
          onTouchStart={handleOverlayClick}
        />
      )}
    </nav>
  );
}

