/**
 * Services Index File
 * - Keeps imports centralised to single '@/services' path
 */

// Authentication
export { default as registerWithEmail } from '@/services/authentication/registerWithEmail';
export { default as resendVerificationEmail } from '@/services/authentication/resendVerificationEmail';
export { default as sendPasswordReset } from '@/services/authentication/sendPasswordReset';
export { default as signInWithEmail } from '@/services/authentication/signInWithEmail';
export { default as signOutUser } from '@/services/authentication/signOutUser';


// User Functions
export { default as getUserValue } from '@/services/database/user/getUserValue';
export { default as updateUserValue } from '@/services/database/user/updateUserValue';

