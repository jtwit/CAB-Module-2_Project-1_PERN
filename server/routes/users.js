import express from 'express';
import { getAllUsers, getUserbyID, createNewUser, updateUser, deleteUser, login } from '../controller/usersController.js';
import { createNewPost, getAllPosts } from '../controller/postsController.js';

const router = express.Router();

// router.get('/test', (req, res) => {
//     res.send({ msg: 'Test route.' });
// });

router.get("/", getAllUsers)
router.get("/userbyid/:uid", getUserbyID)
router.post("/signup", createNewUser)
router.put("/userbyid/:uid", updateUser)
router.delete("/userbyid/:uid", deleteUser)
router.post("/login", login);
router.get("/allposts", getAllPosts)
router.post("/post", createNewPost)

export default router;