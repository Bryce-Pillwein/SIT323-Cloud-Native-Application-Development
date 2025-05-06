/**
 * Services Index File
 * - Keeps imports centralised to single '@/services' path
 */

/**
 * Async Storage
 */

// Authentication
export { default as signInWithEmail } from '@/services/authentication/signInWithEmail'
export { default as registerWithEmail } from '@/services/authentication/registerWithEmail';
export { default as signOutUser } from '@/services/authentication/signOutUser';
export { default as resendVerificationEmail } from '@/services/authentication/resendVerificationEmail';
export { default as sendPasswordReset } from '@/services/authentication/sendPasswordReset';



// User Functions
export { default as getUserValue } from '@/services/database/user/getUserValue';
export { default as updateUserValue } from '@/services/database/user/updateUserValue';


/**
 * Character
 */
export { default as getAllCharacters } from '@/services/database/character/getAllCharacters';
// Save
export { default as saveCharacter } from '@/services/database/character/saveCharacter';
export { default as saveCharacterToSql } from '@/services/database/character/saveCharacterToSql';
export { default as saveCharacterToFirestore } from '@/services/database/character/saveCharacterToFirestore';
// Delete
export { default as deleteCharacter } from '@/services/database/character/deleteCharacter';
export { default as deleteCharacterFromSql } from '@/services/database/character/deleteCharacterFromSql';
export { default as deleteCharacterFromFirestore } from '@/services/database/character/deleteCharacterFromFirestore';
// Campaign
export { default as updateCharacterCampaign } from '@/services/database/character/updateCharacterCampaign';