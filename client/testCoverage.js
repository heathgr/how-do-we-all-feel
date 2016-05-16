var spawn = require('child_process').spawn;
var open = require('open');

process.env.NODE_PATH = __dirname + '/../config/firebase/test/';
process.env.BABEL_ENV = 'test';

var coverageThread = spawn(
  'babel-node',
  [
    'node_modules/.bin/isparta',
    'cover',
    'node_modules/.bin/_mocha',
    '--',
    '--require',
    'jsdom.config.js',
    '--recursive',
    'spec/**/*.spec.js',
    'spec/**/**/*.spec.js',
    '--colors',
  ]
);

coverageThread.stdout.on('data', (data) => {
  process.stdout.write(data);
});

coverageThread.stderr.on('data', (data) => {
  process.stdout.write(data);
});

coverageThread.on('close', () => {
  open('coverage/lcov-report/index.html');
});
