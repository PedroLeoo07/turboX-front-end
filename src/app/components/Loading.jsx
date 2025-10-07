"use client";

import { useState, useEffect } from 'react';
import styles from './Loading.module.css';

export default function Loading({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) {
              onComplete();
            }
          }, 1000); // Aguarda 1 segundo após completar para dar tempo de ver o 100%
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.logoContainer}>
        <img 
          src="/images/logo.png" 
          alt="TurboX - Simulador de Preparações Automotivas" 
          className={styles.logoImage}
        />
        <div className={styles.tagline}>Acelere sua paixão</div>
      </div>
      
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className={styles.progressText}>
          {Math.round(Math.min(progress, 100))}%
        </div>
      </div>

      <div className={styles.loadingText}>
        Preparando sua experiência turbo...
      </div>
    </div>
  );
}
