// ============================================================
// FILE: src/pages/Dashboard.jsx
// TYPE: Page Component — complete redesign
// PURPOSE: The home screen of WellNest.
//
// SECTIONS (top to bottom):
//   1. Today's Goals — hero section, first thing user sees
//   2. Quick Stats bar — water, steps, mood at a glance
//   3. Health Conditions — category filter + condition cards
//
// NEW CONCEPTS:
//   - localStorage: saves goals so they persist on refresh
//   - Date-aware greeting (Good morning / afternoon / evening)
//   - Goal presets + custom input
// ============================================================

import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES, CONDITIONS, getConditionsByCategory, getCategoryById } from '../data/healthData'
import { useAuth } from '../context/AuthContext'
import { usePlan } from '../context/PlanContext'
import '../styles/Dashboard.css'

// ── STREAK HELPERS ─────────────────────────────────────────
const getTodayKey = () => new Date().toISOString().slice(0, 10)
const STREAK_KEY  = 'wellnest-streaks'

function loadStreaks() {
  try { const s = localStorage.getItem(STREAK_KEY); return s ? JSON.parse(s) : {} } catch { return {} }
}
function saveStreaks(data) {
  try { localStorage.setItem(STREAK_KEY, JSON.stringify(data)) } catch {}
}

// Read water glasses from Health Score localStorage
function getWaterToday() {
  try {
    const key  = `wellnest-score-${getTodayKey()}`
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data).water || 0 : 0
  } catch { return 0 }
}

function getScoreToday() {
  try {
    const key  = `wellnest-score-${getTodayKey()}`
    const data = localStorage.getItem(key)
    if (!data) return null
    const d = JSON.parse(data)
    // Simple score calc mirroring HealthScore.jsx
    let score = 0
    score += Math.min((d.water||0) / 8, 1) * 20
    score += Math.min((d.sleep||0) / 8, 1) * 25
    score += d.mood   > 0 ? ((d.mood-1)/4)   * 15 : 0
    score += d.energy > 0 ? ((d.energy-1)/4) * 15 : 0
    const meals = Object.values(d.meals||{}).filter(Boolean).length
    score += (meals / 3) * 15
    if (d.exercise)    score += 5
    if (d.supplements) score += 5
    return Math.round(score)
  } catch { return null }
}

function getScoreYesterday() {
  try {
    const d = new Date(); d.setDate(d.getDate() - 1)
    const key  = `wellnest-score-${d.toISOString().slice(0,10)}`
    const data = localStorage.getItem(key)
    if (!data) return null
    const s = JSON.parse(data)
    let score = 0
    score += Math.min((s.water||0) / 8, 1) * 20
    score += Math.min((s.sleep||0) / 8, 1) * 25
    score += s.mood   > 0 ? ((s.mood-1)/4)   * 15 : 0
    score += s.energy > 0 ? ((s.energy-1)/4) * 15 : 0
    const meals = Object.values(s.meals||{}).filter(Boolean).length
    score += (meals / 3) * 15
    if (s.exercise)    score += 5
    if (s.supplements) score += 5
    return Math.round(score)
  } catch { return null }
}

function calcStreak(habitId, data) {
  let streak = 0
  let d = new Date()
  const today = getTodayKey()
  if (!data[today]?.[habitId]) d.setDate(d.getDate() - 1)
  while (true) {
    const key = d.toISOString().slice(0, 10)
    if (data[key]?.[habitId]) { streak++; d.setDate(d.getDate() - 1) } else break
  }
  return streak
}


// ── GOAL PRESETS ───────────────────────────────────────────
const GOAL_PRESETS = [
  { id: 'sleep',      label: 'Improve sleep',     icon: '😴' },
  { id: 'acidity',    label: 'Reduce acidity',     icon: '🔥' },
  { id: 'energy',     label: 'Boost energy',       icon: '⚡' },
  { id: 'stress',     label: 'Manage stress',      icon: '🧘' },
  { id: 'weight',     label: 'Manage weight',      icon: '⚖️' },
  { id: 'digestion',  label: 'Better digestion',   icon: '🌿' },
  { id: 'skin',       label: 'Clear skin',         icon: '✨' },
  { id: 'hair',       label: 'Reduce hair fall',   icon: '💆' },
  { id: 'immunity',   label: 'Build immunity',     icon: '🛡️' },
  { id: 'focus',      label: 'Improve focus',      icon: '🎯' },
  { id: 'hormones',   label: 'Balance hormones',   icon: '🌸' },
  { id: 'pain',       label: 'Reduce back pain',   icon: '🦴' },
]

