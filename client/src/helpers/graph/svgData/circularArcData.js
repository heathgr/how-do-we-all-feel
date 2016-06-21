import polarToCartesian from '../math/polarToCartesian';

const circularArcData = (radius, sector, origin, isClockwise = true) => {
  const isLargeArc = ((sector[0] - sector[1]) % (2 * Math.PI)) > Math.PI ? 1 : 0;
  const startPoint = polarToCartesian(radius, sector[0], origin);
  const endPoint = polarToCartesian(radius, sector[1], origin);

  return 'M ' + startPoint[0] + ' ' + startPoint[1] +
    ' A ' + radius + ' ' + radius +
    ' 0 ' + isLargeArc + ' ' + (isClockwise ? 1 : 0) +
    ' ' + endPoint[0] + ' ' + endPoint[1];
};

export default circularArcData;
