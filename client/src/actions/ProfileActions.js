import { default as types } from '../constants/ActionTypes';
import { firebaseRef, firebaseAuth, timestamp } from '../helpers/firebaseHelpers';

const createProfile = (ageRange, gender) => (dispatch) => {
  const user = firebaseAuth.currentUser;

  if (user) {
    const profile = {
      displayName: user.providerData[0].displayName,
      ageRange,
      gender,
      timestamp,
    };

    firebaseRef.child('user-profiles/' + user.uid).set(profile, (error) => {
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

const listenToProfile = () => (dispatch) => {
  firebaseAuth.onAuthStateChanged(
    (user) => {
      if (user) {
        firebaseRef.child('user-profiles/' + user.uid).on('value', (snapshot) => {
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

export { createProfile, listenToProfile };
