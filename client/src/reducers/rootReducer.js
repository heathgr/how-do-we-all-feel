import { default as types } from '../constants/ActionTypes';

const initialState = {
  user: {
    authData: null,
    profile: null,
    status: null,
  },
};

const rootReducer = (state = initialState, action) => {
  let user;

  switch (action.type){
    case types.AUTH_DATA:
      user = Object.assign({}, state.user, { authData: action.data });

      return Object.assign({}, state, { user });
    case types.PROFILE:
      user = Object.assign({}, state.user, { profile: action.data });

      return Object.assign({}, state, { user });
    case types.STATUS:
      user = Object.assign({}, state.user, { statusData: action.data });

      return Object.assign({}, state, { user });
    case types.TOTALS_UPDATED:
      return Object.assign({}, state, { totals: action.data });
    default:
      return state;
  }
};

export default rootReducer;
