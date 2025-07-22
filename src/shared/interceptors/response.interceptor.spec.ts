import { ResponseInterceptor, ApiResponse } from './response.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';

describe('ResponseInterceptor', () => {
  let interceptor: ResponseInterceptor<any>;
  let context: Partial<ExecutionContext>;
  let callHandler: Partial<CallHandler>;

  beforeEach(() => {
    interceptor = new ResponseInterceptor();
    context = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({ url: '/test-path' })
      })
    } as Partial<ExecutionContext>;
    callHandler = {
      handle: jest.fn().mockReturnValue(of({ foo: 'bar' }))
    };
  });

  it('should wrap response in ApiResponse format', (done) => {
    interceptor
      .intercept(context as ExecutionContext, callHandler as CallHandler)
      .subscribe((result: ApiResponse<any>) => {
        expect(result.success).toBe(true);
        expect(result.message).toBe('Operación exitosa');
        expect(result.data).toEqual({ foo: 'bar' });
        expect(result.path).toBe('/test-path');
        expect(typeof result.timestamp).toBe('string');
        done();
      });
  });
});
