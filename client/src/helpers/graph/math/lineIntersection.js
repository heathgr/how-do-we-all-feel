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

/*
Vector2 LineIntersectionPoint(Vector2 ps1, Vector2 pe1, Vector2 ps2,
   Vector2 pe2)
{
  // Get A,B,C of first line - points : ps1 to pe1
  float A1 = pe1.y-ps1.y;
  float B1 = ps1.x-pe1.x;
  float C1 = A1*ps1.x+B1*ps1.y;

  // Get A,B,C of second line - points : ps2 to pe2
  float A2 = pe2.y-ps2.y;
  float B2 = ps2.x-pe2.x;
  float C2 = A2*ps2.x+B2*ps2.y;

  // Get delta and check if the lines are parallel
  float delta = A1*B2 - A2*B1;
  if(delta == 0)
     throw new System.Exception("Lines are parallel");

  // now return the Vector2 intersection point
  return new Vector2(
      (B2*C1 - B1*C2)/delta,
      (A1*C2 - A2*C1)/delta
  );
}
*/
