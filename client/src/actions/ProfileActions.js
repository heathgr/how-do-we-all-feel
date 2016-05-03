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
        timestamp: Firebase.ServerValue.TIMESTAMP,
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

const listenToProfile = () => {
  return (dispatch) => {
    firebaseRef.onAuth(
      (authData) => {
        if (authData) {
          firebaseRef.child('user-profiles/' + authData.uid).on('value', (snapshot) => {
            if (snapshot.exists()) {
              dispatch({
                type: types.PROFILE,
                data: snapshot.val(),
              });
            } else {
              dispatch({
                type: types.PROFILE,
                data: false,
              });
            }
          });
        }
      }
    );
  };
};

export { createProfile, listenToProfile };
