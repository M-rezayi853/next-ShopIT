import { getSession } from 'next-auth/client'

import Login from '../components/auth/Login'
import Layout from '../components/layout/Layout'

export default function LoginPage() {
  return (
    <Layout title='Login User'>
      <Login />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  const redirect = context.query.redirect ? context.query.redirect : '/'

  if (session) {
    return {
      redirect: {
        destination: redirect,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
