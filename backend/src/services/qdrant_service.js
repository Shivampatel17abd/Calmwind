import qdrant, { COLLECTION_NAME } from "../config/qdarnt.js";

export const initializeQdrant = async () => {
    try {
        const collections = await qdrant.getCollections();

        const exists = collections.collections.some(
            collection => collection.name === COLLECTION_NAME
        );

        if (!exists) {
            await qdrant.createCollection(COLLECTION_NAME, {
                vectors: {
                    size: 768,
                    distance: "Cosine"
                }
            });

            console.log("Qdrant collection created!");
        } else {
            console.log("Qdrant collection already exists!");
        }

    } catch (error) {
        console.error("Qdrant initialization error:", error);
        throw error;
    }
};