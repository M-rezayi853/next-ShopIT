import nc from 'next-connect'

import connectDatabase from '../../../config/database'
import { loginUser } from '../../../controllers/authControllers'
import onError from '../../../middlewares/errors'

const handler = nc({ onError })

connectDatabase()

handler.post(loginUser)

export default handler
