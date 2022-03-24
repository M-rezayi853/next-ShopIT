import nc from 'next-connect'

import connectDatabase from '../../../config/database'
import { forgotPassword } from '../../../controllers/authControllers'
import onError from '../../../middlewares/errors'

const handler = nc({ onError })

connectDatabase()

handler.post(forgotPassword)

export default handler
