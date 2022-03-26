import nc from 'next-connect'

import connectDatabase from '../../../../config/database'
import {
  updateOrder,
  deleteOrder,
} from '../../../../controllers/orderControllers'
import onError from '../../../../middlewares/errors'
import {
  isAuthenticatedUser,
  authorizeRoles,
} from '../../../../middlewares/auth'

const handler = nc({ onError })

connectDatabase()

handler.use(isAuthenticatedUser, authorizeRoles('ادمین')).put(updateOrder)
handler.use(isAuthenticatedUser, authorizeRoles('ادمین')).delete(deleteOrder)

export default handler
