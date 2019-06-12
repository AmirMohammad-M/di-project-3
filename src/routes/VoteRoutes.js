import express from 'express'

import VoteController from '../controllers/VoteController'
import { isAuthorized } from '../controllers/AuthController'

const router = express.Router()

router.post('/up', VoteController.up)
router.post('/down', VoteController.down)

export default router
