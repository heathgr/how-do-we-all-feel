import { default as types } from '../constants/ActionTypes';
import { firebaseRef } from '../helpers/firebaseHelpers';

const listenToAuth = () => {
  return (dispatch, state) => {
    dispatch(
      {
        type: types.ON_AUTH,
      }
    );
  };
};

export { listenToAuth };
