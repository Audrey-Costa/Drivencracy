import { Router } from "express";
import { postPoll, postChoice } from "../controllers/pollCreatorController.js";
import pollSchemaValidation from "../middlewares/pollSchemaValidation.js";
import choiceSchemaValidation from "../middlewares/choiceSchemas.js";

const pollCreatorRouter = Router();

pollCreatorRouter.post("/poll", pollSchemaValidation, postPoll);
pollCreatorRouter.post("/choice", choiceSchemaValidation, postChoice);

export default pollCreatorRouter;