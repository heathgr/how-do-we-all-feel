
const dbHelper = require('../helpers/dbHelper');

const createUser = (user) => new Promise(
  (resolve, reject) => {
    dbHelper.ref.child('user-profiles/' + user.uid).set(
      {
        displayName: user.displayName,
        ageRange: user.ageRange,
        gender: user.gender,
        timestamp: dbHelper.timestamp,
      }
    ).then(
      () => {
        resolve();
      }
    ).catch(
      (err) => {
        reject(err);
      }
    );
  }
);

module.exports = createUser;
