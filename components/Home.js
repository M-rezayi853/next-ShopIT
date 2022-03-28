import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import Product from './product/product'
import { clearErrors } from '../redux/actions/productActions'

const Home = () => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { products, productsCount, error } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, error, alert])

  return (
    <>
      <div className='container container-fluid'>
        <h1 id='products_heading'>Latest Products</h1>

        <section id='products' className='container mt-5'>
          <div className='row'>
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
