"use client";

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { useRouter } from 'next/navigation';

export default function RoutesLayout({ children }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Verificar autenticação
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsLoggedIn(true);
        } catch (err) {
          console.error('Erro ao parsear dados do usuário:', err);
        }
      }
    }
  }, []);

  const navigateTo = (page) => {
    switch (page) {
      case 'home':
        router.push('/home');
        break;
      case 'cars':
      case 'carList':
        router.push('/cars');
        break;
      case 'about':
        router.push('/about');
        break;
      case 'login':
        router.push('/login');
        break;
      case 'users':
        router.push('/users');
        break;
      default:
        router.push('/home');
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
    setUser(null);
    setIsLoggedIn(false);
    router.push('/home');
  };

  const getCurrentPage = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/home') return 'home';
      if (path === '/cars' || path.startsWith('/cars/')) return 'cars';
      if (path === '/about') return 'about';
      if (path === '/login') return 'login';
      if (path === '/users') return 'users';
    }
    return 'home';
  };

  return (
    <>
      <Navigation 
        isLoggedIn={isLoggedIn} 
        user={user} 
        onLogout={handleLogout} 
      />
      {children}
    </>
  );
}