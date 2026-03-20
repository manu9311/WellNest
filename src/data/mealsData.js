// ============================================================
// FILE: src/data/mealsData.js
// TYPE: Pure data file (no JSX, no UI)
// PURPOSE: Meal plans tied to each health condition.
//          Each condition gets breakfast, lunch, and dinner
//          options with variety (3 choices each meal).
//
// STRUCTURE OF EACH MEAL PLAN:
//   conditionId   → matches the id in healthData.js
//   principles    → 3-4 core eating principles for this condition
//   breakfast     → array of 3 breakfast options
//   lunch         → array of 3 lunch options
//   dinner        → array of 3 dinner options
//   snacks        → array of healthy snack options
//   weeklyTip     → one rotating tip for the week
//
// EACH MEAL OPTION HAS:
//   name          → display name
//   description   → what's in it
//   prepTime      → how long it takes
//   benefits      → why it helps this condition
//   tags          → e.g. ["high-protein", "anti-inflammatory"]
// ============================================================


// ─────────────────────────────────────────────
// HELPER: TAG COLORS
// Used by the UI to color-code meal tags
// ─────────────────────────────────────────────

export const TAG_COLORS = {
  'high-protein':        { bg: '#DBEAFE', color: '#1D4ED8' },
  'anti-inflammatory':   { bg: '#D1FAE5', color: '#065F46' },
  'gut-friendly':        { bg: '#FEF3C7', color: '#92400E' },
  'low-gi':              { bg: '#F3E8FF', color: '#6B21A8' },
  'hormone-balancing':   { bg: '#FCE7F3', color: '#9D174D' },
  'thyroid-support':     { bg: '#ECFDF5', color: '#047857' },
  'immunity-boost':      { bg: '#FFF7ED', color: '#C2410C' },
  'calming':             { bg: '#EFF6FF', color: '#1E40AF' },
  'brain-food':          { bg: '#F5F3FF', color: '#5B21B6' },
  'blood-sugar':         { bg: '#FEF9C3', color: '#713F12' },
  'muscle-recovery':     { bg: '#FFE4E6', color: '#9F1239' },
  'skin-glow':           { bg: '#FFFBEB', color: '#92400E' },
  'hair-growth':         { bg: '#F0FDF4', color: '#14532D' },
  'easy-digest':         { bg: '#F8FAFC', color: '#475569' },
  'detox':               { bg: '#ECFDF5', color: '#065F46' },
}


// ─────────────────────────────────────────────
// MEAL PLANS
// One object per condition, keyed by conditionId
// ─────────────────────────────────────────────

