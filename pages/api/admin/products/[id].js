import nc from 'next-connect'

import connectDatabase from '../../../../config/database'
import {
  updateProduct,
  deleteProduct,
} from '../../../../controllers/productControllers'
import onError from '../../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../../middlewares/auth'

const handler = nc({ onError })

connectDatabase()

handler.use(isAuthenticatedUser, authorizeRoles('ادمین')).put(updateProduct)
handler.use(isAuthenticatedUser, authorizeRoles('ادمین')).delete(deleteProduct)

export default handler
