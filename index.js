var fork = require('child_process').fork;

process.env.HDWAF_ENV = 'development';

fork('./firebaseServer/server.js');
fork('./client/server.js');
