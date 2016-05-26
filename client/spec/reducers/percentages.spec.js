import { expect } from 'chai';
import { default as types } from '../../src/constants/ActionTypes';
import percentages from '../../src/reducers/percentages';
import totals from '../testConstants/testTotals';
import expectedPercentages from '../testConstants/testPercentages';

describe('percentages reducer', () => {
  it('should calculate totals percentages when a totals updated action is dispatched ', () => {
    const action = {
      type: types.TOTALS_UPDATED,
      data: totals,
    };

    expect(percentages(undefined, action)).to.deep.equal(expectedPercentages);
  });
});
