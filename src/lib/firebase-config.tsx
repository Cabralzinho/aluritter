import { initializeApp } from "firebase/app";
import { getAuth, parseActionCodeURL } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDXq2CWrZ3-oDGNshE72P-PyqwJdPdqUXc",
  authDomain: "aluritter-ec6f6.firebaseapp.com",
  projectId: "aluritter-ec6f6",
  storageBucket: "aluritter-ec6f6.appspot.com",
  messagingSenderId: "290853162928",
  appId: "1:290853162928:web:406b9cef94e802f581d075",
  databaseURL: "https://aluritter-ec6f6-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);

export const actionCode = parseActionCodeURL(window.location.href)

export const auth = getAuth(app)

export const database = getDatabase(app)
