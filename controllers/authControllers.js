import absoluteUrl from 'next-absolute-url'
import crypto from 'crypto'

import User from '../models/user'
import ErrorHandler from '../utils/errorHandler'
// import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import sendEmail from '../utils/sendEmail'

// Register a user  =>  /api/auth/register
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: 'products/dsvbpny402gelwugv2le',
        url: 'https://res.cloudinary.com/bookit/image/upload/v1608062030/products/dsvbpny402gelwugv2le.jpg',
      },
    })

    res.status(200).json({
      success: true,
      message: 'حساب باموفقیت ثبت شد',
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Login user  =>  /api/auth/login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Checks if email and password is entered by user
    if (!email || !password) {
      return next(new ErrorHandler('لطفا ایمیل و رمز عبور را وارد کنید', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return next(new ErrorHandler('ایمیل یا رمز عبور نامعتبر است', 401))
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
      return next(new ErrorHandler('ایمیل یا رمز عبور نامعتبر است', 401))
    }

    res.status(200).json({
      success: true,
      message: 'حساب با موفقیت وارد شد',
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Forgot password  =>  /api/password/forgot
const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return next(new ErrorHandler('کاربر با این ایمیل پیدا نشد', 404))
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    // Get origin
    const { origin } = absoluteUrl(req)

    // Create reset password url
    const resetUrl = `${origin}/api/password/reset/${resetToken}`

    const message = `رمز بازنشانی رمز عبور شما به شرح زیر است: \n\n${resetUrl}\n\n اگر این ایمیل را درخواست نکرده اید، آن را نادیده بگیرید.`

    try {
      await sendEmail({
        email: user.email,
        subject: 'بازیابی رمز عبور ShopIT',
        message,
      })

      res.status(200).json({
        success: true,
        message: `ایمیل ارسال شده به: ${user.email}`,
      })
    } catch (err) {
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      await user.save({ validateBeforeSave: false })

      return next(new ErrorHandler(err.message, 500))
    }
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Reset password  =>  /api/password/reset/:token
const resetPassword = async (req, res, next) => {
  try {
    // Hash URL token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.query.token)
      .digest('hex')

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
      return next(
        new ErrorHandler(
          'رمز بازنشانی رمز عبور نامعتبر است یا منقضی شده است',
          400
        )
      )
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler('رمز عبور مطابقت ندارد', 400))
    }

    // Setup new password
    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(200).json({
      success: true,
      message: 'رمز عبور با موفقیت به روز شد',
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export { registerUser, loginUser, forgotPassword, resetPassword }
