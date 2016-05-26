const circularArcData = (origin, radius, startAngle, endAngle, isClockwise = true) => {
  const startRad = startAngle * (Math.PI / 180);
  const endRad = endAngle * (Math.PI / 180);
  const isLargeArc = ((startRad - endRad) % (2 * Math.PI)) > Math.PI ? 1 : 0;
  const startX = origin[0] + radius * Math.cos(startRad);
  const startY = origin[1] + radius * Math.sin(startRad);
  const endX = origin[0] + radius * Math.cos(endRad);
  const endY = origin[1] + radius * Math.sin(endRad);

  return 'M ' + startX + ' ' + startY +
    ' A ' + radius + ' ' + radius +
    ' 0 ' + isLargeArc + ' ' + (isClockwise ? 1 : 0) +
    ' ' + endX + ' ' + endY;
};

export default circularArcData;
