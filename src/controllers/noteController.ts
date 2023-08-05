import express, { Response, Request } from "express";
import * as service from "../services/noteService";
export const router = express.Router();

export const getAllNotes = (req: Request, res: Response) => {
  res.send("Get all notes");
};

export const getNoteById = (req: Request, res: Response) => {
  res.send("Get note by id");
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
