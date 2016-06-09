import { default as types } from '../constants/ActionTypes';

const initialState = {
  authData: null,
  profile: null,
  statusData: null,
};

const user = (state = initialState, action) => {
  switch (action.type){
    case types.AUTH_STATE:
      return Object.assign({}, state, {
        authData: {
          uid: action.data.uid,
          displayName: action.data.providerData[0].displayName,
        },
      });
    case types.PROFILE:
      return Object.assign({}, state, { profile: action.data });
    case types.STATUS:
      return Object.assign({}, state, { statusData: action.data });
    default:
      return state;
  }
};

export default user;
