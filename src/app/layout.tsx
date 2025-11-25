import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import ThemeRegistry from "@/components/layout/ThemeRegistry";
import Navbar from "@/components/layout/Navbar"; // Import Navbar
import './globals.css';

const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AgroxAI",
  description: "Identificación de plagas con IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        <ThemeRegistry>
          <Navbar /> {/* Add Navbar here */}
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
