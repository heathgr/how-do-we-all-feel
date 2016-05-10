'use strict';

const Firebase = require('firebase');
const firebaseConfig = require('../../../config/firebase/development/firebaseConfig');
const statuses = require('../../../config/statuses');
const genders = require('../../../config/genders');
const ageRanges = require('../../../config/ageRanges');

const initializationMessage = require('./initializationMessage');
const series = require('run-series');

const start = () => {
  const firebaseRef = new Firebase(firebaseConfig.fullUrl);
  const totalsRef = firebaseRef.child('totals');

  let totals = {
    statusTotals: {
      overall: statuses.map(() => 0),
      byGender: genders.map(() => statuses.map(() => 0)),
      byAgeRange: ageRanges.map(() => statuses.map(() => 0)),
    },
    overallCount: 0,
  };

  const calcInitialCount = (completionCallback) => {
    firebaseRef.child('user-statuses').once('value', (allUpdatesSnapshot) => {
      const updateCount = allUpdatesSnapshot.numChildren();
      let completedCount = 0;

      allUpdatesSnapshot.forEach(
        (updateSnapshot) => {
          const statusData = updateSnapshot.val();
          const uid = updateSnapshot.ref().key();

          if (statusData.status != -1) {
            firebaseRef.child('user-profiles/' + uid).once('value', (userSnapshot) => {
              const userProfile = userSnapshot.val();

              totals.statusTotals.overall[statusData.status]++;
              totals.statusTotals.byGender[userProfile.gender][statusData.status]++;
              totals.statusTotals.byAgeRange[userProfile.ageRange][statusData.status]++;
              totals.overallCount++;
              console.log('initial count: ', totals);
              completedCount++;
              if (completedCount === updateCount) completionCallback(null);
            });
          }
        }
      );
    });
  };

  initializationMessage();
  calcInitialCount(() => {
    totalsRef.set(totals);

    firebaseRef.child('user-statuses').on('child_changed', (updateSnapshot) => {
      const statusData = updateSnapshot.val();
      const uid = updateSnapshot.ref().key();

      firebaseRef.child('user-profiles/' + uid).once('value', (userSnapshot) => {
        const userProfile = userSnapshot.val();

        if (statusData.previousStatus != -1) {
          totals.statusTotals.overall[statusData.previousStatus]--;
          totals.statusTotals.byGender[userProfile.gender][statusData.previousStatus]--;
          totals.statusTotals.byAgeRange[userProfile.ageRange][statusData.previousStatus]--;
          totals.overallCount++;
        }

        if (statusData.status != -1) {
          totals.statusTotals.overall[statusData.status]++;
          totals.statusTotals.byGender[userProfile.gender][statusData.status]++;
          totals.statusTotals.byAgeRange[userProfile.ageRange][statusData.status]++;
          console.log('\nnew update: ', updateSnapshot.exportVal(), uid);
          console.log('updated totals: ', totals);
          totalsRef.set(totals);
        }
      });
    });
  });
}();
