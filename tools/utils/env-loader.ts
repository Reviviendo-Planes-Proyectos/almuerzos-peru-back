import * as dotenv from 'dotenv';
import { existsSync } from 'fs';

/**
 * Carga las variables de entorno de forma inteligente
 * Prioridad: .env.local > .env.{NODE_ENV} > .env
 * Soporta configuración específica para Docker
 */
export function loadEnvironment(): void {
  const nodeEnv = process.env.NODE_ENV || 'development';

  // Detectar si estamos en Docker
  const isDocker = process.env.DOCKER_ENV === 'true' || process.env.DB_HOST === 'postgres' || existsSync('/.dockerenv');

  // Orden de prioridad para archivos de configuración
  const envFiles = [
    // Archivos locales (con credenciales reales) - MÁXIMA PRIORIDAD
    `./config/environments/${nodeEnv}.local.env`,
    ...(isDocker ? [`./config/environments/${nodeEnv}.docker.local.env`] : []),

    // Templates (fallback)
    `./config/environments/${nodeEnv}.env`,
    ...(isDocker ? [`./config/environments/${nodeEnv}.docker.env`] : []),

    './.env' // Fallback final
  ];

  console.log(`🔍 Entorno detectado: ${nodeEnv}${isDocker ? ' (Docker)' : ''}`);

  // Buscar y cargar el primer archivo que exista
  for (const envFile of envFiles) {
    if (existsSync(envFile)) {
      console.log(`📁 Cargando configuración desde: ${envFile}`);
      dotenv.config({ path: envFile });
      return;
    }
  }

  console.warn('⚠️  No se encontró ningún archivo de configuración válido');
}

/**
 * Valida que las variables de entorno requeridas estén disponibles
 */
export function validateRequiredEnvVars(requiredVars: string[]): void {
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`❌ Variables de entorno faltantes: ${missingVars.join(', ')}`);
  }
}

/**
 * Configuración específica para conexión a base de datos
 */
export function getDatabaseConfig() {
  const requiredVars = ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME'];
  validateRequiredEnvVars(requiredVars);

  return {
    type: 'postgres' as const,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    synchronize: false,
    logging: false
  };
}
