import { combineReducers } from 'redux'

import { productsReducer, productDetailsReducer } from './productReducers'
import {
  authReducer,
  loadedUserReducer,
  userReducer,
  forgotPasswordReducer,
} from './userReducer'
import { cartReducer } from './cartReducers'
import { newOrderReducer } from './orderReducers'

const reducers = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  loadedUser: loadedUserReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
})

export default reducers
