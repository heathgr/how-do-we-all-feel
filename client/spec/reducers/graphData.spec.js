import { expect } from 'chai';
import graphData from '../../src/reducers/graphData';
import statuses from '../../../config/statuses';
import ageRanges from '../../../config/ageRanges';
import genders from '../../../config/genders';
import testTotalsAction from '../testConstants/testTotalsAction';
import {
  textArcValidator,
  iconValidator,
  sankeyStaticsValidator,
  totalsValidator,
  startBadgeValidator,
  sankeyValidator,
} from '../testHelpers/graphDataValidators';

describe('graphData reducer', () => {

  const svgPathDataValidator = /([mlhvcsqta]([\d\.\-]+z?,?)+)+/i;
  const transformValidator = /matrix\((-?[\d]+\.?[\d]*,){5}(-?[\d]+\.?[\d]*)\)/;

  let testState = graphData(undefined, { type: null });

  it('should generate the correct number of icon data objects', () => {
    expect(testState.icons.length).to.equal(statuses.length + ageRanges.length + genders.length);
  });

  it('should generate valid icon objects', () => {
    testState.icons.map(
      (iconObject) => {
        expect(iconValidator(iconObject)).to.equal(true);
      }
    );
  });

  it('should generate the correct number of element label objects', () => {
    expect(testState.elementLabels.length).to.equal(statuses.length + ageRanges.length + genders.length);
  });

  it('should generate valid element label objects', () => {
    testState.elementLabels.map(
      (elementLabelObject) => {
        expect(textArcValidator(elementLabelObject)).to.equal(true);
      }
    );
  });

  it('should generate the correct number of percentage label objects', () => {
    expect(testState.percentageLabels.length).to.equal(statuses.length + ageRanges.length + genders.length);
  });

  it('should generate valid percentage label objects', () => {
    testState.percentageLabels.map(
      (percentageLabel) => {
        expect(textArcValidator(percentageLabel)).to.equal(true);
      }
    );
  });

  it('should generate the correct number of title objects', () => {
    expect(testState.titles.length).to.equal(3);
  });

  it('should generate valid title objects', () => {
    testState.titles.map(
      (title) => {
        expect(textArcValidator(title)).to.equal(true);
      }
    );
  });

  it('should generate a valid sankey statics object', () => {
    expect(sankeyStaticsValidator(testState.sankeyStatics)).to.equal(true);
  });

  it('should generate a valid start badge data object', () => {
    expect(startBadgeValidator(testState.startBadge)).to.equal(true);
  });

  testState = graphData(testState, testTotalsAction);

  it('should generate a valid totals object', () => {
    expect(totalsValidator(testState.totals)).to.equal(true);
  });

  it('should generate a valid sankey object', () => {
    expect(sankeyValidator(testState.sankey)).to.equal(true);
  });
});
