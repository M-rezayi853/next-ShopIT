import React, { useState, useEffect } from 'react'
import { getSession } from 'next-auth/client'
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import Layout from '../../components/layout/Layout'
import Payment from '../../components/cart/Payment'

export default function PaymentPage() {
  const [stripeApiKey, setStripeApiKey] = useState('')

  useEffect(() => {
    async function getStripeApiKey() {
      const { data } = await axios.get('/api/payment/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey()
  }, [])

  return (
    <>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Layout title='Payment'>
            <Payment />
          </Layout>
        </Elements>
      )}
    </>
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
