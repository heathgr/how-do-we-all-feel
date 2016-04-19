import { default as types } from '../constants/ActionTypes';

const initialState = {
  authData: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type){
    case types.AUTH:
      return Object.assign({}, state, { authData: action.data });
    case types.TOTALS_UPDATED:
      return Object.assign({}, state, { totals: action.data });
    default:
      return state;
  }
};

export default rootReducer;
