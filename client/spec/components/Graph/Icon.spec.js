import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import Icon from '../../../src/components/Graph/Icon';

const iconData = {
  data: 'M6.362-16.446c4.562,0.093,7.285,3.924,8.058,6.043l5.64,18.734c1.144,4.073-3.996,5.745-5.238,1.813L9.786-7.18c0,0-1.612,0-1.612,0v43.223c0.032,5.353-7.571,5.2-7.67,0V10.997h-1.211v25.046c0.008,5.2-7.556,5.353-7.468,0c0,0,0-43.223,0-43.223h-1.612l-5.036,17.324c-1.242,3.932-6.382,2.26-5.238-1.813l5.64-18.734c0.773-2.119,3.495-5.95,8.058-6.043H6.362zM0-32.41c3.623,0,6.56,2.937,6.56,6.56s-2.937,6.56-6.56,6.56c-3.623,0-6.56-2.937-6.56-6.56S-3.623-32.41,0-32.41z',
  transform: 'matrix(0.6087614290087205,0.7933533402912353,-0.7933533402912353,0.6087614290087205,757.8398355946515,302.1525355721658)',
  style: {
    color: 'red',
  },
};

const iconDataWithBackground = {
  data: 'M6.362-16.446c4.562,0.093,7.285,3.924,8.058,6.043l5.64,18.734c1.144,4.073-3.996,5.745-5.238,1.813L9.786-7.18c0,0-1.612,0-1.612,0v43.223c0.032,5.353-7.571,5.2-7.67,0V10.997h-1.211v25.046c0.008,5.2-7.556,5.353-7.468,0c0,0,0-43.223,0-43.223h-1.612l-5.036,17.324c-1.242,3.932-6.382,2.26-5.238-1.813l5.64-18.734c0.773-2.119,3.495-5.95,8.058-6.043H6.362zM0-32.41c3.623,0,6.56,2.937,6.56,6.56s-2.937,6.56-6.56,6.56c-3.623,0-6.56-2.937-6.56-6.56S-3.623-32.41,0-32.41z',
  transform: 'matrix(0.6087614290087205,0.7933533402912353,-0.7933533402912353,0.6087614290087205,757.8398355946515,302.1525355721658)',
  style: {
    background: 'yellow',
    color: 'red',
  },
};

describe('<Icon />', () => {
  chai.use(chaiEnzyme());

  const IconWrapper = mount(
    <Icon icon={iconData} />
  );
  const groupWrapper = IconWrapper.find('g').first();

  it('an svg group should be the root component', () => {
    expect(IconWrapper).to.have.exactly(1).descendants('g');
  });

  it('should transform the svg group', () => {
    expect(groupWrapper).to.have.attr('transform');
  });

  it('should render a path element', () => {
    expect(groupWrapper).to.have.exactly(1).descendants('path');
  });

  it('should not render a background if there is no background defined in the style', () => {
    expect(groupWrapper).to.not.have.descendants('circle');
  });

  it('should render a background if there is no background defined in the style', () => {
    const IconWithBackgroundWrapper = mount(
      <Icon icon={iconDataWithBackground} />
    );

    expect(IconWithBackgroundWrapper).to.have.exactly(1).descendants('circle');
  });
});
