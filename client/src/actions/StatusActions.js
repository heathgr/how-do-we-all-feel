import { default as types } from '../constants/ActionTypes';
import { firebaseRef } from '../helpers/firebaseHelpers';
import Firebase from 'firebase';

const listenToStatus = () => {
  return (dispatch, getState) => {
    firebaseRef.onAuth(
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
};

const updateStatus = (status) => {
  return (dispatch, getState) => {
    const authData = firebaseRef.getAuth();

    if (authData) {
      const appState = getState();
      const previousStatus = appState.user.statusData ? appState.user.statusData.status : -1;

      firebaseRef.child('user-statuses/' + authData.uid).set({
        status,
        previousStatus,
        timestamp: Firebase.ServerValue.TIMESTAMP,
      });
    } else {
      dispatch({
        type: types.STATUS_UPDATE_FAILED,
      });
    }
  };
};

export { listenToStatus, updateStatus };
