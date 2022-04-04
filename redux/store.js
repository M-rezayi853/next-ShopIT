import { createStore, applyMiddleware } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
// const storage = require('redux-persist/lib/storage').default
import storage from './sync_storage'

import reducers from './reducers/reducers'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware)
}

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }

    return nextState
  } else {
    return reducers(state, action)
  }
}

const makeStore = ({ isServer }) => {
  if (isServer) {
    // If it's on server side, create a store
    return createStore(reducer, bindMiddleware([thunkMiddleware]))
  } else {
    // If it's on client side, create a store which will persist
    const { persistStore, persistReducer } = require('redux-persist')

    const persistConfig = {
      key: 'nextjs',
      whitelist: ['cart'],
      storage,
    }

    // Create a new reducer with our existing reducer
    const persistedReducer = persistReducer(persistConfig, reducer)

    // Creating the store again
    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    )

    // This creates a persistor object & push that persisted object to .__persistor,
    // so that we can avail the persistability feature
    store.__persistor = persistStore(store)

    return store
  }
}

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore)
