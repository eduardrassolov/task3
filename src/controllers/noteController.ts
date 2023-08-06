import express, { Response, Request } from "express";
import * as service from "../services/noteService";
import httpCode from "../helpers/httpCode";
import { string } from "yup";

export const router = express.Router();

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const filter: string | undefined = req.query.filter as string | undefined;
    const notes = await service.getAllNotes(filter);
    res.send(notes);
  } catch (error) {
    if (error instanceof Error) res.status(httpCode.NOT_FOUND).send(error.message);
  }
};
export const getNoteById = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;
    const note = await service.getNoteById(id);
    res.send(note);
  } catch (error) {
    if (error instanceof Error) res.status(httpCode.NOT_FOUND).send(error.message);
  }
};
export const getNotesByStatusFilter = async (req: Request, res: Response) => {
  try {
    const {
      params: { filter },
    } = req;
    const notes = await service.getNotesByStatusFilter(filter);
    res.send(notes);
  } catch (error) {
    if (error instanceof Error) res.status(httpCode.NOT_FOUND).send(error.message);
  }
};
export const getNotesStats = async (req: Request, res: Response) => {
  try {
    const result = await service.getNotesStats();
    res.status(httpCode.OK).send(result);
  } catch (error) {
    if (error instanceof Error) res.status(httpCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const response = await service.createNote(body);

    if (response) {
      res.status(httpCode.CREATED).send({ message: "Note created successfully" });
    } else {
      throw new Error("Note not created");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(httpCode.NO_CONTENT).send(error.message);
    }
  }
};
export const deleteNoteById = async (req: Request, res: Response) => {
  try {
    const response = await service.deleteNoteById(req.params.id);

    if (response) {
      res.status(httpCode.NO_CONTENT).send({ message: "Note deleted successfully" });
    } else {
      throw new Error("Note not deleted");
    }
  } catch (error) {
    if (error instanceof Error) res.status(httpCode.BAD_REQUEST).send(error.message);
  }
};
export const deleteAllNotes = async (req: Request, res: Response) => {
  try {
    const response = await service.deleteAllNotes();
    if (response) {
      res.status(httpCode.NO_CONTENT).send({ message: "All notes deleted successfully" });
    } else {
      throw new Error("Notes not deleted");
    }
  } catch (error) {
    if (error instanceof Error) res.status(httpCode.BAD_REQUEST).send(error.message);
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    console.log("params", id);
    console.log("body", body);

    const response = await service.updateNote(id, body);
    if (response) {
      res.status(httpCode.OK).send({ message: "Data updated succefully" });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    if (error instanceof Error) res.status(httpCode.BAD_REQUEST).send(error.message);
  }
};
export const archiveNoteById = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;
    await service.toogleArchiveNote(id, true);
    res.status(httpCode.OK).send("Note is succesfully archived");
  } catch (error) {
    if (error instanceof Error) res.status(httpCode.NOT_FOUND).send(error.message);
  }
};
export const activeNoteById = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;
    await service.toogleArchiveNote(id, false);
    res.status(httpCode.OK).send("Note is succesfully activated");
  } catch (error) {
    if (error instanceof Error) res.status(httpCode.NOT_FOUND).send(error.message);
  }
};
