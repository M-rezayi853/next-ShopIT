import React from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../../components/layout/Layout'
import ProcessOrder from '../../../components/admin/ProcessOrder'

export default function ProcessOrderPage() {
  return (
    <Layout>
      <ProcessOrder />
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
