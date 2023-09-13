// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFJnvswZiB4J854fJe41zVHHI37VikfV8",
  authDomain: "email-password-authentic-ae949.firebaseapp.com",
  projectId: "email-password-authentic-ae949",
  storageBucket: "email-password-authentic-ae949.appspot.com",
  messagingSenderId: "223527272040",
  appId: "1:223527272040:web:3ad245cd402ea1059785dd",
  measurementId: "G-FGYTSJFWPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default (app);