import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

};

const appFirebase = initializeApp(firebaseConfig);

export const fireStoreApp = getFirestore(appFirebase);
