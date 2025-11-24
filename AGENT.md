## Proyecto agroxAI
El proyecto tendrá como finalidad la función de subir una imagen en la cual la IA entrenada con imagenes de plagas, arrojará resultado de que plaga puede ser, teniendo un nivel de confianza, mientras que hay un chat para poder responder preguntas de que tiene la planta o una parte de la fruta, como uvas, naranjas, mangos, etc.

## Objetivo General
Desarrollar una plataforma web que identifique plagas de interés económico en cultivos de la región Ica mediante análisis de imágenes y asistencia conversacional, generando diagnósticos automáticos y recomendaciones técnicas.

## 1. Funciones clave
- Recibir una imagen
- Predecir la plaga
- Mostrar nivel confianza
- Evaluar severidad
- Generar una ficha técnica
- Guardar el diagnóstico
- Mantener un pequeño historial
- (Opcional) Permitir chat contextual por caso

## 2. Flujo de trabajo
1. Entrada: El usuario sube foto -> Se guarda en imagen.
2. Inferencia: El modelo analiza la foto -> Guarda resultados en diagnostico (con modelo_version).
3. Consumo:
- El usuario ve el resultado y la ficha_tecnica.
- El usuario chatea sobre el resultado (chat_sesion vinculado a diagnostico).

## 3. Contexto
- Base de datos en '/context/agroxBD'
- Reglas en 'AGENT.md'

## 4. Desarrollo
- Cada función que se cree deberá ponerse en Snake_Case para poder identificar, antes de cada función tienes que mostrar comentarios de que es lo que hace, con que se conecta especificamente
- Las variables tendrán formato camelCase 
- Despues de cada artificio también colocar comentarios
- Aplica la metodología TDD
- La parte del cliente será creada con React 
- La parte del backend se gestionará con NextJS para poder analizar con IA
- Si no hay contexto de un directorio a donde se guardarán las imagenes, usa urls de ejemplo para después poder reemplazarlos

## 5. Diseño
- Se utilizará MUI: Material UI, libreria de React para los estilos
- Si hay una idea que tengo para poner animaciones usa Framer Notion
- Si se requiere crear propios estilos se hará con CSS puro.
