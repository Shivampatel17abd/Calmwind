// /**
//  * LLM Advisor Service
//  * Connects to live LLM APIs (Google Gemini, OpenAI, Groq) or falls back
//  * to dynamic contextual synthesis. Analyzes past queries alongside the current situation
//  * to generate personalized suggestions instead of hardcoded responses.
//  */

// export const generateLLMAdvice = async ({ currentSituation, previousQueries = [] }) => {
//     const formattedHistory = previousQueries
//         .map((q, idx) => {
//             const dateStr = q.createdAt ? new Date(q.createdAt).toLocaleDateString() : `Session ${idx + 1}`;
//             return `- [${dateStr}] Past Situation: "${q.situation}" (Detected Emotion: ${q.primaryEmotion || 'Unspecified'})`;
//         })
//         .join("\n");

//     const systemPrompt = `You are an empathetic, clinical-grade mental health and student wellbeing coping advisor for CalmWind.
// A user has shared their current emotional situation or struggle.
// Crucially, you also have access to the user's PREVIOUS queries and history on CalmWind.

// TASK:
// 1. Carefully analyze the user's current situation in the context of their previous queries.
// 2. If the user has past queries, identify any recurring patterns, triggers, or emotional trajectories (e.g., repeating deadline freeze, sleep disruption leading to daytime panic, relationship friction triggering imposter feelings).
// 3. Do NOT provide generic or hardcoded advice. Provide specific, tailored, doable micro-actions directly addressing their situation.
// 4. Return ONLY a valid JSON object matching the exact format below, with no markdown code blocks or surrounding text.

// JSON FORMAT:
// {
//   "primaryEmotion": "A concise label for their emotional state (e.g. 'Academic Paralysis & Overwhelm')",
//   "patternInsight": "A 1-2 sentence thoughtful observation connecting their past queries with their current state. (Leave empty if no previous queries exist)",
//   "empatheticSummary": "A warm, validating summary acknowledging the physical and mental weight of what they are experiencing.",
//   "actionSteps": [
//     {
//       "id": "step-1",
//       "title": "First immediate micro-action (5-10 min)",
//       "description": "Specific instruction tailored directly to what they wrote",
//       "completed": false
//     },
//     {
//       "id": "step-2",
//       "title": "Second practical step for today",
//       "description": "Specific instruction tailored directly to what they wrote",
//       "completed": false
//     },
//     {
//       "id": "step-3",
//       "title": "Third boundary or decompression step",
//       "description": "Specific instruction tailored directly to what they wrote",
//       "completed": false
//     }
//   ],
//   "cognitiveReframe": {
//     "balancedPerspective": "A kind, grounded truth to challenge anxiety or catastrophic thoughts.",
//     "affirmation": "A short, soothing mantra for them to hold onto right now."
//   }
// }`;

//     const userPrompt = `USER HISTORY OF PREVIOUS QUERIES (${previousQueries.length} past queries):
// ${formattedHistory || "No previous queries found. This is the user's first time sharing."}

// CURRENT SITUATION:
// "${currentSituation}"

// Provide your personalized analysis and guidance in JSON format:`;

//     // 1. Try Google Gemini API if key is set
   
//         try {
//             const response = await fetch(
//                 `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         contents: [
//                             { role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] },
//                         ],
//                         generationConfig: {
//                             responseMimeType: "application/json",
//                             temperature: 0.7,
//                         },
//                     }),
//                 }
//             );

//             if (response.ok) {
//                 const data = await response.json();
//                 const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
//                 if (rawText) {
//                     const parsed = JSON.parse(rawText);
//                     return cleanLLMOutput(parsed, currentSituation);
//                 }
//             } else {
//                 console.warn(" Response not OK:", response.status, await response.text());
//             }
//         } catch (err) {
//             console.warn("Falling back to secondary engine:", err.message);
//         }
    
// };

// /**
//  * Ensures LLM output has all required fields with fallback defaults
//  */
// const cleanLLMOutput = (parsed, situation) => {
//     return {
//         primaryEmotion: parsed.primaryEmotion || "Emotional Stress & Overwhelm",
//         patternInsight: parsed.patternInsight || "",
//         empatheticSummary: parsed.empatheticSummary || "We hear you. What you are going through is challenging, but taking small steps right now will help you regain your calm and focus.",
//         actionSteps: Array.isArray(parsed.actionSteps) && parsed.actionSteps.length > 0
//             ? parsed.actionSteps.map((step, idx) => ({
//                 id: step.id || `step-${idx + 1}`,
//                 title: step.title || `Action Step ${idx + 1}`,
//                 description: step.description || "Take a moment to breathe and reset.",
//                 completed: false,
//             }))
//             : [
//                 { id: "step-1", title: "Take a 5-Minute Brain Pause", description: "Step back from the situation and take slow, deep breaths.", completed: false },
//                 { id: "step-2", title: "Write Down Your Next 1 Task", description: "Break down the most urgent item into one small 10-minute task.", completed: false },
//                 { id: "step-3", title: "Hydrate and Step Away from Screens", description: "Drink a glass of water and stretch your shoulders.", completed: false },
//             ],
//         cognitiveReframe: {
//             balancedPerspective: parsed.cognitiveReframe?.balancedPerspective || "You do not have to solve everything all at once. Focus on taking just the next small step.",
//             affirmation: parsed.cognitiveReframe?.affirmation || "I am doing the best I can right now. One step at a time.",
//         },
//     };
// };
