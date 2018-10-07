import {
  CREATE_CATEGORY_SUCCESS,
  SET_CATEGORIES,
  CATEGORIES_LOADING,
  DELETE_CATEGORY_SUCCESS,
  CRETAE_CATEGORY_LOADING
} from '../sagas/types';

const INITIAL_STATE = {
  createCategorySuccess: false,
  createCategoryLoading: false,
  deleteCategorySuccess: false,
  categoryList: [],
  categoriesLoading: true
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
      case CREATE_CATEGORY_SUCCESS:
        return { ...state, createCategorySuccess: action.payload };
      case CRETAE_CATEGORY_LOADING: 
        return { ...state, createCategoryLoading: action.payload };
      case DELETE_CATEGORY_SUCCESS:
        return { ...state, deleteCategorySuccess: action.payload };
      case SET_CATEGORIES:
        return { ...state, categoryList: action.payload };
      case CATEGORIES_LOADING:
        return { ...state, categoriesLoading: action.payload };
      default:
       return state;
  }
}  