import React from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../components/layout/Layout'
import ConfirmOrder from '../../components/cart/ConfirmOrder'

export default function ConfirmOrderPage() {
  return (
    <Layout title='Confirm Order'>
      <ConfirmOrder />
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
