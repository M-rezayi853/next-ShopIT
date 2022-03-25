import nc from 'next-connect'

import connectDatabase from '../../../../config/database'
import { allUsers } from '../../../../controllers/authControllers'
import onError from '../../../../middlewares/errors'
import {
  isAuthenticatedUser,
  authorizeRoles,
} from '../../../../middlewares/auth'

const handler = nc({ onError })

connectDatabase()

handler.use(isAuthenticatedUser, authorizeRoles('ادمین')).get(allUsers)

export default handler
