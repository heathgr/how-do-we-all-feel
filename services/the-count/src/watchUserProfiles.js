const dbRef = require('./dbRef');
const firebase = require('firebase');

const watchUserProfiles = () => {
  dbRef.child('user-profiles').on('child_added', (profileData) => {
    const userStatusRef = dbRef.child('user-statuses/' + profileData.key);

    console.log('user profile added: ', profileData.key);
    userStatusRef.once('value', (userStatusData) => {
      if (!userStatusData.exists()) {
        console.log('creating status data for: ', profileData.key);
        userStatusRef.set({
          previousStatus: -1,
          status: -1,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
        });
      }
    });
  });
};

module.exports = watchUserProfiles;
