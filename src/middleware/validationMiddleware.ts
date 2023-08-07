import { Request, Response } from "express";
import { IData } from "../interfaces/IData";
import * as yup from "yup";
import { EditNote } from "../validations/editValidation";

export const validation =
  (schema: yup.ObjectSchema<EditNote | IData>) =>
  async (req: Request, res: Response, next: any) => {
    try {
      const data: IData = req.body;
      await schema.validate(data, { strict: true });
      return next();
    } catch (error: any) {
      res.status(error.status || 500).send(error.message);
    }
  };
