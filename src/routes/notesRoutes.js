import express from 'express';
import * as notesController from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  createNoteSchema,
  updateNoteSchema,
  noteIdSchema,
} from '../validations/notesValidation.js';
import { celebrate } from 'celebrate';

const router = express.Router();

router.get('/notes', celebrate(getAllNotesSchema), notesController.getAllNotes);
router.post('/notes', celebrate(createNoteSchema), notesController.createNote);
router.get(
  '/notes/:noteId',
  celebrate(noteIdSchema),
  notesController.getNoteById,
);
router.patch(
  '/notes/:noteId',
  celebrate(updateNoteSchema),
  notesController.updateNote,
);
router.delete(
  '/notes/:noteId',
  celebrate(noteIdSchema),
  notesController.deleteNote,
);

export default router;
