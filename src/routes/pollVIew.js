import { Router } from "express";
import { pollViewController, choicesViewController } from "../controllers/pollViewController.js";

const viewRouter = Router()

viewRouter.get("/poll", pollViewController)
viewRouter.get("/poll/:id/choice", choicesViewController)

export default viewRouter;