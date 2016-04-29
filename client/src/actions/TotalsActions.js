import { default as types } from '../constants/ActionTypes';
import { firebaseRef } from '../helpers/firebaseHelpers';

const listenToTotals = () => {
  return (dispatch, getState) => {
    const totalsRef = firebaseRef.child('totals');

    totalsRef.on('value', (snapshot) => {
      dispatch({
        type: types.TOTALS_UPDATED,
        data: snapshot.val(),
      });
    });
  };
};

export { listenToTotals };
