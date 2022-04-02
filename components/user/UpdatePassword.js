import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import ButtonLoader from '../../components/layout/ButtonLoader'
import { updatePassword, clearErrors } from '../../redux/actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../redux/constants/userConstants'

const UpdatePassword = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const alert = useAlert()

  const [user, setUser] = useState({
    oldPassword: '',
    password: '',
  })

  const { oldPassword, password } = user
  const { isUpdated, loading, error } = useSelector((state) => state.user)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      alert.success('Password updated successfully')

      setTimeout(() => {
        router.push('/me')
      }, 3000)

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      })
    }
  }, [dispatch, error, router, isUpdated, alert])

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const userData = {
      oldPassword,
      password,
    }

    dispatch(updatePassword(userData))
  }

  return (
    <div className='container-container-fluid'>
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={submitHandler}>
            <h1 className='mt-2 mb-5'>Update Password</h1>
            <div className='form-group'>
              <label htmlFor='old_password_field'>Old Password</label>
              <input
                type='password'
                id='old_password_field'
                className='form-control'
                name='oldPassword'
                value={oldPassword}
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='new_password_field'>New Password</label>
              <input
                type='password'
                id='new_password_field'
                className='form-control'
                name='password'
                value={password}
                onChange={onChange}
              />
            </div>

            <button
              type='submit'
              className='btn update-btn btn-block mt-4 mb-3 py-2'
              disabled={loading}
            >
              {loading ? <ButtonLoader /> : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdatePassword
