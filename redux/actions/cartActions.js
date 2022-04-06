import axios from 'axios'

import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_SHIPPING_INFO,
} from '../constants/cartConstants'

export const addItemToCart = (id, quantity) => async (dispatch) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  })
}

export const removeItemFromCart = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  })
}

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  })
}
