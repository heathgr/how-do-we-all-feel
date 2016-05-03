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

  console.log('initial status totals: ', totals);
  totalsRef.set(totals);

  firebaseRef.child('user-statuses').on('child_changed', (updateSnapshot) => {
    const statusData = updateSnapshot.val();

    totals[statusData.previousStatus]--;
    totals[statusData.status]++;

    console.log('updated status totals: ', totals);
    totalsRef.set(totals);
  });
});
