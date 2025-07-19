import express from 'express'
const router = express.Router()
import {postingNote} from '../controllers/notesController.js'

router.post('/notes',postingNote)
export default router