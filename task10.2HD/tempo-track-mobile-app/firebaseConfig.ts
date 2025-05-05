// Firebase Config js
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};


const initializeFirebase = (): { firebaseApp: FirebaseApp, auth: Auth, fdb: Firestore } => {
  if (!getApps().length) {
    const app = initializeApp(firebaseConfig);
    const authentication = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
    const firestore = getFirestore(app);
    return { firebaseApp: app, auth: authentication, fdb: firestore };
  } else {
    const app = getApp();
    const firestore = getFirestore(app);
    const authentication = getAuth(app);
    return { firebaseApp: app, auth: authentication, fdb: firestore };
  }
};

const { firebaseApp, auth, fdb } = initializeFirebase();

export { firebaseApp, auth, fdb };
