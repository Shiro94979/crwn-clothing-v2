import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc

} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDb_jPWBpQOlKzIAAh-8GjYH5xUCCeBZUw",
  authDomain: "crwn-clothing-db-f4f44.firebaseapp.com",
  projectId: "crwn-clothing-db-f4f44",
  storageBucket: "crwn-clothing-db-f4f44.appspot.com",
  messagingSenderId: "718394276656",
  appId: "1:718394276656:web:d8802ae17b60b0e6a966f5",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) =>{
    const userDocRef = doc(db, 'user', userAuth.uid)

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createAt

            });
        }catch(error) {
            console.log('error creating the user', error.message)
        } 
    }
    return userDocRef;
}       