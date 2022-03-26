import nc from 'next-connect'

import connectDatabase from '../../../config/database'
import { getProducts } from '../../../controllers/productControllers'
import onError from '../../../middlewares/errors'

const handler = nc({ onError })

connectDatabase()

handler.get(getProducts)

export default handler
