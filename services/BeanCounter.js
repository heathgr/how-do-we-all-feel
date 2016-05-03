const Firebase = require('firebase');
const firebaseConfig = require('../config/firebase/development/firebaseConfig');

const firebaseRef = new Firebase(firebaseConfig.fullUrl); //TODO make it conditional on environment
const firebaseTimeRef = new Firebase(firebaseConfig.fullUrl + '/.info/serverTimeOffset');

firebaseTimeRef.once('value', (snapshot) => {
  const offset = snapshot.val();
  const serverTime = new Date().getTime() + offset;

  console.log('server time: ' + serverTime);
  console.log('offset: ' + offset);
});

firebaseRef.child('status-updates').on('child_added', (snapshot) => {

  const newUpdate = snapshot.val();

  if (newUpdate.uid && newUpdate.status && newUpdate.timeStamp) {
    firebaseRef.child('user-profiles/' + newUpdate.uid).once('value', (snapshot) => {
      const userProfile = snapshot.val();

      if (userProfile) {

      } else {
        console.log('INVALID USER: ' + newUpdate);
      }

      console.log('update user: ' + userProfile);
    });
  } else {
    console.error('MALFORMED STATUS UPDATE: ', newUpdate);
  }

  console.log('update: \n', newUpdate);

  //find old value
  //subtract old value if necessary
  //add new value
  //add to timeout array
  //set timer if neccessary
  //set totals in firebase
});

//on timer
  //check to see if value still needs to be subtracted
  //subtract value if necessary
  //cleanup timeout array
  //set next timer
