import nc from 'next-connect'

import connectDatabase from '../../../../config/database'
import {
  getProductReviews,
  deleteReview,
} from '../../../../controllers/productControllers'
import onError from '../../../../middlewares/errors'
import {
  isAuthenticatedUser,
  authorizeRoles,
} from '../../../../middlewares/auth'

const handler = nc({ onError })

connectDatabase()

handler.use(isAuthenticatedUser, authorizeRoles('ادمین')).get(getProductReviews)
handler.use(isAuthenticatedUser, authorizeRoles('ادمین')).delete(deleteReview)

export default handler
