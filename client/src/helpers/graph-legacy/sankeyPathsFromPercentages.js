import svgPathDataFromPointsAndNormals from './svgPathDataFromPointsAndNormals';
import config from '../../constants/config';
import vectors from 'vectors';
import '../arrayOperators';

const sub = vectors.sub(2);
const add = vectors.add(2);
const mult = vectors.mult(2);
const normalize = vectors.normalize(2);
const copy = vectors.copy(2);

const arcAngles = (startAngle, endAngle, count) => {
  const angleStep = (endAngle - startAngle) / (count - 1);
  let angles = [];

  for (let i = 0; i < count; i++) {
    angles.push(startAngle + (angleStep * i));
  }

  return angles;
};

const endPoints = (radius, origin, angles) => angles.map(
  (angle, id) => {
    const angleRad = angle * (Math.PI / 180);
    const x = (Math.cos(angleRad) * radius) + origin[0];
    const y = (Math.sin(angleRad) * radius) + origin[1];

    return [x, y];
  }
);

const endNormals = (endPoints) => endPoints.map(
  (point, id) => {
    const p1 = [500, 500];
    const p2 = copy(endPoints[id]);

    sub(p1, p2);
    normalize(p1);
    mult(p1, 75); //TODO config for normal length
    return p1;
  }
);

const startPoints = (origin, normal, width, percentages) => {
  const accumulatedPercentages = percentages.scan(
    (prev, current) => prev + current
  );
  const placementPercentages = percentages.map(
    (percentage, id) => accumulatedPercentages[id] - (percentage * 0.5)
  );

  normalize(normal);
  mult(normal, width * 0.5);

  let placement1 = [normal[1], -normal[0]];
  let placement2 = [-normal[1], normal[0]];

  sub(placement1, placement2);

  let originOffset = copy(placement1);

  mult(originOffset, -0.5);
  add(origin, originOffset);

  return placementPercentages.map(
    (percentage) => {
      const placementPoint = copy(placement1);

      mult(placementPoint, percentage);
      add(placementPoint, origin);

      return placementPoint;
    }
  );
};

const sankeyPathsFromPercentages = (percentages) => {
  const statusAngles = arcAngles(
    config.graphArcs.statuses.start,
    config.graphArcs.statuses.end,
    percentages.statuses.overall.length
  );
  const statusStartPoints = startPoints(
    [500, 400],
    [0, 1],
    100,
    percentages.statuses.overall
  );
  const statusEndPoints = endPoints(
    config.graphArcs.statuses.sankeyEndRadius,
    config.graphOrigin,
    statusAngles
  );
  const statusEndNormals = endNormals(statusEndPoints);

  return {
    statuses: percentages.statuses.overall.map(
      (percentage, id) => svgPathDataFromPointsAndNormals(
        statusStartPoints[id],
        [0, 100],
        statusEndPoints[id],
        statusEndNormals[id]
      )
    ),
  };
};

export default sankeyPathsFromPercentages;
