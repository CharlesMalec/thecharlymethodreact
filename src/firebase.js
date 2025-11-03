import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence} from 'firebase/auth'; // Changed to browserSessionPersistence
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCkrYlIpVVMytKpmyS-_je7C_R76XzQjYs",
  authDomain: "thecharlymethodreact.firebaseapp.com",
  projectId: "thecharlymethodreact",
  storageBucket: "thecharlymethodreact.firebasestorage.app",
  messagingSenderId: "96651719464",
  appId: "1:96651719464:web:423aa9cb685bb5ebf3d61d",
  measurementId: "G-J8NEHZVKTD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Auth persistence set to session successfully.');
  })
  .catch((error) => {
    console.error('Error setting auth persistence:', error);
  });

export const db = getFirestore(app);