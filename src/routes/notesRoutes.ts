import express from "express";
import * as controller from "../controllers/noteController";
export const router = express.Router();

router.get("/notes", controller.getAllNotes);
router.get("/notes/stats", controller.getNotesStats);
router.get("/notes/:id", controller.getNoteById);

router.delete("/notes/:id", controller.deleteNote);

router.post("/notes", controller.createNote);

router.put("/notes/:id", controller.updateNote);
