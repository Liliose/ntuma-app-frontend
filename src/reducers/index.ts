import {combineReducers} from 'redux';
import user from './user';
import markets from './markets';
const rootReducer = combineReducers({
  user,
  markets,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
