import mongoose from "mongoose";
import User from "./user";

const PromptSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is requied.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is requied.'],
    },
})

const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema);
export default Prompt;