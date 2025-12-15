import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbYAtJJa55cJL2DD5QcBmdajBlRSOShek",
  authDomain: "apicarros-c675d.firebaseapp.com",
  projectId: "apicarros-c675d",
  storageBucket: "apicarros-c675d.firebasestorage.app",
  messagingSenderId: "442194301260",
  appId: "1:442194301260:web:c24a386d9c0be59fc23fe9",
  measurementId: "G-QTZSYCEZY4"
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);
export { auth, db };