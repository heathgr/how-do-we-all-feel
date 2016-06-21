import { sub, add, mult, normalize, copy } from './vectorOperators';
import vectorFromPoints from './vectorFromPoints';
import '../../arrayOperators';

const pointsAlongSegment = (normal, origin, width, percentages, invert) => {
  const accumulatedPercentages = percentages.scan(
    (prev, current) => prev + current
  );
  const placementPercentages = percentages.map(
    (percentage, id) => accumulatedPercentages[id] - (percentage * 0.5)
  );

  let startPoint = invert ? [normal[1], -normal[0]] : [-normal[1], normal[0]];
  normalize(startPoint);
  mult(startPoint, width * 0.5);
  add(startPoint, origin);

  const distributionNoraml = vectorFromPoints(startPoint, origin);

  return placementPercentages.map(
    (percentage, id) => {
      let point = copy(distributionNoraml);
      mult(point, width * percentage);
      add(point, startPoint);

      return point;
    }
  );
};

export default pointsAlongSegment;
