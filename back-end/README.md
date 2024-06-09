markdown

# Gestión de Citas Universitarias - Documentación del Backend

## Descripción General
El backend del proyecto Gestión de Citas Universitarias está desarrollado en TypeScript y utiliza MongoDB como base de datos. Está estructurado para gestionar citas en un entorno universitario.

## Configuración e Instalación
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/justin-A18/gestion-citas-univesity.git
   cd gestion-citas-univesity/back-end

2. **Instalar dependencias:**
   ```bash
   npm install
3. **Configurar variables de entorno:**
- Renombrar .env.template a .env y completar las variables necesarias.

4. **Ejecutar el servidor de desarrollo:**
  ```bash
    npm run dev
  ```

## Base de Datos

- MongoDB: Utilizada para almacenar los datos de las citas. Mongoose se utiliza para la definición de esquemas y la interacción con MongoDB.

## Scripts
- Iniciar el servidor de desarrollo: npm run dev
- Construir para producción: npm run build

## Dependencias

- **Express:** Framework web para Node.js.
- **Mongoose:** Herramienta de modelado de objetos para MongoDB.
- **TypeScript:** Tipado y estructuración de código.
