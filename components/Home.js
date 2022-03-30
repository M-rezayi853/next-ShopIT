import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'

import Product from './product/product'
import { clearErrors } from '../redux/actions/productActions'
import 'rc-slider/assets/index.css'

const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)

const Home = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const router = useRouter()

  const [price, setPrice] = useState([1, 1000])
  let { page = 1, keyword, ratings } = router.query
  page = Number(page)

  const categories = [
    'Electronics',
    'دوربین',
    'لپ تاپ',
    'تجهیزات جانبی',
    'هدفون',
    'غذا',
    'کتاب',
    'لباس/کفش',
    'زیبایی و سلامت',
    'ورزش',
    'در فضای باز',
    'خانه',
  ]

  let link = `/?page=${page}&keyword=${keyword}`
  if (price) link = link.concat(`&minprice=${price[0]}&maxprice=${price[1]}`)

  const { products, productsCount, resPerPage, filteredProductsCount, error } =
    useSelector((state) => state.products)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, error, alert])

  const handlePagination = (pageNumber) => {
    // window.location.href = `/?page=${pageNumber}`

    // let link = `/?page=${pageNumber}`
    const link = `/?page=${pageNumber}&ratings=${ratings}`
    router.push(link)
  }

  const handleCategory = (categ) => {
    link = link.concat(`&category=${categ}`)
    router.push(link)
  }

  const handleRating = (starRating) => {
    const link = `/?page=${page}&ratings=${starRating}`
    router.push(link)
  }

  let count = productsCount
  if (keyword || ratings) {
    count = filteredProductsCount
  }

  return (
    <>
      <div className='container container-fluid'>
        <h1 id='products_heading'>Latest Products</h1>

        <section id='products' className='container mt-5'>
          <div className='row'>
            {keyword || ratings ? (
              <>
                <div className='col-6 col-md-3 mt-5 mb-5'>
                  <div className='px-5'>
                    <Range
                      marks={{
                        1: `$1`,
                        1000: `$1000`,
                      }}
                      min={1}
                      max={1000}
                      defaultValue={[1, 1000]}
                      tipFormatter={(value) => `$${value}`}
                      tipProps={{
                        placement: 'top',
                        visible: true,
                      }}
                      value={price}
                      onChange={(price) => {
                        setPrice(price)
                        router.push(link)
                      }}
                    />

                    <hr className='my-5' />

                    <div className='mt-5'>
                      <h4 className='mb-3'>Categories</h4>

                      <ul className='pl-0'>
                        {categories.map((cate) => (
                          <li
                            key={cate}
                            style={{ cursor: 'pointer', listStyleType: 'none' }}
                            onClick={() => handleCategory(cate)}
                          >
                            {cate}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <hr className='my-3' />

                    <div className='mt-5'>
                      <h4 className='mb-3'>Ratings</h4>

                      <ul className='pl-0'>
                        {[5, 4, 3, 2, 1].map((star) => (
                          <li
                            key={star}
                            style={{ cursor: 'pointer', listStyleType: 'none' }}
                            onClick={() => handleRating(star)}
                          >
                            <div className='rating-outer'>
                              <div
                                className='rating-inner'
                                style={{ width: `${star * 20}%` }}
                              ></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='col-6 col-md-9'>
                  <div className='row'>
                    {products &&
                      products.map((product) => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} col={3} />
                  ))}
              </>
            )}
          </div>
        </section>

        {resPerPage < count && (
          <div className='d-flex justify-content-center mt-5'>
            <Pagination
              activePage={page}
              itemsCountPerPage={resPerPage}
              totalItemsCount={count}
              onChange={handlePagination}
              nextPageText={'Next'}
              prevPageText={'Prev'}
              firstPageText={'First'}
              lastPageText={'Last'}
              itemClass='page-item'
              linkClass='page-link'
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Home
