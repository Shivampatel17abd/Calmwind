const STORAGE_KEY = "calmwind_health_history_v1";

export const INITIAL_TRACKER_DATA = {
  mood: "Good",
  stress: 4,
  anxiety: 3,
  focusOverwhelm: "Manageable",
  sleepHours: 7,
  sleepQuality: "Good",
  energy: "Moderate",
  exercise: "Sometimes",
  socialSupport: "Yes",
  selfCare: "Balanced",
  concerns: "",
};

export const WELLNESS_DIMENSIONS = [
  {
    label: "Emotional State",
    value: "Mood & Calm",
    sublabel: "Feelings & worry levels",
    tone: "sage",
    iconName: "Heart",
  },
  {
    label: "Stress Load",
    value: "Daily Pressure",
    sublabel: "Tension & mental focus",
    tone: "warm",
    iconName: "Activity",
  },
  {
    label: "Sleep & Rest",
    value: "Recovery",
    sublabel: "Hours & rest quality",
    tone: "softSage",
    iconName: "Moon",
  },
  {
    label: "Support & Habits",
    value: "Daily Rhythm",
    sublabel: "Movement & connection",
    tone: "sage",
    iconName: "Smile",
  },
];

export const MOOD_OPTIONS = [
  { value: "Very good", label: "Very Good", emoji: "😄", score: 100 },
  { value: "Good", label: "Good", emoji: "🙂", score: 80 },
  { value: "Neutral", label: "Neutral", emoji: "😐", score: 60 },
  { value: "Sad", label: "Low", emoji: "😔", score: 35 },
  { value: "Very low", label: "Very Low", emoji: "😞", score: 15 },
];

export const FOCUS_OPTIONS = [
  { value: "Clear", label: "Clear & focused", score: 100 },
  { value: "Manageable", label: "Manageable", score: 78 },
  { value: "Scattered", label: "Scattered / distracted", score: 50 },
  { value: "Overwhelmed", label: "Overwhelmed / frozen", score: 22 },
];

export const LIFESTYLE_QUESTIONS = [
  {
    field: "sleepQuality",
    label: "6. How would you describe your sleep quality?",
    subtitle: "Think about how rested you felt waking up over the past few days.",
    options: [
      { value: "Excellent", label: "Excellent", score: 100 },
      { value: "Good", label: "Good", score: 80 },
      { value: "Average", label: "Fair", score: 52 },
      { value: "Poor", label: "Poor", score: 22 },
    ],
  },
  {
    field: "energy",
    label: "7. How is your daytime energy level?",
    options: [
      { value: "High", label: "High & steady", score: 95 },
      { value: "Moderate", label: "Moderate", score: 72 },
      { value: "Low", label: "Low", score: 38 },
      { value: "Exhausted", label: "Exhausted", score: 15 },
    ],
  },
  {
    field: "exercise",
    label: "8. How often have you moved or exercised lately?",
    options: [
      { value: "Daily", label: "Daily", score: 100 },
      { value: "Sometimes", label: "A few times a week", score: 72 },
      { value: "Rarely", label: "Rarely", score: 42 },
      { value: "Never", label: "Not at all", score: 20 },
    ],
  },
  {
    field: "socialSupport",
    label: "9. Do you have someone supportive you can talk to?",
    subtitle: "Friends, family, peers, or a mentor you feel safe opening up to.",
    options: [
      { value: "Yes", label: "Yes, always", score: 100 },
      { value: "Sometimes", label: "Sometimes", score: 62 },
      { value: "No", label: "Not right now", score: 22 },
    ],
  },
  {
    field: "selfCare",
    label: "10. How have your meals, hydration, and breaks been?",
    options: [
      { value: "Balanced", label: "Consistent & balanced", score: 95 },
      { value: "Irregular", label: "Somewhat irregular", score: 58 },
      { value: "Neglected", label: "Mostly skipped", score: 22 },
    ],
  },
];

function getOptionScore(options, value, fallback = 60) {
  const match = options.find((opt) => opt.value === value);
  return match ? match.score : fallback;
}

