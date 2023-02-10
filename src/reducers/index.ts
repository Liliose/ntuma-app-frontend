import {combineReducers} from 'redux';
import user from './user';
import markets from './markets';
import categories from './categories';
import products from './products';
import productPrices from './productPrices';
const rootReducer = combineReducers({
  user,
  markets,
  categories,
  products,
  productPrices,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
