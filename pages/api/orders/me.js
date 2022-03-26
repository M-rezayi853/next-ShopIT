import nc from 'next-connect'

import connectDatabase from '../../../config/database'
import { myOrder } from '../../../controllers/orderControllers'
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError })

connectDatabase()

handler.use(isAuthenticatedUser).get(myOrder)

export default handler
