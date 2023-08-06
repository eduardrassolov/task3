import express from "express";
import * as controller from "../controllers/noteController";
import { validation } from "../middleware/validationMiddleware";
import { noteSchema } from "../validations/noteValidation";
import { editSchema } from "../validations/editValidation";

export const router = express.Router();

router.get("/notes", controller.getAllNotes);
router.get("/notes/stats", controller.getNotesStats);
router.get("/notes/:id", controller.getNoteById);

router.post("/notes", validation(noteSchema), controller.createNote);

router.patch("/notes/:id", validation(editSchema), controller.updateNote);
router.patch("/notes/:id/active", controller.activeNoteById);
router.patch("/notes/:id/archive", controller.archiveNoteById);

router.delete("/notes/:id", controller.deleteNoteById);
router.delete("/notes", controller.deleteAllNotes);
