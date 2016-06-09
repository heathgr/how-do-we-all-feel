//jscs:disable maximumLineLength

import { expect } from 'chai';
import sinon from 'sinon';
import authData from '../testConstants/authData';
import { default as types } from '../../src/constants/ActionTypes';
import AuthActionsModule from '../../src/actions/AuthActions';
import { signIn, listenToAuthState, signOut, __RewireAPI__ as authRewire } from '../../src/actions/AuthActions';

describe('Auth Actions', () => {

  it('should dispatch a login succesful action when google login is succesful', () => {

    let resolvePromise;
    let rejectPromise;

    const redirectPromise = new Promise(
      (resolve, reject) => {
        resolvePromise = resolve;
        rejectPromise = reject;
      }
    );

    authRewire.__Rewire__('firebaseAuth', {
      signInWithRedirect: sinon.spy(),
      getRedirectResult: () => redirectPromise,
    });

    const dispatch = sinon.spy();
    const signInThunk = signIn();

    signInThunk(dispatch);
    redirectPromise.then(
      () => expect(dispatch.calledWithExactly({ type: types.SIGN_IN_SUCCESSFUL })).to.equal(true)
    );
    resolvePromise();

    authRewire.__ResetDependency__('firebaseAuth');
  });

  it('should dispatch a login failed action when google login doesn\'t work', () => {

    let resolvePromise;
    let rejectPromise;

    const redirectPromise = new Promise(
      (resolve, reject) => {
        resolvePromise = resolve;
        rejectPromise = reject;
      }
    );

    authRewire.__Rewire__('firebaseAuth', {
      signInWithRedirect: sinon.spy(),
      getRedirectResult: () => redirectPromise,
    });

    const dispatch = sinon.spy();
    const signInThunk = signIn();

    signInThunk(dispatch);
    redirectPromise.then(
      () => expect(dispatch.calledWithExactly({ type: types.SIGN_IN_FAILED })).to.equal(true)
    );
    rejectPromise();

    authRewire.__ResetDependency__('firebaseAuth');
  });

  it('should dispatch an auth state changed action with auth data when authorization is sucessful', () => {
    authRewire.__Rewire__('firebaseAuth', {
      onAuthStateChanged: (callback) => {
        callback(authData);
      },
    });

    const dispatch = sinon.spy();
    const authStateThunk = listenToAuthState();

    authStateThunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.AUTH_STATE, data: authData }));

    authRewire.__ResetDependency__('firebaseAuth');
  });

  it('should dispatch an auth action with false auth data when authorization is not successful', () => {
    authRewire.__Rewire__('firebaseAuth', {
      onAuthStateChanged: (callback) => {
        callback(null);
      },
    });

    const dispatch = sinon.spy();
    const authStateThunk = listenToAuthState();

    authStateThunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.AUTH_STATE, data: null }));

    authRewire.__ResetDependency__('firebaseAuth');
  });

  it('should dispatch a sign off successful action when the user signs out successfuly', () => {
    let signoutResolve;
    let signoutReject;

    const signOutPromise = new Promise(
      (resolve, reject) => {
        signoutResolve = resolve;
        signoutReject = reject;
      }
    );

    authRewire.__Rewire__('firebaseAuth', {
      signOut: () => signOutPromise,
    });

    const dispatch = sinon.spy();
    const signOutThunk = signOut();

    signOutThunk(dispatch);
    signOutPromise.then(
      () => expect(dispatch.calledWithExactly({ type: types.SIGN_OFF_SUCCESSFUL })).to.equal(true)
    );
    signoutResolve();

    authRewire.__ResetDependency__('firebaseAuth');
  });

  it('should dispatch a sign off failed action if there is an error when a user signs off', () => {
    let signoutResolve;
    let signoutReject;

    const signOutPromise = new Promise(
      (resolve, reject) => {
        signoutResolve = resolve;
        signoutReject = reject;
      }
    );

    authRewire.__Rewire__('firebaseAuth', {
      signOut: () => signOutPromise,
    });

    const dispatch = sinon.spy();
    const signOutThunk = signOut();

    signOutThunk(dispatch);
    signOutPromise.then(
      () => expect(dispatch.calledWithExactly({ type: types.SIGN_OFF_FAILED })).to.equal(true)
    );
    signoutReject();

    authRewire.__ResetDependency__('firebaseAuth');
  });
});
