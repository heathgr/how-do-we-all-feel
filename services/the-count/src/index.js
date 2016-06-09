'use strict';

const startupMessage = require('./startupMessage');
const calcInitialTotals = require('./calcInitialTotals');
const watchStatusUpdates = require('./watchStatusUpdates');
const watchUserProfiles = require('./watchUserProfiles');

const start = () => {
  startupMessage();
  calcInitialTotals
    .then(
      () => {
        console.log('initial totals calculated');
        watchStatusUpdates();
        watchUserProfiles();
      }
    )
    .catch(
      (err) => {
        console.log('[ERROR] It didn\'t work.  Couldn\'t calculate inital totals.  Holly shit snacks....');
        console.log(err);
      }
    );
};

start();
