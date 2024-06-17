import firebase from "firebase/app";
import 'firebase/firestore';
import  "firebase/auth";
import  "firebase/firestore";
import  "firebase/storage";
import "firebase/analytics";



// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rhythms-ace67.firebaseapp.com",
  projectId: "rhythms-ace67",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "407098913694",
  appId: import.meta.env.VITE_FIREBASE_APP_KEY,
  measurementId: "G-D82BWCLXZ9"
};

//testing database
const firebaseTestingConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_TESTING_API_KEY,
  authDomain: "rthythms-testing.firebaseapp.com",
  projectId: "rthythms-testing",
  storageBucket: "rthythms-testing.appspot.com",
  messagingSenderId: "439291160242",
  appId: import.meta.env.VITE_FIREBASE_TESTING_APP_KEY,
  measurementId: "G-216NPHRHW6"
};
 
// Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 firebase.analytics();



 
// Initialize testing Firebase
// firebase.initializeApp(firebaseTestingConfig);

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
    auth,db,userCollection,storage,songsCollection,commentsCollection,singersCollection,firebase
}