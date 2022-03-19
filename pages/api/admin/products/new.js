import nc from 'next-connect'

import connectDatabase from '../../../../config/database'
import { newProduct } from '../../../../controllers/productControllers'

connectDatabase()

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).end('Something broke!')
  },
})

handler.post(newProduct)

export default handler
