import express from "express";
import * as controller from "../controllers/noteController";
export const router = express.Router();
import { validation } from "../middleware/validationMiddleware";
import { noteSchema } from "../validations/noteValidation";
import { editSchema } from "../validations/editValidation";

router.get("/notes", controller.getAllNotes);
router.get("/notes/stats", controller.getNotesStats);
router.get("/notes/:id", controller.getNoteById);

router.delete("/notes/:id", controller.deleteNoteById);
router.delete("/notes", controller.deleteAllNotes);

router.post("/notes", validation(noteSchema), controller.createNote);

router.patch("/notes/:id", validation(editSchema), controller.updateNote);
