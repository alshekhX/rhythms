import firebase from "firebase/app";
import 'firebase/firestore';

import  "firebase/auth";
import  "firebase/firestore";
import  "firebase/storage";


// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMiBt2etcS7maEztMuZciikrbQGmLU1e4",
  authDomain: "rhythms-ace67.firebaseapp.com",
  projectId: "rhythms-ace67",
  storageBucket: "rhythms-ace67.appspot.com",
  messagingSenderId: "407098913694",
  appId: "1:407098913694:web:af458cb96c243d16f79c8f",
  measurementId: "G-D82BWCLXZ9"
};
 
// Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 const auth=firebase.auth();
 const db=firebase.firestore();
 const storage=firebase.storage()

 db.enablePersistence().catch((e)=>{

  console.log(`firebase presistence error ${e} `)
 })

 const userCollection= db.collection('users');
 const songsCollection= db.collection('songs');
 const commentsCollection= db.collection('comments');
 const singersCollection=db.collection('singers');


// const analytics = getAnalytics(app);

export{
    auth,db,userCollection,storage,songsCollection,commentsCollection,singersCollection
}