import mongoose from 'mongoose';

const generatedImageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    imageUrl: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const GeneratedImage = mongoose.model("GeneratedImage", generatedImageSchema);
export default GeneratedImage;
