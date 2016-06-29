import pointsAlongSegment from './math/pointsAlongSegment';
import cubicPathData from './svgData/cubicPathData';
import triangleData from './svgData/triangleData';

const sankeyPathsData = (config, statics, percentages) => {
  let splitPoints = [];
  let pathWidths = [];
  let pathColors = [];
  let tipHeights = [];
  let startPathsData = [];
  let startPathStyles = [];

  for (let sector in config.graphSectors) {
    let sectorSplitPoints = pointsAlongSegment(
      config.graphSectors[sector].sankey.splitNormal,
      config.graphSectors[sector].sankey.splitOrigin,
      config.graphSectors[sector].sankey.width,
      percentages[sector],
      config.graphSectors[sector].sankey.invertSplitOrder
    );

    startPathsData = [
      ...startPathsData,
      cubicPathData(
        config.graphSectors[sector].sankey.startOrigin,
        config.graphSectors[sector].sankey.startNormal,
        config.graphSectors[sector].sankey.splitOrigin,
        config.graphSectors[sector].sankey.splitNormal
      ),
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

  const splitPathsData = splitPoints.map(
    (splitPoint, id) => cubicPathData(
      splitPoint,
      statics.splitNormals[id],
      statics.endPoints[id],
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
