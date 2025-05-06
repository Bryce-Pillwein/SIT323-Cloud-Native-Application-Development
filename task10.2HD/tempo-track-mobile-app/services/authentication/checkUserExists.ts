import { doc, getDoc } from 'firebase/firestore';
import { fdb } from '@/firebaseConfig';

export default async function checkUserExists(uid: string): Promise<boolean> {
  try {
    const snapshot = await getDoc(doc(fdb, `USERS/${uid}`));
    return snapshot.exists()
  } catch (error) {
    console.error('RealtimeDB Error:', error);
    throw error;
  }
}