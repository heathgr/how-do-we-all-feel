const firebase = require('firebase');
const firebaseConfig = require('../../../config/firebase/development/firebaseConfig');

//TODO use env variable so firebase config will be different for dev or production

const firebaseApp = firebase.initializeApp({
  serviceAccount: __dirname + '/../config/serviceAccountCredentials.json',
  databaseURL: 'https://hdwaf-development.firebaseio.com',
});

module.exports = firebase.database().ref();
