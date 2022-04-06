import axios from 'axios'
import absoluteUrl from 'next-absolute-url'

import {
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  CLEAR_ERROR,
} from '../constants/productConstants'

export const getProducts =
  (
    req,
    currentPage = 1,
    keyword = '',
    minprice,
    maxprice,
    category,
    ratings = 0
  ) =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req)

      let link = `${origin}/api/products?page=${currentPage}&keyword=${keyword}`

      if (minprice || maxprice)
        link = link.concat(`&minprice=${minprice}&maxprice=${maxprice}`)

      if (category) link = link.concat(`&category=${category}`)

      if (ratings) link = link.concat(`&ratings=${ratings}`)

      const { data } = await axios.get(link)

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

export const newReview = (newReviewData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put('/api/reviews', newReviewData, config)

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
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
