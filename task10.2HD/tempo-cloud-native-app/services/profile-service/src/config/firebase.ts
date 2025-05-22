// Firebase 

import admin from "firebase-admin";
import dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/^"|"$/g, '').replace(/\\n/g, '\n'),
        projectId: process.env.FIREBASE_PROJECT_ID,
      }),
    });
    console.log("⚡ Initalised Firebase Admin Credentials in Profile Service");
  } catch (error) {
    console.error("🚫 Failed to initialize Firebase Admin SDK:", error);
  }
}

export const db = admin.firestore();