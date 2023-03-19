import {IAction, IDishesReducer, IDish} from '../../interfaces';
import {SET_IS_HARD_RELOADING_CATEGORIES} from '../actions/categories';
import {
  SET_DISHES,
  SET_IS_LOADING_DISHES,
  RESET_DISHES,
  SET_LOADING_DISH_ERROR,
} from '../actions/dishes';

const initialState: IDishesReducer = {
  dishes: [],
  isLoading: false,
  hardReloading: false,
  loadingError: '',
};

const categoriesReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_DISHES:
      return {...state, dishes: action.payload as IDish[]};
    case SET_IS_LOADING_DISHES:
      return {...state, isLoading: action.payload as boolean};
    case SET_IS_HARD_RELOADING_CATEGORIES:
      return {...state, hardReloading: action.payload as boolean};
    case SET_LOADING_DISH_ERROR:
      return {...state, loadingError: action.payload as string};
    case RESET_DISHES:
      return initialState;
    default:
      return state;
  }
};

export default categoriesReducer;
