import { default as types } from '../constants/ActionTypes';
import { firebaseRef } from '../helpers/firebaseHelpers';

const listenToAuth = () => {
  return (dispatch, state) => {
    firebaseRef.onAuth(
      (authData) => {
        dispatch(
          {
            type: types.AUTH,
            data: authData,
          }
        );
      }
    );
  };
};

export { listenToAuth };
