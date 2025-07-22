import { Request, Response } from 'express';
import { LoggerMiddleware } from '../logger.middleware';

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
    jest.clearAllMocks();
  });

  it('should call next()', () => {
    (res.on as jest.Mock).mockImplementation((_event, _cb) => {});
    middleware.use(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it('should log when statusCode < 400', () => {
    const logSpy = jest.spyOn(middleware['logger'], 'log');
    (res.on as jest.Mock).mockImplementation((event, cb) => {
      res.statusCode = 200;
      cb();
    });
    middleware.use(req as Request, res as Response, next);
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/GET \/test 200 123b - \d+ms - 127.0.0.1 TestAgent/));
  });

  it('should log error when statusCode >= 400', () => {
    const errorSpy = jest.spyOn(middleware['logger'], 'error');
    (res.on as jest.Mock).mockImplementation((event, cb) => {
      res.statusCode = 404;
      cb();
    });
    middleware.use(req as Request, res as Response, next);
    expect(errorSpy).toHaveBeenCalledWith(expect.stringMatching(/GET \/test 404 123b - \d+ms - 127.0.0.1 TestAgent/));
  });

  it('should default User-Agent to empty string if not present', () => {
    req.get = jest.fn().mockReturnValue(undefined);
    const logSpy = jest.spyOn(middleware['logger'], 'log');
    (res.on as jest.Mock).mockImplementation((event, cb) => {
      res.statusCode = 200;
      cb();
    });
    middleware.use(req as Request, res as Response, next);
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/GET \/test 200 123b - \d+ms - 127.0.0.1 /));
  });

  it('should use 0b when Content-Length is missing', () => {
    res.get = jest.fn().mockReturnValue(undefined);
    const logSpy = jest.spyOn(middleware['logger'], 'log');
    (res.on as jest.Mock).mockImplementation((event, cb) => {
      res.statusCode = 200;
      cb();
    });
    middleware.use(req as Request, res as Response, next);
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/GET \/test 200 0b - \d+ms - 127.0.0.1 TestAgent/));
  });
});