function getSleepDurationScore(hours) {
  if (hours >= 7 && hours <= 9) return 100;
  if (hours >= 6 && hours < 7) return 75;
  if (hours > 9 && hours <= 10) return 78;
  if (hours >= 5 && hours < 6) return 48;
  if (hours > 10) return 60;
  return 22;
}

function getDomainLabel(score) {
  if (score >= 78) return { text: "Strong", tone: "sage" };
  if (score >= 58) return { text: "Steady", tone: "softSage" };
  if (score >= 38) return { text: "Strained", tone: "warm" };
  return { text: "Needs Care", tone: "alert" };
}

function getStatusTier(score, hasHighRiskCombo) {
  if (score >= 78 && !hasHighRiskCombo) {
    return {
      status: "Flourishing & Balanced",
      badgeLabel: "Healthy & Steady",
      tone: "sage",
      urgencyLevel: "low",
      summary:
        "Your emotional balance, rest, and daily routines look grounded right now. Keep protecting the small habits that help you feel steady.",
    };
  }
  if (score >= 58 && !hasHighRiskCombo) {
    return {
      status: "Generally Steady (Mild Strain)",
      badgeLabel: "Mild Strain",
      tone: "softSage",
      urgencyLevel: "mild",
      summary:
        "You are coping fairly well overall, though one or two areas—such as stress, rest, or energy—show early signs of strain worth tending to gently.",
    };
  }
  if (score >= 38) {
    return {
      status: "Strained (Needs Gentle Care)",
      badgeLabel: "Elevated Strain",
      tone: "warm",
      urgencyLevel: "moderate",
      summary:
        "Your responses point to noticeable mental or physical fatigue right now. Slowing your pace, easing expectations, and checking in with someone you trust can help lighten the load.",
    };
  }
  return {
    status: "High Distress (Support Recommended)",
    badgeLabel: "Needs Support",
    tone: "alert",
    urgencyLevel: "high",
    summary:
      "You seem to be carrying a heavy emotional load right now. Please remember you do not have to carry this alone—connecting with a trusted person, campus counselor, or helpline is a caring next step.",
  };
}

