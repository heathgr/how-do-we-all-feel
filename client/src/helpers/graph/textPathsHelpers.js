//jscs:disable maximumLineLength

import statuses from '../../../../config/statuses';
import ageRanges from '../../../../config/ageRanges';
import genders from '../../../../config/genders';
import config from '../../constants/config';
import circularArcData from './circularArcData';

const statusAngleStep = (config.graphArcs.statuses.end - config.graphArcs.statuses.start) / (statuses.length - 1);
const statusAngleHalfStep = statusAngleStep * 0.5;
const statusStartComponentAngles = statuses.map(
  (status, id) => (config.graphArcs.statuses.start + (statusAngleStep * id)) - statusAngleHalfStep
);
const statusEndComponentAngles = statuses.map(
  (status, id) => (config.graphArcs.statuses.start + (statusAngleStep * (id + 1))) - statusAngleHalfStep
);

const statusTextPaths = {
  title: circularArcData(
    config.graphOrigin,
    450,
    config.graphArcs.statuses.start,
    config.graphArcs.statuses.end,
    false
  ),
  components: statuses.map(
    (status, id) => circularArcData(
      config.graphOrigin,
      375,
      statusStartComponentAngles[id],
      statusEndComponentAngles[id],
      false
    )
  ),
  percentages: statuses.map(
    (status, id) => circularArcData(
      config.graphOrigin,
      225,
      statusStartComponentAngles[id],
      statusEndComponentAngles[id],
      false
    )
  ),
};

const ageRangeAngleStep = (config.graphArcs.ageRanges.end - config.graphArcs.ageRanges.start) / (ageRanges.length - 1);
const ageRangeAngleHalfStep = ageRangeAngleStep * 0.5;
const ageRangeStartComponentAngles = ageRanges.map(
  (ageRange, id) => (config.graphArcs.ageRanges.start + (ageRangeAngleStep * id)) - ageRangeAngleHalfStep
);
const ageRangeEndComponentAngles = ageRanges.map(
  (ageRange, id) => (config.graphArcs.ageRanges.start + (ageRangeAngleStep * (id + 1))) - ageRangeAngleHalfStep
);

const ageRangeTextPaths = {
  title: circularArcData(
    config.graphOrigin,
    450,
    config.graphArcs.ageRanges.start,
    config.graphArcs.ageRanges.end,
    true
  ),
  components: ageRanges.map(
    (status, id) => circularArcData(
      config.graphOrigin,
      375,
      ageRangeStartComponentAngles[id],
      ageRangeEndComponentAngles[id],
      true
    )
  ),
  percentages: ageRanges.map(
    (status, id) => circularArcData(
      config.graphOrigin,
      225,
      ageRangeStartComponentAngles[id],
      ageRangeEndComponentAngles[id],
      true
    )
  ),
};

const genderAngleStep = (config.graphArcs.genders.end - config.graphArcs.genders.start) / (genders.length - 1);
const genderAngleHalfStep = genderAngleStep * 0.5;
const genderStartComponentAngles = genders.map(
  (gender, id) => (config.graphArcs.genders.start + (genderAngleStep * id)) - genderAngleHalfStep
);
const genderEndComponentAngles = genders.map(
  (gender, id) => (config.graphArcs.genders.start + (genderAngleStep * (id + 1))) - genderAngleHalfStep
);

const genderTextPaths = {
  title: circularArcData(
    config.graphOrigin,
    450,
    config.graphArcs.genders.start,
    config.graphArcs.genders.end,
    true
  ),
  components: genders.map(
    (gender, id) => circularArcData(
      config.graphOrigin,
      375,
      genderStartComponentAngles[id],
      genderEndComponentAngles[id],
      true
    )
  ),
  percentages: genders.map(
    (gender, id) => circularArcData(
      config.graphOrigin,
      225,
      genderStartComponentAngles[id],
      genderEndComponentAngles[id],
      true
    )
  ),
};

export { statusTextPaths, ageRangeTextPaths, genderTextPaths };
