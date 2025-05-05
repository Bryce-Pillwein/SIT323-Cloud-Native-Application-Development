import { createUserWithEmailAndPassword, sendEmailVerification, UserCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { fdb, auth } from '@/firebaseConfig';
import checkUserExists from '@/services/authentication/checkUserExists';
import { Status } from "@/types/Status";

/**
 * Register With Email
 * @param firstName 
 * @param lastName 
 * @param email 
 * @param password 
 * @returns Credential
 */
export default async function registerWithEmail(firstName: string, lastName: string, email: string, password: string): Promise<Status> {
  if (!auth) return { success: false, message: 'Authentication Service Not Availible' };


  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

    const userExists = await checkUserExists(userCredential.user.uid);
    if (!userExists) {
      await createEmailUserInDatabase(userCredential.user.uid, firstName, lastName, email);
      sendEmailVerification(userCredential.user);
    }

    return { success: true };
  } catch (error: any) {
    if (error.code === 'auth/weak-password')
      return { success: false, message: 'Weak Password. Should be at least 6 characters' };
    else
      throw error;
  }
}

/**
 * Create a user account within the Realtime Database using Email/Password
 * @param userID User Identification
 * @param displayName Username
 * @param email User Email
 */
async function createEmailUserInDatabase(userID: string, firstName: string, lastName: string, email: string) {
  try {
    const userDocRef = doc(fdb, 'USERS', userID);

    await setDoc(userDocRef, {
      uid: userID,
      userName: firstName,
      userName_lowercase: firstName.toLowerCase(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      photoURL: null,
      emailVerified: false,
    });
  } catch (error: any) {
    throw error;
  }
}