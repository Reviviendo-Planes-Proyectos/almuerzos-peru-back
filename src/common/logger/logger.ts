import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';

// Configuración de Winston
const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => {
      const { timestamp, level, message, ...meta } = info as {
        timestamp: string;
        level: string;
        message: string;
        [key: string]: any;
      };
      return `${timestamp} [${level.toUpperCase()}]: ${String(message)} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
    })
  ),
  transports: [
    new winston.transports.Console()
    // Puedes agregar más transports aquí (archivos, http, etc)
  ]
});

export class AppLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    winstonLogger.info(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    winstonLogger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    winstonLogger.warn(message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    winstonLogger.debug(message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    winstonLogger.verbose(message, ...optionalParams);
  }
}

export const logger = new AppLogger();
