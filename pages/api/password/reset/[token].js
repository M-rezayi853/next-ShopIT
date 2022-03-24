import nc from 'next-connect'

import connectDatabase from '../../../../config/database'
import { resetPassword } from '../../../../controllers/authControllers'
import onError from '../../../../middlewares/errors'

const handler = nc({ onError })

connectDatabase()

handler.put(resetPassword)

export default handler
