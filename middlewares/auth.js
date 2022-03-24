import { getSession } from 'next-auth/client'

import ErrorHandler from '../utils/errorHandler'

// Checks if user is authenticated or not
const isAuthenticatedUser = async (req, res, next) => {
  try {
    const session = await getSession({ req })

    if (!session) {
      return next(
        new ErrorHandler(
          'برای دسترسی به این منبع ابتدا وارد حساب خود شوید',
          401
        )
      )
    }

    req.user = session.user
    next()
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// Handle users roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `نقش (${req.user.role}) اجازه دسترسی به این منبع را ندارد`,
          403
        )
      )
    }
    next()
  }
}

export { isAuthenticatedUser, authorizeRoles }
