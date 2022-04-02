import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSelector } from 'react-redux'

import Loader from '../layout/Loader'

const Profile = () => {
  const { user, loading } = useSelector((state) => state.loadedUser)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='container container-fluid'>
            <h2 className='mt-5 ml-5'>My Profile</h2>
            <div className='row justify-content-around mt-5 user-info'>
              <div className='col-12 col-md-3'>
                <figure className='avatar avatar-profile'>
                  {/* <div className='rounded-circle img-fluid'> */}
                  <Image
                    src={user && user.avatar.url}
                    alt={user && user.name}
                    className='rounded-circle img-fluid'
                    width={260}
                    height={260}
                  />
                  {/* </div> */}
                </figure>
                <Link href={'/me/update'}>
                  <a
                    id='edit_profile'
                    className='btn btn-primary btn-block my-5'
                  >
                    Edit Profile
                  </a>
                </Link>
              </div>

              <div className='col-12 col-md-5'>
                <h4>Full Name</h4>
                <p>{user && user.name}</p>

                <h4>Email Address</h4>
                <p>{user && user.email}</p>

                <h4>Joined On</h4>
                <p>{String(user && user.createdAt).substring(0, 10)}</p>

                {user && user.role !== 'ادمین' && (
                  <Link href={'/orders/me'}>
                    <a className='btn btn-danger btn-block mt-5'>My Orders</a>
                  </Link>
                )}

                <Link href={'/password/update'}>
                  <a className='btn btn-primary btn-block mt-3'>
                    Change Password
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Profile
