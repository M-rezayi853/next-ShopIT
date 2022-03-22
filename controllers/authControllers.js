import User from '../models/user'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncError from '../middlewares/catchAsyncErrors'
import sendToken from '../utils/jwtToken'

// Register a user  =>  /api/auth/register
const registerUser = async (req, res, next) => {
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

  sendToken(user, 200, res)
}

// Login user  =>  /api/auth/login
const loginUser = async (req, res, next) => {
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

  // sendToken(user, 200, res)

  // Create jwt token
  const token = user.getJwtToken()

  // Options for cookie
  const options = {
    domain: '127.0.0.1:3000',
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  // res.status(200).cookie('token', token, options).json({
  //   success: true,
  //   token,
  //   user,
  // })

  res.status(200).json({
    success: true,
    token,
    user,
  })
}

export { registerUser, loginUser }
