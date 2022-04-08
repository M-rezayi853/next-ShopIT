import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { positions, transitions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import Header from './Header'
import Footer from './Footer'

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE,
}

const Layout = ({
  children,
  title = 'ShopIT - Complete Ecommerce Project',
  description = 'Complete ecommerce site using MERN',
}) => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AlertProvider template={AlertTemplate} {...options}>
        <Header />
        {children}

        {router.route.includes('/admin') ? '' : <Footer />}
      </AlertProvider>
    </div>
  )
}

export default Layout
