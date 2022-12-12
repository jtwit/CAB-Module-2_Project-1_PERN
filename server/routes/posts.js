import express from 'express';
import { createNewPost, getPostsbyID, getAllPosts, deletePost, getPostsbyPostID, updateUsersPost, deleteUsersPosts } from '../controller/postsController.js';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { jwtAuth } from "../middleware/passport.js";

const router = express.Router();

router.get("/allposts", authMiddleware, getAllPosts)
router.post("/post", jwtAuth, createNewPost)
router.get("/post", jwtAuth, getPostsbyID)
router.get("/post/:pid", jwtAuth, getPostsbyPostID)
router.put("/post", jwtAuth, updateUsersPost)
// Deletes all posts :/
router.delete("/post/:pid", jwtAuth, deletePost)
router.delete("/post", jwtAuth, deleteUsersPosts)

export default router;