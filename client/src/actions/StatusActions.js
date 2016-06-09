import { default as types } from '../constants/ActionTypes';
import { firebaseRef, firebaseAuth, timestamp } from '../helpers/firebaseHelpers';

const listenToStatus = () => (dispatch, getState) => {
  firebaseAuth.onAuthStateChanged(
    (authData) => {
      if (authData) {
        firebaseRef.child('user-statuses/' + authData.uid).on('value', (snapshot) => {
          if (snapshot.exists()) {
            dispatch({
              type: types.STATUS,
              data: snapshot.val(),
            });
          } else {
            dispatch({
              type: types.STATUS,
              data: false,
            });
          }
        });
      }
    }
  );
};

const updateStatus = (status, previousStatus) => (dispatch, getState) => {
  const authData = firebaseAuth.currentUser;

  if (authData && previousStatus != null) {
    firebaseRef.child('user-statuses/' + authData.uid).set({
      status,
      previousStatus,
      timestamp,
    },
    (error) => {
      if (error) {
        dispatch({
          type: types.STATUS_UPDATE_FAILED,
        });
      } else {
        dispatch({
          type: types.STATUS_UPDATE_SUCCESSFUL,
        });
      }
    });
  } else {
    dispatch({
      type: types.STATUS_UPDATE_FAILED,
    });
  }
};

export { listenToStatus, updateStatus };
