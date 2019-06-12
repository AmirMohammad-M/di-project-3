import express from 'express'

import CommentController from '../controllers/CommentController'
import { isAuthorized } from '../controllers/AuthController'

const router = express.Router()

router.post('/new', isAuthorized, CommentController.create)

export default router
