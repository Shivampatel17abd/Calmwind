import ai from "../config/gemini.js";
import { retrieveRelevantChunks } from "./retrieval_service.js";

const SYSTEM_PROMPT = `
You are Calmwind, a supportive mental wellness assistant.

Your responsibilities:
1. Listen empathetically.
2. Respond in a friendly and non-judgmental way.
3. Help users reflect on their feelings.
4. Suggest simple evidence-informed wellness exercises.
5. Never diagnose mental health conditions.
6. Never prescribe medication.
7. Never pretend to be a licensed psychiatrist.
8. Encourage professional support when appropriate.

If someone indicates immediate danger or thoughts of self-harm,
prioritize their immediate safety and encourage contacting
emergency services or a trusted person.

Keep responses conversational and easy to understand.
`;

// Pinned models (verified reachable for this API key). The floating
// "gemini-flash-latest" alias kept returning 503 under load, so it is
// only a last resort. Override with GEMINI_MODELS=comma,separated,list.
const MODELS = (process.env.GEMINI_MODELS || "gemini-2.5-flash,gemini-3.5-flash,gemini-flash-latest")
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);

const RETRY_DELAYS_MS = [800, 2000];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const isRetryable = (error) => error?.status === 503 || error?.status === 429;

async function generateWithFallback(contents, config) {
    let lastError;
    for (const model of MODELS) {
        for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
            try {
                return await ai.models.generateContent({ model, contents, config });
            } catch (error) {
                lastError = error;
                if (!isRetryable(error)) throw error;
                if (attempt < RETRY_DELAYS_MS.length) {
                    console.warn(`Gemini ${model} busy (attempt ${attempt + 1}), retrying...`);
                    await sleep(RETRY_DELAYS_MS[attempt]);
                }
            }
        }
        console.warn(`Gemini ${model} unavailable, falling back to next model...`);
    }
    throw lastError;
}

export const generateLLMAdvice = async (message, history = []) => {

    try {

        const relativechunks = await retrieveRelevantChunks(message);
        const context = relativechunks.map((chunk, index) =>
            `
                Source ${index + 1}: ${chunk.source}

                Content:
                ${chunk.content}
            `
        ).join("\n\n");


        const formattedHistory = history.map((chat) => ({
            role: chat.role === "assistant" || chat.role === "model"
                ? "model"
                : "user",

            parts: [
                {
                    text: String(chat.content ?? chat.parts?.[0]?.text ?? "")
                }
            ]
        })).filter(chat => chat.parts[0].text.trim() !== "");


        const finalPrompt = `
            Knowledge context:

            ${context || "No relevant knowledge was retrieved."}

            User question:
            ${message}

            Answer using the context when relevant.
            Do not fabricate sources.
        `;


        const response = await generateWithFallback(
            [
                ...formattedHistory,
                {
                    role: "user",
                    parts: [{ text: finalPrompt }]
                }
            ],
            {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0.7
            }
        );

        return {
            reply: response.text,
            sources: relativechunks.map(chunk => ({
                source: chunk.source,
                category: chunk.category,
                score: chunk.score
            }))
        };

    } catch (error) {

        console.error("RAG chatbot error:", error);

        throw error;
    }
};