import express from 'express'
const router = express.Router()
import { registeringUser, loggingInUser } from '../controllers/userController.js'

router.post('/register',registeringUser)
router.post('/login',loggingInUser)
export default router