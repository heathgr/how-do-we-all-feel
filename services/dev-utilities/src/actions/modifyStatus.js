
const dbHelper = require('../helpers/dbHelper');

const modifyStatus = (newStatus) => new Promise(
  (resolve, reject) => {
    const statusRef = dbHelper.ref.child('user-statuses/' + newStatus.uid);

    statusRef.once('value', (statusData) => {
      if (statusData.exists()) {
        statusRef.set({
          status: newStatus.status,
          previousStatus: statusData.val().status,
          timestamp: dbHelper.timestamp,
        }).then(
          () => {
            resolve();
          }
        )
        .catch(
          (err) => {
            reject(err);
          }
        );
      }
    });
    resolve();
  }
);

module.exports = modifyStatus;
