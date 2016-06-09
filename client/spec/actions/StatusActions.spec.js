//jscs:disable maximumLineLength

import { expect } from 'chai';
import sinon from 'sinon';
import StatusActionModule from '../../src/actions/StatusActions';
import { listenToStatus, updateStatus, __RewireAPI__ as statusRewire } from '../../src/actions/StatusActions';
import { default as types } from '../../src/constants/ActionTypes';

import statusData from '../testConstants/statusData';
import authData from '../testConstants/authData';

// import profile from '../testConstants/profile';

describe('Status Actions', () => {
  it('should dispatch a status action with status data if the user\'s status is sucessfully retrieved from firebase', () => {
    statusRewire.__Rewire__('firebaseRef', {
      child: () => ({
        on: (eventType, callback) => {
          callback({
            exists: () => true,
            val: () => statusData,
          });
        },
      }),
    });
    statusRewire.__Rewire__('firebaseAuth', {
      onAuthStateChanged: (callback) => {
        callback(authData);
      },
    });

    const dispatch = sinon.spy();
    const thunk = listenToStatus();

    thunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.STATUS, data: statusData })).to.equal(true);

    statusRewire.__ResetDependency__('firebaseAuth');
    statusRewire.__ResetDependency__('firebaseRef');
  });

  it('should dispatch a status action with false data if the user\'s status is not sucessfully retrieved from firebase', () => {
    statusRewire.__Rewire__('firebaseRef', {
      child: () => ({
        on: (eventType, callback) => {
          callback({
            exists: () => false,
          });
        },
      }),
    });
    statusRewire.__Rewire__('firebaseAuth', {
      onAuthStateChanged: (callback) => {
        callback(authData);
      },
    });

    const dispatch = sinon.spy();
    const thunk = listenToStatus();

    thunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.STATUS, data: false })).to.equal(true);

    statusRewire.__ResetDependency__('firebaseAuth');
    statusRewire.__ResetDependency__('firebaseRef');
  });

  it('should correctly set status data', () => {
    let testData;

    statusRewire.__Rewire__('firebaseRef', {
      child: () => ({
        set: (data, callback) => {
          testData = data;
        },
      }),
    });
    statusRewire.__Rewire__('firebaseAuth', {
      currentUser: authData,
    });

    const dispatch = sinon.spy();
    const thunk = updateStatus(2, 0);

    thunk(dispatch);

    //timestamp will be null because the firebase app does not initialize in a test environment

    expect(testData).to.deep.equal({
      status: 2,
      previousStatus: 0,
      timestamp: null,
    });

    statusRewire.__ResetDependency__('firebaseAuth');
    statusRewire.__ResetDependency__('firebaseRef');
  });

  it('should dispatch a status update successful event if the user\'s status is updated in firebase successfully', () => {
    statusRewire.__Rewire__('firebaseRef', {
      child: () => ({
        set: (data, callback) => {
          callback(null);
        },
      }),
    });
    statusRewire.__Rewire__('firebaseAuth', {
      currentUser: authData,
    });

    const dispatch = sinon.spy();
    const thunk = updateStatus(2, 0);

    thunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.STATUS_UPDATE_SUCCESSFUL })).to.equal(true);

    statusRewire.__ResetDependency__('firebaseAuth');
    statusRewire.__ResetDependency__('firebaseRef');
  });

  it('should dispatch a status update failed action if the status update is attempted when unauthenticated', () => {
    statusRewire.__Rewire__('firebaseAuth', {
      currentUser: null,
    });

    const dispatch = sinon.spy();
    const thunk = updateStatus(2, 0);

    thunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.STATUS_UPDATE_FAILED })).to.equal(true);

    statusRewire.__ResetDependency__('firebaseAuth');
  });

  it('should dispatch a status update failed action if the user\'s status is not updated in firease successfully', () => {
    statusRewire.__Rewire__('firebaseRef', {
      child: () => ({
        set: (data, callback) => {
          callback('Write Failed');
        },
      }),
    });
    statusRewire.__Rewire__('firebaseAuth', {
      currentUser: authData,
    });

    const dispatch = sinon.spy();
    const thunk = updateStatus(2, 0);

    thunk(dispatch);
    expect(dispatch.calledWithExactly({ type: types.STATUS_UPDATE_FAILED })).to.equal(true);

    statusRewire.__ResetDependency__('firebaseAuth');
    statusRewire.__ResetDependency__('firebaseRef');
  });
});
