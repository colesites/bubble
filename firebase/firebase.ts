import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAQvvcUmvzlnYP0EeoTRglVuZ3g33DC8Hw",
  authDomain: "bubble-1c580.firebaseapp.com",
  projectId: "bubble-1c580",
  storageBucket: "bubble-1c580.appspot.com",
  messagingSenderId: "264632420768",
  appId: "1:264632420768:web:12773a91877f74b1d87cc5",
  measurementId: "G-VX7DQFSSHV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
//const analytics = getAnalytics(app);