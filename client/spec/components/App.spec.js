import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import totals from '../testConstants/testTotals';

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

  const onSignIn = () => {};

  const onSignOut = () => {};

  const onCreateProfile = () => {};

  const onUpdateStatus = () => {};

  const appWrapper = mount(<App dispatch={() => {}} user={user} totals={totals}/>);

  it('should contain a graph component', () => {
    expect(appWrapper).to.contain(<Graph totals={totals}/>);
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
