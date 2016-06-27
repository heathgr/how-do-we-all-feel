import { add, sub, mult, copy } from '../math/vectorOperators';
import lineIntersection from '../math/lineIntersection';

const cubicPathData = (p1, n1, p2, n2) => {
  const s = copy(p1);
  const e = copy(p2);
  const sa = lineIntersection(p1, n1, p2, n2);
  const ea = copy(sa);

  sub(sa, s);
  sub(ea, e);
  mult(sa, 0.5);
  mult(ea, 0.5);
  add(sa, s);
  add(ea, e);

  return 'M' + s.join(',') + 'C' + sa.join(',') + ',' + ea.join(',') + ',' + e.join(',');
};

export default cubicPathData;
