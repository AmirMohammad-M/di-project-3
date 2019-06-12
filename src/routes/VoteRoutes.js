import express from 'express'

import AnswerController from '../controllers/AnswerController'
import { isAuthorized } from '../controllers/AuthController'

const router = express.Router()

router.post('/up', AnswerController.up)
router.post('/down', AnswerController.down)

export default router
