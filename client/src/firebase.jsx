// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
"AIzaSyCItig1aU8nPwex3x09LpQRy0LT5qCc4ok"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "v-eestate.firebaseapp.com",
  projectId: "v-eestate",
  storageBucket: "v-eestate.appspot.com",
  messagingSenderId: "320756264450",
  appId: "1:320756264450:web:f4cc10c40f3aba4513811b"
};
console.log(firebaseConfig.apiKey);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);