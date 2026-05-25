import express from 'express';
import * as notesController from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  createNoteSchema,
  updateNoteSchema,
  noteIdSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.use(authenticate);
router.get('/notes', getAllNotesSchema, notesController.getAllNotes);
router.post('/notes', createNoteSchema, notesController.createNote);
router.get('/notes/:noteId', noteIdSchema, notesController.getNoteById);
router.patch('/notes/:noteId', updateNoteSchema, notesController.updateNote);
router.delete('/notes/:noteId', noteIdSchema, notesController.deleteNote);

export default router;
