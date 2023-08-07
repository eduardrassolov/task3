import express, { Response, Request } from "express";
import * as service from "../services/noteService";
import * as statsService from "../services/statsService";
import httpCode from "../config/httpCode";


export const router = express.Router();

// get notes by filter: all / active / archived
export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const filter: string | undefined = req.query.filter as string | undefined;
    const notes = await service.getAllNotes(filter);

    res.send(notes);
  } catch (error) {
    if (error instanceof Error) {
      res.status(httpCode.NOT_FOUND).send(error.message);
    }
  }
};

//get note by id
export const getNoteById = async (req: Request, res: Response) => {
  try {
    const { params: { id } } = req;
     if (!id) {
      throw new Error("Id is not provided");
     }
    
    const note = await service.getNoteById(id);

    res.send(note);
  } catch (error) {
    if (error instanceof Error) {
      res.status(httpCode.NOT_FOUND).send(error.message);
    }
  }
};

//get notes stats
export const getNotesStats = async (req: Request, res: Response) => {
  try {
    const result = await statsService.calcStats();

    res.status(httpCode.OK).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(httpCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
};

// post request - create new note
export const createNote = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    console.log('dboy', body);
    const response = await service.createNote(body);

    if (response) {
      res.status(httpCode.CREATED).send({ message: "Note created successfully" });
    }
    else {
      throw new Error("Note not created");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(httpCode.NO_CONTENT).send(error.message);
    }
  }
};

//delete note by id
export const deleteNoteById = async (req: Request, res: Response) => {
  try {
    const response = await service.deleteNoteById(req.params.id);

    if (response) {
      res.status(httpCode.NO_CONTENT).send({ message: "Note deleted successfully" });
    }
    else {
      throw new Error("Note not deleted");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(httpCode.BAD_REQUEST).send(error.message);
    }
  }
};

//delete all notes
export const deleteAllNotes = async (req: Request, res: Response) => {
  try {
    const response = await service.deleteAllNotes();

    if (response) {
      res.status(httpCode.NO_CONTENT).send({ message: "All notes deleted successfully" });
    } else {
      throw new Error("Notes not deleted");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(httpCode.BAD_REQUEST).send(error.message);
    }
  }
};

//patch request - update note by id
export const updateNote = async (req: Request, res: Response) => {
  try {
    const { params: { id }, body } = req;

    if (!id || !Object.keys(body).length) {
      throw new Error("Wrong id or data");
    }
    
    const response = await service.updateNote(id, body);

    if (response) {
      res.status(httpCode.OK).send({ message: "Data updated succefully" });
    }
    else {
      throw new Error("Something went wrong");
    }

  } catch (error) {
    if (error instanceof Error) {
      res.status(httpCode.BAD_REQUEST).send(error.message);
    }
  }
};
