import { INote } from "../interfaces/INote";
import { v4 as uuidv4 } from "uuid";

export const createNewObjNote = (name: string, content: string, category: string): INote => {
  const newNote: INote = {
    id: uuidv4(),
    name,
    content,
    category,
    isArchived: false,
    created: new Date().toDateString(),
  };
  return newNote;
};
