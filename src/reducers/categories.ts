import {IAction, ICategoriesReducer, ICategory} from '../../interfaces';
import {
  SET_CATEGORIES,
  SET_IS_LOADING_CATEGORIES,
  RESET_CATEGORIES,
  SET_SELECTED_CATEGORY,
  SET_IS_HARD_RELOADING_CATEGORIES,
  SET_LOADING_CATEGORIES_ERROR,
  SET_ADD_OR_UPDATE_CATEGORY,
  SET_DELETE_CATEGORY,
} from '../actions/categories';

const initialState: ICategoriesReducer = {
  categories: [],
  selectedCategory: undefined,
  isLoading: false,
  hardReloading: false,
  loadingError: '',
};

const categoriesReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {...state, categories: action.payload as ICategory[]};
    case SET_ADD_OR_UPDATE_CATEGORY: {
      const newState = state.categories;
      const index = newState.findIndex(item => item.id == action.payload.id);
      if (index) {
        newState[index] = action.payload;
        return {
          ...state,
          categories: newState as ICategory[],
        };
      } else {
        return {
          ...state,
          categories: [action.payload, ...newState] as ICategory[],
        };
      }
    }
    case SET_DELETE_CATEGORY: {
      const newState = state.categories.filter(
        item => item.id != action.payload.id,
      );
      return {
        ...state,
        categories: newState as ICategory[],
      };
    }
    case SET_SELECTED_CATEGORY:
      return {...state, selectedCategory: action.payload as ICategory};
    case SET_IS_LOADING_CATEGORIES:
      return {...state, isLoading: action.payload as boolean};
    case SET_IS_HARD_RELOADING_CATEGORIES:
      return {...state, hardReloading: action.payload as boolean};
    case SET_LOADING_CATEGORIES_ERROR:
      return {...state, loadingError: action.payload as string};
    case RESET_CATEGORIES:
      return initialState;
    default:
      return state;
  }
};

export default categoriesReducer;
