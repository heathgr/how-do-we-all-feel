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

const listenToAuth = () => {
  return (dispatch, state) => {
    firebaseRef.onAuth(
      (authData) => {
        if (authData) {
          if (userProfileRef) userProfileRef.off('value');

          userProfileRef = firebaseRef.child('user-profiles/' + authData.uid);
          userProfileRef.on('value', (snapshot) => {
            const profile = snapshot.val();

            if (profile) {
              dispatch({
                type: types.AUTH,
                data: {
                  authData,
                  profile,
                },
              });
            } else {
              dispatch({
                type: types.AUTH,
                data: {
                  authData,
                  profile: null,
                },
              });
            }
          });
        } else {
          dispatch({
            type: types.AUTH,
            data: {
              authData: null,
              profile: null,
            },
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

export { listenToAuth, signIn, signOut };