function buildInsights(form, scores) {
  const observations = [];
  const recommendations = [];

  // Mood & Emotional balance
  if (form.mood === "Sad" || form.mood === "Very low") {
    observations.push("You reported feeling emotionally low or heavy lately.");
    recommendations.push(
      "Give yourself permission to take today slowly and share how you feel with someone safe."
    );
  } else if (form.mood === "Neutral") {
    observations.push("Your mood feels neutral or somewhat flat right now.");
  } else {
    observations.push("Your recent mood is holding in a positive, steady place.");
  }

  // Stress & Focus
  if (form.stress >= 7) {
    observations.push(`Your stress level (${form.stress}/10) is elevated.`);
    recommendations.push(
      "Try a 4-7-8 breathing cycle and break your next task into a single 10-minute step."
    );
  } else if (form.stress >= 4) {
    observations.push(`You are carrying moderate daily stress (${form.stress}/10).`);
    recommendations.push(
      "Schedule a short 10-minute screen-free pause between study or work blocks."
    );
  } else {
    observations.push(`Your stress level (${form.stress}/10) is currently well managed.`);
  }

  if (form.focusOverwhelm === "Overwhelmed" || form.focusOverwhelm === "Scattered") {
    observations.push("Mental overwhelm or scattered focus may be adding to your cognitive load.");
    recommendations.push(
      "Write down everything on your mind and pick only one priority for the next hour."
    );
  }

  // Anxiety
  if (form.anxiety >= 7) {
    observations.push(`Anxiety feels frequent or intense (${form.anxiety}/10) at the moment.`);
    recommendations.push(
      "Use a 5-4-3-2-1 sensory grounding exercise and consider speaking with a campus counselor."
    );
  } else if (form.anxiety >= 4) {
    observations.push(`Some anxious thoughts are present (${form.anxiety}/10).`);
    recommendations.push(
      "Spend 5 minutes journaling worries onto paper so they don't keep looping mentally."
    );
  }

  // Sleep & Energy
  if (form.sleepHours < 6) {
    observations.push(
      `Your average sleep (${form.sleepHours} hrs) is below the restorative 7–9 hour range.`
    );
    recommendations.push(
      "Dim screens 30 minutes before bed and aim for a consistent lights-out window tonight."
    );
  } else if (form.sleepHours >= 7 && form.sleepHours <= 9) {
    observations.push(
      `Your sleep duration (${form.sleepHours} hrs) falls right in the healthy adult range.`
    );
  }

  if (form.sleepQuality === "Poor" || form.energy === "Low" || form.energy === "Exhausted") {
    observations.push("Poor rest quality or low energy is reducing your daily recovery.");
    recommendations.push(
      "Prioritize hydration, regular meals, and an earlier evening wind-down routine tonight."
    );
  }

  // Movement, Support & Self-Care
  if (form.exercise === "Never" || form.exercise === "Rarely") {
    recommendations.push(
      "Try a gentle 10–15 minute outdoor walk or light stretching to release built-up tension."
    );
  }

  if (form.socialSupport === "No") {
    observations.push("Feeling without immediate social support can make stress feel heavier.");
    recommendations.push(
      "Reach out to a classmate, family member, or campus support group—even a brief text helps."
    );
  }

  if (form.selfCare === "Neglected") {
    recommendations.push(
      "Start small: drink a full glass of water and have a nourishing meal before your next task."
    );
  }

  // Optional context reflection from notes
  const note = (form.concerns || "").toLowerCase();
  if (note.trim()) {
    if (note.includes("exam") || note.includes("study") || note.includes("deadline") || note.includes("assignment")) {
      observations.push("Academic deadlines or exam pressure appear to be weighing on your mind.");
      recommendations.push(
        "Separate effort from perfection—set a timer for 20 minutes on one small sub-topic."
      );
    } else if (note.includes("sleep") || note.includes("night") || note.includes("overthink")) {
      observations.push("Evening overthinking or sleep disruption stood out in your notes.");
    } else if (note.includes("lonely") || note.includes("alone") || note.includes("friend") || note.includes("family")) {
      observations.push("Interpersonal stress or feeling disconnected was noted in your reflection.");
    } else if (note.includes("tired") || note.includes("burnout") || note.includes("exhaust")) {
      observations.push("Signs of ongoing fatigue or burnout came through in your reflection.");
    }
  }

  if (recommendations.length === 0 || scores.overall >= 80) {
    recommendations.push(
      "Keep doing what works—maintain your steady sleep schedule, movement, and check-ins."
    );
  }

  return {
    observations: observations.slice(0, 5),
    recommendations: recommendations.slice(0, 5),
  };
}

