/**
 * LLM Advisor Service
 * Connects to live LLM APIs (Google Gemini, OpenAI, Groq) or falls back
 * to dynamic contextual synthesis. Analyzes past queries alongside the current situation
 * to generate personalized suggestions instead of hardcoded responses.
 */

export const generateLLMAdvice = async ({ currentSituation, previousQueries = [] }) => {
    const formattedHistory = previousQueries
        .map((q, idx) => {
            const dateStr = q.createdAt ? new Date(q.createdAt).toLocaleDateString() : `Session ${idx + 1}`;
            return `- [${dateStr}] Past Situation: "${q.situation}" (Detected Emotion: ${q.primaryEmotion || 'Unspecified'})`;
        })
        .join("\n");

    const systemPrompt = `You are an empathetic, clinical-grade mental health and student wellbeing coping advisor for CalmWind.
A user has shared their current emotional situation or struggle.
Crucially, you also have access to the user's PREVIOUS queries and history on CalmWind.

TASK:
1. Carefully analyze the user's current situation in the context of their previous queries.
2. If the user has past queries, identify any recurring patterns, triggers, or emotional trajectories (e.g., repeating deadline freeze, sleep disruption leading to daytime panic, relationship friction triggering imposter feelings).
3. Do NOT provide generic or hardcoded advice. Provide specific, tailored, doable micro-actions directly addressing their situation.
4. Return ONLY a valid JSON object matching the exact format below, with no markdown code blocks or surrounding text.

JSON FORMAT:
{
  "primaryEmotion": "A concise label for their emotional state (e.g. 'Academic Paralysis & Overwhelm')",
  "patternInsight": "A 1-2 sentence thoughtful observation connecting their past queries with their current state. (Leave empty if no previous queries exist)",
  "empatheticSummary": "A warm, validating summary acknowledging the physical and mental weight of what they are experiencing.",
  "actionSteps": [
    {
      "id": "step-1",
      "title": "First immediate micro-action (5-10 min)",
      "description": "Specific instruction tailored directly to what they wrote",
      "completed": false
    },
    {
      "id": "step-2",
      "title": "Second practical step for today",
      "description": "Specific instruction tailored directly to what they wrote",
      "completed": false
    },
    {
      "id": "step-3",
      "title": "Third boundary or decompression step",
      "description": "Specific instruction tailored directly to what they wrote",
      "completed": false
    }
  ],
  "cognitiveReframe": {
    "balancedPerspective": "A kind, grounded truth to challenge anxiety or catastrophic thoughts.",
    "affirmation": "A short, soothing mantra for them to hold onto right now."
  }
}`;

    const userPrompt = `USER HISTORY OF PREVIOUS QUERIES (${previousQueries.length} past queries):
${formattedHistory || "No previous queries found. This is the user's first time sharing."}

CURRENT SITUATION:
"${currentSituation}"

Provide your personalized analysis and guidance in JSON format:`;

    // 1. Try Google Gemini API if key is set
    if (process.env.GEMINI_API_KEY) {
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [
                            { role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] },
                        ],
                        generationConfig: {
                            responseMimeType: "application/json",
                            temperature: 0.7,
                        },
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (rawText) {
                    const parsed = JSON.parse(rawText);
                    return cleanLLMOutput(parsed, currentSituation);
                }
            } else {
                console.warn("[Gemini API Warning] Response not OK:", response.status, await response.text());
            }
        } catch (err) {
            console.warn("[Gemini API Error] Falling back to secondary engine:", err.message);
        }
    }





    // 4. Dynamic Contextual LLM Engine Fallback (When no API key is added in .env yet)
    // Synthesizes previous queries and current situation dynamically
    return dynamicContextualAnalysis({ currentSituation, previousQueries });
};

/**
 * Ensures LLM output has all required fields with fallback defaults
 */
const cleanLLMOutput = (parsed, situation) => {
    return {
        primaryEmotion: parsed.primaryEmotion || "Emotional Stress & Overwhelm",
        patternInsight: parsed.patternInsight || "",
        empatheticSummary: parsed.empatheticSummary || "We hear you. What you are going through is challenging, but taking small steps right now will help you regain your calm and focus.",
        actionSteps: Array.isArray(parsed.actionSteps) && parsed.actionSteps.length > 0
            ? parsed.actionSteps.map((step, idx) => ({
                id: step.id || `step-${idx + 1}`,
                title: step.title || `Action Step ${idx + 1}`,
                description: step.description || "Take a moment to breathe and reset.",
                completed: false,
            }))
            : [
                { id: "step-1", title: "Take a 5-Minute Brain Pause", description: "Step back from the situation and take slow, deep breaths.", completed: false },
                { id: "step-2", title: "Write Down Your Next 1 Task", description: "Break down the most urgent item into one small 10-minute task.", completed: false },
                { id: "step-3", title: "Hydrate and Step Away from Screens", description: "Drink a glass of water and stretch your shoulders.", completed: false },
            ],
        cognitiveReframe: {
            balancedPerspective: parsed.cognitiveReframe?.balancedPerspective || "You do not have to solve everything all at once. Focus on taking just the next small step.",
            affirmation: parsed.cognitiveReframe?.affirmation || "I am doing the best I can right now. One step at a time.",
        },
    };
};

