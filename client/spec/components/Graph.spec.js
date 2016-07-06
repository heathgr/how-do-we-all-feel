import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import graphData from '../testConstants/testGraphData';

import Graph from '../../src/components/Graph';
import TextArc from '../../src/components/Graph/TextArc';
import StartBadge from '../../src/components/Graph/StartBadge';
import Icon from '../../src/components/Graph/Icon';

import percentageTextFormatter from '../../src/helpers/graph/percentageTextFormatter';

describe('<Graph />', () => {

  chai.use(chaiEnzyme());

  const graphWrapper = mount(<Graph
    graphData={graphData}
  />);

  it('should render a start badge component', () => {
    expect(graphWrapper).to.contain(<StartBadge
      data={graphData.startBadge}
    />);
  });

  it('should render text arc for the sector titles', () => {
    graphData.titles.map(
      (title, id) => {
        expect(graphWrapper).to.contain(
          <TextArc
            pathData={title.pathData}
            text={title.text}
            textId={title.textId}
            style={title.style}
            key={id}
          />
        );
      }
    );
  });

  it('should render element labels', () => {
    graphData.elementLabels.map(
      (element, id) => {
        expect(graphWrapper).to.contain(
          <TextArc
            pathData={element.pathData}
            text={element.text}
            textId={element.textId}
            style={element.style}
            key={id}
          />
        );
      }
    );
  });

  it('should render percentage labels', () => {
    graphData.percentageLabels.map(
      (percentage, id) => {
        expect(graphWrapper).to.contain(
          <TextArc
            pathData={percentage.pathData}
            text={percentage.text}
            textId={percentage.textId}
            style={percentage.style}
            key={id}
          />
        );
      }
    );
  });

  it('should render element icons', () => {
    graphData.icons.map(
      (icon, id) => {
        expect(graphWrapper).to.contain(
          <Icon
            icon={icon}
            key={id}
          />
        );
      }
    );
  });

  it('should render sankey start paths', () => {
    graphData.sankey.startPathsData.map(
      (path, id) => {
        expect(graphWrapper).to.contain(
          <path
            style={graphData.sankey.startPathStyles[id]}
            d={path}
            key={id}
          />
        );
      }
    );
  });

  it('should render sankey split paths', () => {
    graphData.sankey.splitPathsData.map(
      (path, id) => {
        expect(graphWrapper).to.contain(
          <path
            d={path}
            style={graphData.sankey.splitPathStyles[id]}
            key={id}
          />
        );
      }
    );
  });

  it('should render sankey tips', () => {
    graphData.sankey.tipsData.map(
      (path, id) => {
        expect(graphWrapper).to.contain(
          <path
            style={graphData.sankey.tipStyles[id]}
            d={path}
            key={id}
          />
        );
      }
    );
  });
});