export function evaluateMentalHealth(form) {
  const moodScore = getOptionScore(MOOD_OPTIONS, form.mood, 60);
  const focusScore = getOptionScore(FOCUS_OPTIONS, form.focusOverwhelm, 70);
  const stressInverse = Math.round(((10 - form.stress) / 9) * 100);
  const anxietyInverse = Math.round(((10 - form.anxiety) / 9) * 100);

  const sleepDurationScore = getSleepDurationScore(form.sleepHours);
  const sleepQualityScore = getOptionScore(
    LIFESTYLE_QUESTIONS[0].options,
    form.sleepQuality,
    60
  );
  const energyScore = getOptionScore(
    LIFESTYLE_QUESTIONS[1].options,
    form.energy,
    60
  );
  const exerciseScore = getOptionScore(
    LIFESTYLE_QUESTIONS[2].options,
    form.exercise,
    60
  );
  const supportScore = getOptionScore(
    LIFESTYLE_QUESTIONS[3].options,
    form.socialSupport,
    60
  );
  const selfCareScore = getOptionScore(
    LIFESTYLE_QUESTIONS[4].options,
    form.selfCare,
    60
  );

  const emotionalScore = Math.round(
    moodScore * 0.45 + anxietyInverse * 0.35 + focusScore * 0.2
  );
  const stressResilienceScore = Math.round(
    stressInverse * 0.65 + focusScore * 0.35
  );
  const restRecoveryScore = Math.round(
    sleepDurationScore * 0.38 + sleepQualityScore * 0.34 + energyScore * 0.28
  );
  const habitsSupportScore = Math.round(
    exerciseScore * 0.3 + supportScore * 0.4 + selfCareScore * 0.3
  );

  const overallScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        emotionalScore * 0.35 +
          stressResilienceScore * 0.25 +
          restRecoveryScore * 0.25 +
          habitsSupportScore * 0.15
      )
    )
  );

  const hasHighRiskCombo =
    form.mood === "Very low" && (form.stress >= 8 || form.anxiety >= 8);

  const tier = getStatusTier(overallScore, hasHighRiskCombo);
  const { observations, recommendations } = buildInsights(form, {
    overall: overallScore,
  });

  const domainScores = [
    {
      key: "emotional",
      label: "Emotional Balance",
      score: emotionalScore,
      ...getDomainLabel(emotionalScore),
    },
    {
      key: "stress",
      label: "Stress Resilience",
      score: stressResilienceScore,
      ...getDomainLabel(stressResilienceScore),
    },
    {
      key: "rest",
      label: "Rest & Recovery",
      score: restRecoveryScore,
      ...getDomainLabel(restRecoveryScore),
    },
    {
      key: "habits",
      label: "Habits & Support",
      score: habitsSupportScore,
      ...getDomainLabel(habitsSupportScore),
    },
  ];

  const moodLabel =
    MOOD_OPTIONS.find((opt) => opt.value === form.mood)?.label || form.mood;
  const supportLabel =
    form.socialSupport === "Yes"
      ? "Available"
      : form.socialSupport === "No"
        ? "Limited"
        : "Sometimes";

  const snapshotMetrics = [
    {
      label: "Mood",
      value: moodLabel,
      sublabel: "Emotional tone",
      tone: moodScore >= 60 ? "sage" : "warm",
      iconName: "Smile",
    },
    {
      label: "Stress",
      value: `${form.stress}/10`,
      sublabel: form.stress >= 7 ? "Elevated" : form.stress >= 4 ? "Moderate" : "Gentle",
      tone: form.stress >= 7 ? "warm" : "sage",
      iconName: "Activity",
    },
    {
      label: "Anxiety",
      value: `${form.anxiety}/10`,
      sublabel: form.anxiety >= 7 ? "Frequent" : form.anxiety >= 4 ? "Noticeable" : "Calm",
      tone: form.anxiety >= 7 ? "warm" : "softSage",
      iconName: "Brain",
    },
    {
      label: "Sleep",
      value: `${form.sleepHours} hrs`,
      sublabel: `${form.sleepQuality} quality`,
      tone: sleepDurationScore >= 75 ? "sage" : "warm",
      iconName: "Moon",
    },
    {
      label: "Energy",
      value: form.energy,
      sublabel: "Daytime vitality",
      tone: energyScore >= 65 ? "softSage" : "warm",
      iconName: "Sun",
    },
    {
      label: "Support",
      value: supportLabel,
      sublabel: "Trusted connection",
      tone: form.socialSupport === "No" ? "warm" : "sage",
      iconName: "Users",
    },
  ];

  const now = new Date();

  return {
    id: `cw-${now.getTime()}`,
    score: overallScore,
    moodLabel,
    ...tier,
    domainScores,
    snapshotMetrics,
    observations,
    recommendations,
    needsSupportNotice: tier.urgencyLevel === "moderate" || tier.urgencyLevel === "high",
    concerns: form.concerns.trim(),
    date: now.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export function loadCheckInHistory() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCheckInHistory(entry) {
  try {
    const existing = loadCheckInHistory();
    const compactEntry = {
      id: entry.id,
      date: entry.date,
      time: entry.time,
      score: entry.score,
      status: entry.status,
      badgeLabel: entry.badgeLabel,
      tone: entry.tone,
      mood: entry.mood,
      sleepHours: entry.sleepHours,
      stress: entry.stress,
    };
    const updated = [compactEntry, ...existing].slice(0, 5);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearCheckInHistory() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage quota / privacy mode errors
  }
  return [];
}
