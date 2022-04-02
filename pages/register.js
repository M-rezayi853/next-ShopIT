import React from 'react'
import { getSession } from 'next-auth/client'

import Layout from '../components/layout/Layout'
import Register from '../components/auth/Register'

export default function register() {
  return (
    <Layout title='Register User'>
      <Register />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
