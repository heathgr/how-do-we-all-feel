'use strict';

const dbRef = require('./dbRef');
const totals = require('./totals');

const watchStatusUpdates = () => {
  dbRef.child('user-statuses').on('child_changed', (statusData) => {
    const statusVal = statusData.val();
    const uid = statusData.key;

    console.log('status updated for user: ', uid);
    //TODO validate updated data
    if (statusVal) {
      dbRef.child('user-profiles/' + uid).once('value', (profileData) => {
        const profileVal = profileData.val();

        console.log('status: ', statusVal);
        //TODO validate profile
        if (profileVal && statusVal.status > -1) {

          //add new values
          totals.statusTotals.overall[statusVal.status]++;
          totals.statusTotals.byGender[profileVal.gender][statusVal.status]++;
          totals.statusTotals.byAgeRange[profileVal.ageRange][statusVal.status]++;
          totals.genderTotals.byStatus[statusVal.status][profileVal.gender]++;
          totals.ageRangeTotals.byStatus[statusVal.status][profileVal.ageRange]++;

          if (statusVal.previousStatus === -1) {
            totals.genderTotals.overall[profileVal.gender]++;
            totals.genderTotals.byAgeRange[profileVal.ageRange][profileVal.gender]++;
            totals.ageRangeTotals.overall[profileVal.ageRange]++;
            totals.ageRangeTotals.byGender[profileVal.gender][profileVal.ageRange]++;
            totals.overallCount++;
          }

          //subtract previous value stuff
          if (statusVal.previousStatus != -1) {
            totals.statusTotals.overall[statusVal.previousStatus]--;
            totals.statusTotals.byGender[profileVal.gender][statusVal.previousStatus]--;
            totals.statusTotals.byAgeRange[profileVal.ageRange][statusVal.previousStatus]--;
            totals.genderTotals.byStatus[statusVal.previousStatus][profileVal.gender]--;
            totals.ageRangeTotals.byStatus[statusVal.previousStatus][profileVal.ageRange]--;
          }

          dbRef.child('totals').set(totals, (error) => {
            if (error) {
              console.log('[ERROR] status update failed for: ', uid);
            } else {
              console.log('[SUCESS] status update sucessful for: ', uid);
            }
          });
        } else {
          console.log('[IGNORING] status update for: ', uid);
        }
      });
    }
  });
};

module.exports = watchStatusUpdates;
