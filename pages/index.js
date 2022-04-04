import React from 'react'

import Home from '../components/Home'
import Layout from '../components/layout/Layout'
import { getProducts } from '../redux/actions/productActions'
import { wrapper } from '../redux/store'

export default function HomePage() {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

HomePage.getInitialProps = wrapper.getInitialPageProps(
  (store) =>
    async ({ req, query }) => {
      await store.dispatch(
        getProducts(
          req,
          query.page,
          query.keyword,
          query.minprice,
          query.maxprice,
          query.category,
          query.ratings
        )
      )
    }
)

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req, query }) => {
//       await store.dispatch(
//         getProducts(
//           req,
//           query.page,
//           query.keyword,
//           query.minprice,
//           query.maxprice,
//           query.category,
//           query.ratings
//         )
//       )
//     }
// )
