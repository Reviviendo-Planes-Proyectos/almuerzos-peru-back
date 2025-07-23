import { LoggerMiddleware } from '../logger.middleware';
import { logger } from '../../../common/logger/logger';

jest.mock('../../../common/logger/logger', () => ({
  logger: {
    error: jest.fn(),
    log: jest.fn()
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
    expect(logger.log).toHaveBeenCalledWith(expect.stringContaining('GET /test 200'), 'HTTP');
    expect(next).toHaveBeenCalled();
  });

  it('debe llamar logger.error para status 400', () => {
    res.statusCode = 400;
    middleware.use(req, res, next);
    res._cb();
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('GET /test 400'), undefined, 'HTTP');
    expect(next).toHaveBeenCalled();
  });

  it('debe llamar logger.error para status 500', () => {
    res.statusCode = 500;
    middleware.use(req, res, next);
    res._cb();
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('GET /test 500'), undefined, 'HTTP');
    expect(next).toHaveBeenCalled();
  });

  it('debe pasar correctamente user-agent y content-length', () => {
    req.get = jest.fn().mockReturnValue('Mozilla');
    res.get = jest.fn().mockReturnValue('456');
    res.statusCode = 201;
    middleware.use(req, res, next);
    res._cb();
    expect(logger.log).toHaveBeenCalledWith(expect.stringContaining('Mozilla'), 'HTTP');
    expect(logger.log).toHaveBeenCalledWith(expect.stringContaining('456b'), 'HTTP');
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
});
