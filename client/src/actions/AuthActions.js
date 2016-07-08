import { default as types } from '../constants/ActionTypes';
import { firebaseAuth, authProvider } from '../helpers/firebaseHelpers';

const signIn = () => (dispatch) => {
  firebaseAuth.signInWithRedirect(authProvider);
  firebaseAuth.getRedirectResult().then(
    (result) => {
      dispatch({
        type: types.SIGN_IN_SUCCESSFUL,
      });
    }
  ).catch(
    (error) => {
      dispatch({
        type: types.SIGN_IN_FAILED,
      });
    }
  );
};

const listenToAuthState = () => (dispatch) => {
  firebaseAuth.onAuthStateChanged(
    (user) => {
      if (user) {
        dispatch({
          type: types.AUTH_STATE,
          data: user,
        });
      } else {
        dispatch({
          type: types.AUTH_STATE,
          data: false,
        });
      }
    }
  );
};

const signOut = () => (dispatch) => {
  firebaseAuth.signOut().then(
    () => {
      dispatch({
        type: types.SIGN_OFF_SUCCESSFUL,
      });
    }
  ).catch(
    (err) => {
      dispatch({
        type: types.SIGN_OFF_FAILED,
      });
    }
  );
};

export { listenToAuthState, signIn, signOut };
