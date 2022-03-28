import axios from 'axios'
import absoluteUrl from 'next-absolute-url'

import {
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERROR,
} from '../constants/productConstants'

export const getProducts = (req) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req)

    const url = `${origin}/api/products`

    const { data } = await axios.get(url)

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const getProductDetails = (req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req)

    let url

    if (req) {
      url = `${origin}/api/products/${id}`
    } else {
      url = `/api/products/${id}`
    }

    const { data } = await axios.get(url)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  })
}
