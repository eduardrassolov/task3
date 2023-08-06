import { categories } from "../helpers/categoryNames";
import { INote } from "../interfaces/INote";
import { initialData } from "./noteService";

interface IStats {
  category: string;
  activeCount: number;
  archivedCount: number;
}

export function getNotesStats(): Array<IStats> {
  try {
    const stats: Array<IStats> = Object.keys(categories).map((category) => ({
      category,
      ...initialData
        .filter((note) => note.category === category)
        .reduce(
          (acc, note) => {
            note.isArchived ? acc.archivedCount++ : acc.activeCount++;
            return acc;
          },
          {
            activeCount: 0,
            archivedCount: 0,
          }
        ),
    }));

    return stats;
  } catch (err) {
    throw err;
  }
}
