
import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import StartBadge from '../../../src/components/Graph/StartBadge';
import testStartBadgeData from '../../testConstants/testStartBadgeData';

describe('<StartBadge />', () => {

  chai.use(chaiEnzyme());

  const StartBadgeWrapper = mount(<StartBadge
    data={testStartBadgeData}
  />);
  let svgGroupWrapper;

  it('should have an svg group', () => {
    expect(StartBadgeWrapper).to.have.exactly(1).descendants('g');
  });

  it('should transform the svg group', () => {
    svgGroupWrapper = StartBadgeWrapper.find('g').first();

    expect(svgGroupWrapper).to.have.attr('transform');
  });

  it('should have a cirlce as a background', () => {
    expect(svgGroupWrapper.children().first()).to.match('circle');
  });

  it('should have the correct number of text lines', () => {
    expect(svgGroupWrapper).to.have.exactly(testStartBadgeData.textLines.length).descendants('text');
  });
});
