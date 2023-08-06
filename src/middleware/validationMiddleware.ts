import { Request, Response } from "express";
import { ObjectSchema } from "yup";
import { IData } from "../validations/noteValidation";

export const validation = (schema: any) => async (req: Request, res: Response, next: any) => {
  try {
    const data: IData = req.body;
    await schema.validate(data, { strict: true });
    return next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error);
    }
  }
};
