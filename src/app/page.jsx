"use client";

import { useState } from 'react';
import Loading from './components/Loading';
import Home from './home/Home';
import CarList from './carList/CarList';
import CarDetails from './car/CarDetails';
import About from './about/About';
import Simulation from './Simulation/Simulation';
import Login from './login/Login';
import styles from './page.module.css';

export default function Main() {
  const [showHome, setShowHome] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoadingComplete = () => {
    setShowLogin(true);
  };

  const navigateTo = (page, car = null) => {
    setCurrentPage(page);
    if (car) setSelectedCar(car);
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowHome(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login navigateTo={navigateTo} onLogin={handleLogin} />;
      case 'home':
        return <Home navigateTo={navigateTo} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />;
      case 'cars':
        return <CarList navigateTo={navigateTo} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />;
      case 'details':
        return <CarDetails car={selectedCar} navigateTo={navigateTo} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />;
      case 'about':
        return <About navigateTo={navigateTo} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />;
      case 'simulation':
        return <Simulation car={selectedCar} navigateTo={navigateTo} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />;
      default:
        return <Home navigateTo={navigateTo} isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />;
    }
  };

  return (
    <main className={styles.main}>
      {!showLogin ? (
        <Loading onComplete={handleLoadingComplete} />
      ) : !showHome ? (
        <Login navigateTo={navigateTo} onLogin={handleLogin} />
      ) : (
        renderPage()
      )}
    </main>
  );
}
