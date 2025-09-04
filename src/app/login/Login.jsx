"use client";

import { useState } from 'react';
import styles from './Login.module.css';

export default function Login({ navigateTo, onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validar senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    // Validações específicas para cadastro
    if (isSignUp) {
      if (!formData.name) {
        newErrors.name = 'Nome é obrigatório';
      } else if (formData.name.length < 2) {
        newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Senhas não coincidem';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simular chamada para API
    setTimeout(() => {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: isSignUp ? formData.name : formData.email.split('@')[0],
        email: formData.email,
        avatar: '👨‍💻',
        memberSince: new Date().toLocaleDateString()
      };

      onLogin(userData);
      setIsLoading(false);
    }, 1500);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const handleDemoLogin = () => {
    const demoUser = {
      id: 'demo-user',
      name: 'Pedro Demo',
      email: 'demo@turbox.dev',
      avatar: '👨‍💻',
      memberSince: '01/01/2025'
    };
    onLogin(demoUser);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <div className={styles.logo} onClick={() => navigateTo('home')}>
            <span className={styles.turbo}>TURBO</span>
            <span className={styles.x}>X</span>
          </div>
          <h1 className={styles.title}>
            {isSignUp ? 'Criar Conta' : 'Entrar'}
          </h1>
          <p className={styles.subtitle}>
            {isSignUp 
              ? 'Junte-se à comunidade TurboX e salve suas builds favoritas'
              : 'Acesse sua conta e continue explorando carros turbo'
            }
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {isSignUp && (
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Nome Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.name ? styles.error : ''}`}
                placeholder="Digite seu nome"
              />
              {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              placeholder="Digite seu email"
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.password ? styles.error : ''}`}
              placeholder="Digite sua senha"
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
          </div>

          {isSignUp && (
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Confirmar Senha</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
                placeholder="Confirme sua senha"
              />
              {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword}</span>}
            </div>
          )}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className={styles.loading}>
                <span className={styles.spinner}>⚡</span>
                {isSignUp ? 'Criando conta...' : 'Entrando...'}
              </div>
            ) : (
              <>🚀 {isSignUp ? 'Criar Conta' : 'Entrar'}</>
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span>ou</span>
        </div>

        <button 
          onClick={handleDemoLogin}
          className={styles.demoButton}
        >
          🎮 Entrar como Demo
        </button>

        <div className={styles.footer}>
          <p>
            {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}
            <button 
              onClick={toggleMode}
              className={styles.toggleButton}
            >
              {isSignUp ? 'Fazer login' : 'Criar conta'}
            </button>
          </p>
        </div>

        <div className={styles.backToHome}>
          <button 
            onClick={() => navigateTo('home')}
            className={styles.backButton}
          >
            ← Voltar ao início
          </button>
        </div>
      </div>

      <div className={styles.features}>
        <h3>Por que criar uma conta?</h3>
        <div className={styles.featuresList}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>💾</span>
            <div>
              <h4>Salvar Builds</h4>
              <p>Guarde suas configurações favoritas de carros</p>
            </div>
          </div>
          
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📊</span>
            <div>
              <h4>Histórico de Simulações</h4>
              <p>Acompanhe todas as suas modificações</p>
            </div>
          </div>
          
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🤝</span>
            <div>
              <h4>Compartilhar</h4>
              <p>Divida suas builds com outros entusiastas</p>
            </div>
          </div>
          
          <div className={styles.feature}>
            <span className={styles.featureIcon}>⭐</span>
            <div>
              <h4>Carros Favoritos</h4>
              <p>Marque seus carros preferidos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
