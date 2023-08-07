import db from "../db.json";
import httpCode from "../config/httpCode";
import { INote } from "../interfaces/INote";
import { filterStatus } from "../config/filterSetting";
import { createNewObjNote } from "../helpers/createNote";

import { parseDate } from "../helpers/parseContent";
import { IData } from "../interfaces/IData";
import { CustomError } from "../CustomError";

export let initialData: Array<INote> = db;

//get requests logic
export async function getAllNotes(filter: string | undefined) {
  const notes: Array<INote> = initialData.map((note) => ({
    ...note,
    dates: parseDate(note.content),
  }));

  if (!notes.length) {
    throw new CustomError(
      httpCode.NO_CONTENT,
      "No notes found, please create a note by sending a POST request to /notes"
    );
  }

  if (!filter || filter === filterStatus.all) return notes;

  return filter === filterStatus.active
    ? initialData.filter((note) => !note.isArchived)
    : initialData.filter((note) => note.isArchived);
}
export async function getNoteById(id: string) {
  const note: INote | undefined = initialData.find((note) => note.id === id);
  if (!note) {
    throw new CustomError(httpCode.BAD_REQUEST, "Note not found, wrong id");
  }
  return note;
}
export async function getNotesByStatusFilter(filter: string = filterStatus.all) {
  if (filter === filterStatus.all) return initialData;

  const notes: Array<INote> =
    filter === filterStatus.active
      ? initialData.filter((note: INote) => !note.isArchived)
      : initialData.filter((note: INote) => note.isArchived);
  return notes;
}

//post request logic
export async function createNote(data: any) {
  const { name, content, category } = data;
  const newNote: INote = createNewObjNote(name, content, category);

  initialData.push(newNote);
  return httpCode.CREATED;
}

//delete request logic
export async function deleteNoteById(id: string) {
  const newData = initialData.filter((note) => note.id !== id);
  if (newData.length === initialData.length) {
    throw new CustomError(httpCode.BAD_REQUEST, "Note not found, wrong id");
  }
  initialData = [...newData];
  return initialData;
}
export async function deleteAllNotes() {
  initialData = [];
  return initialData;
}

//patch request logic
export function updateNote(id: string, data: IData) {
  const index: number = initialData.findIndex((note) => note.id === id);
  if (index === -1) {
    throw new CustomError(httpCode.NOT_FOUND, "No any data found by this id");
  }
  initialData = initialData.map((note, noteIndex) =>
    noteIndex === index ? { ...note, ...data } : note
  );
  return initialData;
}
export function toogleArchiveNote(id: string, status: boolean) {
  const noteIndex: number = initialData.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    throw new CustomError(httpCode.NOT_FOUND, "No any data found by this id");
  }

  initialData = initialData.map((note, index) =>
    noteIndex === index ? { ...note, isArchived: status } : note
  );

  return initialData;
}
