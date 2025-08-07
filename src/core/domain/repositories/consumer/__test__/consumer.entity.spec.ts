import { Consumer } from '../consumer.entity';

describe('Consumer entity', () => {
  it('should create a Consumer instance with no arguments', () => {
    const consumer = new Consumer();

    expect(consumer).toBeInstanceOf(Consumer);
    expect(consumer.isDeleted).toBeUndefined();
    expect(consumer.createdAt).toBeUndefined();
    expect(consumer.updatedAt).toBeUndefined();
    expect(consumer.deletedAt).toBeUndefined();
  });

  it('should create a Consumer with all properties defined', () => {
    const now = new Date();
    const consumer = new Consumer(true, now, now, now);

    expect(consumer.isDeleted).toBe(true);
    expect(consumer.createdAt).toBe(now);
    expect(consumer.updatedAt).toBe(now);
    expect(consumer.deletedAt).toBe(now);
  });

  it('should allow partial properties', () => {
    const created = new Date();
    const consumer = new Consumer(undefined, created);

    expect(consumer.isDeleted).toBeUndefined();
    expect(consumer.createdAt).toBe(created);
    expect(consumer.updatedAt).toBeUndefined();
    expect(consumer.deletedAt).toBeUndefined();
  });
});
