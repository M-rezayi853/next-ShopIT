import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { wrapper } from '../redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state)

  return typeof window ? (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <Component {...pageProps} />
    </PersistGate>
  ) : (
    <PersistGate persistor={store}>
      <Component {...pageProps} />
    </PersistGate>
  )
}

export default wrapper.withRedux(MyApp)
