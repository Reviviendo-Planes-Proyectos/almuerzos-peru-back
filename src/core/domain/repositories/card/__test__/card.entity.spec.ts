import { Card } from '../card.entity';

describe('Card', () => {
  const mockDate = new Date('2024-01-01');

  it('should create a Card instance correctly', () => {
    const card = new Card(1, 'Test Card', 'Description', true, false, mockDate, mockDate, mockDate);

    expect(card.id).toBe(1);
    expect(card.name).toBe('Test Card');
    expect(card.description).toBe('Description');
    expect(card.isActive).toBe(true);
    expect(card.isDeleted).toBe(false);
    expect(card.createdAt).toBe(mockDate);
    expect(card.updatedAt).toBe(mockDate);
    expect(card.deletedAt).toBe(mockDate);
  });

  it('should allow property modification', () => {
    const card = new Card(1, 'Original', 'Desc', true, false, mockDate, mockDate, mockDate);

    card.name = 'Updated';
    card.isActive = false;

    expect(card.name).toBe('Updated');
    expect(card.isActive).toBe(false);
  });

  it('should have correct property types', () => {
    const card = new Card(1, 'Test', 'Desc', true, false, mockDate, mockDate, mockDate);

    expect(typeof card.id).toBe('number');
    expect(typeof card.name).toBe('string');
    expect(typeof card.isActive).toBe('boolean');
    expect(card.createdAt).toBeInstanceOf(Date);
  });
});
