// src/pages/Streaks.jsx
import { useState, useEffect, useMemo } from 'react'
import '../styles/Streaks.css'

const getTodayKey = () => new Date().toISOString().slice(0, 10)

// Get last N days as YYYY-MM-DD strings
const getLastNDays = (n) => {
  const days = []
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

const HABITS = [
  { id: 'water',       label: 'Water Goal',      icon: '💧', desc: '8 glasses a day',         color: '#3B82F6' },
  { id: 'sleep',       label: 'Good Sleep',       icon: '😴', desc: '7+ hours',                color: '#8B5CF6' },
  { id: 'yoga',        label: 'Yoga / Movement',  icon: '🧘', desc: 'Any movement today',      color: '#10B981' },
  { id: 'meals',       label: 'Healthy Meals',    icon: '🥗', desc: 'All 3 meals logged',      color: '#F59E0B' },
  { id: 'supplements', label: 'Supplements',      icon: '💊', desc: 'Took supplements',        color: '#EF4444' },
  { id: 'nosugar',     label: 'No Sugar',         icon: '🚫', desc: 'Avoided refined sugar',   color: '#6366F1' },
  { id: 'sunlight',    label: 'Sunlight',         icon: '☀️', desc: '10+ mins of sunlight',    color: '#F97316' },
  { id: 'meditation',  label: 'Meditation',       icon: '🫁', desc: 'Breathwork or meditation',color: '#14B8A6' },
]

const STORAGE_KEY = 'wellnest-streaks'

function loadStreakData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch { return {} }
}

function saveStreakData(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch {}
}

// Calculate current streak for a habit
function calcStreak(habitId, data) {
  let streak = 0
  const today = getTodayKey()
  let d = new Date()

  // Check if today is done — if not, start from yesterday
  const todayDone = data[today]?.[habitId]
  if (!todayDone) d.setDate(d.getDate() - 1)

  while (true) {
    const key = d.toISOString().slice(0, 10)
    if (data[key]?.[habitId]) {
      streak++
      d.setDate(d.getDate() - 1)
    } else break
  }
  return streak
}

// Calculate longest streak ever
function calcLongestStreak(habitId, data) {
  const days = Object.keys(data).sort()
  let longest = 0
  let current = 0
  for (const day of days) {
    if (data[day]?.[habitId]) {
      current++
      longest = Math.max(longest, current)
    } else {
      current = 0
    }
  }
  return longest
}

// Calculate completion rate for last 30 days
function calcRate(habitId, data) {
  const days = getLastNDays(30)
  const done  = days.filter(d => data[d]?.[habitId]).length
  return Math.round((done / 30) * 100)
}

