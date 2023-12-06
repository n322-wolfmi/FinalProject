import { initializeApp, getApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABSUfYuSKFxvkQGqSkG_QSrnEmHyStWbU",
  authDomain: "n423-data-mattwolf.firebaseapp.com",
  projectId: "n423-data-mattwolf",
  storageBucket: "n423-data-mattwolf.appspot.com",
  messagingSenderId: "452144208034",
  appId: "1:452144208034:web:ffcc6447c9cd6c56969ffb",
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const auth = getAuth(app);
const db = getFirestore(app)
export { app, auth, db, getApp, getAuth };
