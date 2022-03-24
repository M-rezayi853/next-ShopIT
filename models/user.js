import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

import ErrorHandler from '../utils/errorHandler'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'لطفا نام خود را وارد کنید'],
    maxLength: [30, 'نام شما نمی تواند بیش از 30 کاراکتر باشد'],
  },
  email: {
    type: String,
    required: [true, 'لطفا آدرس اییمیل خود را وارد نمایید'],
    unique: true,
    validate: [validator.isEmail, 'لطفا آدرس ایمیل معتبر وارد کنید'],
  },
  password: {
    type: String,
    required: [true, 'لطفا رمز عبور خود را وارد کنید'],
    minLength: [6, 'رمز عبور شما باید بیشتر از 6 کاراکتر باشد'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: 'کاربر',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

  return resetToken
}

// Handling mongoose duplicate key errors
userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    return next(new ErrorHandler(`تکراری ${this.email} وارد شد`, 400))
  } else {
    next()
  }
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
