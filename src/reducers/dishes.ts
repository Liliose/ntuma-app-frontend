import {IAction, IDishesReducer, IDish} from '../../interfaces';
import {
  SET_DISHES,
  SET_IS_LOADING_DISHES,
  RESET_DISHES,
} from '../actions/dishes';

const initialState: IDishesReducer = {
  dishes: [],
  isLoading: false,
};

const categoriesReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_DISHES:
      return {...state, dishes: action.payload as IDish[]};
    case SET_IS_LOADING_DISHES:
      return {...state, isLoading: action.payload as boolean};
    case RESET_DISHES:
      return initialState;
    default:
      return state;
  }
};

export default categoriesReducer;
