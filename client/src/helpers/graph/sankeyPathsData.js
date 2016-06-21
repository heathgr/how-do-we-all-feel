import pointsAlongSegment from './math/pointsAlongSegment';
import cubicPathData from './svgData/cubicPathData';
import triangleData from './svgData/triangleData';

const sankeyPathsData = (config, statics, percentages) => {
  let splitPoints = [];

  let pathWidths = [];
  let tipHeights = [];

  for (let sector in config.graphSectors) {
    let sectorSplitPoints = pointsAlongSegment(
      config.graphSectors[sector].sankey.splitNormal,
      config.graphSectors[sector].sankey.splitOrigin,
      config.graphSectors[sector].sankey.width,
      percentages[sector],
      config.graphSectors[sector].sankey.invertSplitOrder
    );

    pathWidths = [
      ...pathWidths,
      ...percentages[sector].map(
        (percentage) => percentage * config.graphSectors[sector].sankey.width
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

  const pathsData = splitPoints.map(
    (splitPoint, id) => cubicPathData(
      splitPoint,
      statics.splitNormals[id],
      statics.endPoints[id],
      statics.endNormals[id]
    )
  );

  const pathStyles = pathWidths.map(
    (width) => ({
      fill: 'none',
      stroke: 'red',
      strokeWidth: width,
      opacity: 0.5,
    })
  );

  const tipsData = statics.endPoints.map(
    (point, id) => triangleData(point, statics.endNormals[id], pathWidths[id], tipHeights[id])
  );

  return {
    pathsData,
    pathStyles,
    tipsData,
  };
};

export default sankeyPathsData;
