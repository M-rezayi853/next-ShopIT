import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Search from '../Search'

const Header = () => {
  const { push } = useRouter()

  return (
    <>
      <nav className='navbar row'>
        <div className='col-12 col-md-3'>
          <div className='navbar-brand' style={{ cursor: 'pointer' }}>
            <Link href={'/'}>
              <a>
                <Image
                  src='/images/logo.png'
                  alt='img'
                  width={150}
                  height={35}
                />
              </a>
            </Link>
          </div>
        </div>

        <div className='col-12 col-md-6 mt-2 mt-md-0'>
          <Search />
        </div>

        <div className='col-12 col-md-3 mt-4 mt-md-0 text-center'>
          <button className='btn' id='login_btn'>
            Login
          </button>

          <span id='cart' className='ml-3'>
            Cart
          </span>
          <span className='ml-1' id='cart_count'>
            2
          </span>
        </div>
      </nav>
    </>
  )
}

export default Header
