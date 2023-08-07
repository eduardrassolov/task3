import * as yup from "yup";
import { categories } from "../config/categoryNames";

export type EditNote = {
  name?: string;
  content?: string;
  // category?: keyof typeof categories;
  category?: string;
};

export const editSchema: yup.ObjectSchema<EditNote> = yup
  .object()
  .shape({
    name: yup.string().min(1).trim("Name is incorrect, remove spaces"),
    content: yup.string().min(1).trim("Content is incorrect, remove spaces"),
    category: yup.string().oneOf([...Object.keys(categories)]),
  })
  .noUnknown();
