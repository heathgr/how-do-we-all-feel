import config from '../../constants/config';
import vectors from 'vectors';

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

const sankeyTipsFromPercentages = (percentages) => {
  const statusAngles = arcAngles(
    config.graphArcs.statuses.start,
    config.graphArcs.statuses.end,
    percentages.statuses.overall.length
  );

  const statusEndPoints = endPoints(
    200,
    config.graphOrigin,
    statusAngles
  );
  const statusEndNormals = endNormals(statusEndPoints);

  const triangleData = (point, normal, height, width) => {
    normalize(normal);

    let heightVector = copy(normal);
    mult(heightVector, height);
    let triPoint1 = [-normal[1], normal[0]];
    let triPoint2 = [normal[1], -normal[0]];
    const halfWidth = width * 0.5;
    mult(triPoint1, halfWidth);
    mult(triPoint2, halfWidth);
    add(triPoint1, heightVector);
    add(triPoint2, heightVector);
    add(triPoint1, point);
    add(triPoint2, point);

    return 'M' + point.join(',') + 'L' + triPoint1.join(',') + 'L' + triPoint2.join(',') + 'Z';
  };

  return {
    statuses: percentages.statuses.overall.map(
      (percentage, id) => triangleData(
        statusEndPoints[id],
        statusEndNormals[id],
        10,
        percentage * 100
      )
    ),
  };
};

export default sankeyTipsFromPercentages;
