
import mongoose from "mongoose";

const knowledgeSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },

        embedding: {
            type: [Number],
            required: true
        },

        source: {
            type: String,
            required: true
        },

        category: {
            type: String,
            default: "general"
        },

        chunkIndex: {
            type: Number,
            required: true
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Knowledge", knowledgeSchema);
