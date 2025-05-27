import express from "express";
import { generateImage } from "../controllers/imageController.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/generate", verifyToken, generateImage);

export default router;