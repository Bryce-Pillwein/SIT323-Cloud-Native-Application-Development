// import { db, auth } from "@/firebaseConfig";
// import { collection, getDocs, writeBatch, doc, deleteDoc } from "firebase/firestore";
// import { deleteUser, signOut } from "firebase/auth";

// /** Deletes all user-related Firestore data & Firebase Auth account */
// export default async function deleteUserDataAndAccount(uid: string) {
//   const subCollections = [
//     "EXERCISE_METRICS",
//     "PERSONAL_RECORDS",
//     "WORKOUT_COMPLETED",
//     "WORKOUT_HISTORY"
//   ];

//   try {
//     // 1️. Delete Firestore Data
//     for (const subCollection of subCollections) {
//       const subCollectionRef = collection(db, `USERS/${uid}/${subCollection}`);
//       const snapshot = await getDocs(subCollectionRef);

//       if (!snapshot.empty) {
//         const batch = writeBatch(db);
//         snapshot.forEach((docSnapshot) => {
//           batch.delete(doc(db, `USERS/${uid}/${subCollection}/${docSnapshot.id}`));
//         });
//         await batch.commit();
//       }
//     }

//     // 2. Delete the user document itself
//     await deleteDoc(doc(db, `USERS/${uid}`));
//     console.log(`Deleted all data for user: ${uid}`);

//     // 3️. Delete Firebase Auth User
//     const user = auth.currentUser;
//     if (user && user.uid === uid) {
//       await signOut(auth);
//       await deleteUser(user);
//       console.log(`User ${uid} deleted from Firebase Authentication`);
//     } else {
//       console.warn("User is not logged in or does not match UID");
//     }

//   } catch (error) {
//     console.error("Error deleting user account:", error);
//     throw error;
//   }
// }
