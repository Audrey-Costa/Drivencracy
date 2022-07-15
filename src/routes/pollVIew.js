import { Router } from "express";
import pollViewController from "../controllers/pollViewController.js";

const viewRouter = Router()

viewRouter.get("/poll", pollViewController)

export default viewRouter;