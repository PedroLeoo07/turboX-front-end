"use client";

import { useState, useEffect } from 'react';

// Hook para detectar tamanho da tela
export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Detectar tamanho inicial
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
}

// Componente que renderiza conteúdo baseado no tamanho da tela
export function ResponsiveComponent({ mobile, tablet, desktop, children }) {
  const { isMobile, isTablet, isDesktop } = useScreenSize();

  if (isMobile && mobile) return mobile;
  if (isTablet && tablet) return tablet;
  if (isDesktop && desktop) return desktop;
  
  return children || null;
}

// Componente para mostrar apenas em mobile
export function MobileOnly({ children }) {
  const { isMobile } = useScreenSize();
  return isMobile ? children : null;
}

// Componente para mostrar apenas em tablet
export function TabletOnly({ children }) {
  const { isTablet } = useScreenSize();
  return isTablet ? children : null;
}

// Componente para mostrar apenas em desktop
export function DesktopOnly({ children }) {
  const { isDesktop } = useScreenSize();
  return isDesktop ? children : null;
}

// Breakpoints do TurboX
export const breakpoints = {
  xs: 360,
  sm: 576, 
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

// Função para verificar se está em um breakpoint específico
export function useBreakpoint(breakpoint) {
  const { width } = useScreenSize();
  return width >= breakpoints[breakpoint];
}