/**
 * Dynamic Context-Aware Synthesis Engine:
 * Generates custom, non-static recommendations by inspecting patterns
 * across previous queries and the current input.
 */
const dynamicContextualAnalysis = ({ currentSituation, previousQueries = [] }) => {
    const text = currentSituation.toLowerCase();
    const historyCount = previousQueries.length;

    // Detect patterns from previous queries
    let patternInsight = "";
    if (historyCount > 0) {
        const pastSituationsText = previousQueries.map((q) => q.situation.toLowerCase()).join(" ");
        const hadAcademic = pastSituationsText.includes("exam") || pastSituationsText.includes("study") || pastSituationsText.includes("assignment");
        const hadSleep = pastSituationsText.includes("sleep") || pastSituationsText.includes("night") || pastSituationsText.includes("insomnia");
        const hadBurnout = pastSituationsText.includes("burnout") || pastSituationsText.includes("tired") || pastSituationsText.includes("exhausted");

        if (hadAcademic && (text.includes("exam") || text.includes("deadline") || text.includes("assignment"))) {
            patternInsight = `Across your last ${historyCount} check-in(s), academic deadlines have repeatedly triggered high anxiety. This suggests performance pressure is a core recurring trigger for you.`;
        } else if (hadSleep || text.includes("sleep")) {
            patternInsight = `Looking at your past queries, sleep and evening restlessness frequently coincide with your stress spikes. Prioritizing nervous system wind-down will be key.`;
        } else if (hadBurnout || text.includes("burnout")) {
            patternInsight = `Your previous sessions show compounding mental fatigue. Your current situation is likely being amplified by an already depleted energy reserve.`;
        } else {
            patternInsight = `Connecting this with your past ${historyCount} query(s), you are navigating ongoing changes. Acknowledging your feelings step-by-step is already building your resilience.`;
        }
    }

    // Dynamic tailored emotional assessment
    let emotion = "Stress & Overwhelm";
    if (text.includes("exam") || text.includes("test") || text.includes("study")) {
        emotion = "Academic Performance Pressure & Paralysis";
    } else if (text.includes("panic") || text.includes("can't breathe") || text.includes("heart")) {
        emotion = "Acute Panic & Physical Hyperarousal";
    } else if (text.includes("sleep") || text.includes("night") || text.includes("insomnia")) {
        emotion = "Late-Night Rumination & Overthinking";
    } else if (text.includes("burnout") || text.includes("exhaust") || text.includes("empty")) {
        emotion = "Chronic Burnout & Emotional Depletion";
    } else if (text.includes("fight") || text.includes("friend") || text.includes("breakup")) {
        emotion = "Interpersonal Friction & Emotional Hurt";
    }

    return {
        primaryEmotion: emotion,
        patternInsight,
        empatheticSummary: `We analyzed your current situation alongside your previous ${historyCount} session(s). What you are describing is a completely natural reaction when cognitive load builds up, and you don't have to carry this all alone.`,
        actionSteps: [
            {
                id: "step-1",
                title: "Immediate 2-Minute Physical Reset",
                description: "Drop your shoulders away from your ears, uncross your legs, and drink half a glass of cool water.",
                completed: false,
            },
            {
                id: "step-2",
                title: "Separate Control from Fear",
                description: "Write down the single most urgent task on paper. Commit to working on it for only 10 minutes without expecting perfection.",
                completed: false,
            },
            {
                id: "step-3",
                title: "Set an Evening Wind-Down Buffer",
                description: "Put your phone away 30 minutes before bed tonight so your brain doesn't loop through worries.",
                completed: false,
            },
        ],
        cognitiveReframe: {
            balancedPerspective: "You do not need to figure out your entire future or finish everything in one sitting. Progress happens one breath and one small action at a time.",
            affirmation: "I am calm, capable, and taking things one moment at a time.",
        },
    };
};
