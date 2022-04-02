import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import ButtonLoader from '../../components/layout/ButtonLoader'
import { forgotPassword, clearErrors } from '../../redux/actions/userActions'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const alert = useAlert()

  const [email, setEmail] = useState('')

  const { message, loading, error } = useSelector(
    (state) => state.forgotPassword
  )

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (message) {
      alert.success(message)
    }
  }, [dispatch, error, router, alert, message])

  const submitHandler = (e) => {
    e.preventDefault()

    const userData = {
      email,
    }

    dispatch(forgotPassword(userData))
  }

  return (
    <div className='container-container-fluid'>
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={submitHandler}>
            <h1 className='mb-3'>Forgot Password</h1>
            <div className='form-group'>
              <label htmlFor='email_field'>Enter Email</label>
              <input
                type='email'
                id='email_field'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id='forgot_password_button'
              type='submit'
              className='btn btn-block py-3'
              disabled={loading}
            >
              {loading ? <ButtonLoader /> : 'Send Email'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
