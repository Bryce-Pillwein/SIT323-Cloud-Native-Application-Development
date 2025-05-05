// // Post User Feedback
// import { collection, addDoc, Firestore } from 'firebase/firestore';
// import { type User } from 'firebase/auth';

// /**
//  * Post User Feedback
//  * @param feedback String value of feedback
//  * @param user User object with uid and email
//  */
// export default async function postUserFeedback(feedback: string, user: User, dbPath: string) {
//   const { $db } = useNuxtApp();
//   const db = $db as Firestore;

//   try {
//     // Create Post
//     const post = {
//       feedback: feedback,
//       uid: user.uid,
//       email: user.email || null,
//       displayName: user.displayName || null,
//     }

//     // Upload Post
//     await addDoc(collection(db, dbPath), post);

//   } catch (error) {
//     throw error;
//   }
// }