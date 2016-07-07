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
      startAngle: ((6 / 14) * 360) * degToRad,
      endAngle: 0 * degToRad,
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
        sankey: '#F1EE1F',
        title: '#F1EE1F',
        elements: '#F1EE1F',
        percentages: '#F1EE1F',
        icons: '#333333',
        iconBackgrounds: '#F1EE1F',
      },
      fontSizes: {
        title: 40,
        elements: 15,
        percentages: 15,
      },
      fontFamilies: {
        title: 'Oswald',
        elements: 'Open Sans',
        percentages: 'Open Sans',
      },
    },
    ageRanges: {
      startAngle: ((9 / 14) * 360) * degToRad,
      endAngle: ((14 / 14) * 360) * degToRad,
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
        width: 100,
        startOrigin: [500, 450],
        startNormal: [1, 0],
        splitOrigin: [615, 450],
        splitNormal: [1, 0],
        invertSplitOrder: true,
        tipHeight: 7.5,
        endRadius: 225,
      },
      colors: {
        sankey: '#CC7C2D',
        title: '#CC7C2D',
        elements: '#CC7C2D',
        percentages: '#CC7C2D',
        icons: '#CC7C2D',
      },
      fontSizes: {
        title: 40,
        elements: 15,
        percentages: 15,
      },
      fontFamilies: {
        title: 'Oswald',
        elements: 'Open Sans',
        percentages: 'Open Sans',
      },
    },
    genders: {
      startAngle: ((6 / 14) * 360) * degToRad,
      endAngle: ((9 / 14) * 360) * degToRad,
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
        width: 100,
        startOrigin: [500, 450],
        startNormal: [-1, 0],
        splitOrigin: [385, 450],
        splitNormal: [-1, 0],
        invertSplitOrder: true,
        tipHeight: 7.5,
        endRadius: 225,
      },
      colors: {
        sankey: '#3E993D',
        title: '#3E993D',
        elements: '#3E993D',
        percentages: '#3E993D',
        icons: '#3E993D',
      },
      fontSizes: {
        title: 40,
        elements: 15,
        percentages: 15,
      },
      fontFamilies: {
        title: 'Oswald',
        elements: 'Open Sans',
        percentages: 'Open Sans',
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
      1.5,
      1,
      3,
      1,
      1,
      1,
      1.5,
    ],
    colors: {
      text: 'white',
      counter: '#F1EE1F',
      background: '#333333',
    },
    fontFamilies: {
      text: 'Open Sans',
      counter: 'Oswald',
    },
    fontSizes: {
      text: 15,
      counter: 40,
    },
  },
};

export default config;
