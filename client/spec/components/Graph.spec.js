import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import totals from '../testConstants/testTotals';
import graphData from '../testConstants/testGraphData';
import percentages from '../testConstants/testPercentages';

import Graph from '../../src/components/Graph';
import IconGroup from '../../src/components/Graph/IconGroup';
import TextArc from '../../src/components/Graph/TextArc';
import OverallCount from '../../src/components/Graph/OverallCount';

import percentageTextFormatter from '../../src/helpers/graph/percentageTextFormatter';

describe('<Graph />', () => {

  chai.use(chaiEnzyme());

  const graphWrapper = mount(<Graph
    totals={totals}
    percentages={percentages}
    graphData={graphData}
  />);

  it('should contain an overall count component', () => {
    expect(graphWrapper).to.contain(<OverallCount
      overallCount={totals.overallCount}
      transform={graphData.overallTransform}
    />);
  });

  it('should contain an icon group for status icons', () => {
    expect(graphWrapper).to.contain(
      <IconGroup
        svgData={graphData.statusIcons}
        svgTransforms={graphData.statusIconTransforms}
      />
    );
  });

  it('should contain an icon group for gender icons', () => {
    expect(graphWrapper).to.contain(
      <IconGroup
        svgData={graphData.genderIcons}
        svgTransforms={graphData.genderIconTransforms}
      />
    );
  });

  it('should contain an icon group for age range icons', () => {
    expect(graphWrapper).to.contain(
      <IconGroup
        svgData={graphData.ageRangeIcons}
        svgTransforms={graphData.ageRangeIconTransforms}
      />
    );
  });

  it('should contain title text for the status group', () => {
    expect(graphWrapper).to.contain(
      <TextArc
        pathData={graphData.statusTextPaths.title}
        text='How Do We All Feel?'
        textId='StatusesTitle'
      />
    );
  });

  it('should contain title text for the age range group', () => {
    expect(graphWrapper).to.contain(
      <TextArc
        pathData={graphData.ageRangeTextPaths.title}
        text='How old is everyone?'
        textId='AgeRangeTitle'
      />
    );
  });

  it('should contain title text for the gender group', () => {
    expect(graphWrapper).to.contain(
      <TextArc
        pathData={graphData.genderTextPaths.title}
        text='What about gender?'
        textId='GenderTitle'
      />
    );
  });

  it('should contain component labels for the status group', () => {
    graphData.statuses.map(
      (status, id) => {
        expect(graphWrapper).to.contain(
          <TextArc
            pathData={graphData.statusTextPaths.components[id]}
            text={status}
            textId={'statusComponentLabel-' + id}
          />
        );
      }
    );
  });

  it('should contain component labels for the age range group', () => {
    graphData.ageRanges.map(
      (ageRange, id) => {
        expect(graphWrapper).to.contain(
          <TextArc
            pathData={graphData.ageRangeTextPaths.components[id]}
            text={ageRange}
            textId={'ageRangeComponentLabel-' + id}
          />
        );
      }
    );
  });

  it('should contain component labels for the gender group', () => {
    graphData.genders.map(
      (gender, id) => {
        expect(graphWrapper).to.contain(
          <TextArc
            pathData={graphData.genderTextPaths.components[id]}
            text={gender}
            textId={'genderComponentLabel-' + id}
          />
        );
      }
    );
  });

  it('should contain percentage labels for the status group', () => {
    graphData.statuses.map(
      (gender, id) => {
        expect(graphWrapper).to.contain(
          <TextArc
            pathData={graphData.statusTextPaths.percentages[id]}
            text={percentageTextFormatter(percentages.statuses.overall[id])}
            textId={'statusPercentageLabel-' + id}
          />
        );
      }
    );
  });

  it('should contian percentage labels for the age range group', () => {
    graphData.ageRanges.map(
      (ageRange, id) => {
        expect(graphWrapper).to.contain(
          <TextArc
            pathData={graphData.ageRangeTextPaths.percentages[id]}
            text={percentageTextFormatter(percentages.ageRanges.overall[id])}
            textId={'ageRangePercentageLabel-' + id}
          />
        );
      }
    );
  });

  it('should contain percentage labels for the gender group', () => {
    graphData.genders.map(
      (gender, id) => {
        expect(graphWrapper).to.contain(
          <TextArc
            pathData={graphData.genderTextPaths.percentages[id]}
            text={percentageTextFormatter(percentages.genders.overall[id])}
            textId={'genderPercentageLabel-' + id}
          />
        );
      }
    );
  });
});
