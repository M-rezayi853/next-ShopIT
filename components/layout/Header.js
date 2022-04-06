import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'next-auth/client'

import Search from '../Search'
import { loadUser } from '../../redux/actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const { user, loading } = useSelector((state) => state.loadedUser)
  const { cartItems } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  const logoutHandler = () => {
    signOut()
  }

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

        <div className='col-12 col-md-3 mt-4 mt-md-0 text-center d-flex'>
          <Link href={'/cart'}>
            <a
              className='d-flex align-items-center'
              style={{ textDecoration: 'none' }}
            >
              <span id='cart' className='ml-3'>
                Cart
              </span>
              <span className='ml-1' id='cart_count'>
                {cartItems.length}
              </span>
            </a>
          </Link>

          {user ? (
            <div className='ml-4 dropdown d-line'>
              <a
                className='btn dropdown-toggle mr-4 d-flex align-items-center text-white'
                id='dropDownMunuButton'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <figure className='avatar avatar-nav'>
                  <Image
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    width={150}
                    height={150}
                    className='rounded-circle'
                  />
                </figure>
                <span>{user && user.name}</span>
              </a>

              <div
                className='dropdown-menu'
                aria-labelledby='dropDownMunuButton'
              >
                {user.role === 'ادمین' && (
                  <>
                    <Link href={'/admin/dashboard'}>
                      <a className='dropdown-item'>Dashboard</a>
                    </Link>
                    <hr />
                  </>
                )}

                <Link href={'/order/me'}>
                  <a className='dropdown-item'>Orders</a>
                </Link>

                <Link href={'/me'}>
                  <a className='dropdown-item'>Profile</a>
                </Link>

                <Link href={'/'}>
                  <a
                    className='dropdown-item text-danger'
                    onClick={logoutHandler}
                  >
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href={'/login'}>
                <a>
                  <button className='btn ml-4' id='login_btn'>
                    Login
                  </button>
                </a>
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  )
}

export default Header
