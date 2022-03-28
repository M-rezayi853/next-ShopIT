import React from 'react'

import Layout from '../../components/layout/Layout'
import ProductDetails from '../../components/product/ProductDetails'
import { getProductDetails } from '../../redux/actions/productActions'
import { wrapper } from '../../redux/store'

export default function productDetailsPage() {
  return (
    <Layout>
      <ProductDetails />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getProductDetails(req, params.id))
    }
)
