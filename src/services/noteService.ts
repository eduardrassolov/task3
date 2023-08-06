import db from "../db.json";
import httpCode from "../helpers/httpCode";
import { INote } from "../interfaces/INote";
import { filterStatus } from "../helpers/filterSetting";
import { generateNote } from "../helpers/generateNote";
import { IData } from "../validations/noteValidation";
import { IError } from "../middleware/validationMiddleware";
import { type } from "os";
import { CustomError } from "../helpers/CustomError";

let initialData: Array<INote> = db;

export async function getAllNotes() {
  try {
    const notes: Array<INote> = initialData;
    if (!notes.length) {
      throw new CustomError(
        httpCode.NO_CONTENT,
        "No notes found, please create a note by sending a POST request to /notes"
      );
    }
    return notes;
  } catch (error) {
    throw error;
  }
}
export async function getNoteById(id: string) {
  try {
    const note: INote | undefined = initialData.find((note) => note.id === id);
    if (!note) {
      throw new CustomError(httpCode.BAD_REQUEST, "Note not found, wrong id");
    }
    return note;
  } catch (error) {
    throw error;
  }
}
export async function getNotesByStatusFilter(filter: string = filterStatus.all) {
  try {
    if (filter === filterStatus.all) return initialData;

    const notes: Array<INote> =
      filter === filterStatus.active
        ? initialData.filter((note: INote) => !note.isArchived)
        : initialData.filter((note: INote) => note.isArchived);
    return notes;
  } catch (error) {
    throw error;
  }
}
export async function createNote(data: any) {
  try {
    const { name, content, category } = data;
    const newNote: INote = generateNote(name, content, category);

    initialData.push(newNote);
    return httpCode.CREATED;
  } catch (error) {
    throw error;
  }
}
export async function deleteNoteById(id: string) {
  try {
    const newData = initialData.filter((note) => note.id !== id);
    if (newData.length === initialData.length) {
      throw new CustomError(httpCode.BAD_REQUEST, "Note not found, wrong id");
    }
    initialData = [...newData];
    return initialData;
  } catch (error) {
    throw error;
  }
}
export async function deleteAllNotes() {
  try {
    initialData = [];
    return initialData;
  } catch (error) {
    throw error;
  }
}
export function updateNote(id: string, data: IData) {
  try {
    const index: number = initialData.findIndex((note) => note.id === id);
    if (index === -1) {
      throw new CustomError(httpCode.NOT_FOUND, "No any data found by this id");
    }
    initialData = initialData.map((note, noteIndex) =>
      noteIndex === index ? { ...note, ...data } : note
    );
    return initialData;
  } catch (error) {
    throw error;
  }
}
export function toogleArchiveNote(id: string, status: boolean) {
  try {
    const noteIndex: number = initialData.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      throw new CustomError(httpCode.NOT_FOUND, "No any data found by this id");
    }
    initialData = initialData.map((note, index) =>
      noteIndex === index ? { ...note, isArchived: status } : note
    );
    return initialData;
  } catch (err) {
    throw err;
  }
}
