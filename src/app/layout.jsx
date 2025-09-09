import "./globals.css";
import "./responsive.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const metadata = {
    title: "TurboX - Simulador de Preparações Automotivas",
    description: "O simulador de preparações automotivas mais avançado do Brasil. Transforme qualquer carro em uma máquina de alta performance com simulações realísticas.",
    keywords: "carros, tuning, preparação, turbo, performance, simulador, automotivo",
    author: "TurboX Team",
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    icons: {
        icon: "/icons/icon.png",
        apple: "/icons/icon.png",
    },
    openGraph: {
        title: "TurboX - Simulador de Preparações Automotivas",
        description: "O simulador de preparações automotivas mais avançado do Brasil.",
        type: "website",
        locale: "pt_BR",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <meta name="theme-color" content="#ff0000" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
                <style>{`
                  @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                  }

                  @keyframes glow {
                    from {
                      text-shadow: 
                        0 0 20px rgba(255, 0, 0, 0.9),
                        0 0 40px rgba(255, 0, 0, 0.6),
                        0 0 60px rgba(255, 0, 0, 0.3);
                    }
                    to {
                      text-shadow: 
                        0 0 30px rgba(255, 0, 0, 1),
                        0 0 60px rgba(255, 0, 0, 0.8),
                        0 0 80px rgba(255, 0, 0, 0.4);
                    }
                  }

                  @keyframes rotate360 {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }

                  @keyframes pulse {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
                    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.9; }
                  }

                  @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-30px); }
                  }

                  @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-100px); }
                    to { opacity: 1; transform: translateX(0); }
                  }

                  @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(100px); }
                    to { opacity: 1; transform: translateX(0); }
                  }

                  @keyframes slideInUp {
                    from { opacity: 0; transform: translateY(50px); }
                    to { opacity: 1; transform: translateY(0); }
                  }

                  @keyframes carRotate {
                    0% { transform: rotateY(0deg); }
                    25% { transform: rotateY(5deg); }
                    50% { transform: rotateY(0deg); }
                    75% { transform: rotateY(-5deg); }
                    100% { transform: rotateY(0deg); }
                  }

                  @keyframes backgroundMove {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(-30px, -30px) rotate(120deg); }
                    66% { transform: translate(30px, -30px) rotate(240deg); }
                    100% { transform: translate(0, 0) rotate(360deg); }
                  }

                  @keyframes sparkle {
                    0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1) rotate(180deg); }
                  }

                  /* Aplicar animações aos sparkles */
                  .sparkles span {
                    animation: sparkle 3s ease-in-out infinite;
                  }

                  .sparkles span:nth-child(1) { animation-delay: 0s; }
                  .sparkles span:nth-child(2) { animation-delay: 0.6s; }
                  .sparkles span:nth-child(3) { animation-delay: 1.2s; }
                  .sparkles span:nth-child(4) { animation-delay: 1.8s; }
                  .sparkles span:nth-child(5) { animation-delay: 2.4s; }
                `}</style>
            </head>
            <body>
                {children}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </body>
        </html>
    );
}
