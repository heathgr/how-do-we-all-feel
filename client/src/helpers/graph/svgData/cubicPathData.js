import { add, sub, mult, mag, copy, normalize } from '../math/vectorOperators';
import lineIntersection from '../math/lineIntersection';

const cubicPathData = (p1, n1, p2, n2) => {
  const s = copy(p1);
  const e = copy(p2);
  const dirMag = mag(sub(copy(p1), p2)) * 0.35;
  const sDir = copy(n1);
  const eDir = mult(copy(n2), -1);

  normalize(sDir);
  normalize(eDir);
  mult(sDir, dirMag);
  mult(eDir, dirMag);
  add(sDir, s);
  add(eDir, e);

  return 'M' + s.join(',') + 'C' + sDir.join(',') + ',' + eDir.join(',') + ',' + e.join(',');
};

export default cubicPathData;
