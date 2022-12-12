import express from 'express';
import { getAllUsers, getUserbyID, createNewUser, updateUser, deleteUser, login, getProfile } from '../controller/usersController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { jwtAuth } from '../middleware/passport.js';

const router = express.Router();

// router.get('/test', (req, res) => {
//     res.send({ msg: 'Test route.' });
// });

router.get("/", getAllUsers)
router.get("/user", jwtAuth, getUserbyID)
router.post("/signup", createNewUser)
router.put("/userbyid", jwtAuth, updateUser)
router.delete("/userbyid", jwtAuth, deleteUser)
router.post("/login", login)

router.get("/profile", jwtAuth, getProfile);

export default router;