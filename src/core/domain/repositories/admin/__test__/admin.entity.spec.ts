import { Admin } from '../admin.entity';

describe('Admin entity', () => {
  it('should create an Admin instance with no arguments', () => {
    const admin = new Admin();

    expect(admin).toBeInstanceOf(Admin);
    expect(admin.isDeleted).toBeUndefined();
    expect(admin.createdAt).toBeUndefined();
    expect(admin.updatedAt).toBeUndefined();
    expect(admin.deletedAt).toBeUndefined();
  });

  it('should create an Admin with all properties defined', () => {
    const now = new Date();
    const admin = new Admin(true, now, now, now);

    expect(admin.isDeleted).toBe(true);
    expect(admin.createdAt).toBe(now);
    expect(admin.updatedAt).toBe(now);
    expect(admin.deletedAt).toBe(now);
  });

  it('should allow partial properties', () => {
    const created = new Date();
    const admin = new Admin(undefined, created);

    expect(admin.isDeleted).toBeUndefined();
    expect(admin.createdAt).toBe(created);
    expect(admin.updatedAt).toBeUndefined();
    expect(admin.deletedAt).toBeUndefined();
  });
});
