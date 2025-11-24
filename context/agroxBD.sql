CREATE EXTENSION IF NOT EXISTS pgcrypto; -- gen_random_uuid()

--CULTIVO
CREATE TABLE cultivo (
cultivo_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
nombre_comun TEXT NOT NULL,
nombre_cientifico TEXT,
taxonomia JSONB,
descripcion TEXT,
referencia_imagen_url TEXT,
creado_en TIMESTAMPTZ DEFAULT now()
);

--PLAGA
CREATE TABLE plaga (
plaga_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
nombre_comun TEXT NOT NULL,
nombre_cientifico TEXT,
origen TEXT,
tipo_plaga TEXT,
taxonomia JSONB,
descripcion TEXT,
referencia_imagen_url TEXT,
creado_en TIMESTAMPTZ DEFAULT now(),
UNIQUE (nombre_comun, nombre_cientifico)
);

--
CREATE TABLE plaga_cultivo (
plaga_id UUID NOT NULL REFERENCES plaga(plaga_id) ON DELETE CASCADE,
cultivo_id UUID NOT NULL REFERENCES cultivo(cultivo_id) ON DELETE CASCADE,
PRIMARY KEY (plaga_id, cultivo_id)
);

--SINTOMAS
CREATE TABLE sintoma (
sintoma_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
descripcion_visual TEXT NOT NULL,
ubicacion_plantapart TEXT,
visual_signatures JSONB,
creado_en TIMESTAMPTZ DEFAULT now()
);

--PLAGA-SINTOMA
CREATE TABLE plaga_sintoma (
plaga_id UUID REFERENCES plaga(plaga_id) ON DELETE CASCADE,
sintoma_id UUID REFERENCES sintoma(sintoma_id) ON DELETE CASCADE,
PRIMARY KEY (plaga_id, sintoma_id)
);
--IMAGENES
CREATE TABLE imagen (
imagen_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
cultivo_id UUID REFERENCES cultivo(cultivo_id),
nombre_original TEXT,
storage_url TEXT NOT NULL,
thumbnail_url TEXT,
storage_provider TEXT,
checksum TEXT,
width INT,
height INT,
filesize INT,
exif JSONB,
parte_planta TEXT,
fecha_subida TIMESTAMPTZ DEFAULT now()
);

--ANOTACION IMAGEN PARA DETECCION
CREATE TABLE anotacion_imagen (
anotacion_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
imagen_id UUID REFERENCES imagen(imagen_id) ON DELETE CASCADE,
tipo_anotacion TEXT,
etiqueta TEXT,
bbox JSONB,
mask_url TEXT,
metadata JSONB,
creado_en TIMESTAMPTZ DEFAULT now()
);

--RESULTADO IA POR IMAGEN
CREATE TABLE diagnostico (
  diagnostico_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  imagen_id UUID REFERENCES imagen(imagen_id) ON DELETE CASCADE,
  plaga_id UUID REFERENCES plaga(plaga_id), -- link al catálogo (si aplica)
  nombre_predicho TEXT,
  confianza NUMERIC(5,4) CHECK (confianza >= 0 AND confianza <= 1),
  severidad TEXT,
  modelo_version TEXT,
  salida_modelo JSONB,
  creado_en TIMESTAMPTZ DEFAULT now(),
  verificado BOOLEAN DEFAULT FALSE,
  verificado_por_contacto TEXT,
  notas_verificacion TEXT,
  export_pdf_url TEXT,
  share_token TEXT UNIQUE,
  share_token_expires TIMESTAMPTZ,
  compartido BOOLEAN DEFAULT FALSE
);

--
CREATE TABLE chat_sesion (
  sesion_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostico_id UUID REFERENCES diagnostico(diagnostico_id),
  token_sesion TEXT,
  iniciado_en TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE chat_mensaje (
  mensaje_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sesion_id UUID REFERENCES chat_sesion(sesion_id) ON DELETE CASCADE,
  rol_remitente TEXT,
  mensaje TEXT NOT NULL,
  metadata JSONB,
  creado_en TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE ficha_tecnica (
  ficha_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plaga_id UUID REFERENCES plaga(plaga_id),
  version INT DEFAULT 1,
  resumen TEXT,
  descripcion_completa TEXT,
  imagenes JSONB,
  recomendaciones TEXT,
  fuentes_validacion JSONB,
  creado_en TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE exportacion (
  export_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnostico_id UUID REFERENCES diagnostico(diagnostico_id),
  pdf_url TEXT,
  creado_en TIMESTAMPTZ DEFAULT now()
);
-- ============================
-- ÍNDICES recomendados (después de crear tablas)
-- ============================
-- Búsqueda rápida por nombre de plaga
CREATE INDEX IF NOT EXISTS idx_plaga_nombre_trgm ON plaga USING gin (nombre_comun gin_trgm_ops);

-- Consultas por cultivo (últimas imágenes)
CREATE INDEX IF NOT EXISTS idx_imagen_cultivo_fecha ON imagen (cultivo_id, fecha_subida DESC);

-- Buscar diagnósticos por imagen y por fecha
CREATE INDEX IF NOT EXISTS idx_diagnostico_imagen_fecha ON diagnostico (imagen_id, creado_en DESC);

-- Buscar diagnósticos por plaga
CREATE INDEX IF NOT EXISTS idx_diagnostico_plaga ON diagnostico (plaga_id);

-- Índice sobre anotaciones por imagen
CREATE INDEX IF NOT EXISTS idx_anotacion_imagen ON anotacion_imagen(imagen_id);