import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import totals from '../testConstants/testTotals';
import graphData from '../testConstants/testGraphData';
import percentages from '../testConstants/testPercentages';

import App from '../../src/components/App';
import Graph from '../../src/components/Graph';
import Menu from '../../src/components/Menu';
import Notifications from '../../src/components/Notifications';

describe('<App />', () => {

  chai.use(chaiEnzyme());

  const user = {
    authData: null,
    profile: null,
  };

  const onSignIn = sinon.spy();

  const onSignOut = sinon.spy();

  const onCreateProfile = sinon.spy();

  const onUpdateStatus = sinon.spy();

  const appWrapper = mount(<App
    dispatch={() => {}}
    user={user}
    totals={totals}
    percentages={percentages}
    graphData={graphData}
  />);

  it('should contain a graph component', () => {
    expect(appWrapper).to.contain(<Graph
      totals={totals}
      percentages={percentages}
      graphData={graphData}
    />);
  });

  it('should contain a menu component', () => {
    expect(appWrapper).to.contain(<Menu
      onSignIn={appWrapper.node.onSignIn}
      onSignOut={appWrapper.node.onSignOut}
      onCreateProfile={appWrapper.node.onCreateProfile}
      onUpdateStatus={appWrapper.node.onUpdateStatus}
      user={user}
    />);
  });

  it('should contain a notifications components', () => {
    expect(appWrapper).to.contain(<Notifications/>);
  });
});
