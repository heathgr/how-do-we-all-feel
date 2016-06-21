import statuses from '../../../config/statuses';
import ageRanges from '../../../config/ageRanges';
import genders from '../../../config/genders';
import statusIcons from './svgData/statusIcons';
import ageRangeIcons from './svgData/ageRangeIcons';
import genderIcons from './svgData/genderIcons';

const degToRad = Math.PI / 180;

const config = {
  graphOrigin: [500, 500],
  graphSectors: {
    statuses: {
      startAngle: 135 * degToRad,
      endAngle: 45 * degToRad,
      title: {
        radius: 450,
        text: 'How Do We All Feel?',
      },
      elements: {
        radius: 400,
        text: statuses,
        count: statuses.length,
      },
      percentages: {
        radius: 250,
        count: statuses.length,
      },
      icons: {
        radius: 325,
        data: statusIcons,
        bottomTowardsCenter: false,
      },
      sankey: {
        width: 100,
        splitOrigin: [500, 400],
        splitNormal: [0, 1],
        invertSplitOrder: false,
        tipHeight: 7.5,
        endRadius: 225,
        splitCurviness: 150,
        endCurviness: 150,
      },
    },
    ageRanges: {
      startAngle: -45 * degToRad,
      endAngle: 9 * degToRad,
      title: {
        radius: 450,
        text: 'How old is everyone?',
      },
      elements: {
        radius: 400,
        text: ageRanges,
        count: ageRanges.length,
      },
      percentages: {
        radius: 250,
        count: ageRanges.length,
      },
      icons: {
        radius: 325,
        data: ageRangeIcons,
        bottomTowardsCenter: true,
      },
      sankey: {
        width: 50,
        splitOrigin: [575, 400],
        splitNormal: [1, 2],
        invertSplitOrder: true,
        tipHeight: 7.5,
        endRadius: 225,
        splitCurviness: 25,
        endCurviness: 10,
      },
    },
    genders: {
      startAngle: 171 * degToRad,
      endAngle: 207 * degToRad,
      title: {
        radius: 450,
        text: 'What about gender?',
      },
      elements: {
        radius: 400,
        text: genders,
        count: genders.length,
      },
      percentages: {
        radius: 250,
        count: genders.length,
      },
      icons: {
        radius: 325,
        data: genderIcons,
        bottomTowardsCenter: true,
      },
      sankey: {
        width: 50,
        splitOrigin: [425, 400],
        splitNormal: [-1, 2],
        invertSplitOrder: true,
        tipHeight: 7.5,
        endRadius: 225,
        splitCurviness: 50,
        endCurviness: 50,
      },
    },
  },
  overallTotal: {
    angle: 261,
    radius: 300,
  },
};

export default config;
