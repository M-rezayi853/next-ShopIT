import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Product = ({ product }) => {
  return (
    <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
      <div className='card p-3 rounded'>
        <div className='card-img-top mx-auto d-flex justify-content-center'>
          <Image
            src={product.images[0].url}
            alt={product.category}
            width={170}
            height={150}
          />
        </div>
        <div className='card-body d-flex flex-column'>
          <h5 className='card-title'>
            <Link href={`/product/${product._id}`}>
              <a>{product.name}</a>
            </Link>
          </h5>
          <div className='ratings mt-auto'>
            <div className='rating-outer'>
              <div
                className='rating-inner'
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id='no_of_reviews'>({product.numOfReviews} Reviews)</span>
          </div>
          <p className='card-text'>${product.price}</p>
          <Link href={`/product/${product._id}`}>
            <a id='view_btn' className='btn btn-block'>
              View Details
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Product
