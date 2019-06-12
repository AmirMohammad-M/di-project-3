import express from 'express'

import AnswerController from '../controllers/AnswerController'
import { isAuthorized } from '../controllers/AuthController'

const router = express.Router()

router.post('/new', isAuthorized, AnswerController.create)
router.get('/view', AnswerController.view)

export default router
