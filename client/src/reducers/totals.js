import { default as types } from '../constants/ActionTypes';
import statuses from '../../../config/statuses';
import genders from '../../../config/genders';
import ageRanges from '../../../config/ageRanges';

const initialState = {
  statusTotals: {
    overall: statuses.map(() => 0),
    byGender: genders.map(() => statuses.map(() => 0)),
    ageRanges: genders.map(() => statuses.map(() => 0)),
  },
  overallCount: 0,
};

const totals = (state = initialState, action) => {
  switch (action.type){
    case types.TOTALS_UPDATED:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export default totals;
