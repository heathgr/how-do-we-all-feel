import { combineReducers } from 'redux';
import notifications from './notifications';
import totals from './totals';
import percentages from './percentages';
import user from './user';
import graphData from './graphData';

const rootReducer = combineReducers(
  {
    notifications,
    totals,
    percentages,
    user,
    graphData,
  }
);

export default rootReducer;
