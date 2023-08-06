import { Request, Response } from "express";
import { ObjectSchema } from "yup";
import { IData } from "../validations/noteValidation";
import { CustomError } from "../helpers/CustomError";

export interface IError extends Error {
  status?: number;
}

export const validation = (schema: any) => async (req: Request, res: Response, next: any) => {
  try {
    const data: IData = req.body;
    await schema.validate(data, { strict: true });
    return next();
  } catch (error: any) {
    res.status(error?.status || 500).send(error.message);
  }
};
