import nc from 'next-connect'

import connectDatabase from '../../../../config/database'
import { newProduct } from '../../../../controllers/productControllers'
import onError from '../../../../middlewares/errors'
import {
  isAuthenticatedUser,
  authorizeRoles,
} from '../../../../middlewares/auth'

const handler = nc({ onError })

connectDatabase()

handler.use(isAuthenticatedUser, authorizeRoles('ادمین')).post(newProduct)

export default handler
