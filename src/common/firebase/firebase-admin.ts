import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

const serviceAccountPath = path.resolve(process.cwd(), 'serviceAccountKey.json');

if (!admin.apps.length && fs.existsSync(serviceAccountPath)) {
  const raw = fs.readFileSync(serviceAccountPath, 'utf-8');
  const credentials = JSON.parse(raw);
  admin.initializeApp({
    credential: admin.credential.cert(credentials)
  });
}

export const firebaseEnabled = admin.apps.length > 0;

export default admin;
