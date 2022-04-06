import React from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../components/layout/Layout'
import OrderDetails from '../../components/order/OrderDetails'

export default function OrderDetailsPage() {
  return (
    <Layout title='Order Details'>
      <OrderDetails />
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
