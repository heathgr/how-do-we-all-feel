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
        startOrigin: [500, 500],
        startNormal: [0, 1],
        splitOrigin: [500, 575],
        splitNormal: [0, 1],
        invertSplitOrder: false,
        tipHeight: 7.5,
        endRadius: 225,
      },
      colors: {
        sankey: 'yellow',
        title: 'yellow',
        elemetns: 'yellow',
        percentages: 'yellow',
        icons: 'black',
        iconBacks: 'yellow',
      },
    },
    ageRanges: {
      startAngle: -45 * degToRad,
      endAngle: 30 * degToRad,
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
        startOrigin: [500, 450],
        startNormal: [1, 0],
        splitOrigin: [615, 450],
        splitNormal: [1, 0],
        invertSplitOrder: true,
        tipHeight: 7.5,
        endRadius: 225,
      },
      colors: {
        sankey: 'red',
        title: 'red',
        elemetns: 'red',
        percentages: 'red',
        icons: 'red',
      },
    },
    genders: {
      startAngle: 180 * degToRad,
      endAngle: 225 * degToRad,
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
        startOrigin: [500, 450],
        startNormal: [-1, 0],
        splitOrigin: [385, 450],
        splitNormal: [-1, 0],
        invertSplitOrder: true,
        tipHeight: 7.5,
        endRadius: 225,
      },
      colors: {
        sankey: 'orange',
        title: 'orange',
        elemetns: 'orange',
        percentages: 'orange',
        icons: 'orange',
      },
    },
  },
  startBadge: {
    origin: [500, 450],
    radius: 90,
    counterLine: 1,
    textLines: [
      null,
      'There are',
      'count',
      'users who have let',
      'us know how they',
      'are feeling',
      null,
    ],
    textLineWeights: [
      2,
      1,
      3,
      1,
      1,
      1,
      2,
    ],
  },
};

export default config;
