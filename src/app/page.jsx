"use client";

import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import dos componentes principais
import Home from './home/Home';
import CarList from './carList/CarList';
import CarDetails from './car/CarDetails';
import About from './about/About';
import Login from './login/Login';
import Simulation from './Simulation/Simulation';
import Loading from './components/Loading';

export default function App() {
  const [currentPage, setCurrentPage] = useState('loading');
  const [selectedCar, setSelectedCar] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se há usuário logado ao carregar
  useEffect(() => {
    const savedUser = localStorage.getItem('turboX_user');
    if (savedUser && savedUser !== 'undefined') {
      try {
        const userData = JSON.parse(savedUser);
        if (userData && typeof userData === 'object') {
          setUser(userData);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('turboX_user');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        localStorage.removeItem('turboX_user');
      }
    } else if (savedUser === 'undefined') {
      localStorage.removeItem('turboX_user');
    }
  }, []);

  const navigateTo = (page, car = null, params = null) => {
    setSelectedCar(car);
    setCurrentPage(page);
    
    // Se houver parâmetros adicionais, você pode processá-los aqui
    if (params && params.brand) {
      // Por exemplo, filtrar por marca na lista de carros
      console.log('Filtrar por marca:', params.brand);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('turboX_user', JSON.stringify(userData));
    navigateTo('home');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('turboX_user');
    navigateTo('home');
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setCurrentPage('home');
  };

  if (isLoading || currentPage === 'loading') {
    return <Loading onComplete={handleLoadingComplete} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            navigateTo={navigateTo}
            isLoggedIn={isLoggedIn}
            user={user}
            onLogout={handleLogout}
          />
        );
      case 'carList':
        return (
          <CarList 
            navigateTo={navigateTo}
            isLoggedIn={isLoggedIn}
            user={user}
            onLogout={handleLogout}
          />
        );
      case 'car':
        return (
          <CarDetails 
            car={selectedCar}
            navigateTo={navigateTo}
            isLoggedIn={isLoggedIn}
            user={user}
            onLogout={handleLogout}
          />
        );
      case 'about':
        return (
          <About 
            navigateTo={navigateTo}
            isLoggedIn={isLoggedIn}
            user={user}
            onLogout={handleLogout}
          />
        );
      case 'login':
        return (
          <Login 
            navigateTo={navigateTo}
            onLogin={handleLogin}
          />
        );
      case 'simulation':
        return (
          <Simulation 
            navigateTo={navigateTo}
            isLoggedIn={isLoggedIn}
            user={user}
            onLogout={handleLogout}
            selectedCar={selectedCar}
          />
        );
      default:
        return (
          <Home 
            navigateTo={navigateTo}
            isLoggedIn={isLoggedIn}
            user={user}
            onLogout={handleLogout}
          />
        );
    }
  };

  return (
    <>
      {renderCurrentPage()}
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
