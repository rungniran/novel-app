/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {initializeApp} from "firebase/app"
import "firebase/auth"
import { GoogleAuthProvider, signInWithPopup,getAuth, signOut} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDU25BfrbtLAsV9Vwp6jbe5uvhMyRb6ums",
  authDomain: "novelkingdom-test.firebaseapp.com",
  projectId: "novelkingdom-test",
  storageBucket: "novelkingdom-test.appspot.com",
  messagingSenderId: "818385858123",
  appId: "1:818385858123:web:a8cd268dc21654097227ce",
  measurementId: "G-WK3SK41GN7"
};
initializeApp(firebaseConfig);

  export const auth = signOut;

  const provider = new GoogleAuthProvider() as any;
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => signInWithPopup(getAuth(),provider);

  // export default firebase;