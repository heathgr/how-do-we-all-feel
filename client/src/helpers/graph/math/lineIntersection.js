import { copy, add } from './vectorOperators';

const lineIntersection = (p1, n1, p2, n2) => {
  const e1 = copy(n1);
  const e2 = copy(n2);

  add(e1, p1);
  add(e2, p2);

  const a1 = e1[1] - p1[1];
  const b1 = p1[0] - e1[0];
  const c1 = a1 * p1[0] + b1 * p1[1];

  const a2 = e2[1] - p2[1];
  const b2 = p2[0] - e2[0];
  const c2 = a2 * p2[0] + b2 * p2[1];

  const delta = a1 * b2 - a2 * b1;

  if (delta === 0) return [NaN, NaN];

  return [
    (b2 * c1 - b1 * c2) / delta,
    (a1 * c2 - a2 * c1) / delta,
  ];
};

export default lineIntersection;
