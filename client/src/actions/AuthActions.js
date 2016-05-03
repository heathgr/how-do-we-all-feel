import Firebase from 'firebase';
import { default as types } from '../constants/ActionTypes';
import { firebaseRef } from '../helpers/firebaseHelpers';

let userProfileRef = null;

const signIn = () => {
  return (dispatch) => {
    firebaseRef.authWithOAuthRedirect('google', (error, authData) => {
      if (error) {
        dispatch({
          type: types.SIGN_IN_FAILED,
        });
      } else {
        dispatch({
          type: types.SIGN_IN_SUCCESSFUL,
        });
      }
    });
  };
};

const listenToAuthData = () => {
  return (dispatch, getState) => {
    firebaseRef.onAuth(
      (authData) => {
        if (authData) {
          dispatch({
            type: types.AUTH_DATA,
            data: authData,
          });
        } else {
          dispatch({
            type: types.AUTH_DATA,
            data: false,
          });
        }
      }
    );
  };
};

const signOut = () => {
  return (dispatch) => {
    firebaseRef.unauth();
    dispatch({
      types: types.SIGN_OFF,
    });
  };
};

export { listenToAuthData, signIn, signOut };
