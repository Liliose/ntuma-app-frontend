import {combineReducers} from 'redux';
import user from './user';
import markets from './markets';
import categories from './categories';
const rootReducer = combineReducers({
  user,
  markets,
  categories,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
