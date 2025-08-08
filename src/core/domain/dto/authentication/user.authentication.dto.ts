export interface UserAuthenticationDTO {
  username: string;
  email: string;
  sub: string;
  emailVerified: boolean;
  providerId: string;
  profilePicture?: string;
}
