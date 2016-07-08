import pointsAlongSegment from './math/pointsAlongSegment';
import polarToCartesian from './math/polarToCartesian';
import normalFromAngle from './math/normalFromAngle';
import cubicPathData from './svgData/cubicPathData';
import triangleData from './svgData/triangleData';
import { sub, add, mult, normalize, copy } from './math/vectorOperators';

const sankeyPathsData = (config, statics, percentages) => {
  let splitPoints = [];
  let pathWidths = [];
  let pathColors = [];
  let tipHeights = [];
  let startPathsData = [];
  let startPathStyles = [];

  for (let sector in config.graphSectors) {
    const sankeyAngle = (config.graphSectors[sector].startAngle +
      config.graphSectors[sector].endAngle)
      * 0.5;
    const startOrigin = config.graphOrigin;
    const startNormal = normalFromAngle(sankeyAngle);
    const splitOrigin = polarToCartesian(
      config.graphSectors[sector].sankey.startRadius,
      sankeyAngle,
      startOrigin
    );
    const splitNormal = mult(copy(startNormal), -1);

    let sectorSplitPoints = pointsAlongSegment(
      splitNormal,
      splitOrigin,
      config.graphSectors[sector].sankey.width,
      percentages[sector],
      config.graphSectors[sector].sankey.invertSplitOrder
    );

    startPathsData = [
      ...startPathsData,
      'M' + startOrigin.join(',') + 'L' + splitOrigin.join(','),
    ];
    startPathStyles = [
      ...startPathStyles,
      {
        fill: 'none',
        stroke: config.graphSectors[sector].colors.sankey,
        strokeWidth: config.graphSectors[sector].sankey.width,
      },
    ];
    pathWidths = [
      ...pathWidths,
      ...percentages[sector].map(
        (percentage) => percentage * config.graphSectors[sector].sankey.width
      ),
    ];
    pathColors = [
      ...pathColors,
      ...percentages[sector].map(
        (percentage) => config.graphSectors[sector].colors.sankey
      ),
    ];
    tipHeights = [
      ...tipHeights,
      ...percentages[sector].map(
        () => config.graphSectors[sector].sankey.tipHeight
      ),
    ];
    splitPoints = [...splitPoints, ...sectorSplitPoints];
  }

  //start and end points are offset by half a pixel to
  //remove a seam that sometimes occurs when rendering the svg

  const splitPathsData = splitPoints.map(
    (splitPoint, id) => cubicPathData(
      add(
        copy(splitPoint),
        mult(
          copy(statics.splitNormals[id]),
          -0.5
        )
      ),
      statics.splitNormals[id],
      add(
        copy(statics.endPoints[id]),
        mult(
          copy(statics.endNormals[id]),
          0.5)
      ),
      statics.endNormals[id]
    )
  );

  const splitPathStyles = pathWidths.map(
    (width, id) => ({
      fill: 'none',
      stroke: pathColors[id],
      strokeWidth: width,
    })
  );

  const tipsData = statics.endPoints.map(
    (point, id) => triangleData(point, statics.endNormals[id], pathWidths[id], tipHeights[id])
  );

  const tipStyles = statics.endPoints.map(
    (point, id) => ({
      stroke: 'none',
      fill: pathColors[id],
    })
  );

  return {
    startPathsData,
    startPathStyles,
    splitPathsData,
    splitPathStyles,
    tipsData,
    tipStyles,
  };
};

export default sankeyPathsData;