export const MEAL_PLANS = {

  // ══════════════════════════════════════════
  // BLOATING
  // ══════════════════════════════════════════
  bloating: {
    conditionId: 'bloating',
    principles: [
      'Eat slowly and chew every bite thoroughly',
      'Avoid cold water with meals — drink warm or room temperature',
      'Cook vegetables instead of eating raw for easier digestion',
      'Include digestive spices: cumin, fennel, ajwain, ginger',
    ],
    breakfast: [
      {
        name: 'Warm Oats with Banana & Ginger',
        description: 'Rolled oats cooked in water with half a banana, 1 tsp grated ginger, a pinch of cinnamon, and a drizzle of honey',
        prepTime: '10 mins',
        benefits: 'Oats are easily digestible, banana soothes the gut lining, ginger stimulates digestive enzymes',
        tags: ['gut-friendly', 'easy-digest'],
      },
      {
        name: 'Moong Dal Cheela (Savoury Pancake)',
        description: 'Soaked yellow moong dal blended with ginger, cumin, and green chilli. Pan-cooked thin pancakes served with mint chutney',
        prepTime: '20 mins',
        benefits: 'Moong is the most easily digestible legume. Cumin reduces gas formation significantly',
        tags: ['gut-friendly', 'high-protein'],
      },
      {
        name: 'Ajwain Paratha with Curd',
        description: 'Whole wheat paratha kneaded with ajwain (carom seeds) and a pinch of salt. Served with plain homemade curd',
        prepTime: '15 mins',
        benefits: 'Ajwain is one of the most powerful carminatives — directly reduces gas. Curd provides probiotics',
        tags: ['gut-friendly', 'easy-digest'],
      },
    ],
    lunch: [
      {
        name: 'Khichdi with Ghee & Cumin',
        description: 'Rice and moong dal cooked together with turmeric, ghee, cumin seeds, and a pinch of asafoetida (hing). Served with a simple cucumber raita',
        prepTime: '25 mins',
        benefits: 'Khichdi is Ayurveda\'s ultimate digestive reset meal. Hing directly breaks up intestinal gas',
        tags: ['gut-friendly', 'easy-digest', 'anti-inflammatory'],
      },
      {
        name: 'Steamed Rice with Mung Bean Soup',
        description: 'Plain steamed rice with a light mung bean soup seasoned with ginger, garlic, turmeric, and lemon',
        prepTime: '30 mins',
        benefits: 'Light, easily digestible combination. Lemon aids enzyme production. Ginger reduces inflammation',
        tags: ['gut-friendly', 'easy-digest'],
      },
      {
        name: 'Grilled Chicken with Steamed Vegetables',
        description: 'Simple grilled chicken breast with steamed carrots, zucchini, and beans. Dressed with olive oil and cumin',
        prepTime: '25 mins',
        benefits: 'High protein reduces bloating vs carb-heavy meals. Steamed vegetables are far easier to digest than raw',
        tags: ['high-protein', 'easy-digest', 'gut-friendly'],
      },
    ],
    dinner: [
      {
        name: 'Ginger Lemon Soup with Soft Toast',
        description: 'A light broth made with ginger, lemon, turmeric, and a small amount of rice or noodles. Served with one slice of whole grain toast',
        prepTime: '20 mins',
        benefits: 'Light dinners prevent overnight bloating. Ginger broth resets digestion before sleep',
        tags: ['gut-friendly', 'easy-digest', 'anti-inflammatory'],
      },
      {
        name: 'Methi (Fenugreek) Dal with Small Roti',
        description: 'Toor dal cooked with fresh methi leaves, cumin, turmeric, and a small amount of ghee. One small whole wheat roti',
        prepTime: '30 mins',
        benefits: 'Methi seeds are highly anti-bloating. Small portion prevents fermentation overnight',
        tags: ['gut-friendly', 'anti-inflammatory'],
      },
      {
        name: 'Steamed Fish with Jeera Rice',
        description: 'Lightly steamed white fish (rohu, pomfret, or cod) with cumin rice and a side of steamed spinach',
        prepTime: '25 mins',
        benefits: 'Fish is the lightest protein. Jeera rice is easy on the gut. Spinach provides magnesium for gut motility',
        tags: ['high-protein', 'easy-digest', 'gut-friendly'],
      },
    ],
    snacks: [
      'Fennel seeds + mishri after meals (traditional digestive)',
      'Warm ginger tea between meals',
      'A small banana with a pinch of cardamom',
      'Plain buttermilk (chaas) with roasted cumin',
      'Handful of soaked and peeled almonds',
    ],
    weeklyTip: 'Try a 3-day elimination of raw salads — switch to cooked vegetables only and observe if bloating reduces.',
  },


  // ══════════════════════════════════════════
  // GERD / ACID REFLUX
  // ══════════════════════════════════════════
  gerd: {
    conditionId: 'gerd',
    principles: [
      'Eat 5-6 small meals instead of 3 large ones',
      'Never eat within 3 hours of bedtime',
      'Avoid lying down immediately after eating',
      'Eat slowly — rushing increases acid production',
    ],
    breakfast: [
      {
        name: 'Oatmeal with Almond Milk & Banana',
        description: 'Plain rolled oats cooked in almond milk (not dairy) with sliced banana, a drizzle of honey, and a pinch of cardamom',
        prepTime: '10 mins',
        benefits: 'Oats are highly alkaline and coat the oesophagus. Banana neutralises acid. Almond milk is non-acidic unlike cow\'s milk',
        tags: ['gut-friendly', 'easy-digest', 'anti-inflammatory'],
      },
      {
        name: 'Idli with Coconut Chutney (no tomato)',
        description: '3-4 soft idlis with fresh coconut chutney made without tomatoes or tamarind. Add a small amount of sambar without too many spices',
        prepTime: '5 mins (if batter ready)',
        benefits: 'Idlis are fermented and easy to digest. Coconut is alkaline. Avoid tamarind-based chutneys as they are acidic',
        tags: ['gut-friendly', 'easy-digest'],
      },
      {
        name: 'Egg White Omelette with Spinach',
        description: 'Egg whites (not whole eggs) cooked with spinach, a pinch of turmeric, and minimal oil. Served with one slice of whole grain bread',
        prepTime: '10 mins',
        benefits: 'Egg whites are less acidic than yolks. Spinach is alkaline. Whole grain bread buffers stomach acid',
        tags: ['high-protein', 'anti-inflammatory'],
      },
    ],
    lunch: [
      {
        name: 'Plain Dal Rice with Ghee',
        description: 'Simple toor or moong dal with steamed rice, a teaspoon of ghee, and a side of plain cucumber slices',
        prepTime: '30 mins',
        benefits: 'Ghee coats and soothes the stomach lining. Plain dal is not acidic. Cucumber is extremely alkaline',
        tags: ['gut-friendly', 'easy-digest', 'anti-inflammatory'],
      },
      {
        name: 'Grilled Chicken Rice Bowl',
        description: 'Lightly seasoned grilled chicken (no spicy marinades) with steamed rice, steamed broccoli, and a drizzle of olive oil',
        prepTime: '25 mins',
        benefits: 'Lean protein doesn\'t stimulate excess acid unlike fatty meats. No acidic sauces',
        tags: ['high-protein', 'easy-digest'],
      },
      {
        name: 'Vegetable Upma',
        description: 'Semolina cooked with carrots, peas, beans, mustard seeds, and curry leaves. Light and well-cooked',
        prepTime: '20 mins',
        benefits: 'Well-cooked soft food is gentle on the oesophagus. Avoid adding lemon',
        tags: ['easy-digest', 'gut-friendly'],
      },
    ],
    dinner: [
      {
        name: 'Vegetable Soup with Soft Bread',
        description: 'A mild vegetable broth with carrots, celery, zucchini, and a small amount of pasta or rice. No tomatoes. One slice of whole grain bread',
        prepTime: '25 mins',
        benefits: 'Light liquid dinner prevents overnight reflux. No acidic ingredients. Eat 3 hours before bed',
        tags: ['easy-digest', 'gut-friendly', 'anti-inflammatory'],
      },
      {
        name: 'Moong Dal Khichdi',
        description: 'Very soft rice-moong dal khichdi with turmeric and a small amount of ghee. Almost porridge-like consistency',
        prepTime: '25 mins',
        benefits: 'One of the most soothing meals for GERD. Ghee heals oesophagal lining. Light and alkaline',
        tags: ['gut-friendly', 'easy-digest', 'anti-inflammatory'],
      },
      {
        name: 'Baked Fish with Sweet Potato',
        description: 'Simply baked white fish with a baked sweet potato and steamed green beans. No spicy seasoning',
        prepTime: '35 mins',
        benefits: 'Sweet potato is highly alkaline. Fish is light. Avoid acidic marinades completely',
        tags: ['high-protein', 'easy-digest', 'anti-inflammatory'],
      },
    ],
    snacks: [
      'Aloe vera juice (15ml) before meals',
      'A small banana (neutralises acid)',
      'Plain rice crackers',
      'Chamomile tea between meals',
      'A small handful of almonds (alkaline)',
    ],
    weeklyTip: 'Keep a food-symptom diary this week. Write down everything you eat and note when reflux occurs — patterns become obvious within 3-4 days.',
  },


  // ══════════════════════════════════════════
  // IBS
  // ══════════════════════════════════════════
  ibs: {
    conditionId: 'ibs',
    principles: [
      'Low-FODMAP approach during flare-ups',
      'Eat at consistent times every day — routine reduces IBS triggers',
      'Never eat under stress — sit down, breathe, then eat',
      'Introduce new foods one at a time to identify triggers',
    ],
    breakfast: [
      {
        name: 'Rice Porridge (Kanji) with Ginger',
        description: 'Soft-cooked rice porridge with fresh grated ginger, a pinch of salt, and a drizzle of sesame oil',
        prepTime: '20 mins',
        benefits: 'Extremely gentle on an irritated gut. Ginger reduces intestinal spasms. Easy on both constipation and diarrhea types',
        tags: ['gut-friendly', 'easy-digest', 'calming'],
      },
      {
        name: 'Oats with Strawberries & Maple',
        description: 'Cooked rolled oats (not instant) with fresh strawberries, a drizzle of maple syrup, and a sprinkle of chia seeds',
        prepTime: '10 mins',
        benefits: 'Soluble fibre in oats regulates both diarrhea and constipation. Strawberries are low-FODMAP. Chia adds gentle bulk',
        tags: ['gut-friendly', 'easy-digest'],
      },
      {
        name: 'Scrambled Eggs with Sourdough',
        description: 'Plain scrambled eggs (2 eggs) cooked in olive oil with a pinch of salt. One slice of sourdough bread (low-FODMAP in small amounts)',
        prepTime: '8 mins',
        benefits: 'Eggs are easily digestible and low-FODMAP. Sourdough fermentation breaks down fructans making it easier to digest',
        tags: ['high-protein', 'easy-digest', 'gut-friendly'],
      },
    ],
    lunch: [
      {
        name: 'Grilled Chicken with Carrot-Potato Mash',
        description: 'Simply grilled chicken with mashed carrots and potatoes (no garlic or onion). Dressed with olive oil and fresh herbs',
        prepTime: '30 mins',
        benefits: 'All low-FODMAP ingredients. Mashed texture is easy to digest. No onion/garlic which are major IBS triggers',
        tags: ['high-protein', 'gut-friendly', 'easy-digest'],
      },
      {
        name: 'Plain Rice with Steamed Vegetables',
        description: 'White rice with steamed carrots, zucchini, and spinach. Light seasoning with olive oil, cumin, and salt',
        prepTime: '20 mins',
        benefits: 'White rice is the safest carb for IBS. All vegetables listed are low-FODMAP',
        tags: ['gut-friendly', 'easy-digest'],
      },
      {
        name: 'Salmon with Quinoa & Cucumber',
        description: 'Baked salmon fillet with cooked quinoa and fresh cucumber slices. Dressed with lemon and olive oil',
        prepTime: '25 mins',
        benefits: 'Omega-3 in salmon reduces gut inflammation. Quinoa provides complete protein. Cucumber soothes the gut',
        tags: ['anti-inflammatory', 'high-protein', 'gut-friendly'],
      },
    ],
    dinner: [
      {
        name: 'Chicken Soup (no onion/garlic)',
        description: 'Homemade chicken broth with carrots, celery, potato, and chicken pieces. Seasoned with ginger, turmeric, and salt only',
        prepTime: '40 mins',
        benefits: 'Warm soup calms gut hypersensitivity. Bone broth heals gut lining. No onion/garlic removes two biggest FODMAP triggers',
        tags: ['gut-friendly', 'easy-digest', 'calming', 'anti-inflammatory'],
      },
      {
        name: 'Steamed Rice with Tofu & Bok Choy',
        description: 'Firm tofu pan-fried in sesame oil with bok choy and steamed rice. Light soy sauce dressing',
        prepTime: '20 mins',
        benefits: 'Tofu is low-FODMAP in small portions. Bok choy is an IBS-safe vegetable. Light dinner prevents overnight flares',
        tags: ['gut-friendly', 'easy-digest'],
      },
      {
        name: 'Baked Potato with Cottage Cheese',
        description: 'One medium baked potato topped with plain cottage cheese, chives, and a drizzle of olive oil',
        prepTime: '45 mins',
        benefits: 'Potato is one of the safest foods for IBS. Cottage cheese provides protein without high lactose',
        tags: ['easy-digest', 'gut-friendly', 'high-protein'],
      },
    ],
    snacks: [
      'Plain rice cakes with peanut butter (small amount)',
      'Peppermint tea (reduces gut spasms)',
      'Ripe banana (low-FODMAP when firm)',
      'Handful of walnuts or macadamia nuts',
      'Plain lactose-free yogurt with blueberries',
    ],
    weeklyTip: 'This week, eliminate onion and garlic completely — replace with the green part of spring onion and garlic-infused oil. Notice the difference within 5 days.',
  },


  // ══════════════════════════════════════════
  // PCOS
  // ══════════════════════════════════════════
  pcos: {
    conditionId: 'pcos',
    principles: [
      'Balance blood sugar at every meal — protein + fat + fibre together',
      'Never skip breakfast — it sets cortisol and insulin rhythm for the day',
      'Eat within 1 hour of waking up',
      'Anti-inflammatory and low-GI foods are your foundation',
    ],
    breakfast: [
      {
        name: 'Methi Seed Overnight Oats',
        description: 'Rolled oats soaked overnight in almond milk with 1 tsp soaked methi seeds, chia seeds, flaxseeds, cinnamon, and topped with berries',
        prepTime: '5 mins (prep night before)',
        benefits: 'Methi dramatically improves insulin sensitivity. Flaxseeds balance oestrogen. Berries are anti-inflammatory. Cinnamon regulates blood sugar',
        tags: ['hormone-balancing', 'blood-sugar', 'anti-inflammatory'],
      },
      {
        name: 'Moong Dal Chilla with Mint Chutney',
        description: 'High-protein moong dal pancakes with grated vegetables inside. Served with fresh mint-coriander chutney',
        prepTime: '20 mins',
        benefits: 'High protein breakfast is essential for PCOS — prevents the blood sugar spike that drives androgen production',
        tags: ['high-protein', 'hormone-balancing', 'blood-sugar'],
      },
      {
        name: 'Eggs with Sautéed Spinach & Whole Roti',
        description: '2 whole eggs cooked any style with sautéed spinach, garlic, and one whole wheat roti or millet roti',
        prepTime: '15 mins',
        benefits: 'Eggs provide choline which supports hormonal health. Spinach contains magnesium. Millet roti has lower GI than wheat',
        tags: ['high-protein', 'hormone-balancing', 'anti-inflammatory'],
      },
    ],
    lunch: [
      {
        name: 'Rajma Bowl with Millet Rice',
        description: 'Kidney beans cooked in tomato-onion masala (minimal oil) served with foxtail millet or brown rice and a cucumber-onion salad',
        prepTime: '35 mins',
        benefits: 'Rajma has the lowest GI of all legumes. Millet rice has far lower GI than white rice. High fibre slows glucose absorption',
        tags: ['blood-sugar', 'hormone-balancing', 'high-protein'],
      },
      {
        name: 'Grilled Chicken Salad with Pumpkin Seeds',
        description: 'Grilled chicken slices on a bed of mixed greens, roasted vegetables, avocado, pumpkin seeds, and olive oil-lemon dressing',
        prepTime: '25 mins',
        benefits: 'Pumpkin seeds are the best natural zinc source — zinc reduces androgens. Avocado provides healthy fats for hormone production',
        tags: ['hormone-balancing', 'high-protein', 'anti-inflammatory'],
      },
      {
        name: 'Palak Dal with Brown Rice',
        description: 'Spinach cooked into toor dal with turmeric, cumin, and minimal ghee. Served with brown rice',
        prepTime: '30 mins',
        benefits: 'Spinach provides iron and magnesium crucial for PCOS. Brown rice GI is significantly lower than white rice',
        tags: ['hormone-balancing', 'anti-inflammatory', 'blood-sugar'],
      },
    ],
    dinner: [
      {
        name: 'Baked Salmon with Roasted Vegetables',
        description: 'Salmon fillet baked with herbs, served with roasted broccoli, cauliflower, and sweet potato',
        prepTime: '35 mins',
        benefits: 'Omega-3 in salmon reduces PCOS inflammation and lowers androgens. Cruciferous vegetables help metabolise excess oestrogen',
        tags: ['anti-inflammatory', 'hormone-balancing', 'high-protein'],
      },
      {
        name: 'Methi Chicken with Jowar Roti',
        description: 'Chicken cooked with fresh methi leaves and mild spices. Served with jowar (sorghum) roti and simple raita',
        prepTime: '35 mins',
        benefits: 'Methi improves insulin sensitivity. Jowar roti has much lower GI than wheat. Protein + complex carb dinner',
        tags: ['hormone-balancing', 'blood-sugar', 'high-protein'],
      },
      {
        name: 'Lentil Soup with Flaxseed Roti',
        description: 'Mixed lentil soup with tomatoes, spinach, and warming spices. Roti made with whole wheat flour mixed with 2 tbsp ground flaxseed',
        prepTime: '30 mins',
        benefits: 'Flaxseed is the most powerful food for oestrogen balance. Lentils provide slow-release protein and fibre',
        tags: ['hormone-balancing', 'anti-inflammatory', 'blood-sugar'],
      },
    ],
    snacks: [
      'Spearmint tea (2 cups daily — reduces androgens)',
      'Small apple with almond butter (blood sugar stable)',
      'Handful of pumpkin + sunflower seeds (seed cycling)',
      'Cinnamon-turmeric warm milk before bed',
      'Greek yogurt with berries and chia seeds',
    ],
    weeklyTip: 'This week try seed cycling: eat 1 tbsp flaxseeds + 1 tbsp pumpkin seeds daily in the first half of your cycle, and 1 tbsp sesame + 1 tbsp sunflower in the second half.',
  },


  // ══════════════════════════════════════════
  // HYPOTHYROIDISM
  // ══════════════════════════════════════════
  hypothyroidism: {
    conditionId: 'hypothyroidism',
    principles: [
      'Selenium-rich foods daily — critical for T4 to T3 conversion',
      'Cook cruciferous vegetables — never eat them raw in large amounts',
      'Take thyroid medication on empty stomach, wait 30-60 mins before eating',
      'Avoid soy and fluoride which block thyroid function',
    ],
    breakfast: [
      {
        name: 'Brazil Nut Smoothie Bowl',
        description: '2 Brazil nuts blended with banana, berries, almond milk, and chia seeds. Topped with pumpkin seeds and honey',
        prepTime: '5 mins',
        benefits: '2 Brazil nuts provide the full daily selenium requirement — essential for thyroid hormone conversion. No other food comes close',
        tags: ['thyroid-support', 'anti-inflammatory'],
      },
      {
        name: 'Eggs & Sautéed Mushrooms on Toast',
        description: '2 eggs any style with sautéed mushrooms (selenium-rich) on whole grain toast. A glass of warm water with lemon first',
        prepTime: '15 mins',
        benefits: 'Eggs provide iodine and selenium. Mushrooms are the best plant source of selenium and vitamin D',
        tags: ['thyroid-support', 'high-protein'],
      },
      {
        name: 'Iodine Porridge',
        description: 'Oats cooked in water with a pinch of iodised salt, topped with sliced banana, 2 Brazil nuts, and a small piece of nori seaweed crumbled on top',
        prepTime: '10 mins',
        benefits: 'Iodised salt and nori provide iodine — the primary building block of thyroid hormones. Brazil nuts provide selenium',
        tags: ['thyroid-support', 'easy-digest'],
      },
    ],
    lunch: [
      {
        name: 'Tuna Rice Bowl with Seaweed',
        description: 'Brown rice topped with tuna, cucumber, avocado, a small sheet of nori, and sesame seeds. Dressed with light soy sauce and sesame oil',
        prepTime: '15 mins',
        benefits: 'Tuna is extremely rich in selenium and iodine. Nori provides iodine. Avocado provides healthy fats for hormone production',
        tags: ['thyroid-support', 'high-protein', 'anti-inflammatory'],
      },
      {
        name: 'Grilled Chicken with Roasted Pumpkin',
        description: 'Herbed grilled chicken with roasted pumpkin, cooked spinach (not raw), and brown rice',
        prepTime: '35 mins',
        benefits: 'Chicken provides zinc and selenium. Pumpkin provides zinc — crucial for thyroid function. Spinach cooked removes goitrogens',
        tags: ['thyroid-support', 'high-protein'],
      },
      {
        name: 'Prawn Coconut Curry with Rice',
        description: 'Prawns cooked in light coconut milk with turmeric, curry leaves, and mild spices. Served with white rice',
        prepTime: '30 mins',
        benefits: 'Prawns are one of the richest sources of iodine and selenium together. Coconut oil supports thyroid metabolism',
        tags: ['thyroid-support', 'anti-inflammatory'],
      },
    ],
    dinner: [
      {
        name: 'Baked Cod with Sweet Potato',
        description: 'Cod baked with herbs and lemon (minimal), with baked sweet potato and steamed cooked broccoli (not raw)',
        prepTime: '35 mins',
        benefits: 'Cod is extremely iodine-rich. Sweet potato provides beta-carotene which supports thyroid. Cooking broccoli deactivates goitrogens',
        tags: ['thyroid-support', 'anti-inflammatory', 'high-protein'],
      },
      {
        name: 'Dal Tadka with Zinc Rice',
        description: 'Toor dal with a tadka of mustard seeds, curry leaves, and minimal spices. Brown rice cooked with a handful of pumpkin seeds stirred in',
        prepTime: '30 mins',
        benefits: 'Pumpkin seeds in rice is a clever way to boost zinc intake. Mustard seeds support thyroid enzyme function',
        tags: ['thyroid-support', 'gut-friendly'],
      },
      {
        name: 'Chicken Bone Broth Soup',
        description: 'Rich chicken bone broth with carrots, celery, ginger, turmeric, and cooked chicken pieces',
        prepTime: '40 mins',
        benefits: 'Bone broth provides collagen and minerals. Glycine in broth supports liver health which is essential for T4-T3 conversion',
        tags: ['thyroid-support', 'anti-inflammatory', 'gut-friendly'],
      },
    ],
    snacks: [
      '2 Brazil nuts daily (do not exceed — selenium toxicity is possible)',
      'Pumpkin seeds (zinc)',
      'Sunflower seeds (selenium + vitamin E)',
      'Warm water with turmeric and black pepper',
      'Dates with almond butter',
    ],
    weeklyTip: 'Test: replace all tap water with filtered water this week and switch to fluoride-free toothpaste. Fluoride competes with iodine in the thyroid and small changes add up.',
  },


  // ══════════════════════════════════════════
  // LOW IMMUNITY
  // ══════════════════════════════════════════
  low_immunity: {
    conditionId: 'low_immunity',
    principles: [
      'Eat a rainbow every day — each colour represents different immune-supporting compounds',
      'Prioritise whole foods over supplements wherever possible',
      'Fermented foods daily for gut immunity (70% of immune system is in the gut)',
      'Garlic and ginger in cooking every single day',
    ],
    breakfast: [
      {
        name: 'Golden Milk Oats',
        description: 'Oats cooked with turmeric, ginger, black pepper, cinnamon, and honey in warm milk or almond milk. Topped with amla powder or fresh berries',
        prepTime: '10 mins',
        benefits: 'Turmeric + black pepper = curcumin absorption increases 2000%. Amla has the highest natural Vitamin C of any food',
        tags: ['immunity-boost', 'anti-inflammatory'],
      },
      {
        name: 'Amla Smoothie Bowl',
        description: 'Blended amla (Indian gooseberry), banana, mango, spinach, and coconut water. Topped with pumpkin seeds and goji berries',
        prepTime: '5 mins',
        benefits: 'Amla has 20x the Vitamin C of an orange. Spinach provides iron and folate. Pumpkin seeds add zinc',
        tags: ['immunity-boost', 'anti-inflammatory'],
      },
      {
        name: 'Garlic Egg Bhurji with Roti',
        description: 'Scrambled eggs cooked with plenty of garlic, onion, tomato, and turmeric. Served with whole wheat roti',
        prepTime: '15 mins',
        benefits: 'Garlic contains allicin — one of the most powerful natural antimicrobials known. Eggs provide vitamin D and zinc',
        tags: ['immunity-boost', 'high-protein'],
      },
    ],
    lunch: [
      {
        name: 'Rainbow Salad Bowl with Chicken',
        description: 'Grilled chicken on a bed of red cabbage, orange carrots, yellow bell pepper, green spinach, purple beetroot, and topped with sunflower seeds and lemon-olive oil dressing',
        prepTime: '25 mins',
        benefits: 'Every colour = different phytonutrients and antioxidants. This single meal covers most immune-essential micronutrients',
        tags: ['immunity-boost', 'anti-inflammatory', 'high-protein'],
      },
      {
        name: 'Tomato Rasam with Rice',
        description: 'Traditional South Indian rasam made with tomatoes, tamarind, pepper, cumin, garlic, and curry leaves. Served with steamed rice',
        prepTime: '20 mins',
        benefits: 'Rasam is a traditional immune-boosting broth. Black pepper has piperine which dramatically increases absorption of all nutrients',
        tags: ['immunity-boost', 'anti-inflammatory', 'gut-friendly'],
      },
      {
        name: 'Mushroom & Lentil Soup',
        description: 'Shiitake or button mushrooms cooked with red lentils, garlic, ginger, turmeric, and vegetable broth',
        prepTime: '30 mins',
        benefits: 'Shiitake mushrooms contain beta-glucans — clinically proven immune modulators. Lentils provide zinc and iron',
        tags: ['immunity-boost', 'anti-inflammatory'],
      },
    ],
    dinner: [
      {
        name: 'Garlic Ginger Fish Curry',
        description: 'Fish cooked in a tomato-based curry with generous garlic, ginger, turmeric, and curry leaves. Served with brown rice',
        prepTime: '30 mins',
        benefits: 'Fish provides vitamin D and omega-3. Garlic and ginger together create one of the most powerful natural immune-boosting combinations',
        tags: ['immunity-boost', 'anti-inflammatory', 'high-protein'],
      },
      {
        name: 'Chyawanprash Dal with Roti',
        description: 'Mixed dal cooked with amla pieces or amla powder, turmeric, garlic, and ghee. Whole wheat roti with a smear of ghee',
        prepTime: '30 mins',
        benefits: 'Amla in cooking provides Vitamin C that is heat-stable unlike most C sources. Ghee improves absorption of fat-soluble vitamins',
        tags: ['immunity-boost', 'gut-friendly'],
      },
      {
        name: 'Tulsi Chicken Soup',
        description: 'Light chicken soup with fresh tulsi (holy basil) leaves, ginger, garlic, pepper, and seasonal vegetables',
        prepTime: '35 mins',
        benefits: 'Tulsi is an adaptogen with direct antiviral and antibacterial properties. Combined with chicken bone broth = powerful immune support',
        tags: ['immunity-boost', 'anti-inflammatory', 'high-protein'],
      },
    ],
    snacks: [
      'Tulsi-ginger tea with honey (2 cups daily)',
      'Amla murabba or fresh amla',
      'Chyawanprash (1 tsp in warm milk at bedtime)',
      'Handful of mixed seeds: pumpkin, sunflower, sesame',
      'Orange or guava (vitamin C)',
    ],
    weeklyTip: 'This week add tulsi tea morning and evening and raw garlic (1 clove crushed, wait 10 mins, then eat) before lunch. These two changes alone significantly improve immunity markers.',
  },


  // ══════════════════════════════════════════
  // ANXIETY
  // ══════════════════════════════════════════
  anxiety: {
    conditionId: 'anxiety',
    principles: [
      'Never skip meals — blood sugar crashes directly trigger anxiety episodes',
      'Reduce or eliminate caffeine — it directly stimulates the stress response',
      'Magnesium-rich foods at every meal — it is nature\'s anxiety medication',
      'Complex carbs at dinner support serotonin and melatonin production for better sleep',
    ],
    breakfast: [
      {
        name: 'Banana Almond Oatmeal',
        description: 'Oats cooked with sliced banana, almond butter, pumpkin seeds, dark chocolate chips (70%+), and warm milk. Sweetened with honey',
        prepTime: '10 mins',
        benefits: 'Banana provides tryptophan → serotonin. Almonds and pumpkin seeds are rich in magnesium. Dark chocolate reduces cortisol',
        tags: ['calming', 'anti-inflammatory'],
      },
      {
        name: 'Ashwagandha Smoothie',
        description: 'Blended warm almond milk, 1 tsp ashwagandha powder, banana, dates, cardamom, and a pinch of nutmeg',
        prepTime: '5 mins',
        benefits: 'Ashwagandha is clinically proven to reduce cortisol by 28% with consistent use. Dates provide natural energy without sugar spikes',
        tags: ['calming', 'hormone-balancing'],
      },
      {
        name: 'Whole Grain Toast with Almond Butter & Berries',
        description: 'Two slices of whole grain toast with almond butter, sliced strawberries, and a drizzle of honey. Side of chamomile tea',
        prepTime: '5 mins',
        benefits: 'Complex carbs raise serotonin. Almond butter provides magnesium and L-tryptophan. Chamomile reduces anxiety directly',
        tags: ['calming', 'anti-inflammatory'],
      },
    ],
    lunch: [
      {
        name: 'Salmon & Walnut Buddha Bowl',
        description: 'Baked salmon with brown rice, steamed broccoli, walnuts, avocado, and a tahini-lemon dressing',
        prepTime: '30 mins',
        benefits: 'Salmon omega-3 is clinically shown to reduce anxiety by 20%. Walnuts are the richest plant source of omega-3. Avocado provides B vitamins',
        tags: ['calming', 'anti-inflammatory', 'brain-food'],
      },
      {
        name: 'Spinach Dal with Magnesium Rice',
        description: 'Palak dal with brown rice cooked with a handful of pumpkin seeds. Side of plain curd',
        prepTime: '30 mins',
        benefits: 'Spinach is one of the richest magnesium foods. Curd provides L-acidophilus which produces GABA (calming neurotransmitter) in the gut',
        tags: ['calming', 'gut-friendly', 'anti-inflammatory'],
      },
      {
        name: 'Turkey or Chicken Wrap',
        description: 'Whole wheat wrap with grilled chicken or turkey, lettuce, avocado, cucumber, and a yogurt-based dressing',
        prepTime: '15 mins',
        benefits: 'Turkey is the richest source of tryptophan → serotonin → melatonin pathway. Avocado provides B6 needed for this conversion',
        tags: ['calming', 'high-protein'],
      },
    ],
    dinner: [
      {
        name: 'Warm Lentil Soup with Dark Bread',
        description: 'Comforting red lentil soup with carrots, celery, cumin, and turmeric. One slice of dark rye or whole grain bread',
        prepTime: '25 mins',
        benefits: 'Warm foods are inherently calming. Lentils provide tryptophan and complex carbs that support serotonin synthesis overnight',
        tags: ['calming', 'gut-friendly', 'anti-inflammatory'],
      },
      {
        name: 'Chamomile Chicken with Sweet Potato',
        description: 'Chicken baked in a light broth with chamomile, thyme, and vegetables. Served with mashed sweet potato',
        prepTime: '40 mins',
        benefits: 'Chamomile contains apigenin — binds to GABA receptors like a mild natural benzodiazepine. Sweet potato raises serotonin',
        tags: ['calming', 'high-protein', 'anti-inflammatory'],
      },
      {
        name: 'Khichdi with Ghee & Nutmeg',
        description: 'Soft moong dal khichdi with a generous amount of ghee and a tiny pinch of nutmeg stirred in before serving',
        prepTime: '25 mins',
        benefits: 'Nutmeg contains myristicin which has mild sedative and anxiolytic effects. Ghee provides butyrate which improves gut-brain signalling',
        tags: ['calming', 'gut-friendly', 'easy-digest'],
      },
    ],
    snacks: [
      'Chamomile tea with honey (2-3 times daily)',
      'Dark chocolate (70%+) — 2 squares (reduces cortisol)',
      'Banana with almond butter (serotonin + magnesium)',
      'Warm ashwagandha milk before bed',
      'Handful of walnuts + 2 dates',
    ],
    weeklyTip: 'Cut caffeine by half this week — replace your second cup of tea or coffee with chamomile or tulsi tea. Track your anxiety levels morning and evening on a scale of 1-10.',
  },


  // ══════════════════════════════════════════
  // BRAIN FOG
  // ══════════════════════════════════════════
  brain_fog: {
    conditionId: 'brain_fog',
    principles: [
      'High-quality fat and protein breakfast — no sugar in the morning',
      'Eat foods that feed your brain: omega-3, choline, antioxidants',
      'Hydrate first — even mild dehydration causes measurable cognitive decline',
      'Avoid sugar and refined carbs which cause post-meal brain fog',
    ],
    breakfast: [
      {
        name: 'Brain-Power Egg & Avocado Bowl',
        description: '2-3 eggs (whole — yolk is essential for choline) cooked any style, with half an avocado, a handful of blueberries, and a sprinkle of flaxseeds',
        prepTime: '10 mins',
        benefits: 'Egg yolk contains the highest dietary choline — essential for acetylcholine (memory neurotransmitter). Blueberries cross the blood-brain barrier and reduce oxidative stress',
        tags: ['brain-food', 'high-protein', 'anti-inflammatory'],
      },
      {
        name: 'Walnut Banana Smoothie',
        description: 'Blended walnuts (soaked overnight), banana, blueberries, spinach, flaxseed oil, and almond milk',
        prepTime: '5 mins',
        benefits: 'Walnuts contain DHA — the specific omega-3 that makes up 15% of the brain. Flaxseed oil provides ALA. Spinach provides folate for neurotransmitter synthesis',
        tags: ['brain-food', 'anti-inflammatory'],
      },
      {
        name: 'Smoked Salmon on Rye',
        description: 'Smoked salmon on dark rye bread with cream cheese, capers, and fresh dill. A glass of warm lemon water first',
        prepTime: '5 mins',
        benefits: 'Salmon is the richest food source of DHA+EPA omega-3. Rye bread has very low GI preventing the post-breakfast brain fog crash',
        tags: ['brain-food', 'high-protein', 'anti-inflammatory'],
      },
    ],
    lunch: [
      {
        name: 'Turmeric Salmon Bowl',
        description: 'Baked salmon marinated in turmeric, ginger, and olive oil. Served with brown rice, steamed broccoli, and an avocado slice',
        prepTime: '30 mins',
        benefits: 'Curcumin in turmeric has been shown to improve memory and reduce brain inflammation. Salmon DHA + broccoli\'s sulforaphane = powerful neuroprotective combination',
        tags: ['brain-food', 'anti-inflammatory', 'high-protein'],
      },
      {
        name: 'Walnut & Beetroot Salad',
        description: 'Roasted beetroot, walnut, goat cheese (or paneer), mixed greens, and pomegranate seeds. Olive oil and balsamic dressing',
        prepTime: '20 mins',
        benefits: 'Beetroot contains nitrates which increase blood flow to the brain by 16%. Walnuts provide DHA. Pomegranate reduces brain inflammation',
        tags: ['brain-food', 'anti-inflammatory'],
      },
      {
        name: 'Brahmi Dal with Rice',
        description: 'Moong dal cooked with fresh brahmi (bacopa) leaves if available, or brahmi powder, with turmeric and ghee. Served with rice',
        prepTime: '25 mins',
        benefits: 'Brahmi (Bacopa monnieri) is clinically proven to improve memory, attention, and processing speed. Ghee carries fat-soluble brain nutrients to the brain efficiently',
        tags: ['brain-food', 'gut-friendly'],
      },
    ],
    dinner: [
      {
        name: 'Sardine & Vegetable Stir Fry',
        description: 'Canned sardines stir-fried with garlic, spinach, tomatoes, and served with whole grain pasta or brown rice',
        prepTime: '15 mins',
        benefits: 'Sardines have the highest omega-3 to cost ratio of any food. Also high in B12 which is a leading cause of brain fog when deficient',
        tags: ['brain-food', 'high-protein', 'anti-inflammatory'],
      },
      {
        name: 'Ashwagandha Chicken Soup',
        description: 'Chicken soup with vegetables, ginger, 1 tsp ashwagandha powder stirred in at the end, and fresh coriander',
        prepTime: '35 mins',
        benefits: 'Ashwagandha improves memory and reaction time. Combined with chicken\'s tryptophan, this is an excellent evening brain-repair meal',
        tags: ['brain-food', 'calming', 'high-protein'],
      },
      {
        name: 'Paneer Palak with Millet Roti',
        description: 'Spinach cooked with paneer, garlic, ginger, and spices. Served with pearl millet (bajra) roti',
        prepTime: '30 mins',
        benefits: 'Spinach provides folate for neurotransmitter synthesis. Paneer provides tryptophan. Bajra provides magnesium for nerve function',
        tags: ['brain-food', 'high-protein', 'anti-inflammatory'],
      },
    ],
    snacks: [
      'Blueberries + dark chocolate (2 squares) — proven brain-boosters',
      'Walnuts (soaked overnight for better absorption)',
      'Green tea with L-theanine (calm focus)',
      'Lion\'s mane mushroom tea if available',
      'Celery with almond butter (choline + healthy fat)',
    ],
    weeklyTip: 'Drink 500ml of water immediately upon waking before anything else this week. Dehydration is one of the most overlooked causes of brain fog — even 1-2% dehydration reduces cognitive performance measurably.',
  },


  // ══════════════════════════════════════════
  // INSULIN RESISTANCE
  // ══════════════════════════════════════════
  insulin_resistance: {
    conditionId: 'insulin_resistance',
    principles: [
      'Eat vegetables FIRST, then protein, then carbs — this order cuts glucose spike by 75%',
      'Walk 10 minutes after every meal — blunts post-meal blood sugar spike',
      'No carbs alone — always with protein, fat, and fibre',
      'Time-restricted eating: finish all meals within an 8-10 hour window',
    ],
    breakfast: [
      {
        name: 'Cinnamon Protein Oats',
        description: 'Rolled oats with 1 tsp cinnamon, 1 tbsp chia seeds, protein powder or Greek yogurt stirred in, and topped with a small apple',
        prepTime: '10 mins',
        benefits: 'Cinnamon is clinically shown to improve insulin sensitivity by mimicking insulin action. Protein in oats prevents glucose spike. Chia seeds slow carb absorption',
        tags: ['blood-sugar', 'high-protein', 'anti-inflammatory'],
      },
      {
        name: 'Besan Cheela with Mint Chutney',
        description: 'Chickpea flour pancakes with spinach, onion, and spices. Served with fresh mint chutney',
        prepTime: '15 mins',
        benefits: 'Besan (chickpea flour) has extremely low GI compared to wheat. High in protein and resistant starch which feeds beneficial gut bacteria that improve insulin sensitivity',
        tags: ['blood-sugar', 'high-protein', 'gut-friendly'],
      },
      {
        name: 'Egg & Avocado Plate',
        description: '3 scrambled eggs with half an avocado, a handful of cherry tomatoes, and a small portion of feta or paneer. No bread',
        prepTime: '10 mins',
        benefits: 'Zero carb breakfast keeps fasting insulin low. Healthy fats from avocado improve insulin receptor sensitivity. This is one of the best breakfasts for insulin resistance',
        tags: ['blood-sugar', 'high-protein', 'anti-inflammatory'],
      },
    ],
    lunch: [
      {
        name: 'Salad First → Dal & Millet',
        description: 'Start with a large cucumber-tomato-onion salad with lemon and olive oil. Then eat moong dal with foxtail millet khichdi',
        prepTime: '25 mins',
        benefits: 'Eating the salad first creates a fibre barrier that slows glucose absorption from the dal and millet. This simple order change reduces the glucose spike by up to 75%',
        tags: ['blood-sugar', 'gut-friendly', 'anti-inflammatory'],
      },
      {
        name: 'Grilled Chicken with Cauliflower Rice',
        description: 'Grilled chicken breast with cauliflower rice (grated cauliflower stir-fried) instead of regular rice, and a side of sautéed spinach',
        prepTime: '25 mins',
        benefits: 'Cauliflower rice has 80% fewer carbs than regular rice with zero sacrifice in volume or satisfaction. Excellent for insulin resistance',
        tags: ['blood-sugar', 'high-protein'],
      },
      {
        name: 'Rajma with Vinegar Salad',
        description: 'Kidney beans curry with a side salad dressed with apple cider vinegar and olive oil. Brown rice in small quantity',
        prepTime: '35 mins',
        benefits: 'ACV before or with a meal reduces post-meal glucose spike by 20-34%. Rajma has the lowest GI of any legume',
        tags: ['blood-sugar', 'high-protein', 'gut-friendly'],
      },
    ],
    dinner: [
      {
        name: 'Berberine Dal Soup',
        description: 'Light dal soup with methi leaves, turmeric, cinnamon, and a squeeze of lemon. Small portion, eaten before 7pm',
        prepTime: '25 mins',
        benefits: 'Methi contains 4-hydroxyisoleucine which directly stimulates insulin secretion. Eating early dinner gives insulin levels time to recover overnight',
        tags: ['blood-sugar', 'gut-friendly', 'anti-inflammatory'],
      },
      {
        name: 'Baked Fish with Roasted Vegetables',
        description: 'White fish baked with herbs. Served with roasted non-starchy vegetables: zucchini, capsicum, broccoli, mushrooms',
        prepTime: '30 mins',
        benefits: 'Non-starchy vegetables at dinner keep glucose flat overnight. Fish provides protein without carbohydrate load',
        tags: ['blood-sugar', 'high-protein', 'anti-inflammatory'],
      },
      {
        name: 'Millet Khichdi with Ghee',
        description: 'Foxtail or barnyard millet khichdi with moong dal, turmeric, and a generous spoon of ghee',
        prepTime: '25 mins',
        benefits: 'Millets have 3x lower GI than rice. Ghee slows gastric emptying reducing glucose absorption speed. Good option when you need a comforting carb dinner',
        tags: ['blood-sugar', 'gut-friendly', 'easy-digest'],
      },
    ],
    snacks: [
      'Apple cider vinegar in water before meals (1 tbsp in 200ml)',
      'A small handful of almonds + 1 walnut (healthy fats)',
      'Cinnamon tea between meals',
      'Cucumber with hummus (fibre + protein)',
      'Berberine supplement with meals (if using)',
    ],
    weeklyTip: 'This week measure your fasting blood sugar every morning before eating. Write it down. Then walk 10 minutes after every meal. By day 7 you should see a measurable improvement in fasting numbers.',
  },


  // ══════════════════════════════════════════
  // BACK PAIN
  // ══════════════════════════════════════════
  back_pain: {
    conditionId: 'back_pain',
    principles: [
      'Anti-inflammatory diet is as effective as ibuprofen for chronic pain',
      'Magnesium-rich foods daily — deficiency causes muscle tension and spasms',
      'Collagen-supporting foods for disc and ligament health',
      'Stay hydrated — spinal discs are 80% water and shrink with dehydration',
    ],
    breakfast: [
      {
        name: 'Anti-Inflammatory Turmeric Oats',
        description: 'Oats cooked with turmeric, ginger, black pepper, and coconut milk. Topped with cherry-tart concentrate, pumpkin seeds, and walnuts',
        prepTime: '10 mins',
        benefits: 'Turmeric + black pepper reduces inflammatory markers. Tart cherries are proven to reduce muscle inflammation. Pumpkin seeds provide magnesium for muscle relaxation',
        tags: ['anti-inflammatory', 'muscle-recovery'],
      },
      {
        name: 'Bone Broth Egg Bowl',
        description: 'Two eggs poached in bone broth with spinach, garlic, and whole grain toast dipped in the broth',
        prepTime: '15 mins',
        benefits: 'Bone broth provides collagen peptides that directly support spinal disc health. Eggs add additional collagen-building amino acids',
        tags: ['anti-inflammatory', 'high-protein', 'muscle-recovery'],
      },
      {
        name: 'Magnesium Smoothie',
        description: 'Blended spinach, banana, almond milk, almond butter, dark cocoa powder, and a pinch of sea salt',
        prepTime: '5 mins',
        benefits: 'All ingredients are rich in magnesium — the most important mineral for muscle relaxation. Dark cocoa has the highest magnesium density of any food',
        tags: ['anti-inflammatory', 'muscle-recovery', 'calming'],
      },
    ],
    lunch: [
      {
        name: 'Salmon & Turmeric Rice Bowl',
        description: 'Baked salmon with turmeric-ginger rice, steamed spinach, and a garnish of sesame seeds',
        prepTime: '30 mins',
        benefits: 'Salmon omega-3 directly inhibits COX-2 enzyme (same mechanism as ibuprofen). Turmeric compounds further suppress inflammatory pathways',
        tags: ['anti-inflammatory', 'high-protein', 'muscle-recovery'],
      },
      {
        name: 'Boswellia Dal Curry',
        description: 'Regular dal made with extra turmeric, ginger, and a pinch of black pepper. Served with brown rice and a side of cooked beetroot',
        prepTime: '30 mins',
        benefits: 'Beetroot contains betalains which reduce back pain and inflammation. Pepper enhances absorption of all anti-inflammatory compounds',
        tags: ['anti-inflammatory', 'gut-friendly'],
      },
      {
        name: 'Chicken Collagen Soup',
        description: 'Long-simmered chicken soup with cartilage pieces, carrots, celery, turmeric, and ginger',
        prepTime: '45 mins',
        benefits: 'Collagen from chicken cartilage directly supports disc, cartilage, and ligament health in the spine',
        tags: ['anti-inflammatory', 'high-protein', 'muscle-recovery'],
      },
    ],
    dinner: [
      {
        name: 'Magnesium-Rich Spinach Dal',
        description: 'Spinach (palak) in moong dal with extra ginger and ghee. The spinach should be plentiful',
        prepTime: '25 mins',
        benefits: 'Spinach is the richest magnesium food in Indian cuisine. Magnesium relaxes muscle spasms and reduces nerve pain',
        tags: ['anti-inflammatory', 'muscle-recovery'],
      },
      {
        name: 'Ginger-Turmeric Baked Chicken',
        description: 'Chicken baked in a ginger-turmeric-garlic paste with minimal oil. Served with mashed sweet potato and steamed broccoli',
        prepTime: '40 mins',
        benefits: 'This combination provides all the anti-inflammatory compounds in one meal. Sweet potato provides B6 for nerve health',
        tags: ['anti-inflammatory', 'high-protein'],
      },
      {
        name: 'Tart Cherry & Walnut Khichdi',
        description: 'Soft khichdi with a small amount of tart cherry juice mixed in, topped with crushed walnuts and a generous drizzle of ghee',
        prepTime: '25 mins',
        benefits: 'Tart cherry is one of the most researched natural pain reducers. Walnuts omega-3 works synergistically',
        tags: ['anti-inflammatory', 'easy-digest', 'muscle-recovery'],
      },
    ],
    snacks: [
      'Turmeric milk (golden milk) daily',
      'Tart cherry juice (30ml concentrate) before bed',
      'Handful of walnuts (omega-3)',
      'Dark chocolate 70%+ (magnesium)',
      'Ginger tea with lemon',
    ],
    weeklyTip: 'Add 2 tbsp of powdered magnesium (from food) tracking this week: dark chocolate, pumpkin seeds, spinach at every meal. Also try an Epsom salt bath (magnesium sulphate absorbed through skin) 3 evenings this week.',
  },


  // ══════════════════════════════════════════
  // ACNE
  // ══════════════════════════════════════════
  acne: {
    conditionId: 'acne',
    principles: [
      '30-day dairy elimination is one of the most effective single dietary interventions for acne',
      'Low glycaemic index diet reduces sebum production and inflammation',
      'Gut health = skin health — fermented foods daily',
      'Zinc-rich foods every day — zinc is the most evidence-based nutrient for acne',
    ],
    breakfast: [
      {
        name: 'Zinc-Power Pumpkin Seed Oats',
        description: 'Oats made with coconut or oat milk (not dairy), topped with pumpkin seeds, sunflower seeds, blueberries, and a drizzle of honey. No dairy whatsoever',
        prepTime: '8 mins',
        benefits: 'Pumpkin seeds are the best zinc source — zinc directly reduces sebum and kills acne bacteria. Blueberries reduce skin inflammation. Dairy-free to avoid IGF-1 increase',
        tags: ['skin-glow', 'anti-inflammatory'],
      },
      {
        name: 'Spearmint Green Smoothie',
        description: 'Fresh spearmint leaves blended with spinach, cucumber, green apple, ginger, lemon, and coconut water',
        prepTime: '5 mins',
        benefits: 'Spearmint tea/smoothie is clinically proven to reduce androgens by 30% in 30 days. Cucumber and spinach reduce skin inflammation. Start your day with this',
        tags: ['skin-glow', 'hormone-balancing', 'anti-inflammatory'],
      },
      {
        name: 'Egg & Avocado on Rye',
        description: 'Two poached eggs on dark rye bread with sliced avocado, tomato, and pumpkin seeds. No cheese, no butter',
        prepTime: '10 mins',
        benefits: 'Rye has very low GI preventing insulin spikes that trigger sebum. Avocado provides vitamin E for skin. Eggs provide zinc and selenium',
        tags: ['skin-glow', 'high-protein', 'anti-inflammatory'],
      },
    ],
    lunch: [
      {
        name: 'Anti-Acne Buddha Bowl',
        description: 'Brown rice, grilled chicken or tofu, roasted broccoli, shredded cabbage, grated carrots, avocado, and a tahini-lemon dressing with pumpkin seeds on top',
        prepTime: '30 mins',
        benefits: 'Cruciferous vegetables (broccoli, cabbage) help metabolise excess oestrogen through DIM. All ingredients are low-GI and anti-inflammatory. Zero dairy',
        tags: ['skin-glow', 'hormone-balancing', 'anti-inflammatory'],
      },
      {
        name: 'Turmeric Lentil Soup',
        description: 'Red lentils cooked with generous turmeric, ginger, garlic, tomatoes, and spinach. Served with a small whole grain roti',
        prepTime: '25 mins',
        benefits: 'Curcumin in turmeric is as effective as benzoyl peroxide in reducing acne bacteria in studies. Lentils provide zinc without dairy',
        tags: ['skin-glow', 'anti-inflammatory', 'gut-friendly'],
      },
      {
        name: 'Grilled Fish with Quinoa',
        description: 'Grilled white or fatty fish with quinoa, roasted cherry tomatoes, and a large green salad with olive oil dressing',
        prepTime: '25 mins',
        benefits: 'Omega-3 from fish directly reduces skin inflammation. Quinoa provides complete protein with zinc. No dairy or high-GI foods',
        tags: ['skin-glow', 'high-protein', 'anti-inflammatory'],
      },
    ],
    dinner: [
      {
        name: 'Spearmint Chicken Stir Fry',
        description: 'Chicken stir-fried with fresh spearmint, garlic, ginger, broccoli, and carrots. Served with a small amount of brown rice',
        prepTime: '20 mins',
        benefits: 'Spearmint at dinner maintains androgen-reducing effect throughout the night. Broccoli provides DIM for hormonal acne',
        tags: ['skin-glow', 'hormone-balancing', 'high-protein'],
      },
      {
        name: 'Probiotic Dal Bowl',
        description: 'Simple moong dal with turmeric and ghee. Side of homemade curd (if no dairy allergy) OR coconut yogurt with a teaspoon of apple cider vinegar',
        prepTime: '25 mins',
        benefits: 'Gut microbiome directly affects skin — this is the gut-skin axis. Probiotics from curd or coconut yogurt reduce inflammatory acne-causing bacteria',
        tags: ['skin-glow', 'gut-friendly', 'anti-inflammatory'],
      },
      {
        name: 'Zinc-Rich Pumpkin Soup',
        description: 'Blended pumpkin soup with ginger, garlic, coconut milk, and topped with roasted pumpkin seeds and a drizzle of sesame oil',
        prepTime: '30 mins',
        benefits: 'Pumpkin is rich in beta-carotene → vitamin A which regulates skin cell turnover. Pumpkin seeds double the zinc. Coconut milk is dairy-free',
        tags: ['skin-glow', 'anti-inflammatory'],
      },
    ],
    snacks: [
      'Spearmint tea — 2 cups daily (clinically reduces androgens)',
      'Green tea (reduces sebum production)',
      'Pumpkin seeds (zinc)',
      'Berries with coconut yogurt (probiotics + antioxidants)',
      'Cucumber slices with hummus',
    ],
    weeklyTip: 'Start a strict 30-day dairy elimination this week. Replace milk with oat or almond milk, cheese with avocado, butter with coconut oil. Take before/after photos. This single change dramatically improves acne for 70% of people who try it.',
  },


  // ══════════════════════════════════════════
  // HAIR FALL
  // ══════════════════════════════════════════
  hair_fall: {
    conditionId: 'hair_fall',
    principles: [
      'Hair is 95% keratin — you need protein at EVERY meal',
      'Iron + Vitamin C together: eat iron-rich foods with a citrus source always',
      'Biotin-rich foods daily — eggs, almonds, sweet potato',
      'Crash dieting and extreme calorie restriction is one of the biggest causes of hair fall — never do it',
    ],
    breakfast: [
      {
        name: 'Biotin Breakfast Plate',
        description: '2-3 whole eggs (yolk is essential — has all the biotin), with sautéed spinach and garlic, one slice of whole grain toast, and fresh amla or orange on the side',
        prepTime: '12 mins',
        benefits: 'Egg yolk is the richest biotin source in nature. Spinach provides iron. Amla/orange provides Vitamin C which doubles iron absorption',
        tags: ['hair-growth', 'high-protein', 'anti-inflammatory'],
      },
      {
        name: 'Iron Absorption Smoothie',
        description: 'Blended spinach, beetroot, orange, banana, and almond milk. Topped with pumpkin seeds',
        prepTime: '5 mins',
        benefits: 'Spinach + beetroot = iron. Orange = vitamin C. This combination maximises iron absorption — the most common nutrient deficiency causing hair fall',
        tags: ['hair-growth', 'anti-inflammatory'],
      },
      {
        name: 'Almond Sweet Potato Oats',
        description: 'Oats cooked with mashed sweet potato, almond butter, cinnamon, and topped with sliced almonds and a drizzle of honey',
        prepTime: '15 mins',
        benefits: 'Sweet potato is rich in biotin and beta-carotene which converts to Vitamin A for scalp health. Almonds provide biotin and vitamin E',
        tags: ['hair-growth', 'anti-inflammatory'],
      },
    ],
    lunch: [
      {
        name: 'Iron Palak Paneer with Roti',
        description: 'Spinach cooked with paneer, garlic, and spices. Served with whole wheat roti and a squeeze of lemon on top',
        prepTime: '30 mins',
        benefits: 'This is one of the highest iron meals in Indian cuisine. The lemon is critical — it converts non-heme iron to absorbable form. Paneer adds protein and biotin',
        tags: ['hair-growth', 'high-protein', 'anti-inflammatory'],
      },
      {
        name: 'Salmon & Lentil Bowl',
        description: 'Baked salmon with cooked green lentils, cherry tomatoes, cucumber, and a lemon-olive oil dressing',
        prepTime: '30 mins',
        benefits: 'Salmon provides omega-3 which nourishes the hair follicle, plus vitamin D deficiency is strongly linked to hair loss. Lentils provide iron and biotin',
        tags: ['hair-growth', 'high-protein', 'anti-inflammatory'],
      },
      {
        name: 'Chicken & Beetroot Salad',
        description: 'Grilled chicken with roasted beetroot, walnuts, spinach, and a pomegranate-balsamic dressing',
        prepTime: '25 mins',
        benefits: 'Chicken provides complete protein (all amino acids for keratin). Beetroot improves scalp circulation. Walnuts provide selenium and biotin',
        tags: ['hair-growth', 'high-protein'],
      },
    ],
    dinner: [
      {
        name: 'Collagen-Building Dal',
        description: 'Mixed dal cooked with tomatoes, turmeric, and garlic. Eaten with brown rice and a side of amla chutney or a glass of amla juice',
        prepTime: '30 mins',
        benefits: 'Vitamin C from amla is essential for collagen synthesis which is the structural foundation hair follicles rest in. Without collagen, hair follicles weaken',
        tags: ['hair-growth', 'gut-friendly', 'anti-inflammatory'],
      },
      {
        name: 'Prawn & Spinach Stir Fry with Rice',
        description: 'Prawns stir-fried with spinach, garlic, and ginger. Served with brown rice',
        prepTime: '20 mins',
        benefits: 'Prawns are rich in zinc, iodine, and selenium — the three minerals most associated with hair loss when deficient. Spinach doubles the iron content',
        tags: ['hair-growth', 'high-protein', 'anti-inflammatory'],
      },
      {
        name: 'Soya Keema with Roti',
        description: 'Soya granules cooked like keema with onion, tomato, ginger, garlic, and spices. Served with whole grain roti and a side of curd',
        prepTime: '25 mins',
        benefits: 'Soya is an excellent plant-based complete protein. All amino acids needed for keratin production. Curd provides biotin',
        tags: ['hair-growth', 'high-protein'],
      },
    ],
    snacks: [
      'Handful of mixed nuts: almonds, walnuts, cashews (biotin, zinc, selenium)',
      'Amla juice or fresh amla daily (Vitamin C for collagen)',
      'Hard boiled egg (biotin)',
      'Dates with almonds (iron + biotin)',
      'Pumpkin seeds + sunflower seeds mix',
    ],
    weeklyTip: 'Get blood tests done this week: Ferritin (iron stores), B12, Vitamin D3, and Thyroid (TSH). These four are responsible for 90% of nutritional hair fall. You cannot fix what you haven\'t measured.',
  },

}


// ─────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────

// Get the full meal plan for a condition
export const getMealPlan = (conditionId) =>
  MEAL_PLANS[conditionId] || null

// Get just the breakfast options for a condition
export const getBreakfastOptions = (conditionId) =>
  MEAL_PLANS[conditionId]?.breakfast || []

// Get just the lunch options for a condition
export const getLunchOptions = (conditionId) =>
  MEAL_PLANS[conditionId]?.lunch || []

// Get just the dinner options for a condition
export const getDinnerOptions = (conditionId) =>
  MEAL_PLANS[conditionId]?.dinner || []

// Check if a meal plan exists for a condition
export const hasMealPlan = (conditionId) =>
  conditionId in MEAL_PLANS