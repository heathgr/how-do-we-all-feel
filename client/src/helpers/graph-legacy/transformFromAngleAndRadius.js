const transformFromAngleAndRadius = (origin, radius, angle, bottomTowardsCenter) => {
  let rotateAngle = bottomTowardsCenter ?
    angle + 90 :
    angle - 90;
  let angleRad = angle * (Math.PI / 180);
  let translateX = (Math.cos(angleRad) * radius) + origin[0];
  let translateY = (Math.sin(angleRad) * radius) + origin[1];

  return 'translate(' + translateX + ' ' + translateY + ') rotate(' + rotateAngle + ')';
};

export default transformFromAngleAndRadius;
