import {IAction, IOrdersReducer, IOrder} from '../../interfaces';
import {
  SET_ORDERS,
  SET_IS_LOADING_ORDERS,
  RESET_ORDERS,
  SET_ADD_OR_UPDATE_ORDER,
  SET_DELETE_ORDER,
} from '../actions/orders';

const initialState: IOrdersReducer = {
  orders: [],
  isLoading: false,
};

const ordersReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_ORDERS:
      return {...state, orders: action.payload as IOrder[]};
    case SET_ADD_OR_UPDATE_ORDER: {
      const newState = state.orders;
      const index = newState.findIndex(item => item.id == action.payload.id);
      if (index >= 0) {
        newState[index] = action.payload;
        return {...state, orders: newState as IOrder[]};
      } else {
        return {...state, orders: [action.payload, ...newState] as IOrder[]};
      }
    }
    case SET_DELETE_ORDER: {
      const newState = state.orders.filter(
        item => item.id != action.payload.id,
      );
      return {...state, orders: newState as IOrder[]};
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
