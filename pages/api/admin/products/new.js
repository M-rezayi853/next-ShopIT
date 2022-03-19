import nc from 'next-connect'

import connectDatabase from '../../../../config/database'
import { newProduct } from '../../../../controllers/productControllers'
import onError from '../../../../middlewares/errors'

const handler = nc({ onError })

connectDatabase()

handler.post(newProduct)

export default handler
