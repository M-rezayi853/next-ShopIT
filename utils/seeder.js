const mongoose = require('mongoose')

const Product = require('../models/product')
const products = require('../data/products.json')

mongoose.connect(
  'mongodb+srv://mh77-1234:mh77-1234@cluster0.24y80.mongodb.net/shopit?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

const seedProducts = async () => {
  try {
    await Product.deleteMany()
    console.log('محصولات حذف می شوند')

    await Product.insertMany(products)
    console.log('همه محصولات اضافه شده است')

    process.exit()
  } catch (error) {
    console.log(error.message)
    process.exit()
  }
}

seedProducts()
