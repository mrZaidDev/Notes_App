import express from 'express'
const router = express.Router()
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { registeringUser, loggingInUser } from '../controllers/userController.js'

router.post('/register',registeringUser)
router.post('/login',loggingInUser)
export default router