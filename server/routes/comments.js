import express from 'express';
import { createNewComment, getAllComments, getCommentsbyPostID, deleteComment } from '../controller/commentsController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { jwtAuth } from "../middleware/passport.js";

const router = express.Router();

router.get("/allcomments", getAllComments)
router.post("/postcomment", jwtAuth, createNewComment)
router.get("/:postid", getCommentsbyPostID)
router.delete("/comment/:cid", jwtAuth, deleteComment)
// router.delete("/comment/:cid", jwtAuth, deleteComment)

export default router;