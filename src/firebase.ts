import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyByE09WSm_5WGyVjy-ILfx3ELrWT-qLhbA',
	authDomain: 'ammocache-b1000.firebaseapp.com',
	projectId: 'ammocache-b1000',
	storageBucket: 'ammocache-b1000.appspot.com',
	messagingSenderId: '302235404784',
	appId: '1:302235404784:web:466f600f87e3aa5bbcb535',
	measurementId: 'G-TBXE2EJ97X'
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

if (import.meta.env.DEV) {
	connectAuthEmulator(auth, 'http://localhost:9099');
	connectFirestoreEmulator(db, 'localhost', 8081);
}
