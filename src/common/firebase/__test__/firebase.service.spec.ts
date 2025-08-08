import { FirebaseService } from '../firebase.service';

// Mock completo del módulo firebase-admin
jest.mock('../firebase-admin', () => ({
  default: {
    auth: jest.fn(() => ({
      verifyIdToken: jest.fn()
    }))
  },
  firebaseEnabled: true
}));

// Importar admin después del mock
import admin from '../firebase-admin';

describe('FirebaseService', () => {
  let service: FirebaseService;
  let mockVerifyIdToken: jest.Mock;

  beforeEach(() => {
    service = new FirebaseService();

    // Configurar el mock después de la inicialización
    mockVerifyIdToken = jest.fn();
    (admin.auth as jest.Mock).mockReturnValue({
      verifyIdToken: mockVerifyIdToken
    });

    jest.clearAllMocks();
  });

  describe('verifyToken', () => {
    it('debe verificar un token válido y devolver el token decodificado', async () => {
      const mockToken = 'valid-token';
      const mockDecodedToken = {
        uid: 'user123',
        email: 'test@example.com',
        aud: 'project-id',
        auth_time: 1234567890,
        exp: 1234567890,
        firebase: {
          identities: {},
          sign_in_provider: 'google.com'
        },
        iat: 1234567890,
        iss: 'https://securetoken.google.com/project-id',
        sub: 'user123'
      };

      mockVerifyIdToken.mockResolvedValue(mockDecodedToken);

      const result = await service.verifyToken(mockToken);

      expect(admin.auth).toHaveBeenCalled();
      expect(mockVerifyIdToken).toHaveBeenCalledWith(mockToken);
      expect(result).toEqual(mockDecodedToken);
    });

    it('debe lanzar un error cuando el token es inválido', async () => {
      const mockToken = 'invalid-token';
      const mockError = new Error('Token inválido');

      mockVerifyIdToken.mockRejectedValue(mockError);

      await expect(service.verifyToken(mockToken)).rejects.toThrow('Token inválido');
      expect(admin.auth).toHaveBeenCalled();
      expect(mockVerifyIdToken).toHaveBeenCalledWith(mockToken);
    });
  });
});
