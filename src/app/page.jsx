"use client";

import { useState } from 'react';
import Loading from './components/Loading';
import Home from './home/Home';
import CarList from './carList/CarList';
import CarDetails from './car/CarDetails';
import About from './about/About';
import Simulation from './Simulation/Simulation';
import styles from './page.module.css';

export default function Main() {
  const [showHome, setShowHome] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(null);

  const handleLoadingComplete = () => {
    setShowHome(true);
  };

  const navigateTo = (page, car = null) => {
    setCurrentPage(page);
    if (car) setSelectedCar(car);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} />;
      case 'cars':
        return <CarList navigateTo={navigateTo} />;
      case 'details':
        return <CarDetails car={selectedCar} navigateTo={navigateTo} />;
      case 'about':
        return <About navigateTo={navigateTo} />;
      case 'simulation':
        return <Simulation car={selectedCar} navigateTo={navigateTo} />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  };

  return (
    <main className={styles.main}>
      {!showHome ? (
        <Loading onComplete={handleLoadingComplete} />
      ) : (
        renderPage()
      )}
    </main>
  );
}
