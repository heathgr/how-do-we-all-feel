import { default as types } from '../constants/ActionTypes';

const initialState = {
  user: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type){
    case types.AUTH:
      return Object.assign({}, state, { user: action.data });
    case types.TOTALS_UPDATED:
      return Object.assign({}, state, { totals: action.data });
    default:
      return state;
  }
};

export default rootReducer;
