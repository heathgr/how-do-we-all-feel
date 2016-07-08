import circularArcData from './svgData/circularArcData';
import transformationMatrixData from './svgData/transformationMatrixData';

import startBadgeData from './startBadgeData';
import polarToCartesian from './math/polarToCartesian';
import sectorSplitter from './math/sectorSplitter';
import vectorFromPoints from './math/vectorFromPoints';
import normalFromAngle from './math/normalFromAngle';
import { sub, add, mult, normalize, copy } from './math/vectorOperators';

const staticGraphData = (config) => {
  let titles = [];
  let elementLabels = [];
  let percentageLabels = [];
  let icons = [];
  let sankeyEndPoints = [];
  let sankeyEndNormals = [];
  let sankeySplitNormals = [];

  for (let sector in config.graphSectors) {
    const sectorAngles = [
      config.graphSectors[sector].startAngle,
      config.graphSectors[sector].endAngle,
    ];
    const isClockwise = sectorAngles[0] < sectorAngles[1];
    let sectorNormal = normalFromAngle(
      (config.graphSectors[sector].startAngle + config.graphSectors[sector].endAngle) * 0.5
    );
    let subSectors = sectorSplitter(sectorAngles, config.graphSectors[sector].elements.count);
    let sectorElementLabels = subSectors.map(
      (subSector, id) => ({
        pathData: circularArcData(
          config.graphSectors[sector].elements.radius,
          subSector,
          config.graphOrigin,
          isClockwise
        ),
        style: {
          fill: config.graphSectors[sector].colors.title,
          fontSize: config.graphSectors[sector].fontSizes.elements,
          fontFamily: config.graphSectors[sector].fontFamilies.elements,
        },
        text: config.graphSectors[sector].elements.text[id],
        textId: sector + '-element-label-' + id,
      })
    );
    let sectorPercentageLabels = subSectors.map(
      (subSector, id) => ({
        pathData: circularArcData(
          config.graphSectors[sector].percentages.radius,
          subSector,
          config.graphOrigin,
          isClockwise
        ),
        style: {
          fill: config.graphSectors[sector].colors.title,
          fontSize: config.graphSectors[sector].fontSizes.percentages,
          fontFamily: config.graphSectors[sector].fontFamilies.percentages,
        },
        text: '0%',
        textId: sector + '-percentage-label-' + id,
      })
    );
    let subSectorCenters = subSectors.map(
      (subSector) => (subSector[0] + subSector[1]) * 0.5
    );
    let sectorIcons = subSectorCenters.map(
      (centerAngle, id) => ({
        data: config.graphSectors[sector].icons.data[id],
        transform: transformationMatrixData(
          config.graphSectors[sector].icons.radius,
          centerAngle,
          config.graphOrigin,
          config.graphSectors[sector].icons.scale,
          config.graphSectors[sector].icons.bottomTowardsCenter
        ),
        style: {
          color: config.graphSectors[sector].colors.icons,
          background: config.graphSectors[sector].colors.iconBackgrounds,
        },
      })
    );
    let sectorSankeyEndPoints = subSectorCenters.map(
      (centerAngle, id) => polarToCartesian(
        config.graphSectors[sector].sankey.endRadius - config.graphSectors[sector].sankey.tipHeight,
        centerAngle,
        config.graphOrigin
      )
    );
    let sectorSankeyEndNormals = sectorSankeyEndPoints.map(
      (sankeyPoint) => vectorFromPoints(config.graphOrigin, sankeyPoint)
    );
    let sectorSankeySplitNormals = sectorSankeyEndPoints.map(
      (sankeyPoint) => sectorNormal
    );

    titles.push({
      pathData: circularArcData(
        config.graphSectors[sector].title.radius,
        sectorAngles,
        config.graphOrigin,
        isClockwise
      ),
      text: config.graphSectors[sector].title.text,
      style: {
        fill: config.graphSectors[sector].colors.title,
        fontFamily: config.graphSectors[sector].fontFamilies.title,
        fontSize: config.graphSectors[sector].fontSizes.title,
      },
      textId: sector + '-title',
    });
    elementLabels = [...elementLabels, ...sectorElementLabels];
    percentageLabels = [...percentageLabels, ...sectorPercentageLabels];
    icons = [...icons, ...sectorIcons];
    sankeyEndPoints = [...sankeyEndPoints, ...sectorSankeyEndPoints];
    sankeyEndNormals = [...sankeyEndNormals, ...sectorSankeyEndNormals];
    sankeySplitNormals = [...sankeySplitNormals, ...sectorSankeySplitNormals];
  }

  const startBadge = startBadgeData(config.startBadge, 0);

  return {
    titles,
    elementLabels,
    percentageLabels,
    icons,
    sankey: {
      startPathsData: [],
      splitPathsData: [],
      tipsData: [],
    },
    sankeyStatics: {
      endPoints: sankeyEndPoints,
      endNormals: sankeyEndNormals,
      splitNormals: sankeySplitNormals,
    },
    totals: {
      overallCount: 0,
    },
    startBadge,
  };
};

export default staticGraphData;
