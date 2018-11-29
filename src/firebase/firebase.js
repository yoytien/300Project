import * as firebase from 'firebase';


const config = {
    apiKey: "AIzaSyBRjhvoFAKPcjElLwoU6Qc5yDNQMvRFtXk",
    authDomain: "sas1database-cdade.firebaseapp.com",
    databaseURL: "https://sas1database-cdade.firebaseio.com",
    projectId: "sas1database-cdade",
    storageBucket: "sas1database-cdade.appspot.com",
    messagingSenderId: "1022766601181"
  };

  firebase.initializeApp(config);

  const Firebase = firebase.database();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  export {firebase, googleAuthProvider, Firebase as default};
//   Firebase.ref().set({
//       name:'chin yew tianee'
//   });
 