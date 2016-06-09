'use strict';

const totals = require('./totals');
const dbRef = require('./dbRef');

const calcInitialTotals = new Promise(
  (resolve, reject) => {
    dbRef.child('user-statuses').once('value', (allStatusUpdateData) => {
      const statusCount = allStatusUpdateData.numChildren();
      let evaluationCount = 0;

      allStatusUpdateData.forEach(
        (statusData) => {
          const statusVal = statusData.val();

          //TODO validate status data using joi or something
          if (statusVal.status != -1) {
            const uid = statusData.key;

            console.log('evaluating status for user: ', uid);
            dbRef.child('user-profiles/' + uid).once('value', (profileData) => {
              const profileVal = profileData.val();

              //TODO validate profile using joi or whatever
              if (profileData.exists()) {
                totals.statusTotals.overall[statusVal.status]++;
                totals.statusTotals.byGender[profileVal.gender][statusVal.status]++;
                totals.statusTotals.byAgeRange[profileVal.ageRange][statusVal.status]++;
                totals.genderTotals.overall[profileVal.gender]++;
                totals.genderTotals.byStatus[statusVal.status][profileVal.gender]++;
                totals.genderTotals.byAgeRange[profileVal.ageRange][profileVal.gender]++;
                totals.ageRangeTotals.overall[profileVal.ageRange]++;
                totals.ageRangeTotals.byStatus[statusVal.status][profileVal.ageRange]++;
                totals.ageRangeTotals.byGender[profileVal.gender][profileVal.ageRange]++;
                totals.overallCount++;
                evaluationCount++;
                console.log('[SUCCESS] Evaluated user status: ' + statusData.key + ' ' + evaluationCount + '/' + statusCount);
                if (evaluationCount == statusCount) {
                  dbRef.child('totals').set(totals, (error) => {
                    if (error) reject(error);
                  });
                  resolve();
                }
              } else {
                console.error('[ERROR] Invalid user status :' + statusData.key + ' There is no valid associated user profile');
              }
            });
          } else {
            evaluationCount++;
            console.log('[SUCCESS] Ignoreing user status: ' + statusData.key + ' ' + evaluationCount + '/' + statusCount);
            if (evaluationCount == statusCount) {
              dbRef.child('totals').set(totals, (error) => {
                if (error) reject(error);
              });
              resolve();
            }
          }
        }
      );
    });
  }
);

module.exports = calcInitialTotals;
