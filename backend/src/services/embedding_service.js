import ai from "../config/gemini";

const EMBEDDING_MODEL = "gemini-embedding-001";

export const generateEmbadding = async (text, taskType) => {
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