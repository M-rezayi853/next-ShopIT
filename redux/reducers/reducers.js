import { combineReducers } from 'redux'

import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from './productReducers'
import {
  authReducer,
  loadedUserReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from './userReducer'
import { cartReducer } from './cartReducers'
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderReducer,
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
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
})

export default reducers
