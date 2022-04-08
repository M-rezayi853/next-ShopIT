import React from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../components/layout/Layout'
import Dashboard from '../../components/admin/Dashboard'

export default function DashboardPage() {
  return (
    <Layout title='Dashboard - Admin'>
      <Dashboard />
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
