// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzhRWAjvdNJec1HNfmxlKc94ds-5N399Q",
  authDomain: "news-abd14.firebaseapp.com",
  projectId: "news-abd14",
  storageBucket: "news-abd14.firebasestorage.app",
  messagingSenderId: "476622631737",
  appId: "1:476622631737:web:46f7e72e5912476df2eee8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;