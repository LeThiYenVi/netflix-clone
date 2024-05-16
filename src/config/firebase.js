// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxyQJq9EWUmjYu6sPvUEsYEd_eLqNrDCk",
  authDomain: "netflix-clone-d6287.firebaseapp.com",
  projectId: "netflix-clone-d6287",
  storageBucket: "netflix-clone-d6287.appspot.com",
  messagingSenderId: "927108850938",
  appId: "1:927108850938:web:b95125333d87a21faf1543",
  measurementId: "G-E03RS6L56L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
