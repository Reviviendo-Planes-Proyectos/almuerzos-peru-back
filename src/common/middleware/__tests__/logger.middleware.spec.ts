import { LoggerMiddleware } from '../logger.middleware';
import { logger as mockLogger } from '../../../infrastructure/logger/logger';

jest.mock('../../../infrastructure/logger/logger', () => ({
  logger: {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn()
  }
}));

describe('LoggerMiddleware', () => {
  let middleware: LoggerMiddleware;
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    middleware = new LoggerMiddleware();
    req = {
      method: 'GET',
      originalUrl: '/test',
      ip: '127.0.0.1',
      get: jest.fn().mockReturnValue('test-agent')
    };
    res = {
      on: jest.fn((event, cb) => {
        res._cb = cb;
      }),
      get: jest.fn().mockReturnValue('123'),
      statusCode: 200
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('debe llamar logger.log para status < 400', () => {
    res.statusCode = 200;
    middleware.use(req, res, next);
    res._cb();
    expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('GET /test 200'), 'HTTP');
    expect(next).toHaveBeenCalled();
  });

  it('debe llamar logger.error para status 400', () => {
    res.statusCode = 400;
    middleware.use(req, res, next);
    res._cb();
    expect(mockLogger.error).toHaveBeenCalledWith(expect.stringContaining('GET /test 400'), undefined, 'HTTP');
    expect(next).toHaveBeenCalled();
  });

  it('debe llamar logger.error para status 500', () => {
    res.statusCode = 500;
    middleware.use(req, res, next);
    res._cb();
    expect(mockLogger.error).toHaveBeenCalledWith(expect.stringContaining('GET /test 500'), undefined, 'HTTP');
    expect(next).toHaveBeenCalled();
  });

  it('debe pasar correctamente user-agent y content-length', () => {
    req.get = jest.fn().mockReturnValue('Mozilla');
    res.get = jest.fn().mockReturnValue('456');
    res.statusCode = 201;
    middleware.use(req, res, next);
    res._cb();
    expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('Mozilla'), 'HTTP');
    expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('456b'), 'HTTP');
    expect(next).toHaveBeenCalled();
  });

  it('debe llamar next siempre', () => {
    res.statusCode = 200;
    middleware.use(req, res, next);
    res._cb();
    expect(next).toHaveBeenCalled();
    res.statusCode = 404;
    middleware.use(req, res, next);
    res._cb();
    expect(next).toHaveBeenCalled();
  });

  it('debe manejar correctamente cuando no hay User-Agent', () => {
    req.get = jest.fn().mockReturnValue(undefined);
    res.statusCode = 200;
    middleware.use(req, res, next);
    res._cb();
    expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('GET /test 200'), 'HTTP');
    expect(next).toHaveBeenCalled();
  });

  it('debe manejar correctamente cuando no hay Content-Length', () => {
    res.get = jest.fn().mockReturnValue(undefined);
    res.statusCode = 200;
    middleware.use(req, res, next);
    res._cb();
    expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('0b'), 'HTTP');
    expect(next).toHaveBeenCalled();
  });

  it('debe calcular correctamente el tiempo de respuesta', () => {
    const startTime = Date.now();
    jest
      .spyOn(Date, 'now')
      .mockReturnValueOnce(startTime)
      .mockReturnValueOnce(startTime + 100);

    res.statusCode = 200;
    middleware.use(req, res, next);
    res._cb();

    expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('100ms'), 'HTTP');
    expect(next).toHaveBeenCalled();
  });

  it('debe incluir IP y User-Agent en el mensaje de log', () => {
    req.ip = '192.168.1.1';
    req.get = jest.fn().mockReturnValue('Custom-Agent/1.0');
    res.statusCode = 200;

    middleware.use(req, res, next);
    res._cb();

    expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('192.168.1.1 Custom-Agent/1.0'), 'HTTP');
    expect(next).toHaveBeenCalled();
  });
});
