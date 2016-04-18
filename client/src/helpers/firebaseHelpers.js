import Firebase from 'firebase';
import firebaseConfig from 'firebaseConfig';

console.log('firebase url', firebaseConfig);

const firebaseRef = new Firebase(firebaseConfig.fullUrl);

export { firebaseRef };
