import { IData } from "../validations/noteValidation";

export interface INote extends IData {
  id: string;
  created: string;
  isArchived: boolean;
  dates?: string;
}
