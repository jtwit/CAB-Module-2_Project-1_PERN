import express from 'express';
import { createNewLike, deleteLike, getCommentsbyLikesID } from '../controller/likesController.js';
import { jwtAuth } from "../middleware/passport.js";

const router = express.Router();

router.post("/postlike", jwtAuth, createNewLike)
router.get("/:postid", getCommentsbyLikesID)
router.delete("/like/:lid", deleteLike)

export default router;