import circularArcData from './svgData/circularArcData';
import transformationMatrixData from './svgData/transformationMatrixData';

import polarToCartesian from './math/polarToCartesian';
import sectorSplitter from './math/sectorSplitter';
import vectorFromPoints from './math/vectorFromPoints';
import { sub, add, mult, normalize, copy } from './math/vectorOperators';

const staticGraphData = (config) => {
  let titles = [];
  let elementLabels = [];
  let percentageLabels = [];
  let icons = [];
  let sankeySplitNormals = [];
  let sankeyEndPoints = [];
  let sankeyEndNormals = [];

  for (let sector in config.graphSectors) {
    const sectorAngles = [
      config.graphSectors[sector].startAngle,
      config.graphSectors[sector].endAngle,
    ];
    const isClockwise = sectorAngles[0] < sectorAngles[1];
    let subSectors = sectorSplitter(sectorAngles, config.graphSectors[sector].elements.count);
    let sectorElementLabels = subSectors.map(
      (subSector, id) => ({
        pathData: circularArcData(
          config.graphSectors[sector].elements.radius,
          subSector,
          config.graphOrigin,
          isClockwise
        ),
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
          config.graphSectors[sector].icons.bottomTowardsCenter
        ),
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
      (sankeyPoint) => mult(
        vectorFromPoints(config.graphOrigin, sankeyPoint),
        -config.graphSectors[sector].sankey.endCurviness
      )
    );
    let sectorSankeySplitNormals = sectorSankeyEndPoints.map(
      () => mult(
        copy(config.graphSectors[sector].sankey.splitNormal),
        config.graphSectors[sector].sankey.splitCurviness
      )
    );

    titles.push({
      pathData: circularArcData(
        config.graphSectors[sector].title.radius,
        sectorAngles,
        config.graphOrigin,
        isClockwise
      ),
      text: config.graphSectors[sector].title.text,
      textId: sector + '-title',
    });
    elementLabels = [...elementLabels, ...sectorElementLabels];
    percentageLabels = [...percentageLabels, ...sectorPercentageLabels];
    icons = [...icons, ...sectorIcons];
    sankeyEndPoints = [...sankeyEndPoints, ...sectorSankeyEndPoints];
    sankeyEndNormals = [...sankeyEndNormals, ...sectorSankeyEndNormals];
    sankeySplitNormals = [...sankeySplitNormals, ...sectorSankeySplitNormals];
  }

  return {
    titles,
    elementLabels,
    percentageLabels,
    icons,
    sankey: {
      pathsData: [],
      tipsData: [],
    },
    sankeyStatics: {
      endPoints: sankeyEndPoints,
      endNormals: sankeyEndNormals,
      splitNormals: sankeySplitNormals,
    },
  };
};

export default staticGraphData;
