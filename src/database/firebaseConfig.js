import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXQy4cfKElF980KI5sLXgjfOcsVJfv7TA",
  authDomain: "avancerad-js-frida.firebaseapp.com",
  databaseURL: "https://avancerad-js-frida-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "avancerad-js-frida",
  storageBucket: "avancerad-js-frida.firebasestorage.app",
  messagingSenderId: "903172577093",
  appId: "1:903172577093:web:43b6aeab226baa6b71102c"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);