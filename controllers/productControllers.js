import Product from '../models/product'
import ErrorHandler from '../utils/errorHandler'
// import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import APIFeatures from '../utils/apiFeatures'

// Create new product  =>  /api/admin/products/new
const newProduct = async (req, res, next) => {
  try {
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
    const resPerPage = 12
    const productsCount = await Product.countDocuments()

    const apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resPerPage)

    const products = await apiFeatures.query

    res.status(200).json({
      success: true,
      productsCount,
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

// Update product  =>  /api/admin/product/:id
const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.query.id)

    if (!product) {
      return next(new ErrorHandler('محصول یافت نشد', 404))
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

// Get product reviews  =>  /api/reviews
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

// Delete product review  =>  /api/reviews
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

export {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
}
