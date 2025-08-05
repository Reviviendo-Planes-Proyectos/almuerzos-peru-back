import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UserExistGuad } from '../user-exists.guard';
import { UserServiceCommon } from '../../user-common/user.service';

describe('UserExistGuard', () => {
  let guard: UserExistGuad;
  let mockUserService: jest.Mocked<UserServiceCommon>;
  let mockExecutionContext: jest.Mocked<ExecutionContext>;
  let mockRequest: any;

  beforeEach(() => {
    mockUserService = {
      userExistBySub: jest.fn()
    } as any;

    mockRequest = {
      user: { sub: 'test-user-sub' }
    };

    mockExecutionContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest)
      })
    } as any;

    guard = new UserExistGuad(mockUserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('canActivate', () => {
    it('should return true when user exists in database', async () => {
      mockUserService.userExistBySub.mockResolvedValue(true);

      const result = await guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      expect(mockUserService.userExistBySub).toHaveBeenCalledWith('test-user-sub');
    });

    it('should throw UnauthorizedException when user does not exist in database', async () => {
      mockUserService.userExistBySub.mockResolvedValue(false);

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        new UnauthorizedException('Usuario no existe')
      );
      expect(mockUserService.userExistBySub).toHaveBeenCalledWith('test-user-sub');
    });

    it('should throw UnauthorizedException when request has no user', async () => {
      mockRequest.user = null;

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        new UnauthorizedException('Token inválido o sin usuario')
      );
      expect(mockUserService.userExistBySub).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when user has no sub', async () => {
      mockRequest.user = { id: 'some-id' }; // Sin sub

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        new UnauthorizedException('Token inválido o sin usuario')
      );
      expect(mockUserService.userExistBySub).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when user is undefined', async () => {
      mockRequest.user = undefined;

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        new UnauthorizedException('Token inválido o sin usuario')
      );
      expect(mockUserService.userExistBySub).not.toHaveBeenCalled();
    });
  });
});
