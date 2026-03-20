// src/pages/Schedule.jsx — daily goal-based schedule (separate from 60-day plans)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/DailyPlan.css'

const GOAL_ACTIVITIES = {
  sleep:     [
    { id: 'sleep_nophone',  time: '6:30 AM',  title: 'No phone for 10 mins on waking', duration: '10 min', icon: '📵', why: 'Morning phone use spikes cortisol and disrupts melatonin recovery' },
    { id: 'sleep_winddown', time: '8:00 PM',  title: 'Wind-down routine begins',        duration: '15 min', icon: '🌙', why: 'Starting wind-down 2 hours before bed improves sleep onset' },
    { id: 'sleep_nodim',    time: '9:30 PM',  title: 'Dim lights and no screens',       duration: 'ongoing',icon: '💡', why: 'Blue light suppresses melatonin for up to 3 hours' },
    { id: 'sleep_bed',      time: '10:00 PM', title: 'Sleep — target 7.5 to 8 hrs',    duration: '8 hrs',  icon: '😴', why: '10pm–6am is the ideal circadian window for deep sleep' },
  ],
  acidity:   [
    { id: 'acid_fennel',    time: '6:15 AM', title: 'Warm water with fennel seeds',     duration: '5 min',  icon: '🫖', why: 'Fennel neutralises overnight acid and primes digestion' },
    { id: 'acid_vajra',     time: '8:30 AM', title: 'Vajrasana after breakfast (10m)',  duration: '10 min', icon: '🧎', why: 'The only pose recommended after eating — reduces reflux directly' },
    { id: 'acid_walk',      time: '1:30 PM', title: 'Walk 10 mins after lunch',         duration: '10 min', icon: '🚶', why: 'Walking after meals reduces acid production and afternoon reflux' },
    { id: 'acid_dinner',    time: '7:00 PM', title: 'Light dinner — finish by 7pm',     duration: '—',      icon: '🥗', why: '3-hour gap before bed is essential to prevent nighttime reflux' },
  ],
  energy:    [
    { id: 'energy_water',   time: '6:00 AM',  title: '500ml water on waking',           duration: '2 min',  icon: '💧', why: 'Rehydrating first thing increases energy measurably within 20 mins' },
    { id: 'energy_protein', time: '8:00 AM',  title: 'High-protein breakfast (no sugar)',duration: '—',      icon: '🥚', why: 'Protein sustains energy for 4-5hrs vs a sugar crash at 11am' },
    { id: 'energy_sun',     time: '11:00 AM', title: '10-min sunlight exposure',         duration: '10 min', icon: '☀️', why: 'Morning sunlight triggers serotonin — the primary daytime energy neurotransmitter' },
    { id: 'energy_nocaff',  time: '3:00 PM',  title: 'No caffeine after 2pm',           duration: '—',      icon: '☕', why: 'Caffeine after 2pm disrupts deep sleep and creates next-day fatigue' },
  ],
  stress:    [
    { id: 'stress_breath',  time: '6:30 AM',  title: '4-7-8 breathing (4 cycles)',      duration: '5 min',  icon: '🫁', why: 'Sets parasympathetic tone for the whole day' },
    { id: 'stress_ashwa',   time: '10:30 AM', title: 'Ashwagandha with warm milk',      duration: '2 min',  icon: '🌿', why: 'Ashwagandha lowers cortisol by 28% with consistent use' },
    { id: 'stress_walk',    time: '2:00 PM',  title: '10-min mindful walk (no phone)',  duration: '10 min', icon: '🚶', why: 'A phone-free walking break resets stress hormones' },
    { id: 'stress_yoga',    time: '7:30 PM',  title: 'Legs-up-the-wall — 10 mins',     duration: '10 min', icon: '🧘', why: 'One of the most effective restorative poses for stress' },
  ],
  weight:    [
    { id: 'weight_walk',    time: '6:00 AM', title: 'Fasted walk 20–30 mins',           duration: '25 min', icon: '🚶', why: 'Walking before eating burns fat directly from fat stores' },
    { id: 'weight_bfast',   time: '8:00 AM', title: 'Breakfast within 1hr of waking',   duration: '—',      icon: '🍳', why: 'Skipping breakfast spikes cortisol and causes overeating at lunch' },
    { id: 'weight_salad',   time: '1:00 PM', title: 'Eat salad FIRST then your meal',   duration: '—',      icon: '🥗', why: 'Fibre first reduces glucose spike by up to 75%' },
    { id: 'weight_stop',    time: '6:30 PM', title: 'Finish eating for the day',        duration: '—',      icon: '🚫', why: 'A 12–14hr overnight fast triggers fat burning' },
  ],
  digestion: [
    { id: 'dig_water',      time: '6:00 AM',  title: 'Warm water with lemon and cumin', duration: '5 min', icon: '🍋', why: 'Cumin water triggers bile production and digestive stimulation' },
    { id: 'dig_sit',        time: '8:00 AM',  title: 'Sit quietly 5 mins after eating', duration: '5 min', icon: '🧎', why: 'Eating while rushing redirects blood away from digestion' },
    { id: 'dig_chew',       time: '12:30 PM', title: 'Chew every bite 20–30 times',     duration: '—',     icon: '😶', why: 'Thorough chewing prevents bloating and improves nutrient absorption' },
    { id: 'dig_fennel',     time: '7:00 PM',  title: 'Fennel seeds after dinner',       duration: '2 min', icon: '🌱', why: 'Most effective natural carminative — prevents overnight gas' },
  ],
  skin:      [
    { id: 'skin_water',     time: '6:00 AM',  title: '500ml water before anything',     duration: '2 min', icon: '💧', why: 'Skin hydration begins from within' },
    { id: 'skin_spearmint', time: '10:00 AM', title: 'Spearmint tea (1st cup)',          duration: '5 min', icon: '🍵', why: 'Spearmint reduces androgens by 30% in 30 days' },
    { id: 'skin_spearmint2',time: '2:00 PM',  title: 'Spearmint tea (2nd cup)',          duration: '5 min', icon: '🍵', why: '2 cups daily is the clinically studied dose' },
    { id: 'skin_zinc',      time: '9:00 PM',  title: 'Pumpkin seeds snack (zinc)',       duration: '—',     icon: '🌰', why: 'Zinc is the most evidence-based nutrient for acne' },
  ],
  hair:      [
    { id: 'hair_balayam',   time: '6:15 AM', title: 'Balayam nail rubbing — 5 mins',    duration: '5 min', icon: '💅', why: 'Stimulates nerve endings connected to the scalp' },
    { id: 'hair_amla',      time: '8:30 AM', title: 'Amla juice or 2 fresh amla',       duration: '2 min', icon: '🟢', why: 'Amla has 20x Vitamin C of oranges — essential for follicle collagen' },
    { id: 'hair_iron',      time: '1:00 PM', title: 'Iron-rich food + citrus at lunch', duration: '—',     icon: '🥬', why: 'Iron deficiency is the most common cause of hair fall in women' },
    { id: 'hair_oil',       time: '7:00 PM', title: 'Scalp oil massage — 5 mins',       duration: '5 min', icon: '💆', why: 'Increases scalp blood flow by 30–40%' },
  ],
  immunity:  [
    { id: 'imm_tulsi',      time: '6:00 AM',  title: 'Tulsi and ginger tea',            duration: '5 min',  icon: '🌿', why: 'Tulsi has direct antiviral properties, ginger is antimicrobial' },
    { id: 'imm_garlic',     time: '8:00 AM',  title: 'Raw garlic (1 crushed clove)',     duration: '2 min',  icon: '🧄', why: 'Activates allicin — the most potent natural antimicrobial' },
    { id: 'imm_sun',        time: '11:00 AM', title: '15 mins direct sunlight',          duration: '15 min', icon: '☀️', why: 'Vitamin D from sunlight is the single biggest immunity booster' },
    { id: 'imm_chyawan',    time: '9:30 PM',  title: 'Chyawanprash in warm milk',       duration: '2 min',  icon: '🥛', why: 'Clinically shown to improve T-cell and NK cell activity' },
  ],
  focus:     [
    { id: 'focus_water',    time: '6:00 AM',  title: '500ml water before screens',      duration: '2 min',  icon: '💧', why: '1–2% dehydration measurably reduces cognitive performance' },
    { id: 'focus_deep',     time: '9:00 AM',  title: 'Deep work block — phone away',    duration: '90 min', icon: '🎯', why: 'Peak focus window — protect it from interruption' },
    { id: 'focus_greentea', time: '10:45 AM', title: 'Green tea with L-theanine',       duration: '5 min',  icon: '🍵', why: 'L-theanine produces calm focus without jitteriness' },
    { id: 'focus_walk',     time: '2:30 PM',  title: '10-min walk or Bhramari breath',  duration: '10 min', icon: '🚶', why: 'Resets alpha brain waves and restores afternoon focus' },
  ],
  hormones:  [
    { id: 'horm_nadi',      time: '6:00 AM',  title: 'Nadi Shodhana — 10 mins',        duration: '10 min', icon: '🫁', why: 'Alternate nostril breathing directly regulates the HPA axis' },
    { id: 'horm_seeds',     time: '8:00 AM',  title: 'Seed cycling: flax and pumpkin', duration: '2 min',  icon: '🌱', why: 'Flaxseeds balance oestrogen; pumpkin seeds reduce androgens' },
    { id: 'horm_spearmint', time: '12:00 PM', title: 'Spearmint tea',                  duration: '5 min',  icon: '🍵', why: 'Clinically reduces testosterone — essential for PCOS and hormonal acne' },
    { id: 'horm_yoga',      time: '7:30 PM',  title: 'Baddha Konasana — 5 mins',       duration: '5 min',  icon: '🧘', why: 'Improves blood flow to reproductive organs with daily practice' },
  ],
  pain:      [
    { id: 'pain_catcow',    time: '6:15 AM', title: 'Cat-cow flow — 5 mins',            duration: '5 min', icon: '🐈', why: 'Lubricates spinal discs and relieves overnight stiffness' },
    { id: 'pain_turmeric',  time: '8:00 AM', title: 'Turmeric and black pepper',        duration: '—',     icon: '🌿', why: 'Curcumin + piperine reduces inflammation effectively' },
    { id: 'pain_stand',     time: '1:00 PM', title: 'Stand and stretch every 45 mins',  duration: '2 min', icon: '🧍', why: 'Prolonged sitting compresses lumbar discs' },
    { id: 'pain_stretch',   time: '7:00 PM', title: 'Hamstring stretch — 4 mins',       duration: '4 min', icon: '🧘', why: 'Tight hamstrings are the #1 cause of lower back pain' },
  ],
}

const CORE_BLOCKS = [
  { id: 'core_wake',      time: '6:00 AM',  title: 'Wake up',   duration: '—',      icon: '⏰', why: 'Consistent wake time is the most important factor in circadian rhythm', isCore: true },
  { id: 'core_breakfast', time: '7:30 AM',  title: 'Breakfast', duration: '20 min', icon: '🍳', why: 'Eat within 1 hour of waking to stabilise cortisol', isCore: true },
  { id: 'core_lunch',     time: '1:00 PM',  title: 'Lunch',     duration: '30 min', icon: '🥗', why: 'Digestive fire is strongest at midday', isCore: true },
  { id: 'core_dinner',    time: '7:00 PM',  title: 'Dinner',    duration: '20 min', icon: '🍲', why: 'Light, early dinner. Finish 2–3 hours before sleep.', isCore: true },
  { id: 'core_sleep',     time: '10:00 PM', title: 'Sleep',     duration: '8 hrs',  icon: '😴', why: 'Consistent sleep time trains your circadian clock', isCore: true },
]

const GOAL_PRESETS = [
  { id: 'sleep',     label: 'Improve sleep',    icon: '😴' },
  { id: 'acidity',   label: 'Reduce acidity',   icon: '🔥' },
  { id: 'energy',    label: 'Boost energy',     icon: '⚡' },
  { id: 'stress',    label: 'Manage stress',    icon: '🧘' },
  { id: 'weight',    label: 'Manage weight',    icon: '⚖️' },
  { id: 'digestion', label: 'Better digestion', icon: '🌿' },
  { id: 'skin',      label: 'Clear skin',       icon: '✨' },
  { id: 'hair',      label: 'Reduce hair fall', icon: '💆' },
  { id: 'immunity',  label: 'Build immunity',   icon: '🛡️' },
  { id: 'focus',     label: 'Improve focus',    icon: '🎯' },
  { id: 'hormones',  label: 'Balance hormones', icon: '🌸' },
  { id: 'pain',      label: 'Reduce back pain', icon: '🦴' },
]

const getTodayKey = () => new Date().toISOString().slice(0, 10)

export default function Schedule() {
  const navigate  = useNavigate()
  const { profile } = useAuth()

  const [goals, setGoals]     = useState(() => {
    // First try localStorage for today
    try {
      const s = localStorage.getItem(`wellnest-goals-${getTodayKey()}`)
      if (s) return JSON.parse(s)
    } catch {}
    // Fall back to profile goals from Firebase
    return profile?.goals || []
  })
  const [schedule, setSchedule]         = useState(null)
  const [done, setDone]                 = useState({})
  const [showPicker, setShowPicker]     = useState(false)
  const [customInput, setCustomInput]   = useState('')
  const [expandedId, setExpandedId]     = useState(null)

  const todayDisplay = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

  const saveGoals = (updated) => {
    setGoals(updated)
    try { localStorage.setItem(`wellnest-goals-${getTodayKey()}`, JSON.stringify(updated)) } catch {}
    setSchedule(null)
  }

  const addGoal    = (preset) => { if (goals.find(g => g.id === preset.id)) return; saveGoals([...goals, preset]) }
  const removeGoal = (id)     => saveGoals(goals.filter(g => g.id !== id))
  const addCustom  = () => {
    const text = customInput.trim(); if (!text) return
    saveGoals([...goals, { id: `custom-${Date.now()}`, label: text, icon: '🎯' }])
    setCustomInput('')
  }

  const generate = () => {
    const activities = [...CORE_BLOCKS]
    goals.forEach(g => activities.push(...(GOAL_ACTIVITIES[g.id] || [])))
    const parseTime = (t) => {
      const [time, period] = t.split(' ')
      let [h, m] = time.split(':').map(Number)
      if (period === 'PM' && h !== 12) h += 12
      if (period === 'AM' && h === 12) h = 0
      return h * 60 + m
    }
    activities.sort((a, b) => parseTime(a.time) - parseTime(b.time))
    setSchedule(activities)
    setDone({})
  }

  const toggle = (id) => setDone(prev => ({ ...prev, [id]: !prev[id] }))

  const doneCount = Object.values(done).filter(Boolean).length
  const progress  = schedule ? Math.round(doneCount / schedule.length * 100) : 0

  return (
    <div className="daily-plan">
      <div className="plan-header">
        <div>
          <h1 className="plan-title">Today's Schedule</h1>
          <p className="plan-date">{todayDisplay}</p>
        </div>
        <button className="back-to-plans-btn" onClick={() => navigate('/daily-plan')}>
          View 60-Day Plans →
        </button>
      </div>

      <div className="plan-body">
        <div className="plan-sidebar">
          <div className="plan-card">
            <div className="plan-card-header">
              <h2>Today's Goals</h2>
              <button className="icon-btn" onClick={() => setShowPicker(p => !p)}>+</button>
            </div>
            {goals.length === 0
              ? <div className="empty-goals"><p>Add goals to generate your schedule.</p></div>
              : <ul className="plan-goals-list">
                  {goals.map(g => (
                    <li key={g.id} className="plan-goal-item">
                      <span className="plan-goal-icon">{g.icon}</span>
                      <span className="plan-goal-label">{g.label}</span>
                      <button className="plan-goal-remove" onClick={() => removeGoal(g.id)}>×</button>
                    </li>
                  ))}
                </ul>
            }
            {showPicker && (
              <div className="goal-picker">
                <div className="goal-picker-grid">
                  {GOAL_PRESETS.filter(p => !goals.find(g => g.id === p.id)).map(preset => (
                    <button key={preset.id} className="goal-picker-chip"
                      onClick={() => { addGoal(preset); setShowPicker(false) }}>
                      {preset.icon} {preset.label}
                    </button>
                  ))}
                </div>
                <div className="goal-picker-input">
                  <input type="text" placeholder="Custom goal..." value={customInput}
                    onChange={e => setCustomInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { addCustom(); setShowPicker(false) } }} />
                  <button onClick={() => { addCustom(); setShowPicker(false) }}>Add</button>
                </div>
              </div>
            )}
          </div>

          {goals.length > 0 && (
            <button className="generate-btn" onClick={generate}>
              {schedule ? 'Regenerate' : 'Generate My Day'}
            </button>
          )}

          {schedule && (
            <div className="plan-card plan-progress-card">
              <div className="progress-header">
                <span>Progress</span>
                <span className="progress-pct">{progress}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <p className="progress-sub">{doneCount} of {schedule.length} done</p>
            </div>
          )}
        </div>

        <div className="plan-main">
          {!schedule ? (
            <div className="plan-empty">
              <div className="plan-empty-icon">📋</div>
              <h3>Your day schedule will appear here</h3>
              <p>{goals.length === 0 ? 'Add goals on the left to get started' : `${goals.length} goal${goals.length > 1 ? 's' : ''} set — click Generate My Day`}</p>
              {goals.length > 0 && <button className="generate-btn generate-btn--inline" onClick={generate}>Generate My Day</button>}
            </div>
          ) : (
            <div className="schedule">
              {schedule.map(block => {
                const isDone     = !!done[block.id]
                const isExpanded = expandedId === block.id
                return (
                  <div key={block.id} className={`activity-block ${isDone ? 'activity-block--done' : ''} ${block.isCore ? 'activity-block--core' : ''}`}>
                    <button className="activity-check" onClick={() => toggle(block.id)}>{isDone ? '✓' : ''}</button>
                    <div className="activity-content" onClick={() => setExpandedId(isExpanded ? null : block.id)}>
                      <div className="activity-top">
                        <span className="activity-icon">{block.icon}</span>
                        <div className="activity-info">
                          <span className="activity-time">{block.time}</span>
                          <span className="activity-title">{block.title}</span>
                        </div>
                        {block.duration && block.duration !== '—' && <span className="activity-duration">{block.duration}</span>}
                      </div>
                      {isExpanded && (
                        <div className="activity-why">
                          <span className="why-label">Why this matters</span>
                          <p>{block.why}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}