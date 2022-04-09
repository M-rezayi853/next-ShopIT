import cloudinary from 'cloudinary'

import Product from '../models/product'
import ErrorHandler from '../utils/errorHandler'
// import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import APIFeatures from '../utils/apiFeatures'

// Setting up cloudinay config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Create new product  =>  /api/admin/products/new
const newProduct = async (req, res, next) => {
  try {
    let images = []

    if (typeof req.body.images === 'string') {
      images.push(req.body.images)
    } else {
      images = req.body.images
    }

    let imagesLinks = []

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'shopit/products',
      })

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      })
    }

    req.body.images = imagesLinks
    req.body.user = req.user._id

    const product = await Product.create(req.body)

    res.status(201).json({
      success: true,
      product,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Get all products  =>  /api/products?keyword=apple
const getProducts = async (req, res, next) => {
  try {
    const resPerPage = 4
    const productsCount = await Product.countDocuments()

    const apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter()
      .filterRatings()
      .filterPrice()

    let products = await apiFeatures.query.clone()
    let filteredProductsCount = products.length

    apiFeatures.pagination(resPerPage)

    products = await apiFeatures.query

    res.status(200).json({
      success: true,
      productsCount,
      resPerPage,
      filteredProductsCount,
      products,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Get single product details  =>  /api/products/:id
const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id)

    if (!product) {
      return next(new ErrorHandler('محصول یافت نشد', 404))
    }

    res.status(200).json({
      success: true,
      product,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Update product  =>  /api/admin/products/:id
const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.query.id)

    if (!product) {
      return next(new ErrorHandler('محصول یافت نشد', 404))
    }

    let images = []

    if (typeof req.body.images === 'string') {
      images.push(req.body.images)
    } else {
      images = req.body.images
    }

    if (images !== undefined) {
      // Deleting images associated product
      for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
          product.images[i].public_id
        )
      }

      let imagesLinks = []

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: 'shopit/products',
        })

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        })
      }

      req.body.images = imagesLinks
    }

    product = await Product.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })

    res.status(200).json({
      success: true,
      product,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Delete product  =>  /api/admin/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id)

    if (!product) {
      return next(new ErrorHandler('محصول یافت نشد', 404))
    }

    // Deleting images associated product
    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      )
    }

    await product.remove()

    res.status(200).json({
      success: true,
      message: 'محصول حذف می شود',
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Create new review  =>  /api/reviews
const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.comment = comment
          review.rating = rating
        }
      })
    } else {
      product.reviews.push(review)
      product.numOfReviews = product.reviews.length
    }

    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Get product reviews  =>  /api/admin/reviews?id={productId}
const getProductReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id)

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Delete product review  =>  /api/asmin/reviews?id={id}&productId={productId}
const deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId)

    const reviews = product.reviews.filter(
      (review) => review._id.toString() !== req.query.id.toString()
    )

    const numOfReviews = reviews.length

    const ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      reviews.length

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    )

    res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// ADMIN controllers

// Get all products  =>  /api/admin/products
const getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find()

    res.status(200).json({
      success: true,
      products,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
}
