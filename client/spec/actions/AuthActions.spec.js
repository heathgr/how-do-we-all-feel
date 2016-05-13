import { expect } from 'chai';
import sinon from 'sinon';
import authData from '../testConstants/authData';
import { default as types } from '../../src/constants/ActionTypes';
import AuthActionsModule from '../../src/actions/AuthActions';
import { signIn, listenToAuthData, signOut, __RewireAPI__ as authRewire } from '../../src/actions/AuthActions';

describe('Auth Actions', () => {

  it('should dispatch a login succesful action when google login is succesful', () => {
    authRewire.__Rewire__('firebaseRef', {
      authWithOAuthRedirect: (provider, callback) => {
        callback(null, authData);
      },
    });

    const dispatch = sinon.spy();
    const signInThunk = signIn();

    signInThunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.SIGN_IN_SUCCESSFUL })).to.equal(true);

    authRewire.__ResetDependency__('firebaseRef');
  });

  it('should dispatch a login failed action when google login doesn\'t work', () => {
    authRewire.__Rewire__('firebaseRef', {
      authWithOAuthRedirect: (provider, callback) => {
        callback('auth failed', null);
      },
    });

    const dispatch = sinon.spy();
    const signInThunk = signIn();

    signInThunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.SIGN_IN_FAILED })).to.equal(true);

    authRewire.__ResetDependency__('firebaseRef');
  });

  it('should dispatch an auth action with auth data when authorization is sucessful', () => {
    authRewire.__Rewire__('firebaseRef', {
      onAuth: (callback) => {
        callback(authData);
      },
    });

    const dispatch = sinon.spy();
    const authThunk = listenToAuthData();

    authThunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.AUTH_DATA, data: authData }));

    authRewire.__ResetDependency__('firebaseRef');
  });

  it('should dispatch an auth action with false auth data when authorization is not successful', () => {
    authRewire.__Rewire__('firebaseRef', {
      onAuth: (callback) => {
        callback(null);
      },
    });

    const dispatch = sinon.spy();
    const authThunk = listenToAuthData();

    authThunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.AUTH_DATA, data: false }));

    authRewire.__ResetDependency__('firebaseRef');
  });

  it('should dispatch a sign out action when unauth is invoked', () => {
    authRewire.__Rewire__('firebaseRef', {
      unauth: () => {},
    });

    const dispatch = sinon.spy();
    const signOutThunk = signOut();

    signOutThunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.SIGN_OFF })).to.equal(true);

    authRewire.__ResetDependency__('firebaseRef');
  });
});
