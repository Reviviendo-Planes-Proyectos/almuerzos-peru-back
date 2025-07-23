const mockWinstonLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn()
};

jest.mock('winston', () => {
  const actualWinston = jest.requireActual('winston');
  return {
    ...actualWinston,
    createLogger: () => mockWinstonLogger,
    format: {
      combine: jest.fn(),
      timestamp: jest.fn(),
      printf: jest.fn()
    },
    transports: {
      Console: jest.fn()
    }
  };
});

describe('AppLogger', () => {
  let service;
  let AppLogger;
  beforeEach(() => {
    jest.resetModules();
    ({ AppLogger } = require('../logger'));
    jest.clearAllMocks();
    service = new AppLogger();
  });

  it('debe llamar a winston.info en log()', () => {
    service.log('test log', { key: 'value' });
    expect(mockWinstonLogger.info).toHaveBeenCalledWith('test log', { key: 'value' });
  });

  it('debe llamar a winston.error en error()', () => {
    service.error('error msg', 'trace');
    expect(mockWinstonLogger.error).toHaveBeenCalledWith('error msg', 'trace');
  });

  it('debe llamar a winston.warn en warn()', () => {
    service.warn('warn msg');
    expect(mockWinstonLogger.warn).toHaveBeenCalledWith('warn msg');
  });

  it('debe llamar a winston.debug en debug()', () => {
    service.debug?.('debug msg');
    expect(mockWinstonLogger.debug).toHaveBeenCalledWith('debug msg');
  });

  it('debe llamar a winston.verbose en verbose()', () => {
    service.verbose?.('verbose msg');
    expect(mockWinstonLogger.verbose).toHaveBeenCalledWith('verbose msg');
  });
});

describe('logger exportado directamente', () => {
  let logger;
  beforeEach(() => {
    jest.resetModules();
    ({ logger } = require('../logger'));
    jest.clearAllMocks();
  });
  it('debe funcionar log() desde instancia exportada', () => {
    logger.log('external log');
    expect(mockWinstonLogger.info).toHaveBeenCalledWith('external log');
  });

  it('debe funcionar error() desde instancia exportada', () => {
    logger.error('external error');
    expect(mockWinstonLogger.error).toHaveBeenCalledWith('external error');
  });
});
