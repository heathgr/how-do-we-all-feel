const polarToCartesian = (radius, angle, origin) => [
  (Math.cos(angle) * radius) + origin[0],
  (Math.sin(angle) * radius) + origin[1],
];

export default polarToCartesian;
