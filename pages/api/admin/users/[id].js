import nc from 'next-connect'

import connectDatabase from '../../../../config/database'
import {
  getUserDetails,
  updateUser,
  deleteUser,
} from '../../../../controllers/authControllers'
import onError from '../../../../middlewares/errors'
import {
  isAuthenticatedUser,
  authorizeRoles,
} from '../../../../middlewares/auth'

const handler = nc({ onError })

connectDatabase()

handler.use(isAuthenticatedUser, authorizeRoles('ادمین')).get(getUserDetails)
handler.use(isAuthenticatedUser, authorizeRoles('ادمین')).put(updateUser)
handler.use(isAuthenticatedUser, authorizeRoles('ادمین')).delete(deleteUser)

export default handler
