import { default as type } from '../constants/ActionTypes';
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
};

const graphData = (state = initialState, action) => {
  switch (action.type){
    default:
      return state;
  }
};

export default graphData;
