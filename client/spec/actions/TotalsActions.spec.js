import { expect } from 'chai';
import sinon from 'sinon';
import TotalsActionsModule from '../../src/actions/TotalsActions';
import { listenToTotals, __RewireAPI__ as totalsRewire } from '../../src/actions/TotalsActions';
import { default as types } from '../../src/constants/ActionTypes';
import testTotalsAction from '../testConstants/testTotalsAction';

describe('Totals Actions', () => {
  it('should dispatch a totals updated action when the firebase totals are updated', () => {
    totalsRewire.__Rewire__('firebaseRef', {
      child: () => ({
        on: (eventType, callback) => {
          callback(
            {
              val: () => testTotalsAction,
            }
          );
        },
      }),
    });

    const dispatch = sinon.spy();
    const thunk = listenToTotals();

    thunk(dispatch);
    expect(dispatch.calledWithExactly({
      type: types.TOTALS_UPDATED,
      data: testTotalsAction,
    })).to.equal(true);

    totalsRewire.__ResetDependency__('firebaseRef');
  });
});
