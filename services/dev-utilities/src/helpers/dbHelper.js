'use strict';

const firebase = require('firebase');
const firebaseConfig = require('../../../../config/firebase/development/firebaseConfig');

const firebaseApp = firebase.initializeApp({
  serviceAccount: __dirname + '/../../config/serviceAccountCredentials.json',
  databaseURL: 'https://hdwaf-development.firebaseio.com',
});

const checkConnection = () => new Promise(
  (resolve, reject) => {
    console.log('checking connection...');
    firebaseApp.database().ref('.info/connected').once('value', (data) => {
      const val = data.val();

      if (val) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
);

module.exports = {
  ref: firebaseApp.database().ref(),
  timestamp: firebase.database.ServerValue.TIMESTAMP,
  isConnected: firebase.database().ref('.info/connected'),
};
