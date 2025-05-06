import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

/**
 * Resend Verification Email
 * @param email 
 * @param password 
 */
export default async function resendVerificationEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    if (!userCredential.user.emailVerified)
      await sendEmailVerification(userCredential.user);

  } catch (error) {
    throw error;
  }
};
