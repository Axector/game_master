import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAM3OzthV-FTkcoVg-OVEGvRQWQVKuSyPc",
  authDomain: "game-master-f0d4c.firebaseapp.com",
  projectId: "game-master-f0d4c",
  storageBucket: "game-master-f0d4c.appspot.com",
  messagingSenderId: "477885852409",
  appId: "1:477885852409:web:86ece427169b82d4c01028"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
