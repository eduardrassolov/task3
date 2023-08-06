import express from "express";
import * as controller from "../controllers/noteController";
export const router = express.Router();

router.get("/notes", controller.getAllNotes);
router.get("/notes/stats", controller.getNotesStats);
router.get("/notes/:id", controller.getNoteById);

router.delete("/notes/:id", controller.deleteNoteById);
router.delete("/notes", controller.deleteAllNotes);

router.post("/notes", (req, res) => controller.createNote(req, res));

router.put("/notes/:id", controller.updateNote);
