import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'

import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import {
  allUsers,
  deleteUser,
  clearErrors,
} from '../../redux/actions/userActions'
import { DELETE_USER_RESET } from '../../redux/constants/userConstants'

const UsersList = () => {
  const alert = useAlert()
  const dispatch = useDispatch()

  const { users, loading, error } = useSelector((state) => state.allUsers)
  const { isDeleted } = useSelector((state) => state.user)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success('Order is deleted successfully')
      dispatch({ type: DELETE_USER_RESET })
    }

    dispatch(allUsers())
  }, [dispatch, error, alert, isDeleted])

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
  }

  const setUsersHandler = () => {
    const data = {
      columns: [
        {
          label: 'User ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
        },
        {
          label: 'Role',
          field: 'role',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    }

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <>
            <Link href={`/admin/users/${user._id}`}>
              <a className='btn btn-primary py-1 px-2'>
                <i className='fa fa-pencil'></i>
              </a>
            </Link>

            <button
              className='btn btn-danger py-1 px-2 ml-2'
              onClick={() => deleteUserHandler(user._id)}
            >
              <i className='fa fa-trash'></i>
            </button>
          </>
        ),
      })
    })

    return data
  }

  return (
    <>
      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>

        <div className='col-12 col-md-10'>
          <>
            <h1 className='my-5'>All Users</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setUsersHandler()}
                className='px-3'
                bordered
                striped
                hover
              ></MDBDataTable>
            )}
          </>
        </div>
      </div>
    </>
  )
}

export default UsersList
