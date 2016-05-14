import { expect } from 'chai';
import rootReducer from '../../src/reducers/rootReducer';

describe('root reducer', () => {
  const testAction = {
    type: 'test type',
  };
  const testState = rootReducer(undefined, testAction);

  it('should combine the totals reducer', () => {
    expect('notifications' in testState).to.equal(true);
  });

  it('should combine the user reducer', () => {
    expect('user' in testState).to.equal(true);
  });

  it('should combine the notifications reducer', () => {
    expect('notifications' in testState).to.equal(true);
  });
});
