import express from 'express'
const router = express.Router()
import {postingNote,gettingNotes,deletingNote,updatingNote,gettingSingleNote} from '../controllers/notesController.js'

router.post('/notes',postingNote)
router.get('/notes',gettingNotes)
router.delete('/notes/:id',deletingNote)
router.put('/notes/:id',updatingNote)
router.get('/notes/:id',gettingSingleNote)

export default router