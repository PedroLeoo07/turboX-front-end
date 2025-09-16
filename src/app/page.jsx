"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './components/Loading';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Simular um pequeno delay do loading e redirecionar para /home
    const timer = setTimeout(() => {
      router.push('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return <Loading onComplete={() => router.push('/home')} />;
}
