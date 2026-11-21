
import Knowledge from "../models/Knowledge.js";
import { generateEmbedding } from "./embedding_service.js";

export const retrieveRelevantChunks = async (
    query,
    category = null
) => {

    const queryEmbedding = await generateEmbedding(
        query,
        "RETRIEVAL_QUERY"
    );

    const vectorSearch = {
        index: "knowledge_vector_index",
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: 100,
        limit: 5
    };

    if (category) {
        vectorSearch.filter = { category };
    }

    const results = await Knowledge.aggregate([
        {
            $vectorSearch: vectorSearch
        },
        {
            $project: {
                content: 1,
                source: 1,
                category: 1,
                chunkIndex: 1,
                score: {
                    $meta: "vectorSearchScore"
                }
            }
        }
    ]);

    return results;
};
