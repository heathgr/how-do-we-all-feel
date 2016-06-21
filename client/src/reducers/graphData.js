import types from '../constants/ActionTypes';
import config from '../constants/config';

import staticGraphData from '../helpers/graph/staticGraphData';
import sankeyPathsData from '../helpers/graph/sankeyPathsData';
import updatePercentageLabels from '../helpers/graph/updatePercentageLabels';
import percentagesFromTotals from '../helpers/graph/math/percentagesFromTotals';

const initialState = staticGraphData(config);

const graphData = (state = initialState, action) => {
  switch (action.type) {
    case types.TOTALS_UPDATED:
      const percentages = percentagesFromTotals(action.data);
      const updatedPercentageLabels = updatePercentageLabels(
        state.percentageLabels,
        [
          ...percentages.statuses.overall,
          ...percentages.ageRanges.overall,
          ...percentages.genders.overall,
        ]
      );
      const sankeyData = sankeyPathsData(
        config,
        state.sankeyStatics,
        {
          statuses: [...percentages.statuses.overall],
          ageRanges: [...percentages.ageRanges.overall],
          genders: [...percentages.genders.overall],
        }
      );

      return Object.assign(
        {},
        state,
        { percentageLabels: updatedPercentageLabels },
        { sankey: sankeyData }
      );
    default:
      return state;
  }
};

export default graphData;
