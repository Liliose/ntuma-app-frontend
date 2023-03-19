import {IAction, IMarket, IMarketsReducer} from '../../interfaces';
import {
  SET_MARKETS,
  SET_IS_LOADING_MARKETS,
  RESET_MARKETS,
  SET_SELECTED_MARKET,
  SET_IS_HARD_RELOADING_MARKETS,
  SET_LOADING_MARKETS_ERROR,
  SET_MARKET_SEARCH_RESULTS,
} from '../actions/markets';

const initialState: IMarketsReducer = {
  markets: [],
  marketSearchResults: [],
  selectedMarket: undefined,
  isLoading: false,
  hardReloading: false,
  loadingError: '',
};

const marketsReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_MARKETS:
      return {
        ...state,
        markets: action.payload as IMarket[],
        marketSearchResults: action.payload as IMarket[],
      };
    case SET_MARKET_SEARCH_RESULTS:
      return {...state, marketSearchResults: action.payload as IMarket[]};
    case SET_SELECTED_MARKET:
      return {...state, selectedMarket: action.payload as IMarket};
    case SET_IS_LOADING_MARKETS:
      return {...state, isLoading: action.payload as boolean};
    case SET_IS_HARD_RELOADING_MARKETS:
      return {...state, hardReloading: action.payload as boolean};
    case SET_LOADING_MARKETS_ERROR:
      return {...state, loadingError: action.payload as string};
    case RESET_MARKETS:
      return initialState;
    default:
      return state;
  }
};

export default marketsReducer;
