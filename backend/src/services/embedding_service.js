import ai from "../config/gemini.js";

const EMBEDDING_MODEL = "gemini-embedding-001";

export const generateEmbedding = async (text, taskType) => {
    try {
        const response = await ai.models.embedContent({
            model: EMBEDDING_MODEL,
            contents: text,
            config: {
                taskType,
                outputDimensionality: 768
            }
        });
        return response.embeddings[0].values;
    } catch (error) {

        console.error("Embedding error:", error);
        throw error;
    }
}