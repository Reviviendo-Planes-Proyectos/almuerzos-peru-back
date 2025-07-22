import { LoggerMiddleware } from './logger.middleware';
import { Request, Response } from 'express';

describe('LoggerMiddleware', () => {
  let middleware: LoggerMiddleware;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    middleware = new LoggerMiddleware();
    req = {
      method: 'GET',
      originalUrl: '/test',
      ip: '127.0.0.1',
      get: jest.fn().mockReturnValue('TestAgent')
    };
    res = {
      on: jest.fn(),
      get: jest.fn().mockReturnValue('123'),
      statusCode: 200
    };
    next = jest.fn();
  });

  it('should call next()', () => {
    (res.on as jest.Mock).mockImplementation((_event, _cb) => {});
    middleware.use(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it('should log on finish event with status < 400', () => {
    const logSpy = jest.spyOn(middleware['logger'], 'log');
    (res.on as jest.Mock).mockImplementation((event, cb) => {
      res.statusCode = 200;
      cb();
    });
    middleware.use(req as Request, res as Response, next);
    expect(logSpy).toHaveBeenCalled();
  });

  it('should error log on finish event with status >= 400', () => {
    const errorSpy = jest.spyOn(middleware['logger'], 'error');
    (res.on as jest.Mock).mockImplementation((event, cb) => {
      res.statusCode = 404;
      cb();
    });
    middleware.use(req as Request, res as Response, next);
    expect(errorSpy).toHaveBeenCalled();
  });
});
