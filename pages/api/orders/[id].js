import nc from 'next-connect'

import connectDatabase from '../../../config/database'
import { getSingleOrder } from '../../../controllers/orderControllers'
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError })

connectDatabase()

handler.use(isAuthenticatedUser).get(getSingleOrder)

export default handler
