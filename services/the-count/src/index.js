'use strict';

const Firebase = require('firebase');
const firebaseConfig = require('../../../config/firebase/development/firebaseConfig');
const statuses = require('../../../config/statuses');

const firebaseRef = new Firebase(firebaseConfig.fullUrl);
const totalsRef = firebaseRef.child('totals');

firebaseRef.child('user-statuses').once('value', (snapshot) => {
  let totals = statuses.map(
    () => 0
  );

  snapshot.forEach(
    (childSnapshot) => {
      const statusData = childSnapshot.val();

      totals[statusData.status]++;
    }
  );

  console.log('\n              oooOOOooo\n           oOOOOOOOOOOOOOo\n         oOO\"           \"OO\n    ____oOO  ====   ====  OOo____ \n    \\   OO\'      ! !.---. \'OO   /\n     \\  OO   <0> ! !!<0>!  OO  /\n      \\ Oo       ! !\'---\'  oO /\n       \\o        \\_/        o/\n        .\' _______________ \'.\n      ,\'   :   V     V   :   \'.\n    ,\'      -_         _-      \'.\n  ,\'          \"oOOOOOo\"          \'.\n,\'              OOOOO              \'.\n-----------     \"OOO\"     -----------\n                 \"O\"\n\n             THE COUNT\n');
  console.log('initial count: ', totals);
  totalsRef.set(totals);

  firebaseRef.child('user-statuses').on('child_changed', (updateSnapshot) => {
    const statusData = updateSnapshot.val();

    totals[statusData.previousStatus]--;
    totals[statusData.status]++;

    console.log('\nnew update: ', snapshot.exportVal());
    console.log('updated totals: ', totals);
    totalsRef.set(totals);
  });
});
