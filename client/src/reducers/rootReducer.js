import { combineReducers } from 'redux';
import notifications from './notifications';
import user from './user';
import graphData from './graphData';

const rootReducer = combineReducers(
  {
    notifications,
    user,
    graphData,
  }
);

export default rootReducer;
