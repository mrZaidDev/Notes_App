import express from 'express'
const router = express.Router()
import {postingNote,gettingNotes,deletingNote,updatingNote} from '../controllers/notesController.js'

router.post('/notes',postingNote)
router.get('/notes',gettingNotes)
router.delete('/notes/:id',deletingNote)
router.put('/notes/:id',updatingNote)

export default router