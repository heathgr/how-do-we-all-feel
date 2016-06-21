import '../../arrayOperators';

const sectorSplitter = (sector, count) => {
  const step = (sector[1] - sector[0]) / count;
  const angles = [];

  for (let i = 0; i <= count; i++) {
    angles.push(sector[0] + (step * i));
  }

  return angles.zipLeftRight();
};

export default sectorSplitter;
