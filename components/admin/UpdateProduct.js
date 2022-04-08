import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import ButtonLoader from '../layout/ButtonLoader'
import Sidebar from './Sidebar'
import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from '../../redux/actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../redux/constants/productConstants'

const UpdateProduct = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState(0)
  const [seller, setSeller] = useState('')

  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const [oldImages, setOldImages] = useState([])

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

  const alert = useAlert()
  const dispatch = useDispatch()
  const router = useRouter()

  const { product, error } = useSelector((state) => state.productDetails)
  const {
    isUpdated,
    loading,
    error: updateError,
  } = useSelector((state) => state.product)

  const productId = router.query.id

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails('', productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setDescription(product.description)
      setCategory(product.category)
      setStock(product.stock)
      setSeller(product.seller)
      setOldImages(product.images)
    }

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (updateError) {
      alert.error(updateError)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      alert.success('Product updated successfully')
      dispatch({ type: UPDATE_PRODUCT_RESET })

      setTimeout(() => {
        router.push('/admin/products')
      }, 3000)
    }
  }, [
    dispatch,
    error,
    alert,
    isUpdated,
    product,
    productId,
    router,
    updateError,
  ])

  const submitHandler = (e) => {
    e.preventDefault()

    const productData = {
      name,
      price,
      description,
      category,
      stock,
      seller,
    }

    if (images.length !== 0) productData.images = images

    dispatch(updateProduct(product._id, productData))
  }

  const onChange = (e) => {
    const files = Array.from(e.target.files)

    setImages([])
    setImagesPreview([])
    setOldImages([])

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result])
          setImagesPreview((oldArray) => [...oldArray, reader.result])
        }
      }

      reader.readAsDataURL(file)
    })
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
              <div className='wrapper my-5'>
                <form className='shadow-lg' onSubmit={submitHandler}>
                  <h1 className='mb-4'>Update Product</h1>

                  <div className='form-group'>
                    <label htmlFor='name_field'>Name</label>
                    <input
                      type='text'
                      id='name_field'
                      className='form-control'
                      name='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='price_field'>Price</label>
                    <input
                      type='text'
                      id='price_field'
                      className='form-control'
                      name='price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='description_field'>Description</label>
                    <textarea
                      className='form-control'
                      id='description_field'
                      rows='8'
                      name='description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className='form-group'>
                    <label htmlFor='category_field'>Category</label>
                    <select
                      className='form-control'
                      id='category_field'
                      name='category'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='stock_field'>Stock</label>
                    <input
                      type='number'
                      id='stock_field'
                      className='form-control'
                      name='stock'
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='seller_field'>Seller Name</label>
                    <input
                      type='text'
                      id='seller_field'
                      className='form-control'
                      name='seller'
                      value={seller}
                      onChange={(e) => setSeller(e.target.value)}
                    />
                  </div>

                  <div className='form-group'>
                    <label>Images</label>

                    <div className='custom-file'>
                      <input
                        type='file'
                        name='product_images'
                        className='custom-file-input'
                        id='customFile'
                        multiple
                        onChange={onChange}
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                        Choose Images
                      </label>
                    </div>

                    {oldImages &&
                      oldImages.map((img) => (
                        <Image
                          className='mt-3 mr-2'
                          src={img.url}
                          alt={img.url}
                          key={img.url}
                          width={55}
                          height={52}
                        />
                      ))}

                    {imagesPreview.map((img) => (
                      <Image
                        className='mt-3 mr-2'
                        src={img}
                        alt='Images Preview'
                        key={img}
                        width={55}
                        height={52}
                      />
                    ))}
                  </div>

                  <button
                    id='login_button'
                    type='submit'
                    className='btn btn-block py-3'
                    disabled={loading}
                  >
                    {loading ? <ButtonLoader /> : 'UPDATE'}
                  </button>
                </form>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  )
}

export default UpdateProduct
