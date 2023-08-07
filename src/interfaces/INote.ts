import { IData } from "./IData";

export interface INote extends IData {
  id: string;
  created: string;
  isArchived: boolean;
  dates?: string;
}
