import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import App from '../../src/components/App';
import Graph from '../../src/components/Graph';
import Menu from '../../src/components/Menu';
import Notifications from '../../src/components/Notifications';

describe('<App/>', () => {

  chai.use(chaiEnzyme());

  const appWrapper = mount(<App dispatch={() => {}}/>);

  it('should contain a graph component', () => {
    expect(appWrapper).to.contain(<Graph/>);
  });

  it('should contain a menu component', () => {
    expect(appWrapper).to.contain(<Menu/>);
  });

  it('should contain a notifications components', () => {
    expect(appWrapper).to.contain(<Notifications/>);
  });
});
