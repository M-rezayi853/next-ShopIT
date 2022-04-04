import React from 'react'

import Layout from '../../components/layout/Layout'
import ProductDetails from '../../components/product/ProductDetails'
import { getProductDetails } from '../../redux/actions/productActions'
import { wrapper } from '../../redux/store'

export default function ProductDetailsPage() {
  return (
    <Layout>
      <ProductDetails />
    </Layout>
  )
}

ProductDetailsPage.getInitialProps = wrapper.getInitialPageProps(
  (store) =>
    async ({ req, query }) => {
      await store.dispatch(getProductDetails(req, query.id))
    }
)

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req, params }) => {
//       await store.dispatch(getProductDetails(req, params.id))
//     }
// )
