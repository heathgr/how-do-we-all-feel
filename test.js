var spawn = require('child_process').spawn;

process.env.NODE_PATH = __dirname + '/config/test/';

var mochaThread = spawn(
  'mocha',
  [
    '--require',
    'client/jsdom.config.js',
    '--compilers',
    'js:babel-core/register',
    '--recursive',
    'client/spec/**/*.spec.js',
    'client/spec/**/**/*.spec.js',
    '--colors',
  ]
);

mochaThread.stdout.on('data', (data) => {
  process.stdout.write(data);
});

mochaThread.stderr.on('data', (data) => {
  process.stdout.write(data);
});
