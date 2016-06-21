import { add, sub, mult, normalize, copy } from '../math/vectorOperators';

const triangleData = (origin, normal, width, height) => {
  normalize(normal);

  const trianglePoint0 = copy(normal);
  mult(trianglePoint0, -height);
  add(trianglePoint0, origin);

  const halfWidth = width * 0.5;
  const trianglePoint1 = [-normal[1], normal[0]];
  mult(trianglePoint1, halfWidth);
  add(trianglePoint1, origin);
  const trianglePoint2 = [normal[1], -normal[0]];
  mult(trianglePoint2, halfWidth);
  add(trianglePoint2, origin);

  return 'M' +
    trianglePoint0.join(',') +
    'L' + trianglePoint1.join(',') +
    'L' + trianglePoint2.join(',');
};

export default triangleData;
