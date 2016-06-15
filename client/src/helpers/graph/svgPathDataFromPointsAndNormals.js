import vectors from 'vectors';

const add = vectors.add(2);
const copy = vectors.copy(2);

const svgPathDataFromPointsAndNormals = (p1, n1, p2, n2) => {
  const p12 = copy(p1);
  const p22 = copy(p2);

  add(p12, n1);
  add(p22, n2);
  return 'M' + p1.join(',') + 'C' + p12.join(',') + ',' + p22.join(',') + ',' + p2.join(',');
};

export default svgPathDataFromPointsAndNormals;
