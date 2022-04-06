import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const OrderSuccess = () => {
  return (
    <>
      <div className='container container-fluid'>
        <div className='row justify-content-center'>
          <div className='col-6 mt-5 text-center'>
            <Image
              className='my-8 img-fluid d-block mx-auto'
              src='/images/order_success.png'
              alt='Order Success'
              width={200}
              height={200}
            />

            <h2 className='mt-5'>Your Order has been placed successfully.</h2>

            <Link href='/order/me'>
              <a>Go to Orders</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderSuccess
