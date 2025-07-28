import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../../infrastructure/logger/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('User-Agent') || '';
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('Content-Length');
      const responseTime = Date.now() - startTime;
      const logMessage = `${method} ${originalUrl} ${statusCode} ${contentLength || 0}b - ${responseTime}ms - ${ip} ${userAgent}`;
      if (statusCode >= 400) {
        logger.error(logMessage, undefined, 'HTTP');
      } else {
        logger.log(logMessage, 'HTTP');
      }
    });

    next();
  }
}
