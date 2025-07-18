import express from 'express'
const router = express.Router()
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { registeringUser } from '../controllers/registeringUser.js'

router.post('/register',registeringUser)

export default router