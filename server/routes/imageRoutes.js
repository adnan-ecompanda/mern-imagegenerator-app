import express from "express";
import { generateImage, saveGeneratedImage, getUserImages } from "../controllers/imageController.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/generate", verifyToken, generateImage);

router.post('/save', verifyToken, saveGeneratedImage);

router.get('/my-images', verifyToken, getUserImages);

export default router;