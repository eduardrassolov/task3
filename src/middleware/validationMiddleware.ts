import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "yup";

import { IData } from "../interfaces/IData";
import { EditNote } from "../validations/editValidation";


export const validation = (schema: ObjectSchema<EditNote | IData >) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: IData = req.body;
        await schema.validate(data, { strict: true });
      
        return next();
    } catch (error: any) {
        res.status(error.status || 500).send(error.message || "Something went wrong") ;
     
    }
  }
