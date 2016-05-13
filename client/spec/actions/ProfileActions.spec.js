//jscs:disable maximumLineLength

import { expect } from 'chai';
import sinon from 'sinon';
import ProfileActionModule from '../../src/actions/ProfileActions';
import { createProfile, listenToProfile, __RewireAPI__ as profileRewire} from '../../src/actions/ProfileActions';
import authData from '../testConstants/authData';
import profile from '../testConstants/profile';
import { default as types } from '../../src/constants/ActionTypes';

describe('Profile Actions', () => {
  it('should dispatch a profile creation sucessful action when the profile was created sucessfully', () => {
    profileRewire.__Rewire__('firebaseRef', {
      getAuth: () => {
        return authData;
      },

      child: () => {
        return {
          set: (data, callback) => {
            callback(null);
          },
        };
      },
    });

    const dispatch = sinon.spy();
    const thunk = createProfile();

    thunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.PROFILE_CREATION_SUCCESSFUL })).to.equal(true);

    profileRewire.__ResetDependency__('firebaseRef');
  });

  it('should dispatch a profile creation failed action if the user tries to create a profile when unathenticated', () => {
    profileRewire.__Rewire__('firebaseRef', {
      getAuth: () => {
        return null;
      },
    });

    const dispatch = sinon.spy();
    const thunk = createProfile();

    thunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.PROFILE_CREATION_FAILED })).to.equal(true);

    profileRewire.__ResetDependency__('firebaseRef');
  });

  it('should dispatch a profile creation failed action if there is an error when writting to firebase ', () => {
    profileRewire.__Rewire__('firebaseRef', {
      getAuth: () => {
        return authData;
      },

      child: () => {
        return {
          set: (data, callback) => {
            callback('firebase write failed');
          },
        };
      },
    });

    const dispatch = sinon.spy();
    const thunk = createProfile();

    thunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.PROFILE_CREATION_FAILED })).to.equal(true);

    profileRewire.__ResetDependency__('firebaseRef');
  });

  it('should dispatch a profile action with profile data if the user profile is successfully retrieved from firebase', () => {
    profileRewire.__Rewire__('firebaseRef', {
      onAuth: (callback) => {
        callback(authData);
      },

      child: () => {
        return {
          on: (eventType, callback) => {
            callback({
              exists: () => {
                return true;
              },

              val: () => {
                return profile;
              },
            });
          },
        };
      },
    });

    const dispatch = sinon.spy();
    const thunk = listenToProfile();

    thunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.PROFILE, data: profile })).to.equal(true);

    profileRewire.__ResetDependency__('firebaseRef');
  });

  it('should dispatch a profile action width false data if there is no user profile or the user profile can\'t be retrieved from firebase', () => {
    profileRewire.__Rewire__('firebaseRef', {
      onAuth: (callback) => {
        callback(authData);
      },

      child: () => {
        return {
          on: (eventType, callback) => {
            callback({
              exists: () => {
                return false;
              },
            });
          },
        };
      },
    });

    const dispatch = sinon.spy();
    const thunk = listenToProfile();

    thunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.PROFILE, data: false })).to.equal(true);

    profileRewire.__ResetDependency__('firebaseRef');
  });
});
