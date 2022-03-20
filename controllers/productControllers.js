import Product from '../models/product'
import ErrorHandler from '../utils/errorHandler'
// import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import APIFeatures from '../utils/apiFeatures'

// Create new product  =>  /api/admin/products/new
const newProduct = async (req, res, next) => {
  const product = await Product.create(req.body)

  res.status(201).json({
    success: true,
    product,
  })
}

// Get all products  =>  /api/products?keyword=apple
const getProducts = async (req, res, next) => {
  const resPerPage = 4
  const productCount = await Product.countDocuments()

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage)

  const products = await apiFeatures.query

  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    products,
  })
}

// Get single product details  =>  /api/products/:id
const getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.query.id)

  if (!product) {
    return next(new ErrorHandler('محصول یافت نشد', 404))
  }

  res.status(200).json({
    success: true,
    product,
  })
}

// Update product  =>  /api/admin/product/:id
const updateProduct = async (req, res, next) => {
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
}

// Delete product  =>  /api/admin/products/:id
const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.query.id)

  if (!product) {
    return next(new ErrorHandler('محصول یافت نشد', 404))
  }

  await product.remove()

  res.status(200).json({
    success: true,
    message: 'محصول حذف می شود',
  })
}

export {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
