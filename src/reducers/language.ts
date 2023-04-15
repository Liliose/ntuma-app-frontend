import {IAction, ILanguageReducer} from '../../interfaces';
import {RESET_LANGUAGE, SET_LANGUAGE} from '../actions/language';

const initialState: ILanguageReducer = {
  language: '',
};

const languageReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {...state, language: action.payload as string};
    case RESET_LANGUAGE:
      return initialState;
    default:
      return state;
  }
};

export default languageReducer;
