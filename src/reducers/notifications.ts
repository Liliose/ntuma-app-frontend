import {IAction, INotificationsReducer, INotificaton} from '../../interfaces';
import {
  SET_NOTIFICATIONS,
  SET_IS_LOADING_NOTIFICATIONS,
  SET_LOADING_NOTIFICATIONS_ERROR,
  SET_REMOVE_NOTIFICATION,
  RESET_NOTIFICATIONS,
  SET_IS_HARD_RELOADING_NOTIFICATIONS,
  SET_SHOW_CLEAR_ALL_NOTIFICATIONS_CONFIRMATION,
} from '../actions/notifications';

const initialState: INotificationsReducer = {
  notifications: [],
  isLoading: false,
  hardReloading: false,
  showConfirmation: false,
  loadingError: '',
};

const notificationsReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return {...state, notifications: action.payload as INotificaton[]};
    case SET_REMOVE_NOTIFICATION: {
      const newState = state.notifications.filter(
        item => item.id != action.payload.id,
      );
      return {
        ...state,
        notifications: newState as INotificaton[],
      };
    }
    case SET_IS_LOADING_NOTIFICATIONS:
      return {...state, isLoading: action.payload as boolean};
    case SET_SHOW_CLEAR_ALL_NOTIFICATIONS_CONFIRMATION:
      return {...state, showConfirmation: action.payload as boolean};
    case SET_IS_HARD_RELOADING_NOTIFICATIONS:
      return {...state, hardReloading: action.payload as boolean};
    case SET_LOADING_NOTIFICATIONS_ERROR:
      return {...state, loadingError: action.payload as string};
    case RESET_NOTIFICATIONS:
      return initialState;
    default:
      return state;
  }
};

export default notificationsReducer;
