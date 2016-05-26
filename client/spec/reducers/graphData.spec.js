import { expect } from 'chai';
import graphData from '../../src/reducers/graphData';
import statuses from '../../../config/statuses';
import ageRanges from '../../../config/ageRanges';
import genders from '../../../config/genders';

describe('graphData reducer', () => {

  const testState = graphData(undefined, { type: null });
  const svgPathDataValidator = /([mlhvcsqta]([\d\.\-]+z?,?)+)+/i;
  const transformValidator = /translate\(-?[\d]+\.?[\d]* -?[\d]+\.?[\d]*\) rotate\(-?[\d]+\.?[\d]*\)/;

  it('should generate the correct number of status icons', () => {
    expect(testState.statusIcons.length).to.equal(statuses.length);
  });

  it('should generate valid svg path data for status icons', () => {
    testState.statusIcons.map(
      (iconData) => {
        expect(svgPathDataValidator.test(iconData)).to.equal(true);
      }
    );
  });

  it('should generate the correct number of status icon transforms', () => {
    expect(testState.statusIconTransforms.length).to.equal(statuses.length);
  });

  it('should generate valid svg transforms for status icons', () => {
    testState.statusIconTransforms.map(
      (transform) => {
        expect(transformValidator.test(transform)).to.equal(true);
      }
    );
  });

  it('should generate the correct number of age range icons', () => {
    expect(testState.ageRangeIcons.length).to.equal(ageRanges.length);
  });

  it('should generate valid svg path data for age range icons', () => {
    testState.ageRangeIcons.map(
      (iconData) => {
        expect(svgPathDataValidator.test(iconData)).to.equal(true);
      }
    );
  });

  it('should generate the correct number of age range icon transforms', () => {
    expect(testState.ageRangeIconTransforms.length).to.equal(ageRanges.length);
  });

  it('should generate valid svg transforms for age range icons', () => {
    testState.ageRangeIconTransforms.map(
      (transform) => {
        expect(transformValidator.test(transform)).to.equal(true);
      }
    );
  });

  it('should generate the correct number of gender icons', () => {
    expect(testState.genderIcons.length).to.equal(genders.length);
  });

  it('should generate valid svg path data for gender icons', () => {
    testState.genderIcons.map(
      (iconData) => {
        expect(svgPathDataValidator.test(iconData)).to.equal(true);
      }
    );
  });

  it('should generate the correct number of gender icon transforms', () => {
    expect(testState.genderIconTransforms.length).to.equal(genders.length);
  });

  it('should generate valid svg transforms for gender icons', () => {
    testState.genderIconTransforms.map(
      (transform) => {
        expect(transformValidator.test(transform)).to.equal(true);
      }
    );
  });

  xit('should correctly calculate graph paths', () => {
    expect(false).to.equal(true);
  });

  xit('should correctly calculate graph arrow tips', () => {
    expect(false).to.equal(true);
  });
});