const SEVERITY = {
  mild:     { label: 'Mild',     bg: '#DCFCE7', color: '#15803D' },
  moderate: { label: 'Moderate', bg: '#FEF9C3', color: '#A16207' },
  serious:  { label: 'Serious',  bg: '#FFE4E6', color: '#BE123C' },
}

const getGreeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}


function Dashboard() {
  const navigate  = useNavigate()
  const { profile, saveProfile } = useAuth()
  const { activePlans, todayScore, getPlanDays, startPlan, stopPlan } = usePlan()

  // ── SYMPTOM SCANNER ────────────────────────────────────
  const [symptomText, setSymptomText]         = useState('')
  const [scannedConditions, setScannedConditions] = useState([])
  const [showScanner, setShowScanner]         = useState(false)
  const [scanDone, setScanDone]               = useState(false)

  const SYMPTOM_MAP = {
    bloating:           ['bloat','gas','gassy','fullness','burp','flatulence','distended'],
    gerd:               ['acid','reflux','heartburn','acidity','chest burn','sour taste'],
    ibs:                ['ibs','irritable bowel','diarrhea','diarrhoea','constipat','cramping','loose stool'],
    pcos:               ['pcos','irregular period','missed period','facial hair','ovary','pcod'],
    hypothyroidism:     ['thyroid','hypothyroid','slow metabolism','cold hands','cold feet'],
    low_immunity:       ['immunity','frequent cold','sick often','slow healing','weak immune'],
    anxiety:            ['anxiety','anxious','panic','worry','restless','racing thoughts'],
    brain_fog:          ['brain fog','foggy','concentration','memory','forgetful','mental fatigue'],
    insulin_resistance: ['blood sugar','sugar craving','energy crash','belly fat','insulin','diabetic'],
    back_pain:          ['back pain','lower back','spine','posture','stiff back','backache','sciatica'],
    acne:               ['acne','pimple','breakout','oily skin','cystic','blemish'],
    hair_fall:          ['hair fall','hair loss','thinning','shedding'],
  }

  const scanSymptoms = () => {
    const lower = symptomText.toLowerCase()
    const found = Object.entries(SYMPTOM_MAP)
      .filter(([, keywords]) => keywords.some(kw => lower.includes(kw)))
      .map(([id]) => id)
    setScannedConditions(found)
    setScanDone(true)
  }
  const todayKey  = getTodayKey()

  // ── GOALS — loaded from Firebase profile ───────────────
  const [goals, setGoals] = useState(() => profile?.goals || [])

  // Keep goals in sync if profile loads after mount
  useEffect(() => {
    if (profile?.goals) setGoals(profile.goals)
  }, [profile?.goals?.length])

  const [customGoalInput, setCustomGoalInput] = useState('')
  const [showGoalInput, setShowGoalInput]     = useState(false)
  const [showAllPresets, setShowAllPresets]   = useState(false)

  // ── STREAKS ────────────────────────────────────────────
  const [streakData, setStreakData]     = useState(loadStreaks)
  const [waterGlasses, setWaterGlasses] = useState(getWaterToday)
  const [scoreToday, setScoreToday]     = useState(getScoreToday)
  const [scoreYesterday]                = useState(getScoreYesterday)
  const today = getTodayKey()

  // Poll localStorage every 5 seconds to pick up changes from Health Score page
  useEffect(() => {
    const sync = () => {
      const glasses = getWaterToday()
      setWaterGlasses(glasses)
      setScoreToday(getScoreToday())

      // Auto-mark water streak if 8 glasses reached
      const updatedStreaks = loadStreaks()
      const wasWaterDone = updatedStreaks[today]?.water
      const isWaterDone  = glasses >= 8

      if (isWaterDone && !wasWaterDone) {
        const newData = { ...updatedStreaks, [today]: { ...updatedStreaks[today], water: true } }
        saveStreaks(newData)
        setStreakData(newData)
      } else if (!isWaterDone && wasWaterDone) {
        const newData = { ...updatedStreaks, [today]: { ...updatedStreaks[today], water: false } }
        saveStreaks(newData)
        setStreakData(newData)
      } else {
        setStreakData(updatedStreaks)
      }
    }
    sync()
    const interval = setInterval(sync, 5000)
    return () => clearInterval(interval)
  }, [today])

  const todayCheckins = streakData[today] || {}
  const waterDone     = waterGlasses >= 8

  const toggleCheckin = (habitId) => {
    const updated = {
      ...streakData,
      [today]: { ...todayCheckins, [habitId]: !todayCheckins[habitId] }
    }
    setStreakData(updated)
    saveStreaks(updated)
  }

  const waterStreak = useMemo(() => calcStreak('water', streakData), [streakData])
  const yogaStreak  = useMemo(() => calcStreak('yoga',  streakData), [streakData])

  // ── CATEGORY FILTER ────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState(null)

  // ── USER CONDITIONS from profile ───────────────────────
  const userConditions = useMemo(() => {
    if (!profile?.conditions?.length) return CONDITIONS
    return CONDITIONS.filter(c => profile.conditions.includes(c.id))
  }, [profile?.conditions])

  const showingPersonalised = profile?.conditions?.length > 0
  const [showAllConditions, setShowAllConditions] = useState(false)

  // Save goals to Firebase whenever they change (not on first load)
  const [goalsReady, setGoalsReady] = useState(false)
  useEffect(() => {
    if (profile?.goals !== undefined) setGoalsReady(true)
  }, [profile])

  useEffect(() => {
    if (!goalsReady || !profile) return
    const timer = setTimeout(() => {
      saveProfile({ goals })
    }, 1000)
    return () => clearTimeout(timer)
  }, [goals, goalsReady])

  // Goal actions
  const addPresetGoal = (preset) => {
    if (goals.find(g => g.id === preset.id)) return
    setGoals(prev => [...prev, { ...preset, done: false, type: 'preset' }])
  }

  const addCustomGoal = () => {
    const text = customGoalInput.trim()
    if (!text) return
    setGoals(prev => [...prev, {
      id: `custom-${Date.now()}`,
      label: text, icon: '🎯',
      done: false, type: 'custom',
    }])
    setCustomGoalInput('')
    setShowGoalInput(false)
  }

  const toggleGoal = (id) =>
    setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g))

  const removeGoal = (id) =>
    setGoals(prev => prev.filter(g => g.id !== id))

  const doneCount = goals.filter(g => g.done).length
  const progress  = goals.length > 0 ? Math.round((doneCount / goals.length) * 100) : 0

  const baseConditions    = (showingPersonalised && !showAllConditions) ? userConditions : CONDITIONS
  const visibleConditions = activeCategory
    ? baseConditions.filter(c => c.categoryId === activeCategory)
    : baseConditions

  const displayedPresets = showAllPresets ? GOAL_PRESETS : GOAL_PRESETS.slice(0, 6)


  return (
    <div className="dashboard">

      {/* ════════════════════════
          SYMPTOM SCANNER
      ════════════════════════ */}
      <section className="symptom-scanner">
        {!showScanner ? (
          <button className="scanner-trigger" onClick={() => setShowScanner(true)}>
            <span>🔍</span>
            <span>How are you feeling? Describe your symptoms and we'll identify your health concerns</span>
            <span className="scanner-trigger-arrow">→</span>
          </button>
        ) : (
          <div className="scanner-open">
            <div className="scanner-input-row">
              <textarea
                className="scanner-textarea"
                placeholder="e.g. I've been bloated after meals, my skin breaks out a lot, and I feel tired all afternoon..."
                value={symptomText}
                onChange={e => { setSymptomText(e.target.value); setScanDone(false) }}
                rows={3}
                autoFocus
              />
              <button
                className="scanner-btn"
                onClick={scanSymptoms}
                disabled={symptomText.trim().length < 10}
              >
                Scan
              </button>
            </div>

            {scanDone && (
              <div className="scanner-results">
                {scannedConditions.length > 0 ? (
                  <>
                    <p className="scanner-results-label">We identified these possible conditions:</p>
                    <div className="scanner-results-grid">
                      {scannedConditions.map(id => {
                        const cond    = CONDITIONS.find(c => c.id === id)
                        const hasplan = activePlans.find(p => p.id === id)
                        return (
                          <div key={id} className="scanner-result-card">
                            <span className="scanner-result-name">{cond?.name || id}</span>
                            <div className="scanner-result-actions">
                              <button
                                className="scanner-view-btn"
                                onClick={() => navigate(`/condition/${id}`)}
                              >
                                View →
                              </button>
                              {!hasplan ? (
                                <button
                                  className="scanner-start-btn"
                                  onClick={() => startPlan(id, cond?.name || id)}
                                >
                                  Start 60-day plan
                                </button>
                              ) : (
                                <span className="scanner-active-badge">✓ Active</span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </>
                ) : (
                  <p className="scanner-no-match">No specific conditions identified. Try describing specific symptoms like "bloating", "acne", or "hair fall".</p>
                )}
              </div>
            )}

            <button className="scanner-close" onClick={() => { setShowScanner(false); setScanDone(false); setSymptomText('') }}>
              Close ×
            </button>
          </div>
        )}
      </section>

      {/* ════════════════════════
          ACTIVE PLANS BANNER
      ════════════════════════ */}
      {activePlans.length > 0 && (
        <section className="active-plans-banner">
          <div className="apb-header">
            <h2>🎯 Your Active Plans</h2>
            <button className="apb-daily-btn" onClick={() => navigate('/daily-plan')}>
              View today's tasks →
            </button>
          </div>
          <div className="apb-plans">
            {activePlans.map(plan => {
              const { dayNum, remaining, pct } = getPlanDays(plan)
              const cond = CONDITIONS.find(c => c.id === plan.conditionId)
              return (
                <div key={plan.id} className="apb-plan-card">
                  <div className="apb-plan-top">
                    <div>
                      <span className="apb-plan-name">{cond?.name || plan.conditionId}</span>
                      <span className="apb-plan-day">Day {dayNum} of 60 · {remaining} days left</span>
                    </div>
                    <div className="apb-plan-score">
                      <span className="apb-score-num">{todayScore}%</span>
                      <span className="apb-score-label">today</span>
                    </div>
                  </div>
                  <div className="apb-bar">
                    <div className="apb-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="apb-plan-actions">
                    <span className="apb-started">Started {new Date(plan.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    <button className="apb-stop-btn" onClick={() => stopPlan(plan.conditionId)}>Stop plan</button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ════════════════════════
          TODAY'S GOALS HERO
      ════════════════════════ */}
      <section className="goals-hero">

        <div className="goals-left">
          <div className="goals-greeting">
            <span className="greeting-wave">👋</span>
            <div>
              <h1 className="greeting-text">
                {getGreeting()}{profile?.displayName ? `, ${profile.displayName.split(' ')[0]}` : ''}
              </h1>
              <p className="greeting-sub">
                {goals.length === 0
                  ? "What do you want to work on today?"
                  : `${doneCount} of ${goals.length} goals completed today`}
              </p>
            </div>
          </div>

          {goals.length > 0 && (
            <div className="goals-progress-wrap">
              <div className="goals-progress-bar">
                <div className="goals-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="goals-progress-label">{progress}%</span>
            </div>
          )}

          {goals.length > 0 && (
            <ul className="goals-list">
              {goals.map(goal => (
                <li key={goal.id} className={`goal-item ${goal.done ? 'goal-item--done' : ''}`}>
                  <button className="goal-check" onClick={() => toggleGoal(goal.id)}>
                    {goal.done ? '✓' : ''}
                  </button>
                  <span className="goal-icon">{goal.icon}</span>
                  <span className="goal-label">{goal.label}</span>
                  <button className="goal-remove" onClick={() => removeGoal(goal.id)}>×</button>
                </li>
              ))}
            </ul>
          )}

          {showGoalInput ? (
            <div className="goal-input-row">
              <input
                type="text"
                className="goal-input"
                placeholder="e.g. drink more water..."
                value={customGoalInput}
                onChange={e => setCustomGoalInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustomGoal()}
                autoFocus
              />
              <button className="goal-input-add" onClick={addCustomGoal}>Add</button>
              <button className="goal-input-cancel" onClick={() => setShowGoalInput(false)}>✕</button>
            </div>
          ) : (
            <button className="add-goal-btn" onClick={() => setShowGoalInput(true)}>
              + Add custom goal
            </button>
          )}

          {goals.length > 0 && (
            <button className="generate-plan-btn" onClick={() => navigate('/schedule')}>
              Generate today's plan →
            </button>
          )}
        </div>

        <div className="goals-right">
          <p className="presets-label">Quick add goals</p>
          <div className="presets-grid">
            {displayedPresets.map(preset => {
              const isAdded = !!goals.find(g => g.id === preset.id)
              return (
                <button
                  key={preset.id}
                  className={`preset-chip ${isAdded ? 'preset-chip--added' : ''}`}
                  onClick={() => addPresetGoal(preset)}
                  disabled={isAdded}
                >
                  <span>{preset.icon}</span>
                  <span>{preset.label}</span>
                  {isAdded && <span className="preset-tick">✓</span>}
                </button>
              )
            })}
          </div>
          <button
            className="show-more-presets"
            onClick={() => setShowAllPresets(p => !p)}
          >
            {showAllPresets ? '↑ Show less' : `↓ ${GOAL_PRESETS.length - 6} more goals`}
          </button>
        </div>

      </section>


      {/* ════════════════════════
          QUICK STATS
      ════════════════════════ */}
      <section className="quick-stats">
        {[
          { label: 'Water',  value: `${waterGlasses} / 8`, unit: 'glasses', icon: '💧', color: '#3B82F6', path: '/health-score' },
          { label: 'Score',  value: scoreToday !== null ? `${scoreToday}` : '—', unit: 'today', icon: '🏅', color: '#8B5CF6', path: '/health-score',
            sub: scoreYesterday !== null ? `Yesterday: ${scoreYesterday}` : null },
          { label: 'Yoga',   value: '0',     unit: 'min',     icon: '🧘', color: '#10B981', path: '/yoga'         },
        ].map(stat => (
          <button
            key={stat.label}
            className="stat-card"
            onClick={() => navigate(stat.path)}
            style={{ '--stat-color': stat.color }}
          >
            <span className="stat-icon">{stat.icon}</span>
            <div className="stat-body">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-meta">{stat.label} · {stat.unit}</span>
              {stat.sub && <span className="stat-yesterday">{stat.sub}</span>}
            </div>
            <span className="stat-arrow">→</span>
          </button>
        ))}
      </section>


      {/* ════════════════════════
          STREAKS CHECK-IN
      ════════════════════════ */}
      <section className="streaks-section">
        <h2 className="section-title">Today's Streaks</h2>
        <div className="streaks-row">

          {/* Water streak — auto from Health Score */}
          <div className={`streak-item ${waterDone ? 'streak-item--done' : ''}`}>
            <div className="streak-item-left">
              <span className="streak-emoji">💧</span>
              <div className="streak-item-info">
                <span className="streak-item-label">Water Goal</span>
                <span className="streak-item-desc">{waterGlasses} / 8 glasses today — log on Health Score</span>
              </div>
            </div>
            <div className="streak-item-right">
              <div className="streak-count">
                <span className="streak-fire">🔥</span>
                <span className="streak-num">{waterStreak}</span>
                <span className="streak-days">day{waterStreak !== 1 ? 's' : ''}</span>
              </div>
              <div className={`streak-auto-badge ${waterDone ? 'streak-auto-badge--done' : ''}`}>
                {waterDone ? '✓ Done' : `${waterGlasses}/8`}
              </div>
            </div>
          </div>

          {/* Yoga streak */}
          <div className={`streak-item ${todayCheckins.yoga ? 'streak-item--done' : ''}`}>
            <div className="streak-item-left">
              <span className="streak-emoji">🧘</span>
              <div className="streak-item-info">
                <span className="streak-item-label">Yoga</span>
                <span className="streak-item-desc">Any movement today</span>
              </div>
            </div>
            <div className="streak-item-right">
              <div className="streak-count">
                <span className="streak-fire">🔥</span>
                <span className="streak-num">{yogaStreak}</span>
                <span className="streak-days">day{yogaStreak !== 1 ? 's' : ''}</span>
              </div>
              <button
                className={`streak-check-btn ${todayCheckins.yoga ? 'streak-check-btn--done' : ''}`}
                onClick={() => toggleCheckin('yoga')}
              >
                {todayCheckins.yoga ? '✓ Done' : 'Mark done'}
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* ════════════════════════
          HEALTH CONDITIONS
      ════════════════════════ */}
      <section className="conditions-section">

        <div className="conditions-header">
          <h2 className="section-title">
            {showingPersonalised ? 'Your Health Conditions' : 'Health Conditions'}
          </h2>
          <p className="section-subtitle">
            {showingPersonalised
              ? `Personalised for you · ${userConditions.length} condition${userConditions.length !== 1 ? 's' : ''} identified`
              : 'Personalised plans — yoga, meals, habits & supplements'}
          </p>
          {showingPersonalised && (
            <button className="see-all-conditions-btn" onClick={() => { setShowAllConditions(p => !p); setActiveCategory(null) }}>
              {showAllConditions ? '← Show my conditions' : 'Browse all 12 conditions →'}
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="category-pills">
          <button
            className={`category-pill ${!activeCategory ? 'category-pill--all-active' : ''}`}
            onClick={() => setActiveCategory(null)}
          >
            All · {CONDITIONS.length}
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`category-pill ${activeCategory === cat.id ? 'category-pill--active' : ''}`}
              onClick={() => setActiveCategory(prev => prev === cat.id ? null : cat.id)}
              style={{ '--pill-color': cat.color }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Conditions grid */}
        <div className="conditions-grid">
          {visibleConditions.map((condition, i) => {
            const cat = getCategoryById(condition.categoryId)
            const sev     = SEVERITY[condition.severity] || SEVERITY.mild
            const hasplan = activePlans.find(p => p.id === condition.id)
            return (
              <div
                key={condition.id}
                className="condition-card"
                style={{ '--card-color': cat?.color, animationDelay: `${i * 0.05}s` }}
              >
                <div className="card-strip" />
                <div className="card-body" onClick={() => navigate(`/condition/${condition.id}`)}>
                  <div className="card-top-row">
                    <span className="card-cat-icon">{cat?.icon}</span>
                    <span className="card-severity" style={{ background: sev.bg, color: sev.color }}>
                      {sev.label}
                    </span>
                  </div>
                  <h3 className="card-name">{condition.name}</h3>
                  <p className="card-tagline">{condition.tagline}</p>
                  <ul className="card-symptoms">
                    {condition.symptoms.slice(0, 2).map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                  <div className="card-footer">
                    <div className="card-features">
                      {['Yoga', 'Meals', 'Habits'].map(f => (
                        <span key={f} className="card-feature">{f}</span>
                      ))}
                    </div>
                    <span className="card-go">View →</span>
                  </div>
                </div>
                <button
                  className={`card-start-plan-btn ${hasplan ? 'card-start-plan-btn--active' : ''}`}
                  onClick={e => {
                    e.stopPropagation()
                    hasplan ? stopPlan(condition.id) : startPlan(condition.id, condition.name)
                  }}
                >
                  {hasplan ? '✓ Plan active' : '+ Start 60-day plan'}
                </button>
              </div>
            )
          })}
        </div>

      </section>

    </div>
  )
}

export default Dashboard