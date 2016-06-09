import { expect } from 'chai';
import { default as types } from '../../src/constants/ActionTypes';
import user from '../../src/reducers/user';
import authData from '../testConstants/authData';
import profile from '../testConstants/profile';
import statusData from '../testConstants/statusData';

describe('user reducer', () => {
  it('should update the user state based on authentication actions', () => {
    const state = {
      authData: false,
      profile: null,
      statusData: null,
    };
    const expectedState = {
      authData: authData,
      profile: null,
      statusData: null,
    };
    const action = {
      type: types.AUTH_STATE,
      data: {
        uid: 'test:00001',
        providerData: [
          {
            displayName: 'Doctor Philastus Hurlbut',
          },
        ],
      },
    };

    expect(user(state, action)).to.deep.equal(expectedState);
  });

  it('should update the user state based on profile actions', () => {
    const state = {
      authData: authData,
      profile: null,
      statusData: null,
    };
    const expectedState = {
      authData: authData,
      profile: profile,
      statusData: null,
    };
    const action = {
      type: types.PROFILE,
      data: profile,
    };

    expect(user(state, action)).to.deep.equal(expectedState);
  });

  it('should update the user state based on status actions', () => {
    const state = {
      authData: authData,
      profile: profile,
      statusData: null,
    };
    const expectedState = {
      authData: authData,
      profile: profile,
      statusData: statusData,
    };
    const action = {
      type: types.STATUS,
      data: statusData,
    };

    expect(user(state, action)).to.deep.equal(expectedState);
  });
});
