// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyASnqhxhmSZi4ACMj915u6vSO9Le_CMtjI",
  authDomain: "logintoyou-1d592.firebaseapp.com",
  projectId: "logintoyou-1d592",
  storageBucket: "logintoyou-1d592.appspot.com",
  messagingSenderId: "428194205009",
  appId: "1:428194205009:web:be192b9921f6f82b3f9770",
  measurementId: "G-EJWF5DTCMW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
const analytics = getAnalytics(app);
