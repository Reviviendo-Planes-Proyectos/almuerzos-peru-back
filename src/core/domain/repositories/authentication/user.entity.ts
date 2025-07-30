export interface IUser {
  id: number;
  username: string;
  email: string;
  sub: string;
  emailVerified: boolean;
  providerId: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User implements IUser {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public sub: string,
    public emailVerified: boolean,
    public providerId: string,
    public imageUrl: string | undefined,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  static create(data: {
    username: string;
    email: string;
    sub: string;
    emailVerified?: boolean;
    providerId: string;
    imageUrl?: string;
  }): Omit<IUser, 'id' | 'createdAt' | 'updatedAt'> {
    // Regla: email válido
    if (!data.email?.includes('@')) {
      throw new Error('Email must be valid');
    }

    // Regla: username obligatorio
    if (!data.username?.trim()) {
      throw new Error('Username is required');
    }

    // Regla: sub obligatorio (por ejemplo, de Google/Firebase)
    if (!data.sub?.trim()) {
      throw new Error('Sub is required');
    }

    // Regla: providerId obligatorio
    if (!data.providerId?.trim()) {
      throw new Error('ProviderId is required');
    }

    return {
      username: data.username.trim(),
      email: data.email.toLowerCase().trim(),
      sub: data.sub.trim(),
      emailVerified: data.emailVerified ?? false,
      providerId: data.providerId.trim(),
      imageUrl: data.imageUrl?.trim()
    };
  }
}
