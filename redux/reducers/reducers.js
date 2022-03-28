import { combineReducers } from 'redux'

import { productsReducer, productDetailsReducer } from './productReducers'

const reducers = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
})

export default reducers
