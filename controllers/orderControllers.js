import Order from '../models/order'
import Product from '../models/product'
import ErrorHandler from '../utils/errorHandler'
// import catchAsyncErrors from '../middlewares/catchAsyncErrors'

// Create a new order  =>  /api/orders/new
const newOrder = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
    } = req.body

    const order = await Order.create({
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
      paidAt: Date.now(),
      user: req.user._id,
    })

    res.status(200).json({
      success: true,
      order,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Get single order  =>  /api/orders/:id
const getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.query.id).populate(
      'user',
      'name email'
    )

    if (!order) {
      return next(new ErrorHandler('هیچ سفارشی با این شناسه یافت نشد', 404))
    }

    res.status(200).json({
      success: true,
      order,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Get logged in user orders  =>  /api/orders/me
const myOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })

    res.status(200).json({
      success: true,
      orders,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Get all orders - ADMIN  =>  /api/admin/orders
const allOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()

    let totalAmount = 0

    orders.forEach((order) => {
      totalAmount += order.totalPrice
    })

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Update / Process order - ADMIN  =>  /api/admin/orders/:id
const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.query.id)

    if (order.orderStatus === 'تحویل داده شده') {
      return next(
        new ErrorHandler('شما قبلاً این سفارش را تحویل داده اید', 400)
      )
    }

    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

async function updateStock(id, quantity) {
  const product = await Product.findById(id)

  product.stock = product.stock - quantity

  await product.save({ validateBeforeSave: false })
}

// Delete order  =>  /api/orders/:id
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.query.id)

    if (!order) {
      return next(new ErrorHandler('هیچ سفارشی با این شناسه یافت نشد', 404))
    }

    await order.remove()

    res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export {
  newOrder,
  getSingleOrder,
  myOrder,
  allOrders,
  updateOrder,
  deleteOrder,
}
