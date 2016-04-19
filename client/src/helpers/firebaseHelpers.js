import Firebase from 'firebase';
import firebaseConfig from 'firebaseConfig';

const firebaseRef = new Firebase(firebaseConfig.fullUrl);

export { firebaseRef };
