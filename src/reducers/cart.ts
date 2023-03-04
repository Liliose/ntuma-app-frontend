import {IAction, ICartItem, ICartReducer} from '../../interfaces';
import {SET_CART, ADD_CART_ITEM, RESET_CART} from '../actions/cart';

const initialState: ICartReducer = {
  cart: [],
};

const cartReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_CART:
      return {...state, cart: action.payload as ICartItem[]};
    case ADD_CART_ITEM: {
      const payload: ICartItem = action.payload;
      const index = state.cart.findIndex(
        item =>
          item.productId === payload.productId && item.ppId === payload.ppId,
      );
      if (index >= 0) {
        let newCart = state.cart;
        newCart[index] = payload;
        return {...state, cart: newCart};
      } else {
        return {...state, cart: [...state.cart, {...payload}]};
      }
    }
    case RESET_CART:
      return initialState;
    default:
      return state;
  }
};

export default cartReducer;
