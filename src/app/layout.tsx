import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/layout/ThemeRegistry";
import Navbar from "@/components/layout/Navbar"; // Asegúrate de tener este componente

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgroxAI - Diagnóstico Agrícola",
  description: "Inteligencia artificial para detección de plagas en Ica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" style={{ scrollBehavior: 'smooth' }}>
      <body className={inter.className}>
        <ThemeRegistry>
          {/* Aquí va la barra de navegación fija */}
          <Navbar />
          <main>{children}</main>
        </ThemeRegistry>
      </body>
    </html>
  );
}