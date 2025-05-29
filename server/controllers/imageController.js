import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";
import GeneratedImage from '../models/generatedImage.js';


// export const generateImage = async (req, res) => {
//     try {
//         const { prompt } = req.body;
//         const user = await userModel.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }
//         if (!prompt) {
//             return res.status(400).json({ success: false, message: "Prompt is required" });
//         }
//         if (user.credit === 0 || userModel.credit < 0) {
//             return res.status(400).json({ success: false, message: "You have no credits", credit: user.credit });
//         }

//         const formData = new FormData();
//         formData.append("prompt", prompt);
//         const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
//             headers: {
//                 "x-api-key": process.env.CLIPDROP_API_KEY
//             },
//             responseType: "arraybuffer"
//         });
//         const image = Buffer.from(data, "binary").toString("base64");
//         const imageData = `data:image/png;base64,${image}`;

//         user.credit -= 1;
//         await user.save();

//         res.status(200).json({ success: true, message: "Image generated successfully", imageData, user: { name: user.name }, credit: user.credit });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (!prompt) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }
        if (user.credit <= 0) {
            return res.status(400).json({ success: false, message: "You have no credits", credit: user.credit });
        }

        const formData = new FormData();
        formData.append("prompt", prompt);
        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                "x-api-key": process.env.CLIPDROP_API_KEY,
                ...formData.getHeaders()
            },
            responseType: "arraybuffer"
        });

        const image = Buffer.from(data, "binary").toString("base64");
        const imageData = `data:image/png;base64,${image}`;

        // Save generated image to DB
        const savedImage = new GeneratedImage({
            userId: user._id,
            imageUrl: imageData,
            prompt: prompt
        });
        await savedImage.save();

        // Deduct credit
        user.credit -= 1;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Image generated and saved successfully",
            imageData,
            user: { name: user.name },
            credit: user.credit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
export const saveGeneratedImage = async (req, res) => {
    try {
        const { userId, imageUrl, prompt } = req.body;

        if (!userId || !imageUrl || !prompt) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        const newImage = new GeneratedImage({ userId, imageUrl, prompt });
        await newImage.save();

        res.status(201).json({ success: true, data: newImage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to save image." });
    }
};

// Get all images for a user
export const getUserImages = async (req, res) => {
    try {
        const userId = req.user.id; // Get from token

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID not found." });
        }

        const images = await GeneratedImage.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: images });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to retrieve images." });
    }
};

