import {combineReducers} from 'redux';
import user from './user';
import markets from './markets';
import categories from './categories';
import products from './products';
const rootReducer = combineReducers({
  user,
  markets,
  categories,
  products,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
