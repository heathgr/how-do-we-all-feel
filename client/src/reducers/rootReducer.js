import { combineReducers } from 'redux';
import notifications from './notifications';
import totals from './totals';
import user from './user';

const rootReducer = combineReducers(
  {
    notifications,
    totals,
    user,
  }
);

export default rootReducer;
