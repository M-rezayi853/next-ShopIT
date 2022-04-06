import {
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  CLEAR_ERROR,
} from '../constants/productConstants'

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_SUCCESS:
      return {
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resPerPage: action.payload.resPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      }

    case ALL_PRODUCTS_FAIL:
      return {
        error: action.payload,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_SUCCESS:
      return {
        product: action.payload,
      }

    case PRODUCT_DETAILS_FAIL:
      return {
        error: action.payload,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      }

    case NEW_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}
