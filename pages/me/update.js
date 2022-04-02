import React from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../../components/layout/Layout'
import UpdateProfile from '../../components/user/UpdateProfile'

export default function updateProfilePage() {
  return (
    <Layout title='Update User Profile'>
      <UpdateProfile />
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
