import absoluteUrl from 'next-absolute-url'
import crypto from 'crypto'
import cloudinary from 'cloudinary'

import User from '../models/user'
import ErrorHandler from '../utils/errorHandler'
// import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import sendEmail from '../utils/sendEmail'

// Setting up cloudinay config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Register a user  =>  /api/auth/register
const registerUser = async (req, res, next) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'shopit/avatars',
      width: '150',
      crop: 'scale',
    })

    const { name, email, password } = req.body

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
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
// const loginUser = async (req, res, next) => {
//   try {
//     const { email, password } = req.body

//     // Checks if email and password is entered by user
//     if (!email || !password) {
//       return next(new ErrorHandler('لطفا ایمیل و رمز عبور را وارد کنید', 400))
//     }

//     // Finding user in database
//     const user = await User.findOne({ email }).select('+password')

//     if (!user) {
//       return next(new ErrorHandler('ایمیل یا رمز عبور نامعتبر است', 401))
//     }

//     // Checks if password is correct or not
//     const isPasswordMatched = await user.comparePassword(password)

//     if (!isPasswordMatched) {
//       return next(new ErrorHandler('ایمیل یا رمز عبور نامعتبر است', 401))
//     }

//     res.status(200).json({
//       success: true,
//       message: 'حساب با موفقیت وارد شد',
//     })
//   } catch (error) {
//     console.log(error)
//     throw new Error(error)
//   }
// }

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
    const resetUrl = `${origin}/password/reset/${resetToken}`

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

// Get currently logged in user details  =>  /api/me
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Update / change password  =>  /api/password/update
const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+password')

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)

    if (!isMatched) {
      return next(new ErrorHandler('رمز عبور قدیمی اشتباه است', 400))
    }

    user.password = req.body.password
    await user.save()

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Update user profile   =>  /api/me/update
const updateProfile = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    }

    // Update avatar: TODO:
    if (req.body.avatar !== '') {
      const user = await User.findById(req.user._id)

      const image_id = user.avatar.public_id

      // Delete user previous images/avatar
      await cloudinary.v2.uploader.destroy(image_id)

      const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'shopit/avatars',
        width: '150',
        crop: 'scale',
      })

      newUserData.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      }
    }

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })

    res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Admin routes

// Get all users  =>  /api/admin/users
const allUsers = async (req, res, next) => {
  try {
    const users = await User.find()

    res.status(200).json({
      success: true,
      users,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Get user details  =>  /api/admin/users/:id
const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.query.id)

    if (!user) {
      return next(
        new ErrorHandler(`کاربر با شناسه پیدا نشد: ${req.query.id}`, 404)
      )
    }

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Update user  =>  /api/admin/users/:id
const updateUser = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.query.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })

    res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Delete user  =>  /api/admin/users/:id
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.query.id)

    if (!user) {
      return next(
        new ErrorHandler(`کاربر با شناسه پیدا نشد: ${req.query.id}`, 404)
      )
    }

    // Remove avatar from cloudinary
    const image_id = user.avatar.public_id
    await cloudinary.v2.uploader.destroy(image_id)

    await user.remove()

    res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export {
  registerUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
}
