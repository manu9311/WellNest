// src/pages/MyPlans.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlan } from '../context/PlanContext'
import { CONDITIONS } from '../data/healthData'
import '../styles/MyPlans.css'

export default function MyPlans() {
  const navigate = useNavigate()
  const { activePlans, stoppedPlans, startPlan, stopPlan, getPlanDays, loading } = usePlan()
  const [search, setSearch] = useState('')

  const todayDisplay = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

  const filtered = CONDITIONS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.tagline?.toLowerCase().includes(search.toLowerCase())
  )

  const getStatus = (conditionId) => {
    if (activePlans.find(p => p.id === conditionId)) return 'active'
    if (stoppedPlans.find(p => p.conditionId === conditionId)) return 'paused'
    return 'none'
  }

  if (loading) return (
    <div className="my-plans-page">
      <div className="mp-empty"><div className="mp-empty-icon">⏳</div><h3>Loading...</h3></div>
    </div>
  )

  return (
    <div className="my-plans-page">
      <div className="mp-header">
        <div>
          <h1 className="mp-title">My Plans</h1>
          <p className="mp-date">{todayDisplay}</p>
        </div>
      </div>

      {/* ── ACTIVE PLANS SUMMARY ── */}
      {activePlans.length > 0 && (
        <div className="mp-active-section">
          <h2 className="mp-section-title">🟢 Active Plans</h2>
          <div className="mp-active-grid">
            {activePlans.map(plan => {
              const cond = CONDITIONS.find(c => c.id === plan.id)
              const { dayNum, remaining, pct } = getPlanDays(plan)
              return (
                <div key={plan.id} className="mp-active-card">
                  <div className="mp-ac-top">
                    <div>
                      <span className="mp-ac-name">{cond?.name || plan.id}</span>
                      <span className="mp-ac-day">Day {dayNum} of 60 · {remaining} days left</span>
                    </div>
                    <span className="mp-ac-pct">{pct}%</span>
                  </div>
                  <div className="mp-ac-bar">
                    <div className="mp-ac-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mp-ac-started">
                    Started {new Date(plan.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <div className="mp-ac-actions">
                    <button className="mp-view-btn" onClick={() => navigate('/daily-plan')}>
                      View today's tasks →
                    </button>
                    <button className="mp-stop-btn" onClick={() => stopPlan(plan.id)}>
                      Pause
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── PAUSED PLANS ── */}
      {stoppedPlans.length > 0 && (
        <div className="mp-paused-section">
          <h2 className="mp-section-title">⏸ Paused Plans</h2>
          <div className="mp-paused-list">
            {stoppedPlans.map(plan => {
              const cond = CONDITIONS.find(c => c.id === plan.conditionId)
              const { dayNum } = getPlanDays({ ...plan, id: plan.conditionId })
              return (
                <div key={plan.conditionId} className="mp-paused-card">
                  <div className="mp-paused-info">
                    <span className="mp-paused-name">{cond?.name || plan.conditionId}</span>
                    <span className="mp-paused-day">Was on Day {dayNum} of 60</span>
                    <span className="mp-paused-date">
                      Started {new Date(plan.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <button
                    className="mp-resume-btn"
                    onClick={() => startPlan(plan.conditionId, cond?.name || plan.conditionId, plan.startDate)}
                  >
                    Resume Plan →
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── ALL CONDITIONS ── */}
      <div className="mp-all-section">
        <div className="mp-all-header">
          <h2 className="mp-section-title">All Conditions</h2>
          <input
            className="mp-search"
            type="text"
            placeholder="Search conditions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <p className="mp-all-sub">Start a 60-day plan for any condition. Plans track your daily progress permanently.</p>

        <div className="mp-conditions-grid">
          {filtered.map(cond => {
            const status = getStatus(cond.id)
            const activePlan = activePlans.find(p => p.id === cond.id)
            const pausedPlan = stoppedPlans.find(p => p.conditionId === cond.id)

            return (
              <div key={cond.id} className={`mp-condition-card ${status === 'active' ? 'mp-condition-card--active' : status === 'paused' ? 'mp-condition-card--paused' : ''}`}>
                <div className="mp-cc-top">
                  <div>
                    <span className="mp-cc-name">{cond.name}</span>
                    {status === 'active' && (
                      <span className="mp-cc-status mp-cc-status--active">
                        🟢 Day {getPlanDays(activePlan).dayNum} of 60
                      </span>
                    )}
                    {status === 'paused' && (
                      <span className="mp-cc-status mp-cc-status--paused">
                        ⏸ Paused · Day {getPlanDays({ ...pausedPlan, id: pausedPlan.conditionId }).dayNum}
                      </span>
                    )}
                  </div>
                  <button
                    className="mp-cc-view"
                    onClick={() => navigate(`/condition/${cond.id}`)}
                  >
                    View →
                  </button>
                </div>
                <p className="mp-cc-tagline">{cond.tagline}</p>
                <div className="mp-cc-actions">
                  {status === 'none' && (
                    <button className="mp-cc-start" onClick={() => startPlan(cond.id, cond.name)}>
                      + Start 60-day plan
                    </button>
                  )}
                  {status === 'active' && (
                    <button className="mp-cc-stop" onClick={() => stopPlan(cond.id)}>
                      Pause plan
                    </button>
                  )}
                  {status === 'paused' && (
                    <button className="mp-cc-resume" onClick={() => startPlan(cond.id, cond.name, pausedPlan.startDate)}>
                      Resume plan →
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}