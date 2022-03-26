import nc from 'next-connect'

import connectDatabase from '../../../config/database'
import {
  createProductReview,
  getProductReviews,
  deleteProduct,
} from '../../../controllers/productControllers'
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError })

connectDatabase()

handler.use(isAuthenticatedUser).put(createProductReview)
handler.use(isAuthenticatedUser).get(getProductReviews)
handler.use(isAuthenticatedUser).delete(deleteProduct)

export default handler
