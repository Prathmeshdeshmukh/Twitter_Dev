// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtoTWbEb0oDekE_3ddMCkXVMp2SVhadQ0",
  authDomain: "twitter-clone-231fd.firebaseapp.com",
  projectId: "twitter-clone-231fd",
  storageBucket: "twitter-clone-231fd.appspot.com",
  messagingSenderId: "908147722013",
  appId: "1:908147722013:web:ce8ce6574a9ec62be783f4",
  measurementId: "G-B6KWBT5VLE"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;