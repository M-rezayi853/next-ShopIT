import React from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../../components/layout/Layout'
import OrdersList from '../../../components/admin/OrdersList'

export default function OrdersListPage() {
  return (
    <Layout title='Orders List - Admin'>
      <OrdersList />
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
