import admin from './firebase-admin';

export class FirebaseService {
  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return await admin.auth().verifyIdToken(token);
  }
}
