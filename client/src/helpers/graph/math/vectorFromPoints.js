import { sub, normalize, copy } from './vectorOperators';

const vectorFromPoints = (from, to) => {
  let target = copy(to);
  sub(target, from);
  normalize(target);

  return target;
};

export default vectorFromPoints;
