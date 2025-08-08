import { Consumer } from '../consumer.entity';

describe('Consumer entity', () => {
  it('should create a Consumer with all properties defined', () => {
    const now = new Date();
    const consumer = new Consumer('Luis', true, now, now, now);

    expect(consumer).toBeInstanceOf(Consumer);
    expect(consumer.userName).toBe('Luis');
    expect(consumer.isDeleted).toBe(true);
    expect(consumer.createdAt).toBe(now);
    expect(consumer.updatedAt).toBe(now);
    expect(consumer.deletedAt).toBe(now);
  });

  it('should create a Consumer with different values', () => {
    const createdAt = new Date('2025-01-01T10:00:00Z');
    const updatedAt = new Date('2025-01-02T10:00:00Z');
    const deletedAt = new Date('2025-01-03T10:00:00Z');

    const consumer = new Consumer('Ana', false, createdAt, updatedAt, deletedAt);

    expect(consumer.userName).toBe('Ana');
    expect(consumer.isDeleted).toBe(false);
    expect(consumer.createdAt).toBe(createdAt);
    expect(consumer.updatedAt).toBe(updatedAt);
    expect(consumer.deletedAt).toBe(deletedAt);
  });
});
