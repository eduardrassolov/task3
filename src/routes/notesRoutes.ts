import express from "express";
import * as controller from "../controllers/noteController";
export const router = express.Router();
import { validation } from "../middleware/validationMiddleware";
import { noteSchema } from "../validations/noteValidation";

router.get("/notes", controller.getAllNotes);
router.get("/notes/stats", controller.getNotesStats);
router.get("/notes/:id", controller.getNoteById);

router.delete("/notes/:id", controller.deleteNoteById);
router.delete("/notes", controller.deleteAllNotes);

// router.post("/notes", (req, res) => controller.createNote(req, res));
router.post("/notes", validation(noteSchema), controller.createNote);

router.patch("/notes/:id", controller.updateNote);
