import React from 'react'
import Link from 'next/link'

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className='checkout-progress d-flex justify-content-center mt-5'>
      {shipping ? (
        <Link href={'/shipping'}>
          <a className='float-right'>
            <div className='triangle2-active'></div>
            <div className='step active-step'>Shipping</div>
            <div className='triangle-active'></div>
          </a>
        </Link>
      ) : (
        <Link href={'#!'}>
          <a disabled>
            <div className='triangle2-incomplete'></div>
            <div className='step incomplete'>Shipping</div>
            <div className='triangle-incomplete'></div>
          </a>
        </Link>
      )}

      {confirmOrder ? (
        <Link href={'/order/confirm'}>
          <a className='float-right'>
            <div className='triangle2-active'></div>
            <div className='step active-step'>Confirm Order</div>
            <div className='triangle-active'></div>
          </a>
        </Link>
      ) : (
        <Link href={'#!'}>
          <a disabled>
            <div className='triangle2-incomplete'></div>
            <div className='step incomplete'>Confirm Order</div>
            <div className='triangle-incomplete'></div>
          </a>
        </Link>
      )}

      {payment ? (
        <Link href={'/payment'}>
          <a className='float-right'>
            <div className='triangle2-active'></div>
            <div className='step active-step'>Payment</div>
            <div className='triangle-active'></div>
          </a>
        </Link>
      ) : (
        <Link href={'#!'}>
          <a disabled>
            <div className='triangle2-incomplete'></div>
            <div className='step incomplete'>Payment</div>
            <div className='triangle-incomplete'></div>
          </a>
        </Link>
      )}
    </div>
  )
}

export default CheckoutSteps
