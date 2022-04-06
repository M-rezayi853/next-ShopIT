import React from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../components/layout/Layout'
import Shipping from '../../components/cart/Shipping'

export default function ShippingPage() {
  return (
    <Layout title='Shipping Info'>
      <Shipping />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/login?redirect=shipping',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
