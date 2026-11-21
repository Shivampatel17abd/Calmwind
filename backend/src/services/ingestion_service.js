import knowledgeModel from "../models/knowledge.model";
import { chunkText } from "../utils/chunkText";
import { generateEmbadding } from "./embedding_service";

export const ingestDocument = async ({
    text,
    source,
    category }) => {


    if (!text || !text.trim()) {
        throw new Error("Document text is empty");
    }

    const chunks = chunkText(text);


    for (let i = 0; i < chunks.length; i++) {

        const embedding = await generateEmbedding(
            chunks[i],
            "RETRIEVAL_DOCUMENT"
        );

        documents.push({
            content: chunks[i],
            embedding,
            source,
            category,
            chunkIndex: i
        });
    }

    await knowledgeModel.insertMany(documents)

    return {
        totalChunks: documents.length,
        source
    };

}