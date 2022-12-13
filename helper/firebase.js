// Import the functions you need from the SDKs you need
const { initializeApp } = "firebase/app";
const { getFirestore, addDoc, collection } = "firebase/firestore"
require('dotenv').config()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "snipe-58633.firebaseapp.com",
  projectId: "snipe-58633",
  storageBucket: "snipe-58633.appspot.com",
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports.database = getFirestore(app)
