import { Router } from "express";
import pollCreator from "./pollCreator.js";
import pollView from "./pollVIew.js";
import vote from "./vote.js";
import result from "./result.js";

const router = Router();
router.use(pollCreator, pollView, vote, result);

export default router;