"use client";

import { useState } from 'react';
import Loading from './components/Loading';
import Home from './home/Home';
import styles from './page.module.css';

export default function Main() {
  const [showHome, setShowHome] = useState(false);

  const handleLoadingComplete = () => {
    setShowHome(true);
  };

  return (
    <main className={styles.main}>
      {!showHome ? (
        <Loading onComplete={handleLoadingComplete} />
      ) : (
        <Home />
      )}
    </main>
  );
}
