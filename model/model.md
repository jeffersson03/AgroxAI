Paleta de colores
:root {
  /* --- BASE: Fondos Oscuros --- */
  /* El color más oscuro del fondo (para el body) */
  --bg-deep: #121212; 
  
  /* Un tono ligeramente más claro para tarjetas o secciones (simulando la textura) */
  --bg-surface: #1E1E1E; 
  
  /* Color para bordes sutiles o separadores */
  --border-subtle: #333333;

  /* --- ACENTOS: La Energía de la imagen --- */
  /* El color principal de las caras iluminadas (Amarillo Lima Ácido) */
  --accent-primary: #D4E632; 
  
  /* Variación para efectos de brillo o hover (Más claro) */
  --accent-glow: #E8F57D; 
  
  /* El color de las caras en sombra (Verde Oliva Tech) */
  --accent-dark: #8FA31C; 

  /* --- TIPOGRAFÍA --- */
  /* Blanco casi puro para legibilidad máxima sobre fondo oscuro */
  --text-main: #F0F0F0; 
  
  /* Gris medio para subtítulos o texto secundario */
  --text-muted: #9CA3AF; 
}
Botones:
body {
  background-color: var(--bg-deep);
  color: var(--text-main);
  font-family: 'Inter', sans-serif; /* Una fuente sans-serif limpia queda mejor */
}

.btn-neon {
  background-color: var(--accent-primary);
  color: var(--bg-deep);
  border: none;
  padding: 12px 24px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-neon:hover {
  background-color: var(--accent-glow);
  box-shadow: 0 0 20px rgba(212, 230, 50, 0.4); /* Resplandor del color acento */
  transform: translateY(-2px);
}
