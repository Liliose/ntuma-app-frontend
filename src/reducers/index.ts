import {combineReducers} from 'redux';
import user from './user';
import markets from './markets';
import categories from './categories';
import products from './products';
import productPrices from './productPrices';
import cart from './cart';
import favourites from './favorites';
import locations from './locations';
import deliveryFees from './deliveryFees';
import orders from './orders';
import walletTransactions from './walletTransactions';
import dishes from './dishes';
import recentSearches from './recentSearches';
import notifications from './notifications';
import clients from './clients';
import messages from './messages';
import banners from './banners';
import systemfees from './systemFees';
import packagingfees from './packagingFees';
import agentsfees from './agentsFees';
import language from './language';
const rootReducer = combineReducers({
  user,
  markets,
  categories,
  products,
  productPrices,
  cart,
  favourites,
  locations,
  deliveryFees,
  orders,
  walletTransactions,
  notifications,
  recentSearches,
  dishes,
  clients,
  messages,
  banners,
  systemfees,
  packagingfees,
  agentsfees,
  language,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
