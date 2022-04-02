import React from 'react'

import Layout from '../../components/layout/Layout'
import ForgotPassword from '../../components/user/ForgotPassword'

export default function forgotPasswordPage() {
  return (
    <Layout title='Forgot User Password'>
      <ForgotPassword />
    </Layout>
  )
}
