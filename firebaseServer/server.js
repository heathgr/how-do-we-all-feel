var FirebaseServer = require('firebase-server');
var firebaseConfig = require('../config/firebase/' + process.env.HDWAF_ENV + '/firebaseConfig');
var emoji = require('node-emoji');
var data = require('./data');

new FirebaseServer(firebaseConfig.port, firebaseConfig.url, data);

console.log(
  '==> ' +
  emoji.get('fire') +
  '  Firebase Server running at ' +
  firebaseConfig.url +
  ':' +
  firebaseConfig.port + '.'
);
