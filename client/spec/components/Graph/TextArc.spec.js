import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import TextArc from '../../../src/components/Graph/TextArc';
import testGraphData from '../../testConstants/testGraphData';

describe('<TextArc />', () => {

  const pathData = testGraphData.titles[0].pathData;
  const text = 'Fo shizzle mah nizzle';
  const textId = 'thisCanBePrettyMuchBeAnyTextAsLongAsItIsUnique';
  const TextArcWrapper = mount(<TextArc
    pathData={pathData}
    text={text}
    textId={textId}
  />);
  let svgGroupWrapper;
  let textElementWrapper;

  chai.use(chaiEnzyme());

  it('should have an svg group element', () => {
    expect(TextArcWrapper).to.have.exactly(1).descendants('g');
  });

  it('should have a defs element', () => {
    svgGroupWrapper = TextArcWrapper.find('g').first();

    expect(svgGroupWrapper).to.have.exactly(1).descendants('g');
  });

  it('should have a text element', () => {
    expect(svgGroupWrapper).to.have.exactly(1).descendants('text');
  });

  it('should have a text path element', () => {
    textElementWrapper = svgGroupWrapper.find('text').first();

    expect(textElementWrapper).to.have.exactly(1).descendants('textPath');
  });

  it('should render the correct text', () => {
    expect(textElementWrapper.find('textPath').first()).to.have.text(text);
  });
});
