import nc from 'next-connect'

import connectDatabase from '../../../config/database'
import { updateProfile } from '../../../controllers/authControllers'
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError })

connectDatabase()

handler.use(isAuthenticatedUser).put(updateProfile)

export default handler
