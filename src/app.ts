import express, { Application, Request, Response } from "express";
import { router as notesRouter } from "./routes/notesRoutes";

const app: Application = express();
const PORT: number = 3000;

app.listen(PORT, (): void => {
  console.log("SERVER IS UP ON PORT:", PORT);
});

app.use("/", notesRouter);
