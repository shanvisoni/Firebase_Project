
// import { initializeApp } from "firebase/app";
// import {getAuth,GoogleAuthProvider} from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// const firebaseConfig = {
//   apiKey: "AIzaSyAv4YJC00PvMS228MjEA9cgCCeXovlzbWM",
//   authDomain: "fir-course-e93b7.firebaseapp.com",
//   projectId: "fir-course-e93b7",
//   storageBucket: "fir-course-e93b7.firebasestorage.app",
//   messagingSenderId: "231510847996",
//   appId: "1:231510847996:web:edb1fb3fe967e555190279",
//   measurementId: "G-QP8KMW1FD4"
// };

// const app = initializeApp(firebaseConfig);
// export const auth=getAuth(app);
// export const googleProvider=new GoogleAuthProvider();
// export const db=getFirestore(app);








import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAv4YJC00PvMS228MjEA9cgCCeXovlzbWM",
  authDomain: "fir-course-e93b7.firebaseapp.com",
  projectId: "fir-course-e93b7",
  storageBucket: "fir-course-e93b7.firebasestorage.app",
  messagingSenderId: "231510847996",
  appId: "1:231510847996:web:edb1fb3fe967e555190279",
  measurementId: "G-QP8KMW1FD4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" }); // 👈 Force selection popup
export const db = getFirestore(app);
