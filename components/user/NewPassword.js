import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import ButtonLoader from '../../components/layout/ButtonLoader'
import { resetPassword, clearErrors } from '../../redux/actions/userActions'

const NewPassword = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const alert = useAlert()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { success, loading, error } = useSelector(
    (state) => state.forgotPassword
  )

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (success) {
      alert.success('Password updated successfully')
      router.push('/login')
    }
  }, [dispatch, error, router, alert, success])

  const submitHandler = (e) => {
    e.preventDefault()

    const passwords = {
      password,
      confirmPassword,
    }

    dispatch(resetPassword(router.query.token, passwords))
  }

  return (
    <div className='container-container-fluid'>
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={submitHandler}>
            <h1 className='mb-3'>New Password</h1>

            <div className='form-group'>
              <label htmlFor='password_field'>Password</label>
              <input
                type='password'
                id='password_field'
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='confirm_password_field'>Confirm Password</label>
              <input
                type='password'
                id='confirm_password_field'
                className='form-control'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id='new_password_button'
              type='submit'
              className='btn btn-block py-3'
              disabled={loading}
            >
              {loading ? <ButtonLoader /> : 'Set Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewPassword
