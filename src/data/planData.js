// src/data/planData.js
// 60-day plan tasks per condition
// Each task has: id, title, icon, category, time, why

export const PLAN_TASKS = {

  acne: [
    { id: 'acne_water',      title: 'Drink 8 glasses of water',       icon: '💧', category: 'hydration',   time: 'All day',   why: 'Flushes toxins that contribute to breakouts' },
    { id: 'acne_spearmint',  title: 'Spearmint tea x2',               icon: '🍵', category: 'nutrition',   time: 'Morning & afternoon', why: 'Reduces androgens by 30% in 30 days — directly reduces hormonal acne' },
    { id: 'acne_zinc',       title: 'Pumpkin seeds (zinc source)',     icon: '🌰', category: 'nutrition',   time: 'Evening',   why: 'Zinc kills acne bacteria and reduces sebum production' },
    { id: 'acne_nocleanser', title: 'Gentle cleanser only (no scrub)',icon: '🧴', category: 'skincare',    time: 'Morning',   why: 'Over-cleansing strips skin and triggers more oil production' },
    { id: 'acne_pillowcase', title: 'Change or flip pillowcase',      icon: '🛏️', category: 'habits',      time: 'Night',     why: 'Bacteria on pillowcases is a major acne trigger' },
    { id: 'acne_sugar',      title: 'No refined sugar today',         icon: '🚫', category: 'nutrition',   time: 'All day',   why: 'Sugar spikes insulin which triggers sebum overproduction' },
    { id: 'acne_yoga',       title: 'Yoga / breathwork (10 mins)',    icon: '🧘', category: 'movement',    time: 'Morning',   why: 'Reduces cortisol — a major hormonal acne trigger' },
  ],

  back_pain: [
    { id: 'bp_catcow',    title: 'Cat-cow stretch (5 mins)',        icon: '🐈', category: 'movement',  time: '6:15 AM',  why: 'Lubricates spinal discs and relieves overnight stiffness' },
    { id: 'bp_turmeric',  title: 'Turmeric + black pepper',         icon: '🌿', category: 'nutrition', time: 'Breakfast', why: 'Curcumin reduces inflammation — most effective with piperine' },
    { id: 'bp_stand',     title: 'Stand & stretch every 45 mins',  icon: '🧍', category: 'habits',    time: 'All day',   why: 'Prolonged sitting compresses lumbar discs' },
    { id: 'bp_hamstring', title: 'Hamstring stretch (4 mins)',      icon: '🧘', category: 'movement',  time: 'Evening',   why: 'Tight hamstrings are the #1 cause of lower back pain' },
    { id: 'bp_magnesium', title: 'Magnesium supplement',           icon: '💊', category: 'supplement',time: 'Night',     why: 'Relaxes muscle tension and reduces back spasms overnight' },
    { id: 'bp_posture',   title: 'Posture check while sitting',    icon: '💺', category: 'habits',    time: 'All day',   why: 'Poor posture is the root cause for most desk-worker back pain' },
  ],

  bloating: [
    { id: 'bl_warmwater',  title: 'Warm water + fennel on waking', icon: '🫖', category: 'nutrition', time: '6:15 AM',  why: 'Fennel neutralises overnight acid and stimulates digestion' },
    { id: 'bl_chew',       title: 'Chew every bite 20-30 times',   icon: '😶', category: 'habits',    time: 'Meals',     why: 'Thorough chewing prevents undigested food fermenting in gut' },
    { id: 'bl_walk',       title: 'Walk 10 mins after each meal',  icon: '🚶', category: 'movement',  time: 'After meals', why: 'Walking stimulates peristalsis and moves gas through' },
    { id: 'bl_fennel',     title: 'Fennel seeds after dinner',     icon: '🌱', category: 'nutrition', time: 'After dinner', why: 'Most effective natural carminative — prevents overnight gas' },
    { id: 'bl_noraw',      title: 'No raw onion or garlic today',  icon: '🧅', category: 'nutrition', time: 'All day',   why: 'High-FODMAP foods are the top bloating trigger' },
    { id: 'bl_vajrasana',  title: 'Vajrasana after meals (5 mins)',icon: '🧎', category: 'movement',  time: 'After meals', why: 'Only pose recommended directly after eating — reduces bloating' },
  ],

  gerd: [
    { id: 'gerd_dinner',    title: 'Finish eating by 7pm',         icon: '🍽️', category: 'habits',    time: 'Evening',   why: '3-hour gap before bed is essential to prevent nighttime reflux' },
    { id: 'gerd_vajrasana', title: 'Vajrasana after meals',        icon: '🧎', category: 'movement',  time: 'After meals', why: 'Directly reduces acid reflux after eating' },
    { id: 'gerd_nogarlics', title: 'No raw garlic or citrus',      icon: '🧄', category: 'nutrition', time: 'All day',   why: 'Both directly trigger lower oesophageal sphincter relaxation' },
    { id: 'gerd_fennel',    title: 'Fennel tea after meals',       icon: '🍵', category: 'nutrition', time: 'After meals', why: 'Neutralises acid without medication' },
    { id: 'gerd_elevate',   title: 'Elevate head while sleeping',  icon: '🛏️', category: 'habits',    time: 'Night',     why: 'Gravity prevents acid from reaching oesophagus overnight' },
    { id: 'gerd_smallmeal', title: 'Eat smaller portions',         icon: '🥗', category: 'nutrition', time: 'Meals',     why: 'Large meals increase stomach pressure and trigger reflux' },
  ],

  pcos: [
    { id: 'pcos_seeds',      title: 'Flax + pumpkin seeds (seed cycling)', icon: '🌱', category: 'nutrition',  time: 'Morning',  why: 'Flax balances oestrogen, pumpkin reduces androgens via zinc' },
    { id: 'pcos_spearmint',  title: 'Spearmint tea',                       icon: '🍵', category: 'nutrition',  time: 'Afternoon',why: 'Clinically proven to reduce testosterone in PCOS' },
    { id: 'pcos_methi',      title: 'Methi seeds soaked overnight',        icon: '🌿', category: 'nutrition',  time: 'Morning',  why: 'Regulates insulin resistance — the root of most PCOS' },
    { id: 'pcos_walk',       title: 'Brisk walk 30 mins',                  icon: '🚶', category: 'movement',   time: 'Morning',  why: 'Most effective exercise for PCOS — improves insulin sensitivity' },
    { id: 'pcos_yoga',       title: 'Baddha Konasana (5 mins)',            icon: '🧘', category: 'movement',   time: 'Evening',  why: 'Improves pelvic blood flow and hormonal regulation' },
    { id: 'pcos_nosugar',    title: 'No refined sugar or maida',           icon: '🚫', category: 'nutrition',  time: 'All day',  why: 'Sugar and refined carbs directly worsen insulin resistance in PCOS' },
  ],

  hypothyroidism: [
    { id: 'hypo_selenium',  title: 'Brazil nuts x2 (selenium)',     icon: '🥜', category: 'nutrition',  time: 'Morning',  why: 'Selenium is essential for T4 to T3 thyroid hormone conversion' },
    { id: 'hypo_iodine',    title: 'Iodised salt only',             icon: '🧂', category: 'nutrition',  time: 'All day',  why: 'Iodine deficiency is the #1 cause of hypothyroidism globally' },
    { id: 'hypo_cooked',    title: 'Only cooked cruciferous veg',   icon: '🥦', category: 'nutrition',  time: 'Meals',    why: 'Raw cruciferous blocks thyroid function — cooking deactivates goitrogens' },
    { id: 'hypo_walk',      title: 'Morning walk 20 mins',          icon: '🚶', category: 'movement',   time: 'Morning',  why: 'Thyroid patients have slow metabolism — morning movement is essential' },
    { id: 'hypo_ashwa',     title: 'Ashwagandha supplement',        icon: '🌿', category: 'supplement', time: 'Night',    why: 'Shown to improve T3 and T4 levels with consistent use' },
    { id: 'hypo_nogluten',  title: 'Minimise gluten today',         icon: '🚫', category: 'nutrition',  time: 'All day',  why: 'Gluten can trigger autoimmune thyroid attacks in Hashimotos' },
  ],

  anxiety: [
    { id: 'anx_478',       title: '4-7-8 breathing (4 cycles)',    icon: '🫁', category: 'breathwork', time: '6:30 AM',  why: 'Sets parasympathetic tone for the whole day' },
    { id: 'anx_ashwa',     title: 'Ashwagandha with warm milk',    icon: '🌿', category: 'supplement', time: '10:30 AM', why: 'Reduces cortisol by 28% with consistent use' },
    { id: 'anx_walk',      title: 'Phone-free walk 10 mins',       icon: '🚶', category: 'movement',   time: 'Afternoon',why: 'Walking without phone resets stress hormones' },
    { id: 'anx_nocaffeine',title: 'No caffeine today',             icon: '☕', category: 'habits',     time: 'All day',  why: 'Caffeine directly worsens anxiety symptoms' },
    { id: 'anx_magnesium', title: 'Magnesium glycinate at night',  icon: '💊', category: 'supplement', time: 'Night',    why: 'Deficiency is linked to 65% of anxiety cases' },
    { id: 'anx_journal',   title: 'Write 3 things you\'re grateful for', icon: '📝', category: 'habits', time: 'Night', why: 'Rewires brain away from threat-detection mode' },
  ],

  brain_fog: [
    { id: 'bf_water',     title: '500ml water before any screens', icon: '💧', category: 'hydration',  time: '6:00 AM',  why: '1-2% dehydration measurably reduces cognitive performance' },
    { id: 'bf_omega3',    title: 'Omega-3 supplement',             icon: '💊', category: 'supplement', time: 'Breakfast', why: 'DHA is the primary structural fat in brain tissue' },
    { id: 'bf_deepwork',  title: '90-min deep work (phone away)',  icon: '🎯', category: 'habits',     time: '9:00 AM',  why: 'Peak cognitive window — protect it from interruption' },
    { id: 'bf_greentea',  title: 'Green tea with L-theanine',      icon: '🍵', category: 'nutrition',  time: '10:45 AM', why: 'L-theanine produces calm focus without jitteriness' },
    { id: 'bf_sleep',     title: 'In bed by 10pm',                 icon: '😴', category: 'habits',     time: 'Night',    why: 'Brain clears metabolic waste (including amyloid) only during deep sleep' },
    { id: 'bf_nosugar',   title: 'No sugar or refined carbs',      icon: '🚫', category: 'nutrition',  time: 'All day',  why: 'Blood sugar spikes cause brain fog within 30 minutes' },
  ],

  low_immunity: [
    { id: 'li_tulsi',     title: 'Tulsi + ginger tea',             icon: '🌿', category: 'nutrition',  time: 'Morning',  why: 'Tulsi has direct antiviral properties, ginger is antimicrobial' },
    { id: 'li_garlic',    title: 'Raw garlic (crushed, wait 10m)', icon: '🧄', category: 'nutrition',  time: 'Morning',  why: 'Activates allicin — most potent natural antimicrobial' },
    { id: 'li_sunlight',  title: '15 mins direct sunlight',        icon: '☀️', category: 'habits',     time: '11:00 AM', why: 'Vitamin D from sunlight is the #1 immunity booster' },
    { id: 'li_chyawan',   title: 'Chyawanprash in warm milk',      icon: '🥛', category: 'nutrition',  time: 'Night',    why: 'Clinically shown to improve T-cell and NK cell activity' },
    { id: 'li_sleep8',    title: 'Sleep 8 hours tonight',          icon: '😴', category: 'habits',     time: 'Night',    why: 'Immune cells replicate and repair only during deep sleep' },
    { id: 'li_vitc',      title: 'Vitamin C rich food at lunch',   icon: '🍊', category: 'nutrition',  time: 'Lunch',    why: 'Vitamin C directly stimulates white blood cell production' },
  ],

  insulin_resistance: [
    { id: 'ir_walk',      title: 'Walk 20 mins after meals',       icon: '🚶', category: 'movement',   time: 'After meals', why: 'Walking uses glucose directly, bypassing insulin' },
    { id: 'ir_methi',     title: 'Methi water on empty stomach',   icon: '🌿', category: 'nutrition',  time: '6:00 AM',  why: 'Fenugreek improves insulin sensitivity clinically' },
    { id: 'ir_salad',     title: 'Eat salad FIRST then meal',      icon: '🥗', category: 'habits',     time: 'Meals',    why: 'Fibre first reduces glucose spike by up to 75%' },
    { id: 'ir_nosugar',   title: 'Zero refined sugar today',       icon: '🚫', category: 'nutrition',  time: 'All day',  why: 'Every sugar hit worsens insulin resistance' },
    { id: 'ir_cinnamon',  title: 'Cinnamon in breakfast',          icon: '🍂', category: 'nutrition',  time: 'Breakfast', why: 'Cinnamon mimics insulin and improves glucose uptake' },
    { id: 'ir_fast12',    title: 'Finish eating by 7pm (12hr fast)',icon: '⏰', category: 'habits',    time: 'Evening',  why: '12-14hr overnight fast triggers insulin reset' },
  ],

  hair_fall: [
    { id: 'hf_balayam',   title: 'Balayam nail rubbing (5 mins)', icon: '💅', category: 'habits',     time: '6:15 AM',  why: 'Stimulates nerve endings connected to scalp follicles' },
    { id: 'hf_amla',      title: 'Amla juice or 2 fresh amla',    icon: '🟢', category: 'nutrition',  time: 'Morning',  why: 'Amla has 20x Vitamin C of oranges — essential for follicle collagen' },
    { id: 'hf_iron',      title: 'Iron-rich food + citrus',        icon: '🥬', category: 'nutrition',  time: 'Lunch',    why: 'Iron deficiency is the most common cause of hair fall in women' },
    { id: 'hf_massage',   title: 'Scalp oil massage (5 mins)',     icon: '💆', category: 'habits',     time: 'Evening',  why: 'Increases scalp blood flow by 30-40%' },
    { id: 'hf_biotin',    title: 'Biotin supplement',              icon: '💊', category: 'supplement', time: 'Morning',  why: 'Biotin deficiency directly causes hair thinning' },
    { id: 'hf_protein',   title: 'High protein breakfast',         icon: '🥚', category: 'nutrition',  time: 'Breakfast', why: 'Hair is made of keratin — protein deficiency starves follicles' },
  ],

  ibs: [
    { id: 'ibs_lowfodmap', title: 'Low-FODMAP meals today',        icon: '🥗', category: 'nutrition',  time: 'All day',  why: 'FODMAP foods ferment in gut and directly trigger IBS symptoms' },
    { id: 'ibs_peppermint',title: 'Peppermint oil capsule',        icon: '🌿', category: 'supplement', time: 'Before meals', why: 'Relaxes intestinal smooth muscle — most evidence-based IBS supplement' },
    { id: 'ibs_stress',    title: 'Stress reduction (10 mins)',     icon: '🧘', category: 'breathwork', time: 'Afternoon', why: 'Gut-brain axis means stress directly causes IBS flares' },
    { id: 'ibs_chew',      title: 'Chew thoroughly, eat slowly',   icon: '😶', category: 'habits',     time: 'Meals',    why: 'Rushed eating is the #1 lifestyle trigger for IBS' },
    { id: 'ibs_probiotic', title: 'Probiotic supplement or curd',  icon: '🥛', category: 'nutrition',  time: 'Morning',  why: 'Rebalances gut microbiome — addresses root cause' },
    { id: 'ibs_nogluten',  title: 'Minimise gluten today',         icon: '🚫', category: 'nutrition',  time: 'All day',  why: 'Gluten worsens gut permeability in most IBS cases' },
  ],
}

// Get tasks for a set of conditions, deduped
export function getTasksForConditions(conditionIds) {
  const seen  = new Set()
  const tasks = []
  conditionIds.forEach(id => {
    const condTasks = PLAN_TASKS[id] || []
    condTasks.forEach(task => {
      if (!seen.has(task.id)) {
        seen.add(task.id)
        tasks.push({ ...task, conditionId: id })
      }
    })
  })
  return tasks
}

// Calculate score from completed tasks
export function calcPlanScore(tasks, completedIds) {
  if (!tasks.length) return 0
  const done = tasks.filter(t => completedIds.includes(t.id)).length
  return Math.round((done / tasks.length) * 100)
}

// Calculate 60-day overall progress
export function calcOverallProgress(dailyLogs, startDate, conditionIds) {
  if (!startDate) return 0
  const start = new Date(startDate)
  const today = new Date()
  const daysPassed = Math.min(
    Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1,
    60
  )
  const tasks = getTasksForConditions(conditionIds)
  if (!tasks.length) return 0

  let totalPossible = 0
  let totalDone     = 0

  for (let i = 0; i < daysPassed; i++) {
    const d   = new Date(start)
    d.setDate(d.getDate() + i)
    const key = d.toISOString().slice(0, 10)
    const log = dailyLogs?.[key] || {}
    totalPossible += tasks.length
    totalDone     += tasks.filter(t => log[t.id]).length
  }

  return totalPossible > 0 ? Math.round((totalDone / totalPossible) * 100) : 0
}