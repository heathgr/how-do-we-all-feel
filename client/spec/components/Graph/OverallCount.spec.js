import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import OverallCount from '../../../src/components/Graph/OverallCount';

describe('<OverallCount />', () => {

  const count = 34;
  const transform = 'translate(400 600) rotate(-12)';
  const OverallCountWrapper = mount(<OverallCount
    overallCount={count}
    transform={transform}
  />);
  let svgGroupWrapper;

  chai.use(chaiEnzyme());

  it('should have an svg group', () => {
    expect(OverallCountWrapper).to.have.exactly(1).descendants('g');
  });

  it('should transform the svg group', () => {
    svgGroupWrapper = OverallCountWrapper.find('g').first();

    expect(svgGroupWrapper).to.have.attr('transform');
  });

  it('should have a cirlce as a background', () => {
    expect(svgGroupWrapper.children().first()).to.match('circle');
  });

  it('should have text displaying the overall count', () => {
    expect(svgGroupWrapper.find('#overallCountText')).to.have.text(count);
  });
});
