export interface Usuario {
  id: string; // UUID
  nombre: string;
  email: string;
  rol: 'agricultor' | 'admin' | 'experto';
  fecha_creacion: string;
}

export interface Cultivo {
  id: number;
  nombre: string; // Ej: Uva, Palta
  descripcion?: string;
  imagen_url?: string;
}

export interface Plaga {
  id: number;
  nombre: string; // Ej: Oidium, Arañita Roja
  nombre_cientifico?: string;
  descripcion?: string;
  tratamiento_basico?: string; // Ficha técnica resumida
  cultivo_id: number;
}

export interface Diagnostico {
  id: string; // UUID
  usuario_id: string;
  imagen_url: string; // Ruta en Supabase Storage o local
  plaga_predicha: string;
  confianza: number; // Porcentaje 0-100
  severidad: 'Baja' | 'Media' | 'Alta';
  fecha_diagnostico: string;
  modelo_version: string;
  validado_por_experto: boolean;
}

export type Severidad = 'Baja' | 'Media' | 'Alta';