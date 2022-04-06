import React from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../components/layout/Layout'
import ListOrders from '../../components/order/ListOrders'

export default function ListOrdersPage() {
  return (
    <Layout title='List Orders'>
      <ListOrders />
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
