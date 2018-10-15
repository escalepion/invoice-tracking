import {
  CREATE_CATEGORY_SUCCESS,
  CREATE_INVOICE_SUCCESS,
  SET_CATEGORIES,
  CATEGORIES_LOADING,
  DELETE_CATEGORY_SUCCESS,
  CRETAE_CATEGORY_LOADING,
  CRETAE_INVOICE_LOADING,
  SET_FIELD_TEMPLATE,
  SET_INVOICES
} from '../sagas/types';

const INITIAL_STATE = {
  createCategorySuccess: false,
  createCategoryLoading: false,
  createInvoiceSuccess: false,
  createInvoiceLoading: false,
  deleteCategorySuccess: false,
  categoryList: [],
  invoiceList: [],
  fieldTemplate: [],
  categoriesLoading: true
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
      case CREATE_CATEGORY_SUCCESS:
        return { ...state, createCategorySuccess: action.payload };
      case CREATE_INVOICE_SUCCESS:
        return { ...state, createInvoiceSuccess: action.payload };
      case CRETAE_CATEGORY_LOADING: 
        return { ...state, createCategoryLoading: action.payload };
      case CRETAE_INVOICE_LOADING: 
        return { ...state, createInvoiceLoading: action.payload };
      case DELETE_CATEGORY_SUCCESS:
        return { ...state, deleteCategorySuccess: action.payload };
      case SET_CATEGORIES:
        return { ...state, categoryList: action.payload };
      case SET_INVOICES:
        return { ...state, invoiceList: action.payload };
      case SET_FIELD_TEMPLATE: 
        return { ...state, fieldTemplate: action.payload };
      case CATEGORIES_LOADING:
        return { ...state, categoriesLoading: action.payload };
      default:
       return state;
  }
}  