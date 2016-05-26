import { expect } from 'chai';
import { default as types } from '../../src/constants/ActionTypes';
import totals from '../../src/reducers/totals';

describe('totals reducer', () => {
  it('should update the app totals when a totals updated action is dispatched', () => {
    const state = {
      overall: [0, 2, 0, 1, 1, 0],
      byGender: [
          [0, 1, 0, 1, 0, 0],
          [0, 1, 0, 0, 1, 0],
          [0, 0, 0, 0, 0, 0],
      ],
      byAgeRange: [
        [0, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ],
    };
    const expectedState = {
      overall: [0, 2, 0, 2, 2, 0],
      byGender: [
          [0, 1, 0, 1, 0, 0],
          [0, 1, 0, 0, 1, 0],
          [0, 0, 0, 1, 1, 0],
      ],
      byAgeRange: [
        [0, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0],
      ],
    };
    const action = {
      type: types.TOTALS_UPDATED,
      data: expectedState,
    };

    expect(totals(state, action)).to.deep.equal(expectedState);
  });
});
