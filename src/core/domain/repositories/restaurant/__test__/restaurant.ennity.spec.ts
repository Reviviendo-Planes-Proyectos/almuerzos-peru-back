import { OpeningHour } from '../../opening-hour/opening-hour.entity';
import { IRestaurant, Restaurant } from '../restaurant.enity';

describe('Restaurant', () => {
  describe('Constructor', () => {
    it('should create instance with all parameters', () => {
      // Arrange
      const mockOpeningHours = [new OpeningHour(1, '09:00', '22:00', true, false, new Date(), new Date(), undefined)];

      // Act
      const restaurant = new Restaurant(
        'La Casa del Sabor',
        'Av. José Larco 123, Miraflores',
        'Frente al parque central, al lado del banco',
        -12.1191,
        -77.0292,
        '20123456789',
        'Restaurante La Casa del Sabor S.A.C.',
        '+51987654321',
        '987654321',
        'https://example.com/logo.png',
        'https://example.com/banner.jpg',
        true,
        true,
        mockOpeningHours
      );

      // Assert
      expect(restaurant.name).toBe('La Casa del Sabor');
      expect(restaurant.mapsAddress).toBe('Av. José Larco 123, Miraflores');
      expect(restaurant.latitude).toBe(-12.1191);
      expect(restaurant.longitude).toBe(-77.0292);
      expect(restaurant.ruc).toBe('20123456789');
      expect(restaurant.legalName).toBe('Restaurante La Casa del Sabor S.A.C.');
      expect(restaurant.whatsappOrders).toBe('+51987654321');
      expect(restaurant.yapePhone).toBe('987654321');
      expect(restaurant.logoUrl).toBe('https://example.com/logo.png');
      expect(restaurant.bannerUrl).toBe('https://example.com/banner.jpg');
      expect(restaurant.dinerIn).toBe(true);
      expect(restaurant.delivery).toBe(true);
      expect(restaurant.openingHour).toEqual(mockOpeningHours);
    });

    it('should create instance with required parameters only', () => {
      // Act
      const restaurant = new Restaurant(
        'Restaurante Básico',
        'Calle Lima 456',
        'Cerca al mercado central',
        -12.0464,
        -77.0428
      );

      // Assert
      expect(restaurant.name).toBe('Restaurante Básico');
      expect(restaurant.mapsAddress).toBe('Calle Lima 456');
      expect(restaurant.latitude).toBe(-12.0464);
      expect(restaurant.longitude).toBe(-77.0428);
      expect(restaurant.dinerIn).toBe(false); // default
      expect(restaurant.delivery).toBe(false); // default
      expect(restaurant.ruc).toBeUndefined();
      expect(restaurant.openingHour).toBeUndefined();
    });

    it('should handle service type combinations', () => {
      const dinerInOnly = new Restaurant(
        'Dine-In',
        'Address',
        'Referencia para solo comer en local',
        -12.0464,
        -77.0428,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
        false
      );
      const deliveryOnly = new Restaurant(
        'Delivery',
        'Address',
        'Referencia para solo delivery',
        -12.0464,
        -77.0428,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        false,
        true
      );

      expect(dinerInOnly.dinerIn).toBe(true);
      expect(dinerInOnly.delivery).toBe(false);
      expect(deliveryOnly.dinerIn).toBe(false);
      expect(deliveryOnly.delivery).toBe(true);
    });
  });

  describe('Interface compliance', () => {
    it('should implement IRestaurant interface', () => {
      const restaurant = new Restaurant('Test', 'Address', 'Referencia de prueba', -12.0464, -77.0428);
      const interfaceObj: IRestaurant = restaurant;

      expect(interfaceObj.name).toBeDefined();
      expect(interfaceObj.mapsAddress).toBeDefined();
      expect(interfaceObj.latitude).toBeDefined();
      expect(interfaceObj.longitude).toBeDefined();
    });
  });

  describe('Type validation', () => {
    it('should have correct property types', () => {
      const restaurant = new Restaurant(
        'Test',
        'Address',
        'Referencia para validación de tipos',
        -12.0464,
        -77.0428,
        '20123456789',
        'Legal Name',
        '+51987654321',
        '987654321',
        'https://logo.url',
        'https://banner.url',
        true,
        false,
        []
      );

      expect(typeof restaurant.name).toBe('string');
      expect(typeof restaurant.latitude).toBe('number');
      expect(typeof restaurant.longitude).toBe('number');
      expect(typeof restaurant.dinerIn).toBe('boolean');
      expect(typeof restaurant.delivery).toBe('boolean');
      expect(Array.isArray(restaurant.openingHour)).toBe(true);
    });
  });
});
