import React from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../../components/layout/Layout'
import ProductReviews from '../../../components/admin/ProductReviews'

export default function ProductReviewsPage() {
  return (
    <Layout title='Product Reviews - Admin'>
      <ProductReviews />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session || session.user.role !== 'ادمین') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
