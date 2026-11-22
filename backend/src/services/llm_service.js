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


        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",

            contents: [
                ...formattedHistory,
                {
                    role: "user",
                    parts: [{ text: finalPrompt }]
                }
            ],

            config: {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0.7
            }
        });

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