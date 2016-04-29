import { default as types } from '../constants/ActionTypes';
import { firebaseRef } from '../helpers/firebaseHelpers';
import Firebase from 'firebase';

const createProfile = (ageRange, gender) => {
  return (dispatch) => {
    const authData = firebaseRef.getAuth();

    if (authData) {
      const profile = {
        displayName: authData.google.displayName,
        ageRange,
        gender,
        status: -1,
        updateTimestamp: Firebase.ServerValue.TIMESTAMP,
      };

      firebaseRef.child('user-profiles/' + authData.uid + '/').set(profile, (error) => {
        if (error) {
          dispatch({
            type: types.PROFILE_CREATION_FAILED,
          });
        } else {
          dispatch({
            type: types.PROFILE_CREATION_SUCCESSFUL,
          });
        }
      });
    } else {
      dispatch({
        type: types.PROFILE_CREATION_FAILED,
      });
    }
  };
};

const updateStatus = (status) => {
  return (dispatch) => {
    const updateRef = firebaseRef.child('status-updates').push();
    const authData = firebaseRef.getAuth();
    const update = {
      uid: authData.uid,
      status,
      timeStamp: Firebase.ServerValue.TIMESTAMP,
    };

    updateRef.set(update, (error) => {

    });
  };
};

export { updateStatus, createProfile };
