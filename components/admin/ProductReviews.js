import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'

import Sidebar from './Sidebar'
import {
  getProductReviews,
  deleteReview,
  clearErrors,
} from '../../redux/actions/productActions'
import { DELETE_REVIEW_RESET } from '../../redux/constants/productConstants'

const ProductReviews = () => {
  const alert = useAlert()
  const dispatch = useDispatch()

  const [productId, setProductId] = useState('')

  const { reviews, error } = useSelector((state) => state.productReviews)
  const { isDeleted, error: deleteError } = useSelector((state) => state.review)

  useEffect(() => {
    if (productId !== '') {
      dispatch(getProductReviews(productId))
    }

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success('Review is deleted successfully')
      dispatch({ type: DELETE_REVIEW_RESET })
    }
  }, [dispatch, error, alert, productId, isDeleted, deleteError])

  const deleteReviewHandler = (id, productId) => {
    dispatch(deleteReview(id, productId))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(getProductReviews(productId))
  }

  const setReviewsHandler = () => {
    const data = {
      columns: [
        {
          label: 'Review ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc',
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc',
        },
        {
          label: 'User',
          field: 'user',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    }

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,
        actions: (
          <button
            className='btn btn-danger py-1 px-2 ml-2'
            onClick={() => deleteReviewHandler(review._id, productId)}
          >
            <i className='fa fa-trash'></i>
          </button>
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
            <div className='container container-fluid'>
              <div className='row justify-content-center mt-5'>
                <div className='col-5'>
                  <form onSubmit={submitHandler}>
                    <div className='form-group'>
                      <label htmlFor='productId_field'>Enter Product ID</label>
                      <input
                        type='text'
                        id='productId_field'
                        className='form-control'
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                      />
                    </div>

                    <button
                      id='search_button'
                      type='submit'
                      className='btn btn-primary btn-block py-2'
                    >
                      SEARCH
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {reviews && reviews.length > 0 ? (
              <>
                <MDBDataTable
                  data={setReviewsHandler()}
                  className='px-3'
                  bordered
                  striped
                  hover
                ></MDBDataTable>
              </>
            ) : (
              <p className='mt-5 text-center'>No Reviews</p>
            )}
          </>
        </div>
      </div>
    </>
  )
}

export default ProductReviews
