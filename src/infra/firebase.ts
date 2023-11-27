import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCxDhoMRNwSvNgRa-sKg1KBgh4U-8urzhM",
  authDomain: "feedback-app-e4afc.firebaseapp.com",
  projectId: "feedback-app-e4afc",
  storageBucket: "feedback-app-e4afc.appspot.com",
  messagingSenderId: "183964428078",
  appId: "1:183964428078:web:ab99b5f0a1727b981b3cbf",
  measurementId: "G-RG334980J0"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
