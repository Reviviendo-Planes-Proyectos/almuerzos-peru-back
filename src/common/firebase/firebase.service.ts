import admin from './firebase-admin';

export class FirebaseService {
  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    // Verify the Firebase ID token
    return await admin.auth().verifyIdToken(token);
  }
}
