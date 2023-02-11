import {ICartItem} from '../../interfaces';

export const SET_CART = 'SET_CART';
export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const RESET_CART = 'RESET_CART';

interface IAction {
  type: string;
  payload: any;
}
export const setCart = (cart: ICartItem[]): IAction => ({
  type: SET_CART,
  payload: cart,
});
export const addCartItem = (item: ICartItem): IAction => ({
  type: ADD_CART_ITEM,
  payload: item,
});

export const resetCart = () => ({type: RESET_CART});
