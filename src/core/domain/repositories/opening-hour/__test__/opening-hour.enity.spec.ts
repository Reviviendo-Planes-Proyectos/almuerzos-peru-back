// OpeningHour.test.ts
import { OpeningHour, IOpeningHour } from './../opening-hour.entity';

describe('OpeningHour', () => {
  describe('Constructor', () => {
    it('should create instance with all parameters', () => {
      // Arrange
      const weekDay = 1;
      const startTime = '09:00';
      const endTime = '17:00';
      const enabled = true;
      const isDeleted = false;
      const createdAt = new Date('2024-01-01');
      const updatedAt = new Date('2024-01-02');
      const deletedAt = new Date('2024-01-03');

      // Act
      const openingHour = new OpeningHour(
        weekDay,
        startTime,
        endTime,
        enabled,
        isDeleted,
        createdAt,
        updatedAt,
        deletedAt
      );

      // Assert
      expect(openingHour.weekDay).toBe(1);
      expect(openingHour.startTime).toBe('09:00');
      expect(openingHour.endTime).toBe('17:00');
      expect(openingHour.enabled).toBe(true);
      expect(openingHour.isDeleted).toBe(false);
      expect(openingHour.createdAt).toBe(createdAt);
      expect(openingHour.updatedAt).toBe(updatedAt);
      expect(openingHour.deletedAt).toBe(deletedAt);
    });

    it('should create instance with undefined optional parameters', () => {
      // Act
      const openingHour = new OpeningHour(
        0, // Sunday
        undefined,
        undefined,
        true,
        undefined,
        undefined,
        undefined,
        undefined
      );

      // Assert
      expect(openingHour.weekDay).toBe(0);
      expect(openingHour.enabled).toBe(true);
      expect(openingHour.startTime).toBeUndefined();
      expect(openingHour.endTime).toBeUndefined();
      expect(openingHour.isDeleted).toBeUndefined();
      expect(openingHour.createdAt).toBeUndefined();
    });

    it('should handle different weekdays and states', () => {
      // Test different weekdays (0-6)
      const monday = new OpeningHour(1, '09:00', '17:00', true, false, new Date(), new Date(), undefined);
      const sunday = new OpeningHour(0, undefined, undefined, false, false, new Date(), new Date(), undefined);

      expect(monday.weekDay).toBe(1);
      expect(monday.enabled).toBe(true);
      expect(sunday.weekDay).toBe(0);
      expect(sunday.enabled).toBe(false);
    });
  });

  describe('Interface compliance', () => {
    it('should implement IOpeningHour interface', () => {
      const openingHour = new OpeningHour(1, '08:00', '18:00', true, false, new Date(), new Date(), undefined);
      const interfaceObj: IOpeningHour = openingHour;

      expect(interfaceObj.weekDay).toBeDefined();
      expect(interfaceObj.enabled).toBeDefined();
    });
  });

  describe('Type validation', () => {
    it('should have correct property types', () => {
      const openingHour = new OpeningHour(1, '09:00', '17:00', true, false, new Date(), new Date(), new Date());

      expect(typeof openingHour.weekDay).toBe('number');
      expect(typeof openingHour.startTime).toBe('string');
      expect(typeof openingHour.endTime).toBe('string');
      expect(typeof openingHour.enabled).toBe('boolean');
      expect(typeof openingHour.isDeleted).toBe('boolean');
      expect(openingHour.createdAt).toBeInstanceOf(Date);
      expect(openingHour.updatedAt).toBeInstanceOf(Date);
      expect(openingHour.deletedAt).toBeInstanceOf(Date);
    });
  });
});
