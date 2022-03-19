import nc from 'next-connect'

import connectDatabase from '../../../config/database'
import { getSingleProduct } from '../../../controllers/productControllers'
import onError from '../../../middlewares/errors'

const handler = nc({ onError })

connectDatabase()

handler.get(getSingleProduct)

export default handler
