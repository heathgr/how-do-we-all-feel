var spawn = require('child_process').spawn;

process.env.NODE_PATH = __dirname + '/../config/firebase/development/';
process.env.BABEL_ENV = 'test';

var mochaThread = spawn(
  'mocha',
  [
    '--require',
    'jsdom.config.js',
    '--compilers',
    'js:babel-core/register',
    '--recursive',
    'spec/**/*.spec.js',
    'spec/**/**/*.spec.js',
    '--colors',
  ]
);

mochaThread.stdout.on('data', (data) => {
  process.stdout.write(data);
});

mochaThread.stderr.on('data', (data) => {
  process.stdout.write(data);
});
