import express from 'express'

import QuestionController from '../controllers/QuestionController'
import { isAuthorized } from '../controllers/AuthController'

const router = express.Router()

router.post('/new', isAuthorized, QuestionController.create)
router.get('/view', QuestionController.view)

export default router
