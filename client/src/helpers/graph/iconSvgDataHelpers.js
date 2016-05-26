import statuses from '../../../../config/statuses';
import ageRanges from '../../../../config/ageRanges';
import genders from '../../../../config/genders';
import config from '../../constants/config';
import transformFromAngleAndRadius from './transformFromAngleAndRadius';

const arcSpreadTransforms = (
  origin,
  radius,
  startAngle,
  endAngle,
  steps,
  bottomTowardsCenter = false
) => {
  let transforms = [];
  let angleStep = (endAngle - startAngle) / (steps - 1);

  for (let i = 0; i < steps; i++) {
    let iterationAngle = startAngle + (angleStep * i);

    transforms.push(
      transformFromAngleAndRadius(
        origin,
        radius,
        iterationAngle,
        bottomTowardsCenter
      )
    );
  }

  return transforms;
};

const statusIconTransforms = arcSpreadTransforms(
  config.graphOrigin,
  config.graphRadius,
  config.graphArcs.statuses.start,
  config.graphArcs.statuses.end,
  statuses.length,
  false
);
const ageRangeIconTransforms = arcSpreadTransforms(
  config.graphOrigin,
  config.graphRadius,
  config.graphArcs.ageRanges.start,
  config.graphArcs.ageRanges.end,
  ageRanges.length,
  true
);
const genderIconTransforms = arcSpreadTransforms(
  config.graphOrigin,
  config.graphRadius,
  config.graphArcs.genders.start,
  config.graphArcs.genders.end,
  genders.length,
  true
);

export { statusIconTransforms, ageRangeIconTransforms, genderIconTransforms };
