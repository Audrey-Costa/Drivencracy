import { Router } from "express";
import voteController from "../controllers/voteController.js";

const voteRouter = Router();

voteRouter.post("/choice/:id/vote", voteController);

export default voteRouter;
