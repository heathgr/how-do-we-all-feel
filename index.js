var fork = require('child_process').fork;

process.env.HDWAF_ENV = 'development';

fork('./client/server.js');
