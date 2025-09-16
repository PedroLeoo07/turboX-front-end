"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import styles from '../../login/Login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simular login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular dados do usuário
      const userData = {
        id: 1,
        name: 'Leonardo Oliveira',
        email: formData.email,
        username: 'leonardo'
      };

      // Salvar no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', 'fake-jwt-token');
        localStorage.setItem('user', JSON.stringify(userData));
      }

      toast.success('Login realizado com sucesso!', {
        position: "top-right",
        autoClose: 3000,
      });

      // Redirecionar para home
      router.push('/home');
      
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <div className={styles.loginHeader}>
          <div className={styles.logoSection}>
            <span className={styles.logoIcon}>🏎️</span>
            <h1 className={styles.logoText}>TurboX</h1>
          </div>
          <h2 className={styles.welcomeText}>Bem-vindo de volta!</h2>
          <p className={styles.subtitle}>Faça login para continuar sua jornada automotiva</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="••••••••"
              required
            />
          </div>

          <div className={styles.formOptions}>
            <label className={styles.checkbox}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
              Lembrar de mim
            </label>
            <a href="#" className={styles.forgotPassword}>
              Esqueceu a senha?
            </a>
          </div>

          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}>⏳</span>
                Entrando...
              </>
            ) : (
              <>
                <span>🚀</span>
                Entrar
              </>
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span>ou</span>
        </div>

        <div className={styles.socialLogin}>
          <button className={styles.socialButton}>
            <span>🔍</span>
            Continuar com Google
          </button>
          <button className={styles.socialButton}>
            <span>📘</span>
            Continuar com Facebook
          </button>
        </div>

        <div className={styles.signupPrompt}>
          <p>
            Não tem uma conta? 
            <a href="#" className={styles.signupLink}>Cadastre-se aqui</a>
          </p>
        </div>

        <div className={styles.demoCredentials}>
          <h3>Demo Credentials:</h3>
          <p>Email: demo@turbx.com</p>
          <p>Senha: demo123</p>
        </div>
      </div>

      <div className={styles.backgroundEffects}>
        <div className={styles.effect1}></div>
        <div className={styles.effect2}></div>
        <div className={styles.effect3}></div>
      </div>
    </div>
  );
}