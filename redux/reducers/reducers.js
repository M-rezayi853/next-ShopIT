import { combineReducers } from 'redux'

import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productReducer,
} from './productReducers'
import {
  authReducer,
  loadedUserReducer,
  userReducer,
  forgotPasswordReducer,
} from './userReducer'
import { cartReducer } from './cartReducers'
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
} from './orderReducers'

const reducers = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  loadedUser: loadedUserReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
})

export default reducers
