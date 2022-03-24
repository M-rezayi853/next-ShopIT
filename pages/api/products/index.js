import nc from 'next-connect'

import connectDatabase from '../../../config/database'
import { getProducts } from '../../../controllers/productControllers'
import onError from '../../../middlewares/errors'
import { isAuthenticatedUser, authorizeRoles } from '../../../middlewares/auth'

const handler = nc({ onError })

connectDatabase()

handler.get(getProducts)

export default handler
