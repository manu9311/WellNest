// ============================================================
// FILE: src/data/healthData.js
// PURPOSE: Central data store for all health conditions and
//          their lifestyle-based solutions.
//
// HOW THIS FILE WORKS:
// - We export two things: CATEGORIES and CONDITIONS
// - CATEGORIES = groupings (digestive, hormonal, immunity etc.)
// - CONDITIONS = each health problem with its full solution plan
// - Every condition links back to a category via `categoryId`
// - This file is imported by components that need to display data
// ============================================================


// ─────────────────────────────────────────────
// SECTION 1: CATEGORIES
// Think of these as "tabs" or "folders"
// Each has an id, label, icon (emoji for now), and color theme
// ─────────────────────────────────────────────

export const CATEGORIES = [
  {
    id: "digestive",
    label: "Digestive Health",
    icon: "🫁",
    color: "#F97316", // orange
    description: "Gut, stomach, and digestive tract conditions",
  },
  {
    id: "hormonal",
    label: "Hormonal & Reproductive",
    icon: "🌸",
    color: "#EC4899", // pink
    description: "Hormonal imbalances, PCOS, thyroid, and more",
  },
  {
    id: "immunity",
    label: "Immunity & Inflammation",
    icon: "🛡️",
    color: "#10B981", // green
    description: "Low immunity, autoimmune tendencies, inflammation",
  },
  {
    id: "mental",
    label: "Mental & Nervous System",
    icon: "🧠",
    color: "#8B5CF6", // purple
    description: "Stress, anxiety, brain fog, sleep issues",
  },
  {
    id: "metabolic",
    label: "Metabolic Health",
    icon: "⚡",
    color: "#3B82F6", // blue
    description: "Blood sugar, weight, cholesterol, energy",
  },
  {
    id: "musculoskeletal",
    label: "Bones, Joints & Muscles",
    icon: "🦴",
    color: "#EF4444", // red
    description: "Joint pain, back pain, muscle stiffness",
  },
  {
    id: "skin",
    label: "Skin & Hair",
    icon: "✨",
    color: "#F59E0B", // amber
    description: "Acne, hair fall, eczema, psoriasis",
  },
];


// ─────────────────────────────────────────────
// SECTION 2: CONDITIONS
// Each condition object has:
//   id          → unique string key
//   name        → display name
//   categoryId  → links to CATEGORIES above
//   tagline     → one-line description
//   severity    → "mild" | "moderate" | "serious"
//   symptoms    → string[] — common symptoms
//   rootCauses  → string[] — lifestyle root causes
//   plan        → the full lifestyle solution plan (see structure below)
//
// plan structure:
//   yoga        → { title, poses: [{ name, duration, benefit }] }
//   diet        → { include: string[], avoid: string[], tips: string[] }
//   sleep       → { hours, tips: string[] }
//   habits      → string[]  — daily habit recommendations
//   avoid       → string[]  — things to avoid in lifestyle
//   supplements → string[]  — natural supplements (not medicines)
// ─────────────────────────────────────────────

