import express from 'express'

import UserController from '../controllers/UserController'

const router = express.Router()

router.get('/find', UserController.getUserInfo)
router.get('/notifications', UserController.getMyNotifications)
router.get('/profile', UserController.getMyProfile)
router.post('/update', UserController.updateUser)

export default router
