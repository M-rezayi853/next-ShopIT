const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'لطفا نام محصول را وارد کنید'],
    trim: true,
    maxLength: [100, 'نام محصول نباید بیش از 100 کاراکتر باشد'],
  },
  price: {
    type: Number,
    required: [true, 'لطفا نام محصول را وارد کنید'],
    maxLength: [5, 'نام محصول نباید بیش از 5 کاراکتر باشد'],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, 'لطفا توضیحات محصول را وارد کنید'],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'لطفا دسته بندی این محصول را انتخاب کنید'],
    enum: {
      values: [
        'الکترونیک',
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
      ],
      message: 'لطفا دسته بندی درست را برای محصول انتخاب کنید',
    },
  },
  seller: {
    type: String,
    required: [true, 'لطفا فروشنده محصول را وارد کنید'],
  },
  stock: {
    type: Number,
    required: [true, 'لطفا موجودی محصول را وارد کنید'],
    maxLength: [5, 'موجودی محصول نمی تواند بیش از 5 کاراکتر باشد'],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports =
  mongoose.models.Product || mongoose.model('Product', productSchema)
