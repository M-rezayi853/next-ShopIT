import Product from '../models/product'

// Create new product  =>  /api/admin/products/new
const newProduct = async (req, res, next) => {
  const product = await Product.create(req.body)

  res.status(201).json({
    success: true,
    product,
  })
}

// Get all products  =>  /api/products
const getProducts = async (req, res, next) => {
  const products = await Product.find()

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  })
}

// Get single product details  =>  /api/products/:id
const getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.query.id)

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'محصول یافت نشد',
    })
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
    return res.status(404).json({
      success: false,
      message: 'محصول یافت نشد',
    })
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
    return res.status(404).json({
      success: false,
      message: 'محصول یافت نشد',
    })
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
