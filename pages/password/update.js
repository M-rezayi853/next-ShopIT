import React from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../components/layout/Layout'
import UpdatePassword from '../../components/user/UpdatePassword'

export default function updatePasswordPage() {
  return (
    <Layout title='Update User Password'>
      <UpdatePassword />
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
