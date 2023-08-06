import * as yup from "yup";
import { categories } from "../helpers/categoryNames";

export interface IData {
  name: string;
  content: string;
  category: keyof typeof categories;
}

export const noteSchema: yup.ObjectSchema<IData> = yup
  .object({
    name: yup.string().required("Name is required"),
    content: yup.string().required("Content is required"),
    category: yup
      .string()
      .oneOf([...Object.keys(categories)])
      .required("Category must be one of the following: idea, task, random"),
  })
  .noUnknown();
