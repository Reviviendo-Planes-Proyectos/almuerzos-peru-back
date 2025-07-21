export interface IUser {
  id: number;
  email: string;
  name: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User implements IUser {
  constructor(
    public id: number,
    public email: string,
    public name: string,
    public phone: string | undefined,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  // Domain business rules
  static create(data: {
    email: string;
    name: string;
    phone?: string;
  }): Omit<IUser, 'id' | 'createdAt' | 'updatedAt'> {
    // Business rule: Email must be valid
    if (!data.email || !data.email.includes('@')) {
      throw new Error('Email must be valid');
    }

    // Business rule: Name must not be empty
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Name is required');
    }

    return {
      email: data.email.toLowerCase().trim(),
      name: data.name.trim(),
      phone: data.phone?.trim(),
      isActive: true,
    };
  }

  updateProfile(name: string, phone?: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Name is required');
    }
    this.name = name.trim();
    this.phone = phone?.trim();
  }

  deactivate(): void {
    this.isActive = false;
  }

  activate(): void {
    this.isActive = true;
  }
}
