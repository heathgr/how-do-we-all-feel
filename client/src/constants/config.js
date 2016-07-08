import statuses from '../../../config/statuses';
import ageRanges from '../../../config/ageRanges';
import genders from '../../../config/genders';
import statusIcons from './svgData/statusIcons';
import ageRangeIcons from './svgData/ageRangeIcons';
import genderIcons from './svgData/genderIcons';

const degToRad = Math.PI / 180;
const genderMultiplier = 0.9;
const ageRangeMultiplier = 0.8;

const config = {
  graphOrigin: [500, 500],
  graphSectors: {
    statuses: {
      startAngle: 140 * degToRad,
      endAngle: 40 * degToRad,
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
        radius: 275,
        count: statuses.length,
      },
      icons: {
        radius: 337.5,
        data: statusIcons,
        scale: 1,
        bottomTowardsCenter: false,
      },
      sankey: {
        width: 100,
        startRadius: 110,
        splitRadius: 200,
        invertSplitOrder: true,
        tipHeight: 7.5,
        endRadius: 255,
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
        elements: 20,
        percentages: 20,
      },
      fontFamilies: {
        title: 'Oswald',
        elements: 'Oswald',
        percentages: 'Open Sans',
      },
    },
    ageRanges: {
      startAngle: 287.5 * degToRad,
      endAngle: 372.5 * degToRad,
      title: {
        radius: 450 * ageRangeMultiplier,
        text: 'How old is everyone?',
      },
      elements: {
        radius: 400 * ageRangeMultiplier,
        text: ageRanges,
        count: ageRanges.length,
      },
      percentages: {
        radius: 275 * ageRangeMultiplier,
        count: ageRanges.length,
      },
      icons: {
        radius: 337.5 * ageRangeMultiplier,
        data: ageRangeIcons,
        scale: ageRangeMultiplier,
        bottomTowardsCenter: true,
      },
      sankey: {
        width: 100 * ageRangeMultiplier,
        startRadius: 105,
        splitRadius: 200 * ageRangeMultiplier,
        invertSplitOrder: false,
        tipHeight: 7.5 * ageRangeMultiplier,
        endRadius: 255 * ageRangeMultiplier,
      },
      colors: {
        sankey: '#CC7C2D',
        title: '#CC7C2D',
        elements: '#CC7C2D',
        percentages: '#CC7C2D',
        icons: '#CC7C2D',
      },
      fontSizes: {
        title: 40 * ageRangeMultiplier,
        elements: 20 * ageRangeMultiplier,
        percentages: 20 * ageRangeMultiplier,
      },
      fontFamilies: {
        title: 'Oswald',
        elements: 'Oswald',
        percentages: 'Open Sans',
      },
    },
    genders: {
      startAngle: 184.5 * degToRad,
      endAngle: 235.5 * degToRad,
      title: {
        radius: 450 * genderMultiplier,
        text: 'What about gender?',
      },
      elements: {
        radius: 400 * genderMultiplier,
        text: genders,
        count: genders.length,
      },
      percentages: {
        radius: 275 * genderMultiplier,
        count: genders.length,
      },
      icons: {
        radius: 337.5 * genderMultiplier,
        data: genderIcons,
        scale: genderMultiplier,
        bottomTowardsCenter: true,
      },
      sankey: {
        width: 100 * genderMultiplier,
        startRadius: 110 * genderMultiplier,
        splitRadius: 200 * genderMultiplier,
        invertSplitOrder: false,
        tipHeight: 7.5 * genderMultiplier,
        endRadius: 255 * genderMultiplier,
      },
      colors: {
        sankey: '#3E993D',
        title: '#3E993D',
        elements: '#3E993D',
        percentages: '#3E993D',
        icons: '#3E993D',
      },
      fontSizes: {
        title: 40 * genderMultiplier,
        elements: 20 * genderMultiplier,
        percentages: 20 * genderMultiplier,
      },
      fontFamilies: {
        title: 'Oswald',
        elements: 'Oswald',
        percentages: 'Open Sans',
      },
    },
  },
  startBadge: {
    origin: [500, 500],
    radius: 95,
    counterLine: 0,
    textLines: [
      null,
      'count',
      'users have let us know',
      'how they are feeling',
      null,
    ],
    textLineWeights: [
      1,
      3,
      1,
      1,
      1.5,
    ],
    colors: {
      text: '#eeeeee',
      counter: '#F1EE1F',
      background: '#333333',
    },
    fontFamilies: {
      text: 'Open Sans',
      counter: 'Oswald',
    },
    fontSizes: {
      text: 18,
      counter: 50,
    },
  },
};

export default config;
