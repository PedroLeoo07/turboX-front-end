'use client';

export default function Test() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Teste Simples</h1>
      <p>Se você está vendo esta página, o React está funcionando!</p>
      <p>Hora atual: {new Date().toLocaleString()}</p>
    </div>
  );
}