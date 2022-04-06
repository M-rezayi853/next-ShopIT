import nc from 'next-connect'

import connectDatabase from '../../../config/database'
import { sendStripeApi } from '../../../controllers/paymentControllers'
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser } from '../../../middlewares/auth'

const handler = nc({ onError })

connectDatabase()

handler.use(isAuthenticatedUser).get(sendStripeApi)

export default handler
