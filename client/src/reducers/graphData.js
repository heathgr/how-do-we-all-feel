import { default as types } from '../constants/ActionTypes';
import statuses from '../../../config/statuses';
import ageRanges from '../../../config/ageRanges';
import genders from '../../../config/genders';
import statusIcons from '../constants/svgData/statusIcons';
import ageRangeIcons from '../constants/svgData/ageRangeIcons';
import genderIcons from '../constants/svgData/genderIcons';
import {
  statusIconTransforms,
  ageRangeIconTransforms,
  genderIconTransforms
} from '../helpers/graph/iconSvgDataHelpers';
import {
  statusTextPaths,
  ageRangeTextPaths,
  genderTextPaths
} from '../helpers/graph/textPathsHelpers';
import overallTransform from '../helpers/graph/overallTransform';

import percentagesFromTotals from '../helpers/graph/percentagesFromTotals';
import sankeyPathsFromPercentages from '../helpers/graph/sankeyPathsFromPercentages';
import sankeyTipsFromPercentages from '../helpers/graph/sankeyTipsFromPercentages';

const initialState = {
  statusIcons,
  statusIconTransforms,
  statusTextPaths,
  statuses,
  ageRangeIcons,
  ageRangeIconTransforms,
  ageRangeTextPaths,
  ageRanges,
  genderIcons,
  genderIconTransforms,
  genderTextPaths,
  genders,
  overallTransform,
  percentages: { //TODO initialize sub percentages.  ie byAgeRange, byStatus, etc
    statuses: {
      overall: statuses.map(() => 0),
    },
    genders: {
      overall: genders.map(() => 0),
    },
    ageRanges: {
      overall: ageRanges.map(() => 0),
    },
  },
  sankeyPaths: {
    statuses: statuses.map(
      () => ''
    ),
    genders: genders.map(
      () => ''
    ),
    ageRanges: ageRanges.map(
      () => ''
    ),
  },
};

const graphData = (state = initialState, action) => {
  switch (action.type){
    case types.TOTALS_UPDATED:
      const percentages = percentagesFromTotals(action.data);
      const sankeyPaths = sankeyPathsFromPercentages(percentages);
      const sankeyTips = sankeyTipsFromPercentages(percentages);

      return Object.assign({}, state, { percentages, sankeyPaths, sankeyTips });
    default:
      return state;
  }
};

export default graphData;
