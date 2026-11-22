import { QdrantClient } from "@qdrant/js-client-rest";

const qdrant = new QdrantClient({
    url: process.env.QDRANT_URL || "http://localhost:6333"
});

export const COLLECTION_NAME =
    process.env.QDRANT_COLLECTION || "calmwind_knowledge";

export default qdrant;