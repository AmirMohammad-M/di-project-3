import express from 'express'

import UserController from '../controllers/UserController'

const router = express.Router()

router.get('/profile', UserController.getUserInfo)
router.post('/update', UserController.updateUser)

export default router
