import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'

import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import {
  getAdminProducts,
  deleteProduct,
  clearErrors,
} from '../../redux/actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../redux/constants/productConstants'

const ProductsList = () => {
  const alert = useAlert()
  const dispatch = useDispatch()

  const { products, loading, error } = useSelector((state) => state.products)
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.product
  )

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success('Product is deleted successfully')
      dispatch({ type: DELETE_PRODUCT_RESET })

      // setTimeout(() => {
      //   router.push('/admin/products')
      // }, 3000)
    }

    dispatch(getAdminProducts())
  }, [dispatch, error, alert, isDeleted, deleteError])

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
  }

  const setProductsHandler = () => {
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Stock',
          field: 'stock',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    }

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <>
            <Link href={`/admin/products/${product._id}`}>
              <a className='btn btn-primary py-1 px-2'>
                <i className='fa fa-pencil'></i>
              </a>
            </Link>

            <button
              className='btn btn-danger py-1 px-2 ml-2'
              onClick={() => deleteProductHandler(product._id)}
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
            <h1 className='my-5'>All Products</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProductsHandler()}
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

export default ProductsList
