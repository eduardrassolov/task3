import db from "../db.json";
import { INote } from "../interfaces/INote";

let initialData: Array<INote> = db;

export async function getAllNotes() {
  try {
    const notes: Array<INote> = initialData;
    console.log(notes.length);
    if (!notes.length)
      throw new Error("No notes found, please create a note by sending a POST request to /notes");
    return notes;
  } catch (error) {
    throw error;
  }
}
export async function getNoteById(id: string) {
  try {
    const note: INote | undefined = initialData.find((note) => note.id === id);
    if (!note) throw new Error("Note not found, wrong id");
    return note;
  } catch (error) {
    throw error;
  }
}
export function createNote(data: any): number {
  try {
    const res = initialData.push(data);
    return 1;
  } catch (error) {
    throw error;
  }
}
export function deleteNoteById(id: string) {
  try {
    const newData = initialData.filter((note) => note.id !== id);
    if (newData.length === initialData.length) throw new Error("Note not found, wrong id");
    initialData = newData;
    return initialData;
  } catch (error) {
    throw error;
  }
}
export function deleteAllNotes() {
  try {
    initialData = [];
    return initialData;
  } catch (error) {
    throw error;
  }
}
export function updateNote(id: string, data: any) {
  return;
}
