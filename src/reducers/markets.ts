import {IAction, IMarket, IMarketsReducer} from '../../interfaces';
import {
  SET_MARKETS,
  SET_IS_LOADING_MARKETS,
  RESET_MARKETS,
  SET_SELECTED_MARKET,
} from '../actions/markets';

const initialState: IMarketsReducer = {
  markets: [],
  selectedMarket: undefined,
  isLoading: false,
};

const marketsReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_MARKETS:
      return {...state, markets: action.payload as IMarket[]};
    case SET_SELECTED_MARKET:
      return {...state, selectedMarket: action.payload as IMarket};
    case SET_IS_LOADING_MARKETS:
      return {...state, isLoading: action.payload as boolean};
    case RESET_MARKETS:
      return initialState;
    default:
      return state;
  }
};

export default marketsReducer;
