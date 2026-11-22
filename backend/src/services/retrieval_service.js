// import knowledgeModel from "../models/knowledge.model.js";
// import { generateEmbedding } from "./embedding_service.js";

// export const retrieveRelevantChunks = async (
//     query,
//     category = null
// ) => {

//     const queryEmbedding = await generateEmbedding(
//         query,
//         "RETRIEVAL_QUERY"
//     );

//     const vectorSearch = {
//         index: "knowledge_vector_index",
//         path: "embedding",
//         queryVector: queryEmbedding,
//         numCandidates: 100,
//         limit: 5
//     };

//     if (category) {
//         vectorSearch.filter = { category };
//     }

//     const results = await knowledgeModel.aggregate([
//         {
//             $vectorSearch: vectorSearch
//         },
//         {
//             $project: {
//                 content: 1,
//                 source: 1,
//                 category: 1,
//                 chunkIndex: 1,
//                 score: {
//                     $meta: "vectorSearchScore"
//                 }
//             }
//         }
//     ]);

//     return results;
// };



import qdrant, {
    COLLECTION_NAME
} from "../config/qdrant.js";

import { generateEmbedding } from "./embedding_service.js";

export const retrieveRelevantChunks = async (
    query,
    category = null
) => {
    try {
        // Generate query embedding
        const queryEmbedding = await generateEmbedding(
            query,
            "RETRIEVAL_QUERY"
        );

        // Search Qdrant
        const searchResult = await qdrant.query(
            COLLECTION_NAME,
            {
                query: queryEmbedding,
                limit: 5,
                with_payload: true,

                ...(category && {
                    filter: {
                        must: [
                            {
                                key: "category",
                                match: {
                                    value: category
                                }
                            }
                        ]
                    }
                })
            }
        );

        // Return relevant chunks
        return searchResult.points.map(point => ({
            content: point.payload.content,
            source: point.payload.source,
            category: point.payload.category,
            chunkIndex: point.payload.chunkIndex,
            score: point.score
        }));

    } catch (error) {
        console.error("Retrieval error:", error);
        throw error;
    }
};