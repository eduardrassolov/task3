import db from "../db.json";
import { INote } from "../interfaces/INote";

export async function getAllNotes() {
  try {
    const notes: Array<INote> = db;
    return notes;
  } catch (error) {
    throw error;
  }
}
export async function getNoteById(id: string) {
  try {
    const note: INote | undefined = db.find((note) => note.id === id);
    if (!note) throw new Error("Note not found, wrong id");
    return note;
  } catch (error) {
    throw error;
  }
}
export function createNote(data: any) {
  return;
}
export function deleteNote(id: string) {
  return;
}
export function deleteAllNotes(id: string) {
  return;
}
export function updateNote(id: string, data: any) {
  return;
}
