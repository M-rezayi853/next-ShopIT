import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'

import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import {
  allOrders,
  deleteOrder,
  clearErrors,
} from '../../redux/actions/orderActions'
import { DELETE_ORDER_RESET } from '../../redux/constants/orderConstants'

const OrdersList = () => {
  const alert = useAlert()
  const dispatch = useDispatch()

  const { orders, loading, error } = useSelector((state) => state.allOrders)
  const { isDeleted } = useSelector((state) => state.order)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success('Order is deleted successfully')
      dispatch({ type: DELETE_ORDER_RESET })
    }

    dispatch(allOrders())
  }, [dispatch, error, alert, isDeleted])

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
  }

  const setOrdersHandler = () => {
    const data = {
      columns: [
        {
          label: 'Order ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'No of Items',
          field: 'numofItems',
          sort: 'asc',
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc',
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    }

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numofItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes('Delivered') ? (
            <p style={{ color: 'green' }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: 'red' }}>{order.orderStatus}</p>
          ),
        actions: (
          <>
            <Link href={`/admin/orders/${order._id}`}>
              <a className='btn btn-primary py-1 px-2'>
                <i className='fa fa-eye'></i>
              </a>
            </Link>

            <button
              className='btn btn-danger py-1 px-2 ml-2'
              onClick={() => deleteOrderHandler(order._id)}
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
            <h1 className='my-5'>All Orders</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrdersHandler()}
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

export default OrdersList
