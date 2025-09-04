import "./globals.css";

export const metadata = {
    title: "TurboX",
    description: "Projeto TurboX - Plataforma de carros turbo",
    icons: {
        icon: "/icons/icon.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
