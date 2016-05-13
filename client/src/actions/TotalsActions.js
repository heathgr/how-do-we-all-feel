import { default as types } from '../constants/ActionTypes';
import { firebaseRef } from '../helpers/firebaseHelpers';

const listenToTotals = () => {
  return (dispatch, getState) => {
    firebaseRef.child('totals').on('value', (snapshot) => {
      dispatch({
        type: types.TOTALS_UPDATED,
        data: snapshot.val(),
      });
    });
  };
};

export { listenToTotals };
