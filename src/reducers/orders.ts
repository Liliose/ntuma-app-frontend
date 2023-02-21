import {IAction, IOrdersReducer, IOrder} from '../../interfaces';
import {
  SET_ORDERS,
  SET_IS_LOADING_ORDERS,
  SET_UPDATE_ORDER,
  RESET_ORDERS,
} from '../actions/orders';

const initialState: IOrdersReducer = {
  orders: [],
  isLoading: false,
};

const ordersReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_ORDERS:
      return {...state, orders: action.payload as IOrder[]};
    case SET_UPDATE_ORDER: {
      let newState = state.orders;
      const index = newState.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        newState[index] = action.payload as IOrder;
        return {
          ...state,
          orders: newState as IOrder[],
        };
      } else {
        return {
          ...state,
          orders: [...state.orders, action.payload] as IOrder[],
        };
      }
    }
    case SET_IS_LOADING_ORDERS:
      return {...state, isLoading: action.payload as boolean};
    case RESET_ORDERS:
      return initialState;
    default:
      return state;
  }
};

export default ordersReducer;
