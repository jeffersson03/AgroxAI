import type { Metadata } from "next";
import ThemeRegistry from "@/components/layout/ThemeRegistry";
import Navbar from "@/components/layout/Navbar"; // Import Navbar
import './globals.css';

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
      <body>
        <ThemeRegistry>
          <Navbar /> {/* Add Navbar here */}
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
