import transformFromAngleAndRadius from './transformFromAngleAndRadius';
import config from '../../constants/config';

const overallTransform = transformFromAngleAndRadius(
  config.graphOrigin,
  config.overallTotal.radius,
  config.overallTotal.angle,
  true
);

export default overallTransform;
