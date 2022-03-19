import nc from 'next-connect'

import connectDatabase from '../../../../config/database'
import {
  updateProduct,
  deleteProduct,
} from '../../../../controllers/productControllers'

connectDatabase()

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).end('Something broke!')
  },
})

handler.put(updateProduct)
handler.delete(deleteProduct)

export default handler
