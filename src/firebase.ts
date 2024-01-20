// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: 'ecommerce-store-3ac4e.firebaseapp.com',
  projectId: 'ecommerce-store-3ac4e',
  storageBucket: 'ecommerce-store-3ac4e.appspot.com',
  messagingSenderId: '506208090525',
  appId: '1:506208090525:web:6cca825c688080cbef9774',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;
