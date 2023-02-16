import {IAction, IProductPrice, IProductPricesReducer} from '../../interfaces';
import {
  SET_PRODUCT_PRICES,
  SET_IS_LOADING_PRODUCT_PRICES,
  RESET_PRODUCT_PRICES,
} from '../actions/productPrices';

const initialState: IProductPricesReducer = {
  prices: [],
  isLoading: false,
};

const productPricesReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_PRODUCT_PRICES:
      return {...state, prices: action.payload as IProductPrice[]};
    case SET_IS_LOADING_PRODUCT_PRICES:
      return {...state, isLoading: action.payload as boolean};
    case RESET_PRODUCT_PRICES:
      return initialState;
    default:
      return state;
  }
};

export default productPricesReducer;