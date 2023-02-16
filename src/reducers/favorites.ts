import {IAction, IFavouritesReducer, IProduct} from '../../interfaces';
import {
  SET_FAVOURITES,
  ADD_FAV_ITEM,
  REMOVE_FAV_ITEM,
  RESET_FAVOURITES,
} from '../actions/favourites';

const initialState: IFavouritesReducer = {
  favourites: [],
};

const favouritesReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_FAVOURITES:
      return {...state, favourites: action.payload as IProduct[]};
    case ADD_FAV_ITEM:
      return {
        ...state,
        favourites: [...state.favourites, action.payload] as IProduct[],
      };
    case REMOVE_FAV_ITEM:
      return {
        ...state,
        favourites: state.favourites.filter(
          item => item.pId !== action.payload.pId,
        ) as IProduct[],
      };
    case RESET_FAVOURITES:
      return initialState;
    default:
      return state;
  }
};

export default favouritesReducer;
