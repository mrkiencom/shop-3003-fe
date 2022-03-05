import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3THMeVqflKgShvPmf2yP1Kku3TKlXUr4",
  authDomain: "uploadfile-6e501.firebaseapp.com",
  projectId: "uploadfile-6e501",
  storageBucket: "uploadfile-6e501.appspot.com",
  messagingSenderId: "482404622175",
  appId: "1:482404622175:web:be3c2b483b88ad908260ea",
  measurementId: "G-1B9XSESMV7",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
