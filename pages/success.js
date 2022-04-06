import React from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../components/layout/Layout'
import OrderSuccess from '../components/cart/OrderSuccess'

export default function OrderSuccessPage() {
  return (
    <Layout title='Order Success'>
      <OrderSuccess />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session) {
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
