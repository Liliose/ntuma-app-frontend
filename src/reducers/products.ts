import {IAction, IProductsReducer, IProduct} from '../../interfaces';
import {
  SET_PRODUCTS,
  SET_IS_LOADING_PRODUCTS,
  RESET_PRODUCTS,
} from '../actions/products';

const initialState: IProductsReducer = {
  products: [],
  isLoading: false,
};

const productReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, products: action.payload as IProduct[]};
    case SET_IS_LOADING_PRODUCTS:
      return {...state, isLoading: action.payload as boolean};
    case RESET_PRODUCTS:
      return initialState;
    default:
      return state;
  }
};

export default productReducer;
