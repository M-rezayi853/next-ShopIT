import nc from 'next-connect'

import connectDatabase from '../../../config/database'
import { registerUser } from '../../../controllers/authControllers'
import onError from '../../../middlewares/errors'

const handler = nc({ onError })

connectDatabase()

handler.post(registerUser)

export default handler
