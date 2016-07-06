import { default as types } from '../constants/ActionTypes';

const initialState = {
  authData: null,
  profile: null,
  statusData: null,
};

//displayName: action.data.providerData[0].displayName,

const user = (state = initialState, action) => {

  console.log('action shit', action);

  switch (action.type){
    case types.AUTH_STATE:
      return Object.assign({}, state, {
        authData: {
          uid: action.data.uid,
          displayName: 'bob',
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
