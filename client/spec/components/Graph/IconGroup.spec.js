import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import IconGroup from '../../../src/components/Graph/IconGroup';
import testGraphData from '../../testConstants/testGraphData';

describe('<Icon Group />', () => {
  const svgData = testGraphData.statusIcons;
  const svgTransforms = testGraphData.statusIconTransforms;
  const IconGroupWrapper = mount(<IconGroup
    svgData={svgData}
    svgTransforms={svgTransforms}
  />);

  chai.use(chaiEnzyme());

  it('should have an svg group element', () => {
    expect(IconGroupWrapper).to.have.exactly(1).descendants('g');
  });

  it('should have the correct number of svg path elements', () => {
    expect(IconGroupWrapper).to.have.exactly(svgData.length).descendants('path');
  });

  it('should correctly transform the svg paths', () => {
    IconGroupWrapper.find('path').map(
      (path) => {
        expect(path).to.have.attr('transform');
      }
    );
  });
});
