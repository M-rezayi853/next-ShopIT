import React from 'react'
import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

const Layout = ({
  children,
  title = 'ShopIT - Complete Ecommerce Project',
  description = 'Complete ecommerce site using MERN',
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
