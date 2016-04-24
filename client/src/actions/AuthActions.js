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

const createProfile = (ageRangeId, genderId) => {
  return (dispatch) => {
    const authData = firebaseRef.getAuth();

    if (authData) {
      const profile = {
        displayName: auth.google.displayName,
        ageRangeId,
        genderId,
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

const signOff = () => {
  return (dispatch) => {
    firebaseRef.unauth();
    dispatch({
      types: types.SIGN_OFF,
    });
  };
};

export { listenToAuth, signIn, createProfile };
