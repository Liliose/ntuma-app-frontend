import {IAction, IBanner, IBannersReducer} from '../../interfaces';
import {
  SET_BANNERS,
  SET_IS_LOADING_BANNERS,
  RESET_BANNERS,
  SET_IS_HARD_RELOADING_BANNERS,
  SET_LOADING_BANNERS_ERROR,
} from '../actions/banners';

const initialState: IBannersReducer = {
  banners: [],
  isLoading: false,
  hardReloading: false,
  loadingError: '',
};

const bannersReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_BANNERS:
      return {...state, banners: action.payload as IBanner[]};
    case SET_IS_LOADING_BANNERS:
      return {...state, isLoading: action.payload as boolean};
    case SET_IS_HARD_RELOADING_BANNERS:
      return {...state, hardReloading: action.payload as boolean};
    case SET_LOADING_BANNERS_ERROR:
      return {...state, loadingError: action.payload as string};
    case RESET_BANNERS:
      return initialState;
    default:
      return state;
  }
};

export default bannersReducer;
