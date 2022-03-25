import nc from 'next-connect'

import connectDatabase from '../../../config/database'
import { getUserProfile } from '../../../controllers/authControllers'
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError })

connectDatabase()

handler.use(isAuthenticatedUser).get(getUserProfile)

export default handler
