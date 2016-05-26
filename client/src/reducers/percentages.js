import { default as types } from '../constants/ActionTypes';
const statuses = require('../../../config/statuses');
const genders = require('../../../config/genders');
const ageRanges = require('../../../config/ageRanges');

const initialState = {
  statuses: {
    overall: statuses.map(() => 0),
  },
  genders: {
    overall: genders.map(() => 0),
  },
  ageRanges: {
    overall: ageRanges.map(() => 0),
  },
};

const percentages = (state = initialState, action) => {
  switch (action.type){
    case types.TOTALS_UPDATED:
      const percentages = {
        statuses: {
          overall: action.data.statusTotals.overall.map(
            (total) => total / action.data.overallCount
          ),
        },
        ageRanges: {
          overall: action.data.ageRangeTotals.overall.map(
            (total) => total / action.data.overallCount
          ),
        },
        genders: {
          overall: action.data.genderTotals.overall.map(
            (total) => total / action.data.overallCount
          ),
        },
      };

      return Object.assign({}, state, percentages);
    default:
      return state;
  }
};

export default percentages;
