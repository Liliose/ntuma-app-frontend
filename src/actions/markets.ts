import axios from 'axios';
import {IMarket} from '../../interfaces';
import {app} from '../constants/app';
import {errorHandler, returnErroMessage} from '../helpers';

export const SET_MARKETS = 'SET_MARKETS';
export const SET_IS_LOADING_MARKETS = 'SET_IS_LOADING_MARKETS';
export const SET_ADD_OR_UPDATE_MARKET = 'SET_ADD_OR_UPDATE_MARKET';
export const SET_DELETE_MARKET = 'SET_DELETE_MARKET';
export const SET_SELECTED_MARKET = 'SET_SELECTED_MARKET';
export const SET_MARKET_SEARCH_RESULTS = 'SET_MARKET_SEARCH_RESULTS';
export const RESET_MARKETS = 'RESET_MARKETS';

export const SET_LOADING_MARKETS_ERROR = 'SET_LOADING_MARKETS_ERROR';
export const SET_IS_HARD_RELOADING_MARKETS = 'SET_IS_HARD_RELOADING_MARKETS';

interface IAction {
  type: string;
  payload: any;
}
export const setMarkets = (markets: IMarket[]): IAction => ({
  type: SET_MARKETS,
  payload: markets,
});

export const setAddOrUpdateMarket = (market: IMarket): IAction => ({
  type: SET_ADD_OR_UPDATE_MARKET,
  payload: market,
});
export const setDeleteMarket = (market: IMarket): IAction => ({
  type: SET_DELETE_MARKET,
  payload: market,
});

export const setMarketsSearchResults = (markets: IMarket[]): IAction => ({
  type: SET_MARKET_SEARCH_RESULTS,
  payload: markets,
});

export const setSelectedMarket = (market: IMarket | undefined): IAction => ({
  type: SET_SELECTED_MARKET,
  payload: market,
});
export const setIsLoadingMarkets = (value: boolean): IAction => ({
  type: SET_IS_LOADING_MARKETS,
  payload: value,
});

export const setIsHardReloadingMarkets = (value: boolean): IAction => ({
  type: SET_IS_HARD_RELOADING_MARKETS,
  payload: value,
});

export const setLoadingMarketsError = (value: string): IAction => ({
  type: SET_LOADING_MARKETS_ERROR,
  payload: value,
});

export const resetMarkets = () => ({type: RESET_MARKETS});

export const fetchMarkets = (): any => (dispatch: any, getState: any) => {
  dispatch(setIsLoadingMarkets(true));
  dispatch(setLoadingMarketsError(''));
  axios
    .get(app.BACKEND_URL + '/markets/')
    .then(res => {
      dispatch(setIsHardReloadingMarkets(false));
      dispatch(setIsLoadingMarkets(false));
      dispatch({
        type: SET_MARKETS,
        payload: res.data.markets,
      });
    })
    .catch(error => {
      const err = returnErroMessage(error);
      dispatch(setIsHardReloadingMarkets(false));
      dispatch(setIsLoadingMarkets(false));
      // errorHandler(error);
      dispatch(setLoadingMarketsError(err));
    });
};
