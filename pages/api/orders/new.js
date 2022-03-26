import nc from 'next-connect'

import connectDatabase from '../../../config/database'
import { newOrder } from '../../../controllers/orderControllers'
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError })

connectDatabase()

handler.use(isAuthenticatedUser).post(newOrder)

export default handler
