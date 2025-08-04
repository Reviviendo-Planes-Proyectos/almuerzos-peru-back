export interface UserAuthentication {
  username: string;
  email: string;
  sub: string;
  emailVerified: boolean;
  providerId: string;
  imageUrl?: string;
}
