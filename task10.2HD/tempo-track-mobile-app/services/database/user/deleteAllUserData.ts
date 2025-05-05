// // Delete All User Data
// import { deleteDoc, doc, Firestore } from 'firebase/firestore';
// import getAllPlayerCharacters from '../character/getAllPlayerCharacters';
// import removeCharacterFromCampaign from '../campaign/removeCharacterFromCampaign';
// import deleteCharacter from '../character/deleteCharacter';

// /**
//  * Delete All User Data
//  * @param uid User ID
//  */

// export default async function deleteAllUserData(uid: string): Promise<void> {
//   const { $db } = useNuxtApp();
//   const db = $db as Firestore;

//   try {
//     const characterData = await getAllPlayerCharacters(uid);
//     const characterIDs = Object.keys(characterData);

//     for (const cid of characterIDs) {
//       const campaignID = characterData[cid]?.campaignID;
//       if (campaignID) {
//         await removeCharacterFromCampaign(cid, campaignID);
//       }
//       await deleteCharacter(uid, cid);
//     }

//     await deleteDoc(doc(db, `USERS/${uid}`));
//     await deleteDoc(doc(db, `USER_CHARACTERS/${uid}`));
//     await deleteDoc(doc(db, `USER_DM_CAMPAIGNS/${uid}`));

//   } catch (error) {
//     console.error("Error Deleting Account: ", error);
//     throw error;
//   }
// }