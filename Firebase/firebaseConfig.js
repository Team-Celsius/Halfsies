import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCFXaDjUdibz94CNra1AQVSdAL8Dlhu2ZY",
  authDomain: "halfsies-5d250.firebaseapp.com",
  projectId: "halfsies-5d250",
  storageBucket: "halfsies-5d250.appspot.com",
  messagingSenderId: "1013068961806",
  appId: "1:1013068961806:web:bf6969835f14cc85fb845f",
  databaseURL: "https://halfsies-5d250-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
