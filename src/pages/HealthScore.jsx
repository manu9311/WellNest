// src/pages/HealthScore.jsx
import { useState, useEffect, useMemo } from 'react'
import '../styles/HealthScore.css'

const getTodayKey = () => new Date().toISOString().slice(0, 10)

const MOODS = [
  { value: 1, emoji: '😞', label: 'Rough' },
  { value: 2, emoji: '😕', label: 'Low' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😄', label: 'Great' },
]

const ENERGY_LEVELS = [
  { value: 1, label: 'Drained' },
  { value: 2, label: 'Low' },
  { value: 3, label: 'Moderate' },
  { value: 4, label: 'High' },
  { value: 5, label: 'Energised' },
]

const DEFAULT_STATE = {
  water: 0,           // 0-8 glasses
  sleep: 0,           // 0-10 hours
  mood: 0,            // 0-5
  energy: 0,          // 0-5
  meals: { breakfast: false, lunch: false, dinner: false },
  exercise: false,    // did any movement today
  supplements: false, // took supplements
  screenTime: 3,      // hours (lower is better, default 3)
}

// Score weights
const WEIGHTS = {
  water:       20,  // max 20 pts (2.5 per glass)
  sleep:       25,  // max 25 pts
  mood:        15,  // max 15 pts
  energy:      15,  // max 15 pts
  meals:       15,  // max 15 pts (5 per meal)
  exercise:    5,   // max 5 pts
  supplements: 5,   // max 5 pts
}

function calcScore(state) {
  let score = 0
  score += Math.min(state.water / 8, 1) * WEIGHTS.water
  score += Math.min(state.sleep / 8, 1) * WEIGHTS.sleep
  score += ((state.mood - 1) / 4)  * WEIGHTS.mood  * (state.mood > 0 ? 1 : 0)
  score += ((state.energy - 1) / 4) * WEIGHTS.energy * (state.energy > 0 ? 1 : 0)
  const mealsDone = Object.values(state.meals).filter(Boolean).length
  score += (mealsDone / 3) * WEIGHTS.meals
  if (state.exercise)    score += WEIGHTS.exercise
  if (state.supplements) score += WEIGHTS.supplements
  return Math.round(Math.max(0, score))
}

function getScoreLabel(score) {
  if (score >= 85) return { label: 'Excellent', color: '#16A34A', bg: '#DCFCE7' }
  if (score >= 70) return { label: 'Good',      color: '#0891B2', bg: '#CFFAFE' }
  if (score >= 50) return { label: 'Okay',      color: '#D97706', bg: '#FEF3C7' }
  if (score >= 30) return { label: 'Low',       color: '#DC2626', bg: '#FEE2E2' }
  return                  { label: 'Start',     color: '#9CA3AF', bg: '#F3F4F6' }
}

function getScoreMessage(score) {
  if (score >= 85) return "You're doing amazing today. Keep this up!"
  if (score >= 70) return "Solid day. A little more water and sleep will push you higher."
  if (score >= 50) return "Not bad. Focus on sleep and hydration to boost your score."
  if (score >= 30) return "Let's build some momentum. Start with drinking a glass of water."
  return "Every small action counts. Log something to get started."
}

export default function HealthScore() {
  const todayKey   = getTodayKey()
  const storageKey = `wellnest-score-${todayKey}`

  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? { ...DEFAULT_STATE, ...JSON.parse(saved) } : DEFAULT_STATE
    } catch { return DEFAULT_STATE }
  })

  const [animateScore, setAnimateScore] = useState(false)

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(state)) } catch {}
    setAnimateScore(true)
    const t = setTimeout(() => setAnimateScore(false), 400)
    return () => clearTimeout(t)
  }, [state, storageKey])

  const score     = useMemo(() => calcScore(state), [state])
  const scoreInfo = useMemo(() => getScoreLabel(score), [score])
  const message   = useMemo(() => getScoreMessage(score), [score])

  const set = (key, value) => setState(prev => ({ ...prev, [key]: value }))
  const toggleMeal = (meal) => setState(prev => ({
    ...prev,
    meals: { ...prev.meals, [meal]: !prev.meals[meal] }
  }))

  const todayDisplay = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  // Circumference for SVG ring
  const R   = 54
  const C   = 2 * Math.PI * R
  const pct = score / 100
  const strokeDashoffset = C - pct * C

  return (
    <div className="hs-page">

      {/* ── HEADER ── */}
      <div className="hs-header">
        <div>
          <h1 className="hs-title">Health Score</h1>
          <p className="hs-date">{todayDisplay}</p>
        </div>
        <div className="hs-header-note">Resets at midnight</div>
      </div>

      <div className="hs-body">

        {/* ── SCORE RING ── */}
        <div className="hs-score-card">
          <div className={`hs-ring-wrap ${animateScore ? 'hs-ring-wrap--pop' : ''}`}>
            <svg className="hs-ring" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r={R} fill="none" stroke="#F3F4F6" strokeWidth="10"/>
              <circle
                cx="60" cy="60" r={R}
                fill="none"
                stroke={scoreInfo.color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.4s ease' }}
              />
            </svg>
            <div className="hs-ring-inner">
              <span className="hs-score-num">{score}</span>
              <span className="hs-score-max">/100</span>
              <span className="hs-score-label" style={{ color: scoreInfo.color, background: scoreInfo.bg }}>
                {scoreInfo.label}
              </span>
            </div>
          </div>
          <p className="hs-score-msg">{message}</p>

          {/* Breakdown bars */}
          <div className="hs-breakdown">
            {[
              { label: 'Hydration', val: state.water / 8,        color: '#3B82F6' },
              { label: 'Sleep',     val: Math.min(state.sleep/8,1), color: '#8B5CF6' },
              { label: 'Mood',      val: state.mood > 0 ? (state.mood-1)/4 : 0, color: '#F59E0B' },
              { label: 'Energy',    val: state.energy > 0 ? (state.energy-1)/4 : 0, color: '#10B981' },
              { label: 'Meals',     val: Object.values(state.meals).filter(Boolean).length / 3, color: '#EF4444' },
            ].map(item => (
              <div key={item.label} className="hs-bar-row">
                <span className="hs-bar-label">{item.label}</span>
                <div className="hs-bar-track">
                  <div className="hs-bar-fill" style={{ width: `${Math.round(item.val * 100)}%`, background: item.color }} />
                </div>
                <span className="hs-bar-pct">{Math.round(item.val * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── TRACKERS ── */}
        <div className="hs-trackers">

          {/* Water */}
          <div className="hs-tracker-card">
            <div className="hs-tracker-header">
              <span className="hs-tracker-icon">💧</span>
              <div>
                <h3>Water</h3>
                <p>Target: 8 glasses</p>
              </div>
              <span className="hs-tracker-value">{state.water} / 8</span>
            </div>
            <div className="hs-glasses">
              {Array.from({ length: 8 }, (_, i) => (
                <button
                  key={i}
                  className={`hs-glass ${i < state.water ? 'hs-glass--filled' : ''}`}
                  onClick={() => set('water', state.water === i + 1 ? i : i + 1)}
                  title={`${i + 1} glass${i > 0 ? 'es' : ''}`}
                >
                  <span className="hs-glass-icon">🥛</span>
                </button>
              ))}
            </div>
            <div className="hs-water-bar">
              <div className="hs-water-fill" style={{ width: `${(state.water / 8) * 100}%` }} />
            </div>
          </div>

          {/* Sleep */}
          <div className="hs-tracker-card">
            <div className="hs-tracker-header">
              <span className="hs-tracker-icon">😴</span>
              <div>
                <h3>Sleep</h3>
                <p>Target: 7–8 hours</p>
              </div>
              <span className="hs-tracker-value">
                {state.sleep > 0 ? `${state.sleep}h` : '—'}
              </span>
            </div>
            <div className="hs-sleep-grid">
              {[5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10].map(h => (
                <button
                  key={h}
                  className={`hs-sleep-btn ${state.sleep === h ? 'hs-sleep-btn--active' : ''} ${h >= 7 && h <= 8.5 ? 'hs-sleep-btn--ideal' : ''}`}
                  onClick={() => set('sleep', state.sleep === h ? 0 : h)}
                >
                  {h}h
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div className="hs-tracker-card">
            <div className="hs-tracker-header">
              <span className="hs-tracker-icon">🌈</span>
              <div>
                <h3>Mood</h3>
                <p>How are you feeling?</p>
              </div>
              {state.mood > 0 && (
                <span className="hs-tracker-value">{MOODS[state.mood - 1].label}</span>
              )}
            </div>
            <div className="hs-mood-row">
              {MOODS.map(m => (
                <button
                  key={m.value}
                  className={`hs-mood-btn ${state.mood === m.value ? 'hs-mood-btn--active' : ''}`}
                  onClick={() => set('mood', state.mood === m.value ? 0 : m.value)}
                >
                  <span className="hs-mood-emoji">{m.emoji}</span>
                  <span className="hs-mood-label">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Energy */}
          <div className="hs-tracker-card">
            <div className="hs-tracker-header">
              <span className="hs-tracker-icon">⚡</span>
              <div>
                <h3>Energy</h3>
                <p>How's your energy level?</p>
              </div>
              {state.energy > 0 && (
                <span className="hs-tracker-value">{ENERGY_LEVELS[state.energy - 1].label}</span>
              )}
            </div>
            <div className="hs-energy-row">
              {ENERGY_LEVELS.map(e => (
                <button
                  key={e.value}
                  className={`hs-energy-btn ${state.energy === e.value ? 'hs-energy-btn--active' : ''}`}
                  onClick={() => set('energy', state.energy === e.value ? 0 : e.value)}
                >
                  <div className="hs-energy-bar-wrap">
                    {Array.from({ length: 5 }, (_, i) => (
                      <div key={i} className={`hs-energy-seg ${i < e.value ? 'hs-energy-seg--on' : ''}`} />
                    ))}
                  </div>
                  <span>{e.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Meals */}
          <div className="hs-tracker-card">
            <div className="hs-tracker-header">
              <span className="hs-tracker-icon">🥗</span>
              <div>
                <h3>Meals</h3>
                <p>What did you eat today?</p>
              </div>
              <span className="hs-tracker-value">
                {Object.values(state.meals).filter(Boolean).length} / 3
              </span>
            </div>
            <div className="hs-meals-row">
              {[
                { key: 'breakfast', label: 'Breakfast', icon: '🍳', time: 'Morning' },
                { key: 'lunch',     label: 'Lunch',     icon: '🥗', time: 'Midday' },
                { key: 'dinner',    label: 'Dinner',    icon: '🍲', time: 'Evening' },
              ].map(meal => (
                <button
                  key={meal.key}
                  className={`hs-meal-btn ${state.meals[meal.key] ? 'hs-meal-btn--done' : ''}`}
                  onClick={() => toggleMeal(meal.key)}
                >
                  <span className="hs-meal-icon">{meal.icon}</span>
                  <span className="hs-meal-label">{meal.label}</span>
                  <span className="hs-meal-time">{meal.time}</span>
                  <span className="hs-meal-check">{state.meals[meal.key] ? '✓' : ''}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bonus trackers */}
          <div className="hs-tracker-card">
            <div className="hs-tracker-header">
              <span className="hs-tracker-icon">✦</span>
              <div>
                <h3>Bonus</h3>
                <p>Extra habits</p>
              </div>
            </div>
            <div className="hs-bonus-row">
              <button
                className={`hs-bonus-btn ${state.exercise ? 'hs-bonus-btn--done' : ''}`}
                onClick={() => set('exercise', !state.exercise)}
              >
                <span>🏃</span>
                <span>Moved today</span>
                {state.exercise && <span className="hs-bonus-check">+5 pts</span>}
              </button>
              <button
                className={`hs-bonus-btn ${state.supplements ? 'hs-bonus-btn--done' : ''}`}
                onClick={() => set('supplements', !state.supplements)}
              >
                <span>💊</span>
                <span>Took supplements</span>
                {state.supplements && <span className="hs-bonus-check">+5 pts</span>}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}