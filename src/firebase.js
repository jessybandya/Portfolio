import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbA8J9Fqg4lnDaIGjeIOLsi2Q3ZLyOHIg",
  authDomain: "jessy-bandya.firebaseapp.com",
  projectId: "jessy-bandya",
  storageBucket: "jessy-bandya.appspot.com",
  messagingSenderId: "583182413061",
  appId: "1:583182413061:web:0d49dd41944d9a92d41b6c",
  measurementId: "G-SYC3FQG1Z1"
};

  const firebaseSApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
   const db = firebaseSApp.firestore();
   const googleProvider = new firebase.auth.GoogleAuthProvider();
   const facebookProvider = new firebase.auth.FacebookAuthProvider();
   const TwitterProvider = new firebase.auth.TwitterAuthProvider();
   const GithubProvider = new firebase.auth.GithubAuthProvider();
   const storage = firebase.storage();
  export default {auth, db, storage};
  export  {db, googleProvider, facebookProvider, TwitterProvider,GithubProvider};
  export  {auth};
  export  {storage};