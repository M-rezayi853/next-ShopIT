import React from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../../components/layout/Layout'
import UpdateUser from '../../../components/admin/UpdateUser'

export default function UpdateUserPage() {
  return (
    <Layout title='Update User - Admin'>
      <UpdateUser />
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