export const CONDITIONS = [

  // ══════════════════════════════════
  // DIGESTIVE
  // ══════════════════════════════════

  {
    id: "bloating",
    name: "Bloating",
    categoryId: "digestive",
    tagline: "Excess gas and abdominal distension after meals",
    severity: "mild",
    symptoms: [
      "Tight or swollen abdomen",
      "Excess gas or burping",
      "Discomfort after eating",
      "Feeling full quickly",
    ],
    rootCauses: [
      "Eating too fast",
      "Excess refined carbs and sugar",
      "Food intolerances (lactose, gluten)",
      "Imbalanced gut bacteria",
      "Stress and anxiety",
    ],
    plan: {
      yoga: {
        title: "Gas-relieving & digestive yoga sequence",
        poses: [
          { name: "Pawanmuktasana (Wind-Relieving Pose)", duration: "1 min each side", benefit: "Directly releases trapped gas from intestines" },
          { name: "Apanasana (Knees-to-Chest)", duration: "2 mins", benefit: "Massages the digestive organs" },
          { name: "Supta Matsyendrasana (Supine Twist)", duration: "1 min each side", benefit: "Wrings out the gut, stimulates digestion" },
          { name: "Balasana (Child's Pose)", duration: "2 mins", benefit: "Calms nervous system, compresses abdomen gently" },
          { name: "Cat-Cow (Marjariasana)", duration: "2 mins", benefit: "Mobilises spine and massages digestive tract" },
        ],
      },
      diet: {
        include: [
          "Warm water with lemon first thing in the morning",
          "Cooked vegetables over raw (easier to digest)",
          "Ginger tea after meals",
          "Fermented foods: curd, buttermilk, idli, kimchi",
          "Cumin, fennel seeds, ajwain in cooking",
          "Papaya and pineapple (digestive enzymes)",
        ],
        avoid: [
          "Carbonated drinks",
          "Beans and lentils without soaking first",
          "Cruciferous vegetables (broccoli, cabbage) in excess",
          "Artificial sweeteners (sorbitol, xylitol)",
          "Eating while distracted or watching screens",
          "Cold water during or after meals",
        ],
        tips: [
          "Eat slowly — put your fork down between bites",
          "Don't skip meals; eat at consistent times",
          "Try a 3-day elimination of dairy or gluten to test intolerance",
        ],
      },
      sleep: {
        hours: "7–8",
        tips: [
          "Don't eat within 2–3 hours of bedtime",
          "Sleep on your left side — helps food move through colon",
        ],
      },
      habits: [
        "Walk for 10–15 minutes after every meal",
        "Chew each bite 20–30 times",
        "Practice belly breathing for 5 minutes after meals",
        "Keep a food diary to spot trigger foods",
      ],
      avoid: [
        "Eating when stressed or rushing",
        "Lying down immediately after meals",
        "Chewing gum (you swallow extra air)",
      ],
      supplements: [
        "Probiotics (Lactobacillus strains)",
        "Digestive enzymes with meals",
        "Fennel seed tea",
        "Triphala (Ayurvedic gut tonic)",
      ],
    },
  },

  {
    id: "gerd",
    name: "GERD / Acid Reflux",
    categoryId: "digestive",
    tagline: "Stomach acid flowing back into the oesophagus",
    severity: "moderate",
    symptoms: [
      "Burning in chest (heartburn)",
      "Sour taste in mouth",
      "Difficulty swallowing",
      "Chronic cough or hoarseness",
      "Regurgitation of food",
    ],
    rootCauses: [
      "Overeating or eating too fast",
      "High-fat, spicy, or acidic foods",
      "Lying down after meals",
      "Obesity and excess abdominal pressure",
      "Smoking and alcohol",
      "Stress weakening the LES (lower oesophageal sphincter)",
    ],
    plan: {
      yoga: {
        title: "Reflux-calming yoga (NO inversions)",
        poses: [
          { name: "Vajrasana (Thunderbolt Pose)", duration: "5–10 mins after meals", benefit: "Only pose recommended directly after eating; boosts digestion" },
          { name: "Viparita Karani (Legs-up-the-wall) — modified", duration: "5 mins", benefit: "Calms nervous system without full inversion" },
          { name: "Setu Bandhasana (Bridge Pose) — gentle", duration: "3 sets", benefit: "Strengthens the diaphragm" },
          { name: "Marjariasana (Cat-Cow)", duration: "3 mins", benefit: "Mobilises digestive tract" },
        ],
      },
      diet: {
        include: [
          "Alkaline foods: bananas, melons, oats, leafy greens",
          "Coconut water and aloe vera juice",
          "Small, frequent meals (5–6 times a day)",
          "Warm non-acidic herbal teas: chamomile, licorice root",
          "Lean proteins: chicken, fish, tofu",
        ],
        avoid: [
          "Coffee, tea, and alcohol",
          "Tomatoes, citrus fruits, and vinegar",
          "Fried and fatty foods",
          "Chocolate and mint (relax the LES)",
          "Spicy food, especially at night",
          "Carbonated beverages",
        ],
        tips: [
          "Eat dinner at least 3 hours before bed",
          "Elevate head of bed by 6–8 inches",
          "Eat smaller portions — pressure is the enemy",
        ],
      },
      sleep: {
        hours: "7–8",
        tips: [
          "Elevate the head end of your bed or use a wedge pillow",
          "Sleep on your left side to reduce reflux",
          "Avoid late-night snacking",
        ],
      },
      habits: [
        "Maintain a healthy weight — even 5–10% reduction helps greatly",
        "Wear loose-fitting clothing around the abdomen",
        "Practice stress reduction daily (reflux worsens with stress)",
        "Log meals and symptoms to find personal triggers",
      ],
      avoid: [
        "Smoking",
        "Bending over or exercising right after meals",
        "Tight belts and waistbands",
        "NSAIDs like ibuprofen (irritate stomach lining)",
      ],
      supplements: [
        "DGL Licorice (Deglycyrrhizinated) before meals",
        "Slippery Elm powder",
        "Probiotics to restore gut balance",
        "Aloe vera juice (inner leaf, preservative-free)",
      ],
    },
  },

  {
    id: "ibs",
    name: "IBS (Irritable Bowel Syndrome)",
    categoryId: "digestive",
    tagline: "Chronic gut discomfort with alternating constipation and diarrhea",
    severity: "moderate",
    symptoms: [
      "Cramping and abdominal pain",
      "Bloating and gas",
      "Diarrhea, constipation, or both",
      "Mucus in stool",
      "Urgency to use bathroom",
    ],
    rootCauses: [
      "Gut-brain axis dysfunction",
      "Chronic stress and anxiety",
      "Gut microbiome imbalance",
      "Food sensitivities",
      "History of gut infections",
    ],
    plan: {
      yoga: {
        title: "Gut-brain calming yoga sequence",
        poses: [
          { name: "Balasana (Child's Pose)", duration: "3 mins", benefit: "Activates parasympathetic (rest-digest) nervous system" },
          { name: "Supta Baddha Konasana (Reclined Butterfly)", duration: "5 mins", benefit: "Deep relaxation for gut-brain axis" },
          { name: "Pawanmuktasana (Wind-Relieving)", duration: "2 mins each side", benefit: "Releases gas and intestinal tension" },
          { name: "Viparita Karani (Legs up the wall)", duration: "10 mins", benefit: "Powerful nervous system reset" },
          { name: "Savasana with belly breathing", duration: "10 mins", benefit: "Reduces cortisol, calms gut hypersensitivity" },
        ],
      },
      diet: {
        include: [
          "Low-FODMAP foods during flare-ups",
          "Soluble fibre: oats, psyllium husk, bananas",
          "Cooked and peeled vegetables",
          "Bone broth for gut lining repair",
          "Probiotic-rich foods: curd, kefir, fermented rice",
          "Peppermint tea (reduces spasms)",
        ],
        avoid: [
          "High-FODMAP foods: onion, garlic, wheat, apples, dairy",
          "Caffeine and alcohol",
          "Artificial sweeteners",
          "Processed and packaged foods",
          "Very spicy meals",
        ],
        tips: [
          "Try low-FODMAP diet for 4–6 weeks under guidance",
          "Reintroduce foods one at a time to identify triggers",
          "Eat at a table, never while working or stressed",
        ],
      },
      sleep: {
        hours: "7–9",
        tips: [
          "Irregular sleep worsens IBS — keep consistent sleep/wake times",
          "Manage stress before bed with journaling or yoga nidra",
        ],
      },
      habits: [
        "Practice mindful eating — no distractions during meals",
        "Exercise regularly (reduces gut transit time)",
        "Therapy or counselling — gut-brain connection is real",
        "Warmth on abdomen (hot water bottle) during cramps",
      ],
      avoid: [
        "Skipping meals",
        "Eating too quickly",
        "High-stress environments during meals",
        "Overuse of antibiotics (disrupts microbiome)",
      ],
      supplements: [
        "Peppermint oil capsules (enteric-coated)",
        "Psyllium husk (soluble fibre)",
        "L-Glutamine (gut lining repair)",
        "Probiotics: Bifidobacterium and Lactobacillus strains",
      ],
    },
  },

  // ══════════════════════════════════
  // HORMONAL
  // ══════════════════════════════════

  {
    id: "pcos",
    name: "PCOS",
    categoryId: "hormonal",
    tagline: "Polycystic ovarian syndrome — hormonal & metabolic imbalance",
    severity: "moderate",
    symptoms: [
      "Irregular or missed periods",
      "Weight gain, especially around abdomen",
      "Acne and oily skin",
      "Excess facial/body hair (hirsutism)",
      "Hair thinning on scalp",
      "Mood swings and fatigue",
    ],
    rootCauses: [
      "Insulin resistance",
      "Chronic stress elevating cortisol",
      "Sedentary lifestyle",
      "Processed food diet high in sugar",
      "Hormonal disruptors in environment",
      "Inflammation",
    ],
    plan: {
      yoga: {
        title: "Hormone-balancing yoga for PCOS",
        poses: [
          { name: "Baddha Konasana (Butterfly Pose)", duration: "3 mins", benefit: "Opens hips, stimulates ovaries and uterus" },
          { name: "Setu Bandhasana (Bridge Pose)", duration: "3 sets x 30 sec", benefit: "Stimulates thyroid, stretches reproductive organs" },
          { name: "Supta Baddha Konasana", duration: "5 mins", benefit: "Deep hip opening, reduces stress hormones" },
          { name: "Bhujangasana (Cobra Pose)", duration: "3 sets", benefit: "Stimulates adrenal glands, reduces cortisol" },
          { name: "Nadi Shodhana Pranayama", duration: "10 mins", benefit: "Balances left/right brain, regulates hormones" },
          { name: "Yoga Nidra", duration: "20 mins", benefit: "Deepest stress reduction — resets hormonal axis" },
        ],
      },
      diet: {
        include: [
          "Low glycaemic index (GI) foods: millets, oats, legumes",
          "Anti-inflammatory foods: turmeric, ginger, berries",
          "Cruciferous vegetables: broccoli, cauliflower (oestrogen metabolism)",
          "Healthy fats: avocado, nuts, seeds, ghee",
          "Flaxseeds (lignans help balance oestrogen)",
          "Spearmint tea (reduces androgens naturally)",
          "Cinnamon (improves insulin sensitivity)",
        ],
        avoid: [
          "Refined sugar and white flour",
          "Dairy (especially conventional milk — may worsen androgens)",
          "Processed and packaged snacks",
          "Soy in excess",
          "Alcohol",
          "Seed oils (sunflower, canola, corn oil)",
        ],
        tips: [
          "Eat protein with every meal to stabilise blood sugar",
          "Don't skip breakfast — regulates cortisol rhythm",
          "Eat within 1 hour of waking up",
        ],
      },
      sleep: {
        hours: "7–9",
        tips: [
          "Sleep before midnight — growth hormone peaks 10pm–2am",
          "No screens 1 hour before bed (melatonin protection)",
          "Poor sleep directly worsens insulin resistance",
        ],
      },
      habits: [
        "Strength training 3x per week (builds insulin sensitivity)",
        "30-minute walk after dinner every night",
        "Track your cycle — even irregularly (apps like Clue, Flo)",
        "Stress reduction is non-negotiable — cortisol fuels PCOS",
        "Seed cycling: flax+pumpkin seeds in follicular phase, sesame+sunflower in luteal phase",
      ],
      avoid: [
        "Crash dieting or extreme calorie restriction (worsens hormones)",
        "Over-exercising or HIIT every day (raises cortisol)",
        "Plastics for food storage (xenoestrogens)",
        "Conventional cosmetics with parabens and phthalates",
      ],
      supplements: [
        "Inositol (Myo-inositol + D-chiro inositol 40:1 ratio)",
        "Vitamin D3 + K2",
        "Magnesium glycinate",
        "Omega-3 fatty acids",
        "Spearmint tea (2 cups/day)",
        "Ashwagandha (adaptogen for cortisol)",
      ],
    },
  },

  {
    id: "hypothyroidism",
    name: "Hypothyroidism",
    categoryId: "hormonal",
    tagline: "Underactive thyroid causing slow metabolism and fatigue",
    severity: "moderate",
    symptoms: [
      "Extreme fatigue and sluggishness",
      "Weight gain despite normal eating",
      "Cold intolerance",
      "Brain fog and poor memory",
      "Hair loss and dry skin",
      "Constipation",
      "Depression",
    ],
    rootCauses: [
      "Autoimmune (Hashimoto's thyroiditis)",
      "Iodine deficiency",
      "Chronic stress",
      "Environmental toxins",
      "Gut dysbiosis (70% of immune system is in gut)",
      "Nutrient deficiencies (selenium, zinc, iron)",
    ],
    plan: {
      yoga: {
        title: "Thyroid-stimulating yoga sequence",
        poses: [
          { name: "Sarvangasana (Shoulder Stand)", duration: "2–3 mins", benefit: "Direct stimulation of thyroid gland through chin lock" },
          { name: "Halasana (Plow Pose)", duration: "1–2 mins", benefit: "Continued pressure on thyroid region" },
          { name: "Matsyasana (Fish Pose)", duration: "1–2 mins", benefit: "Counter-pose, stretches throat and stimulates thyroid" },
          { name: "Ustrasana (Camel Pose)", duration: "3 sets", benefit: "Opens throat chakra region, thyroid activation" },
          { name: "Ujjayi Pranayama", duration: "10 mins", benefit: "Throat vibration directly activates thyroid tissue" },
          { name: "Simhasana (Lion Pose)", duration: "5 reps", benefit: "Stimulates throat and thyroid" },
        ],
      },
      diet: {
        include: [
          "Iodine-rich foods: seaweed (in moderation), iodised salt, seafood",
          "Selenium: Brazil nuts (2/day), sunflower seeds, fish",
          "Zinc: pumpkin seeds, chickpeas, meat",
          "Iron-rich foods: spinach, lentils, beetroot",
          "Anti-inflammatory diet: colourful vegetables, berries",
          "Coconut oil (supports thyroid metabolism)",
        ],
        avoid: [
          "Raw cruciferous vegetables in large amounts (goitrogens) — cook them instead",
          "Soy products (interfere with thyroid hormone absorption)",
          "Gluten (especially if Hashimoto's — often linked)",
          "Processed and ultra-processed foods",
          "Fluoride and chlorine (block iodine receptors) — use filtered water",
        ],
        tips: [
          "Take thyroid medication (if prescribed) on empty stomach",
          "Don't take calcium or iron supplements within 4 hours of thyroid meds",
          "Consider gluten-free trial if Hashimoto's is confirmed",
        ],
      },
      sleep: {
        hours: "8–9",
        tips: [
          "Prioritise sleep — thyroid hormones regulate sleep-wake cycle",
          "Keep room cool and dark",
          "Avoid caffeine after noon",
        ],
      },
      habits: [
        "Morning sunlight exposure (regulates circadian rhythm and supports thyroid)",
        "Gentle daily movement — overexercising depletes thyroid",
        "Reduce toxic load: filter water, switch to natural cleaning products",
        "Stress management is crucial — cortisol suppresses T3 (active thyroid hormone)",
      ],
      avoid: [
        "Extreme dieting or fasting",
        "Plastic water bottles and food containers",
        "Excess fluoride (toothpaste, tap water)",
        "Overexercising when already fatigued",
      ],
      supplements: [
        "Selenium 200mcg/day",
        "Zinc 15–30mg/day",
        "Vitamin D3",
        "Iron (test before supplementing)",
        "Ashwagandha (supports T3/T4 conversion)",
        "B-complex vitamins",
      ],
    },
  },

  // ══════════════════════════════════
  // IMMUNITY
  // ══════════════════════════════════

  {
    id: "low_immunity",
    name: "Low Immunity",
    categoryId: "immunity",
    tagline: "Frequent infections, slow recovery, and constant fatigue",
    severity: "mild",
    symptoms: [
      "Frequent colds, coughs, and infections",
      "Slow wound healing",
      "Always feeling tired",
      "Digestive problems",
      "Recurring skin problems",
    ],
    rootCauses: [
      "Poor sleep",
      "Chronic stress",
      "Nutrient deficiencies (Vit D, C, Zinc)",
      "Sedentary lifestyle",
      "Gut dysbiosis",
      "Processed food diet",
    ],
    plan: {
      yoga: {
        title: "Immunity-boosting yoga sequence",
        poses: [
          { name: "Surya Namaskar (Sun Salutation)", duration: "12 rounds daily", benefit: "Full-body activation, lymphatic flow stimulation" },
          { name: "Viparita Karani (Legs up the wall)", duration: "10 mins", benefit: "Drains lymph, reduces inflammation" },
          { name: "Setu Bandhasana (Bridge)", duration: "5 reps", benefit: "Stimulates thymus gland (immune organ)" },
          { name: "Kapalabhati Pranayama", duration: "5 mins", benefit: "Clears respiratory tract, oxygenates blood" },
          { name: "Bhramari (Humming Bee Breath)", duration: "5 mins", benefit: "Creates nitric oxide, kills pathogens in airways" },
        ],
      },
      diet: {
        include: [
          "Vitamin C: amla, bell peppers, citrus, guava",
          "Zinc: pumpkin seeds, chickpeas, cashews",
          "Vitamin D: sunlight, fatty fish, egg yolk",
          "Antioxidants: berries, dark leafy greens, turmeric",
          "Garlic and ginger (natural antimicrobials)",
          "Mushrooms: shiitake, reishi (immune modulators)",
          "Fermented foods for gut immunity",
        ],
        avoid: [
          "Sugar (suppresses white blood cells for 4–6 hours after consumption)",
          "Alcohol",
          "Ultra-processed and junk food",
          "Seed oils high in omega-6",
        ],
        tips: [
          "Golden milk at night: turmeric + black pepper + milk",
          "Eat a rainbow — each colour = different immune-supporting phytonutrient",
          "Prioritise whole foods over supplements first",
        ],
      },
      sleep: {
        hours: "7–9",
        tips: [
          "Sleep is when your immune system rebuilds — it's non-negotiable",
          "Cytokines (immune proteins) are produced during deep sleep",
          "Even one night of poor sleep reduces NK cell activity by 70%",
        ],
      },
      habits: [
        "30 minutes of moderate exercise daily (not too intense)",
        "Cold shower or contrast therapy (trains immune response)",
        "Get 20 minutes of morning sunlight for Vitamin D",
        "Practice stress reduction — cortisol is immune-suppressive",
        "Maintain oral hygiene (oral bacteria affect overall immunity)",
      ],
      avoid: [
        "Chronic stress without management",
        "Sitting for long hours without movement",
        "Overuse of antibiotics",
        "Smoking",
      ],
      supplements: [
        "Vitamin D3 (2000–4000 IU/day)",
        "Zinc (15–30mg/day)",
        "Vitamin C (500–1000mg/day)",
        "Probiotics",
        "Chyawanprash (Ayurvedic immune tonic)",
        "Tulsi/Holy Basil tea daily",
      ],
    },
  },

  // ══════════════════════════════════
  // MENTAL / NERVOUS SYSTEM
  // ══════════════════════════════════

  {
    id: "anxiety",
    name: "Anxiety & Chronic Stress",
    categoryId: "mental",
    tagline: "Persistent worry, tension, and nervous system overdrive",
    severity: "moderate",
    symptoms: [
      "Racing thoughts and constant worry",
      "Heart palpitations",
      "Tight chest and shallow breathing",
      "Difficulty sleeping",
      "Digestive issues",
      "Muscle tension and headaches",
    ],
    rootCauses: [
      "Overactivated fight-or-flight (sympathetic nervous system)",
      "Nutrient deficiencies (Magnesium, B vitamins)",
      "Blood sugar instability",
      "Gut-brain axis dysfunction",
      "Trauma or chronic stressors",
      "Overstimulation (screens, news, social media)",
    ],
    plan: {
      yoga: {
        title: "Nervous system regulation sequence",
        poses: [
          { name: "4-7-8 Breathing", duration: "5–10 mins", benefit: "Activates vagus nerve, shifts to parasympathetic in minutes" },
          { name: "Balasana (Child's Pose)", duration: "5 mins", benefit: "Forehead to earth = instant nervous system calming" },
          { name: "Viparita Karani (Legs up wall)", duration: "10–15 mins", benefit: "Most powerful parasympathetic activator in yoga" },
          { name: "Nadi Shodhana (Alternate Nostril Breathing)", duration: "10 mins", benefit: "Balances brain hemispheres, profound calming effect" },
          { name: "Yoga Nidra", duration: "20–30 mins", benefit: "Theta brainwave state — repairs nervous system" },
          { name: "Savasana", duration: "10 mins", benefit: "Integration and complete rest" },
        ],
      },
      diet: {
        include: [
          "Magnesium-rich foods: dark chocolate, almonds, spinach, pumpkin seeds",
          "Tryptophan: banana, turkey, eggs, dairy (serotonin precursor)",
          "Complex carbs: oats, sweet potato (raise serotonin)",
          "Omega-3: fatty fish, flaxseeds, walnuts (anti-inflammatory for brain)",
          "Chamomile, ashwagandha, passionflower teas",
        ],
        avoid: [
          "Caffeine (amplifies anxiety significantly)",
          "Alcohol (short-term relief, long-term anxiety increase)",
          "Sugar and refined carbs (blood sugar spikes → anxiety spikes)",
          "Processed foods with additives",
        ],
        tips: [
          "Never skip meals — blood sugar crashes worsen anxiety",
          "Eat protein at every meal for stable blood sugar",
          "Limit caffeine to one cup before noon, or cut entirely",
        ],
      },
      sleep: {
        hours: "8–9",
        tips: [
          "Consistent sleep schedule is the single best anxiety intervention",
          "Create a wind-down routine: no screens, warm shower, reading",
          "Magnesium glycinate at bedtime aids sleep and reduces anxiety",
        ],
      },
      habits: [
        "Morning routine with no phone for first 30 minutes",
        "Daily walk in nature — proven to reduce cortisol",
        "Journaling: write down 3 worries + action steps",
        "Cold showers (trains stress response resilience)",
        "Limit news and social media consumption",
        "Therapy or counselling (CBT is most evidence-based)",
      ],
      avoid: [
        "Doomscrolling and constant news",
        "Overcommitting and not setting boundaries",
        "Isolation — social connection reduces anxiety",
        "Caffeine and alcohol as coping tools",
      ],
      supplements: [
        "Magnesium glycinate (300–400mg at night)",
        "Ashwagandha (adaptogen for cortisol)",
        "L-Theanine (calm focus, pairs well with green tea)",
        "B-complex vitamins",
        "Omega-3 fatty acids",
        "Rhodiola Rosea (for stress resilience)",
      ],
    },
  },

  {
    id: "brain_fog",
    name: "Brain Fog",
    categoryId: "mental",
    tagline: "Mental cloudiness, poor concentration, and memory lapses",
    severity: "mild",
    symptoms: [
      "Difficulty concentrating",
      "Poor short-term memory",
      "Feeling mentally slow or cloudy",
      "Fatigue despite sleeping",
      "Word-finding difficulty",
    ],
    rootCauses: [
      "Poor sleep quality",
      "Nutritional deficiencies (B12, D, Omega-3, Iron)",
      "Blood sugar dysregulation",
      "Gut dysbiosis (gut-brain axis)",
      "Chronic inflammation",
      "Hypothyroidism",
      "Dehydration",
    ],
    plan: {
      yoga: {
        title: "Brain-activating and clarity sequence",
        poses: [
          { name: "Kapalabhati (Skull-shining breath)", duration: "5 mins", benefit: "Oxygenates brain, clears mental fog immediately" },
          { name: "Sirsasana (Headstand) or Adho Mukha (Downward Dog)", duration: "2–5 mins", benefit: "Increases blood flow to brain" },
          { name: "Bhramari Pranayama", duration: "5 mins", benefit: "Vibration stimulates brain, improves focus" },
          { name: "Surya Namaskar", duration: "10 rounds", benefit: "Full-body blood circulation boost" },
          { name: "Trataka (Candle gazing)", duration: "5 mins", benefit: "Trains focused attention, strengthens concentration" },
        ],
      },
      diet: {
        include: [
          "Omega-3 rich foods: fatty fish, flaxseeds, chia, walnuts",
          "B12 sources: eggs, meat, fish, fortified foods",
          "Iron: lentils, spinach, dates, meat",
          "Antioxidants: blueberries, dark chocolate, turmeric",
          "Hydration: 2.5–3 litres of water daily",
          "MCT oil or coconut oil (ketones fuel the brain)",
          "Lion's Mane mushroom",
        ],
        avoid: [
          "Sugar and refined carbs (glucose spikes → crashes → fog)",
          "Processed foods with additives and preservatives",
          "Alcohol",
          "Gluten (if sensitive — major cause of brain fog)",
          "Seed oils",
        ],
        tips: [
          "Eat a high-protein, high-fat breakfast — not sugar",
          "Test B12 and Vitamin D levels — deficiencies are very common",
          "Intermittent fasting can sharpen mental clarity for some",
        ],
      },
      sleep: {
        hours: "7–8",
        tips: [
          "Brain's glymphatic system cleans toxins only during deep sleep",
          "Aim for consistent wake time — even on weekends",
          "No alcohol — destroys deep sleep architecture",
        ],
      },
      habits: [
        "Exercise daily — BDNF (brain fertiliser) is released during movement",
        "Learn something new every day (neuroplasticity)",
        "Minimise multitasking",
        "Drink water first thing in the morning",
        "Get bloodwork done: B12, D3, Iron, Thyroid, HbA1c",
      ],
      avoid: [
        "Screens first thing in the morning",
        "Sedentary work without breaks",
        "Skipping meals or poor breakfast",
        "Chronic low-grade stress without intervention",
      ],
      supplements: [
        "Omega-3 DHA + EPA",
        "B12 (methylcobalamin form)",
        "Vitamin D3",
        "Lion's Mane mushroom extract",
        "Bacopa Monnieri (Brahmi)",
        "Alpha-GPC or CDP-Choline",
      ],
    },
  },

  // ══════════════════════════════════
  // METABOLIC
  // ══════════════════════════════════

  {
    id: "insulin_resistance",
    name: "Insulin Resistance",
    categoryId: "metabolic",
    tagline: "Cells stop responding to insulin, leading to blood sugar dysregulation",
    severity: "serious",
    symptoms: [
      "Weight gain especially around belly",
      "Energy crashes after meals",
      "Intense sugar cravings",
      "Brain fog",
      "Dark patches on skin (acanthosis nigricans)",
      "High fasting blood sugar",
    ],
    rootCauses: [
      "High sugar and refined carb diet",
      "Sedentary lifestyle",
      "Chronic stress (cortisol raises blood sugar)",
      "Poor sleep",
      "Excess visceral fat",
      "Gut microbiome imbalance",
    ],
    plan: {
      yoga: {
        title: "Metabolic and blood sugar regulating sequence",
        poses: [
          { name: "Surya Namaskar (brisk pace)", duration: "20 mins", benefit: "Burns glucose, improves insulin sensitivity acutely" },
          { name: "Naukasana (Boat Pose)", duration: "3 sets x 30 sec", benefit: "Strengthens core, stimulates pancreas" },
          { name: "Ardha Matsyendrasana (Half Spinal Twist)", duration: "1 min each side", benefit: "Massages pancreas and liver" },
          { name: "Mandukasana (Frog Pose)", duration: "3 x 1 min", benefit: "Direct pressure on pancreatic region" },
          { name: "Kapalabhati", duration: "10 mins", benefit: "Stimulates liver and pancreas, reduces fat" },
        ],
      },
      diet: {
        include: [
          "Low GI whole foods: millets, oats, legumes, vegetables",
          "Vinegar before meals (apple cider vinegar reduces glucose spike)",
          "Berberine-rich foods and spices: berberine supplement, cinnamon",
          "High-fibre foods (slow glucose absorption)",
          "Protein at every meal",
          "Healthy fats: avocado, olive oil, nuts",
        ],
        avoid: [
          "All refined sugar and sugary drinks",
          "White rice, bread, pasta in large amounts",
          "Fruit juices (high fructose)",
          "Alcohol",
          "Processed snacks and cereals",
        ],
        tips: [
          "Eat vegetables and protein BEFORE carbs in a meal",
          "Walk 10 minutes after every meal — blunts glucose spike by 30%",
          "No carbs alone — always pair with fat/protein/fibre",
        ],
      },
      sleep: {
        hours: "7–8",
        tips: [
          "Even one night of bad sleep causes temporary insulin resistance",
          "Sleep before midnight for optimal glucose metabolism",
        ],
      },
      habits: [
        "Strength training 3–4x per week (muscles are the largest glucose sink)",
        "Walk 8000–10000 steps daily",
        "Time-restricted eating (eat within a 8–10 hour window)",
        "Track fasting blood sugar weekly",
        "Reduce stress — cortisol directly raises blood glucose",
      ],
      avoid: [
        "Sedentary lifestyle",
        "Frequent snacking (keeps insulin elevated all day)",
        "Late-night eating",
        "Stress eating",
      ],
      supplements: [
        "Berberine (as effective as Metformin in studies)",
        "Magnesium (improves insulin receptor sensitivity)",
        "Chromium Picolinate",
        "Cinnamon extract",
        "Alpha-Lipoic Acid (ALA)",
        "Inositol",
      ],
    },
  },

  // ══════════════════════════════════
  // MUSCULOSKELETAL
  // ══════════════════════════════════

  {
    id: "back_pain",
    name: "Chronic Back Pain",
    categoryId: "musculoskeletal",
    tagline: "Persistent lower or upper back pain from posture, weakness, or inflammation",
    severity: "moderate",
    symptoms: [
      "Dull or sharp lower/upper back pain",
      "Stiffness on waking",
      "Pain that worsens with sitting",
      "Radiating pain to legs (sciatica)",
      "Muscle spasms",
    ],
    rootCauses: [
      "Prolonged sitting and poor posture",
      "Weak core muscles",
      "Tight hip flexors (from sitting)",
      "Inflammation from diet",
      "Stress and tension stored in body",
      "Nutrient deficiencies (Magnesium, D, K2)",
    ],
    plan: {
      yoga: {
        title: "Back pain relief and core strengthening sequence",
        poses: [
          { name: "Cat-Cow (Marjariasana)", duration: "5 mins", benefit: "Gentle spinal mobilisation, reduces stiffness" },
          { name: "Bitilasana-Marjariasana (slow)", duration: "5 mins", benefit: "Warms up the entire spine safely" },
          { name: "Balasana (Child's Pose)", duration: "3 mins", benefit: "Decompresses lumbar spine" },
          { name: "Supta Padangusthasana (Reclined leg raise)", duration: "1 min each side", benefit: "Stretches hamstrings, reduces back tension" },
          { name: "Setu Bandhasana (Bridge)", duration: "5 reps x 30 sec", benefit: "Strengthens glutes and lower back" },
          { name: "Ardha Pincha Mayurasana (Dolphin)", duration: "5 breaths x 3", benefit: "Builds shoulder and core strength safely" },
        ],
      },
      diet: {
        include: [
          "Anti-inflammatory foods: turmeric, ginger, omega-3",
          "Magnesium-rich foods (muscle relaxant): nuts, seeds, greens",
          "Collagen: bone broth, vitamin C for collagen synthesis",
          "Calcium + Vitamin D + K2 for bone strength",
        ],
        avoid: [
          "Inflammatory foods: seed oils, sugar, processed meats",
          "Excess alcohol (depletes magnesium)",
          "Nightshades if they worsen joint inflammation (for some)",
        ],
        tips: [
          "Anti-inflammatory diet is as effective as ibuprofen for chronic pain",
          "Stay hydrated — discs need water to maintain height and cushioning",
        ],
      },
      sleep: {
        hours: "7–8",
        tips: [
          "Sleep on your side with a pillow between knees (not face down)",
          "Invest in a supportive mattress — it directly affects spinal alignment",
          "Stretch before bed: cat-cow + child's pose",
        ],
      },
      habits: [
        "Set a timer to stand every 45 minutes when working",
        "Strengthen core with planks and dead bugs daily",
        "Stretch hip flexors daily (most back pain originates here)",
        "Ergonomic workstation setup",
        "Learn proper lifting mechanics",
      ],
      avoid: [
        "Sitting for more than 45 min without a break",
        "Wearing flip-flops or flat shoes long-term",
        "High heels for extended periods",
        "Sleeping on stomach",
      ],
      supplements: [
        "Magnesium glycinate (muscle relaxation)",
        "Vitamin D3 + K2 (bone health)",
        "Turmeric/Curcumin with piperine (anti-inflammatory)",
        "Collagen peptides",
        "Boswellia (potent anti-inflammatory for joints)",
      ],
    },
  },

  // ══════════════════════════════════
  // SKIN & HAIR
  // ══════════════════════════════════

  {
    id: "acne",
    name: "Acne & Hormonal Breakouts",
    categoryId: "skin",
    tagline: "Inflammatory skin condition driven by hormones, gut, and diet",
    severity: "mild",
    symptoms: [
      "Pimples, blackheads, whiteheads",
      "Cystic acne around jaw and chin",
      "Oily skin",
      "Scarring and pigmentation",
      "Breakouts around periods",
    ],
    rootCauses: [
      "Hormonal imbalance (androgens)",
      "High-glycaemic diet",
      "Dairy consumption",
      "Gut dysbiosis",
      "Liver congestion",
      "Stress and high cortisol",
    ],
    plan: {
      yoga: {
        title: "Detox and hormone-balancing sequence",
        poses: [
          { name: "Twisting poses: Ardha Matsyendrasana", duration: "1 min each side", benefit: "Detoxifies liver, balances hormones" },
          { name: "Inversions: Downward Dog, Legs up wall", duration: "5–10 mins", benefit: "Improves circulation to face, reduces inflammation" },
          { name: "Nadi Shodhana Pranayama", duration: "10 mins", benefit: "Balances hormones, reduces cortisol" },
          { name: "Sarvangasana (Shoulderstand)", duration: "3 mins", benefit: "Stimulates thyroid, balances hormones" },
        ],
      },
      diet: {
        include: [
          "Low GI foods: vegetables, legumes, whole grains",
          "Zinc-rich foods (natural acne fighter): pumpkin seeds, oysters",
          "Omega-3 (anti-inflammatory): fatty fish, flaxseeds",
          "Antioxidants: colourful vegetables and berries",
          "Spearmint tea (reduces androgens)",
          "Probiotics for gut-skin axis",
          "Water — 2.5–3 litres daily",
        ],
        avoid: [
          "Dairy (especially milk — raises IGF-1 and androgens)",
          "High GI foods: white rice, bread, sugar, junk food",
          "Whey protein (raises IGF-1)",
          "Processed foods and seed oils",
          "Chocolate and peanuts (for some people)",
        ],
        tips: [
          "Try 30-day dairy elimination — one of the most effective acne interventions",
          "Gut health = skin health: fermented foods matter",
          "Track breakouts vs food diary to find your triggers",
        ],
      },
      sleep: {
        hours: "7–8",
        tips: [
          "Change pillowcase every 2–3 days",
          "Skin repairs itself between 10pm–2am (growth hormone peak)",
          "Never sleep with makeup on",
        ],
      },
      habits: [
        "Wash face max 2x daily (overwashing strips skin barrier)",
        "Never touch your face with unwashed hands",
        "Use non-comedogenic products only",
        "Exercise regularly — sweating clears pores",
        "Manage stress — cortisol directly triggers sebum production",
      ],
      avoid: [
        "Picking and squeezing (causes scarring and spreads bacteria)",
        "Heavy, pore-clogging makeup",
        "Very hot showers (strip skin barrier)",
        "Harsh physical scrubs",
      ],
      supplements: [
        "Zinc 25–30mg/day",
        "Vitamin A (retinol — food-based first)",
        "Omega-3 DHA + EPA",
        "Probiotics (Lactobacillus for skin)",
        "DIM (Diindolylmethane) — helps oestrogen metabolism",
        "Spearmint tea 2x daily",
      ],
    },
  },

  {
    id: "hair_fall",
    name: "Hair Fall & Thinning",
    categoryId: "skin",
    tagline: "Excessive shedding and thinning from nutritional, hormonal or stress causes",
    severity: "mild",
    symptoms: [
      "Excess hair in comb/drain",
      "Thinning at crown or hairline",
      "Visible scalp",
      "Brittle or dry hair",
    ],
    rootCauses: [
      "Iron and ferritin deficiency",
      "Vitamin D deficiency",
      "Thyroid dysfunction",
      "Protein deficiency",
      "Hormonal imbalance (DHT, PCOS)",
      "Chronic stress (telogen effluvium)",
      "Crash dieting",
    ],
    plan: {
      yoga: {
        title: "Scalp circulation and stress-reducing sequence",
        poses: [
          { name: "Adho Mukha Svanasana (Downward Dog)", duration: "3 mins", benefit: "Increases blood flow to scalp" },
          { name: "Sirsasana (Headstand) or Sarvangasana", duration: "3–5 mins", benefit: "Maximum blood flow to scalp and follicles" },
          { name: "Scalp massage in Vajrasana", duration: "5 mins", benefit: "Mechanical stimulation of follicles" },
          { name: "Balayam yoga (Nail rubbing)", duration: "5–10 mins daily", benefit: "Stimulates nerves connected to scalp" },
          { name: "Kapalbhati + Anulom Vilom", duration: "10 mins", benefit: "Oxygen and nutrient delivery to scalp" },
        ],
      },
      diet: {
        include: [
          "Protein at every meal (hair is 95% keratin/protein)",
          "Iron + Vitamin C together: spinach with lemon",
          "Biotin: eggs, almonds, sweet potato",
          "Zinc: pumpkin seeds, chickpeas",
          "Omega-3: fatty fish, walnuts, flaxseeds",
          "Silica: cucumber, bell peppers, oats",
        ],
        avoid: [
          "Crash diets and extreme calorie restriction",
          "Excess sugar and junk food",
          "Alcohol (depletes zinc and B vitamins)",
          "Excess vitamin A supplementation (causes hair loss)",
        ],
        tips: [
          "Get bloodwork: ferritin, B12, D3, thyroid, full hormonal panel",
          "Hair responds to diet changes 3–6 months later — be patient",
          "Protein deficiency is one of the most common hidden causes",
        ],
      },
      sleep: {
        hours: "7–8",
        tips: [
          "Sleep on a silk/satin pillowcase to reduce friction",
          "Poor sleep elevates cortisol which causes hair shedding",
        ],
      },
      habits: [
        "Scalp massage 5 minutes daily with fingers or dermaroller",
        "Reduce heat styling and tight hairstyles",
        "Use sulphate-free shampoo",
        "Wash hair with lukewarm (not hot) water",
        "Manage stress — the #1 cause of sudden hair loss",
      ],
      avoid: [
        "Tight ponytails and buns daily (traction alopecia)",
        "Chemical treatments: bleaching, perms, relaxers",
        "Very hot water on scalp",
        "Excessive hair washing (strips natural oils)",
      ],
      supplements: [
        "Iron (ferritin) — only if deficient — test first",
        "Vitamin D3",
        "Biotin (7–10mg/day)",
        "Zinc",
        "Collagen peptides",
        "Saw Palmetto (if DHT-related — especially in men)",
      ],
    },
  },

];


// ─────────────────────────────────────────────
// SECTION 3: HELPER FUNCTIONS
// These are utilities your components will use
// to look up data efficiently
// ─────────────────────────────────────────────

// Get a single condition by its id
export const getConditionById = (id) =>
  CONDITIONS.find((c) => c.id === id) || null;

// Get all conditions for a specific category
export const getConditionsByCategory = (categoryId) =>
  CONDITIONS.filter((c) => c.categoryId === categoryId);

// Get a single category by its id
export const getCategoryById = (id) =>
  CATEGORIES.find((c) => c.id === id) || null;

// Get conditions by severity
export const getConditionsBySeverity = (severity) =>
  CONDITIONS.filter((c) => c.severity === severity);

// Get a count summary: how many conditions per category
export const getCategorySummary = () =>
  CATEGORIES.map((cat) => ({
    ...cat,
    count: CONDITIONS.filter((c) => c.categoryId === cat.id).length,
  }));