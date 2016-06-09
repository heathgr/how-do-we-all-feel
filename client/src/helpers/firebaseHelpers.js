import firebase from 'firebase';
import firebaseConfig from 'firebaseConfig';

let firebaseRef = null;
let firebaseAuth = null;
let authProvider = null;
let timestamp = null;

try {
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseRef = firebase.database().ref();
  firebaseAuth = firebase.auth();
  authProvider = new firebase.auth.GoogleAuthProvider();
  timestamp = firebase.database.ServerValue.TIMESTAMP;
}
catch (err) {
  console.log('[failed to initialize firebase app]');
}

export { firebaseRef, firebaseAuth, authProvider, timestamp };
