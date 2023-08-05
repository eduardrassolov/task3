import express, { Response, Request } from "express";
import * as service from "../services/noteService";
export const router = express.Router();

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await service.getAllNotes();
    res.send(notes);
  } catch (error) {}
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const note = await service.getNoteById(req.params.id);
    res.send(note);
  } catch (error) {
    if (error instanceof Error) res.status(404).send(error.message);
  }
};

export const createNote = (req: Request, res: Response) => {
  res.send("create note");
};

export const deleteNote = (req: Request, res: Response) => {
  res.send("delete note");
};

export const updateNote = (req: Request, res: Response) => {
  res.send("update note");
};

export const getNotesStats = (req: Request, res: Response) => {
  res.send("get notes stats");
};
