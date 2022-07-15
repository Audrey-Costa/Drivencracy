import { Router } from "express";
import resultController from "../controllers/resultController.js";

const resultRouter = Router();

resultRouter.get("/poll/:id/result", resultController);

export default resultRouter;