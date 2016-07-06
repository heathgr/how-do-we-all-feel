var fork = require('child_process').fork;

process.env.BABEL_ENV = 'development';

fork('./client/server.js');
//fork('./services/the-count/src/index.js');
