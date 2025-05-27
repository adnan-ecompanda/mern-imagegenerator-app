import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";
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
            return res.status(400).json({ success: false, message: "You have no credits" });
        }

        const formData = new FormData();
        formData.append("prompt", prompt);
        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                "x-api-key": process.env.CLIPDROP_API_KEY
            },
            responseType: "arraybuffer"
        });
        const image = Buffer.from(data, "binary").toString("base64");
        const imageData = `data:image/png;base64,${image}`;

        user.credit -= 1;
        await user.save();

        res.status(200).json({ success: true, message: "Image generated successfully", imageData, user: { name: user.name }, credit: user.credit });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}