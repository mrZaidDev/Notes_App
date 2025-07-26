import express from 'express'
const router = express.Router()
import {postingNote,gettingNotes,deletingNote,updatingNote,gettingSingleNote,checkingAuth} from '../controllers/notesController.js'

router.post('/notes',postingNote)
router.get('/notes',gettingNotes)
router.delete('/notes/:id',deletingNote)
router.put('/notes/:id',updatingNote)
router.get('/notes/:id',gettingSingleNote)
router.get('/check-auth',checkingAuth)
export default router