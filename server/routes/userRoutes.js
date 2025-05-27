import express from "express";
import { registerUser, userLogin, userCredits } from "../controllers/userController.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/credits", verifyToken, userCredits);

export default router;
