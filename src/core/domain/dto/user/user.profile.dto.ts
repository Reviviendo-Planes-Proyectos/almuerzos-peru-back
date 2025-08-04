export interface UserProfile {
  dni: string;
  firstName: string;
  lastName: string;
  phone: string;
  district: string;
  province: string;
  role: 'admin' | 'consumer';
  description?: string;
  imageUrl?: string;
}
