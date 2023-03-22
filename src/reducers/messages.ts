import {IAction, IMessagesReducer, IMessage} from '../../interfaces';
import {
  SET_MESSAGES,
  SET_IS_HARD_RELOADING_MESSAGES,
  SET_IS_LOADING_MESSAGES,
  SET_LOADING_MESSAGES_ERROR,
  RESET_MESSAGES,
  SET_SINGLE_MESSAGE,
  SET_ADD_OR_UPDATE_MESSAGE,
  SET_DELETE_MESSAGE,
} from '../actions/messages';

const initialState: IMessagesReducer = {
  messages: [],
  isLoading: false,
  hardReloading: false,
  loadingError: '',
};

const acceptedOrdersReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {...state, messages: action.payload as IMessage[]};
    case SET_ADD_OR_UPDATE_MESSAGE: {
      const newState = state.messages;
      const index = newState.findIndex(item => item.id == action.payload.id);
      if (index >= 0) {
        newState[index] = action.payload;
        return {
          ...state,
          messages: newState as IMessage[],
        };
      } else {
        return {
          ...state,
          messages: [action.payload, ...newState] as IMessage[],
        };
      }
    }
    case SET_DELETE_MESSAGE: {
      const newState = state.messages.filter(
        item => item.id != action.payload.id,
      );
      return {
        ...state,
        messages: newState as IMessage[],
      };
    }
    case SET_SINGLE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload] as IMessage[],
      };
    case SET_IS_LOADING_MESSAGES:
      return {...state, isLoading: action.payload as boolean};
    case SET_IS_HARD_RELOADING_MESSAGES:
      return {...state, hardReloading: action.payload as boolean};
    case SET_LOADING_MESSAGES_ERROR:
      return {...state, loadingError: action.payload as string};
    case RESET_MESSAGES:
      return initialState;
    default:
      return state;
  }
};

export default acceptedOrdersReducer;