export default function Streaks() {
  const [streakData, setStreakData] = useState(loadStreakData)
  const [activeHabit, setActiveHabit] = useState(null)
  const today = getTodayKey()

  useEffect(() => { saveStreakData(streakData) }, [streakData])

  const toggleToday = (habitId) => {
    setStreakData(prev => ({
      ...prev,
      [today]: {
        ...prev[today],
        [habitId]: !prev[today]?.[habitId],
      }
    }))
  }

  const todayData = streakData[today] || {}
  const doneTodayCount = HABITS.filter(h => todayData[h.id]).length

  // Stats per habit
  const habitStats = useMemo(() =>
    HABITS.map(h => ({
      ...h,
      streak:   calcStreak(h.id, streakData),
      longest:  calcLongestStreak(h.id, streakData),
      rate:     calcRate(h.id, streakData),
      doneToday: !!todayData[h.id],
    }))
  , [streakData, todayData])

  // Overall stats
  const totalStreak = useMemo(() => {
    // Days where ALL habits were done
    let streak = 0
    let d = new Date()
    const allDone = (key) => HABITS.every(h => streakData[key]?.[h.id])
    if (!allDone(today)) d.setDate(d.getDate() - 1)
    while (true) {
      const key = d.toISOString().slice(0, 10)
      if (allDone(key)) { streak++; d.setDate(d.getDate() - 1) }
      else break
    }
    return streak
  }, [streakData])

  // Last 12 weeks heatmap data
  const heatmapDays = useMemo(() => getLastNDays(84), [])

  const todayDisplay = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  return (
    <div className="streaks-page">

      {/* ── HEADER ── */}
      <div className="streaks-header">
        <div>
          <h1 className="streaks-title">Streaks</h1>
          <p className="streaks-date">{todayDisplay}</p>
        </div>
        <div className="streaks-overall">
          <span className="streaks-overall-num">{totalStreak}</span>
          <span className="streaks-overall-label">day perfect streak</span>
        </div>
      </div>

      {/* ── TODAY'S CHECK-IN ── */}
      <div className="checkin-card">
        <div className="checkin-header">
          <div>
            <h2>Today's Check-in</h2>
            <p>{doneTodayCount} of {HABITS.length} habits done</p>
          </div>
          <div className="checkin-progress-ring">
            <svg viewBox="0 0 40 40" width="48" height="48">
              <circle cx="20" cy="20" r="16" fill="none" stroke="#F3F4F6" strokeWidth="4"/>
              <circle cx="20" cy="20" r="16" fill="none" stroke="#16A34A" strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 16}`}
                strokeDashoffset={`${2 * Math.PI * 16 * (1 - doneTodayCount / HABITS.length)}`}
                transform="rotate(-90 20 20)"
                style={{ transition: 'stroke-dashoffset 0.4s ease' }}
              />
            </svg>
            <span className="checkin-ring-num">{Math.round(doneTodayCount / HABITS.length * 100)}%</span>
          </div>
        </div>

        <div className="checkin-grid">
          {HABITS.map(habit => {
            const done = !!todayData[habit.id]
            const streak = calcStreak(habit.id, streakData)
            return (
              <button
                key={habit.id}
                className={`checkin-item ${done ? 'checkin-item--done' : ''}`}
                onClick={() => toggleToday(habit.id)}
                style={{ '--habit-color': habit.color }}
              >
                <span className="checkin-item-icon">{habit.icon}</span>
                <div className="checkin-item-info">
                  <span className="checkin-item-label">{habit.label}</span>
                  <span className="checkin-item-desc">{habit.desc}</span>
                </div>
                <div className="checkin-item-right">
                  {streak > 0 && (
                    <span className="checkin-streak-badge">🔥 {streak}</span>
                  )}
                  <div className={`checkin-check ${done ? 'checkin-check--done' : ''}`}>
                    {done ? '✓' : ''}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── STREAK CARDS ── */}
      <div className="streak-cards-section">
        <h2 className="section-title">Habit Streaks</h2>
        <div className="streak-cards-grid">
          {habitStats.map(h => (
            <div
              key={h.id}
              className={`streak-card ${activeHabit === h.id ? 'streak-card--active' : ''}`}
              onClick={() => setActiveHabit(activeHabit === h.id ? null : h.id)}
              style={{ '--habit-color': h.color }}
            >
              <div className="streak-card-top">
                <span className="streak-card-icon">{h.icon}</span>
                <div className="streak-card-info">
                  <span className="streak-card-label">{h.label}</span>
                  {h.doneToday && <span className="streak-done-today">✓ Today</span>}
                </div>
              </div>
              <div className="streak-card-nums">
                <div className="streak-num-block">
                  <span className="streak-num" style={{ color: h.color }}>{h.streak}</span>
                  <span className="streak-num-label">current</span>
                </div>
                <div className="streak-divider" />
                <div className="streak-num-block">
                  <span className="streak-num">{h.longest}</span>
                  <span className="streak-num-label">best</span>
                </div>
                <div className="streak-divider" />
                <div className="streak-num-block">
                  <span className="streak-num">{h.rate}%</span>
                  <span className="streak-num-label">30d rate</span>
                </div>
              </div>
              <div className="streak-mini-bar">
                <div className="streak-mini-fill" style={{ width: `${h.rate}%`, background: h.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HEATMAP ── */}
      <div className="heatmap-section">
        <h2 className="section-title">12-Week Overview</h2>
        <p className="heatmap-subtitle">Darker = more habits completed that day</p>
        <div className="heatmap-grid">
          {/* Day labels */}
          <div className="heatmap-day-labels">
            {['Mon','','Wed','','Fri','','Sun'].map((d,i) => (
              <span key={i} className="heatmap-day-label">{d}</span>
            ))}
          </div>
          {/* Weeks */}
          <div className="heatmap-weeks">
            {Array.from({ length: 12 }, (_, weekIdx) => {
              const weekDays = heatmapDays.slice(weekIdx * 7, weekIdx * 7 + 7)
              return (
                <div key={weekIdx} className="heatmap-week">
                  {weekDays.map(day => {
                    const dayData  = streakData[day] || {}
                    const count    = HABITS.filter(h => dayData[h.id]).length
                    const opacity  = count === 0 ? 0 : 0.15 + (count / HABITS.length) * 0.85
                    const isToday  = day === today
                    return (
                      <div
                        key={day}
                        className={`heatmap-cell ${isToday ? 'heatmap-cell--today' : ''}`}
                        style={{ background: count > 0 ? `rgba(22,163,74,${opacity})` : undefined }}
                        title={`${day}: ${count}/${HABITS.length} habits`}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="heatmap-legend">
          <span>Less</span>
          {[0, 0.2, 0.4, 0.65, 0.9].map((o, i) => (
            <div key={i} className="heatmap-legend-cell"
              style={{ background: o === 0 ? '#F3F4F6' : `rgba(22,163,74,${o})` }} />
          ))}
          <span>More</span>
        </div>
      </div>

    </div>
  )
}