import express, { Application } from "express";
import { router as notesRouter } from "./routes/notesRoutes";
import bodyParser from "body-parser";
import cors from "cors";

const app: Application = express();
const PORT: number = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, (): void => {
  console.log("SERVER IS UP ON PORT:", PORT);
});

app.use("/", notesRouter);
