import '../arrayOperators';

const startBadgeData = (config, overallCount) => {
  const totalWeight = config.textLineWeights.reduce(
    (prev, current) => prev + current
  );
  const textLineWeightPercentages = config.textLineWeights.map(
    (weight) => weight / totalWeight
  );
  const scannedTextLineWeightPercentages = textLineWeightPercentages.scan(
    (prev, current) => prev + current
  );
  const diameter = config.radius * 2;
  const placementStart = -config.radius;
  let textPlacements = scannedTextLineWeightPercentages.map(
    (percentage, id) => (placementStart + (diameter * percentage)) - (textLineWeightPercentages[id] * diameter * 0.5)
  );
  let textLines = config.textLines.filter(
    (line) => line != null
  );
  textLines[config.counterLine] = overallCount;
  textPlacements = textPlacements.filter(
    (placement, id) => config.textLines[id] != null
  );
  const fontFamilies = textLines.map(
    (line, id) => id === config.counterLine ? config.fontFamilies.counter : config.fontFamilies.text
  );
  const fontSizes = textLines.map(
    (line, id) => id === config.counterLine ? config.fontSizes.counter : config.fontSizes.text
  );
  const fontColors = textLines.map(
    (line, id) => id === config.counterLine ? config.colors.counter : config.colors.text
  );

  return {
    radius: config.radius,
    count: 0,
    textPlacements,
    textLines,
    transform: 'translate(' + config.origin.join(',') + ')',
    fontFamilies,
    fontSizes,
    fontColors,
    backgroundColor: config.colors.background,
  };
};

export default startBadgeData;
