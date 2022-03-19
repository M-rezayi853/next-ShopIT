import nc from 'next-connect'

import connectDatabase from '../../../../config/database'
import {
  updateProduct,
  deleteProduct,
} from '../../../../controllers/productControllers'
import onError from '../../../../middlewares/errors'

const handler = nc({ onError })

connectDatabase()

handler.put(updateProduct)
handler.delete(deleteProduct)

export default handler
