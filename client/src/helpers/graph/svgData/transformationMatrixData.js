import polarToCartesian from '../math/polarToCartesian';
import vectorFromPoints from '../math/vectorFromPoints';
import { sub, add, mult, normalize, copy } from '../math/vectorOperators';

const transformationMatrixData = (radius, angle, origin, scale, bottomTowardsCenter) => {
  let translatePoint = polarToCartesian(radius, angle, origin);
  let yVector = bottomTowardsCenter ?
    vectorFromPoints(translatePoint, origin) :
    vectorFromPoints(origin, translatePoint);

  mult(yVector, scale);

  let xVector = [yVector[1], -yVector[0]];

  return 'matrix(' +
    xVector[0] +
    ',' +
    xVector[1] +
    ',' +
    yVector[0] +
    ',' +
    yVector[1] +
    ',' +
    translatePoint[0] +
    ',' +
    translatePoint[1] +
    ')';
};

export default transformationMatrixData;
