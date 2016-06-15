import { combineReducers } from 'redux';
import notifications from './notifications';
import totals from './totals';
import user from './user';
import graphData from './graphData';

const rootReducer = combineReducers(
  {
    notifications,
    totals,
    user,
    graphData,
  }
);

export default rootReducer;
