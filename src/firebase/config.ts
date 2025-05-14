import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Firebase 콘솔에서 가져온 설정값을 여기에 넣으세요
  apiKey: "AIzaSyA16KuHEh2z3sjAQ0D6J10_BgwjhY1Y9cg",
  authDomain: "guestbook-project-39eeb.firebaseapp.com",
  projectId: "guestbook-project-39eeb",
  storageBucket: "guestbook-project-39eeb.firebasestorage.app",
  messagingSenderId: "315209613526",
  appId: "1:315209613526:web:e319df24fc24bd706e0977",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);