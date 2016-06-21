import polarToCartesian from '../math/polarToCartesian';
import vectorFromPoints from '../math/vectorFromPoints';

const transformationMatrixData = (radius, angle, origin, bottomTowardsCenter) => {
  const translatePoint = polarToCartesian(radius, angle, origin);
  const yVector = bottomTowardsCenter ?
    vectorFromPoints(translatePoint, origin) :
    vectorFromPoints(origin, translatePoint);
  const xVector = [yVector[1], -yVector[0]];

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
