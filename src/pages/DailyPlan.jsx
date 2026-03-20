// src/pages/DailyPlan.jsx — 60-day plan tasks only
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlan } from '../context/PlanContext'
import { CONDITIONS } from '../data/healthData'
import { PLAN_TASKS } from '../data/planData'
import { MEAL_PLANS } from '../data/mealsData'
import { YOGA_PLANS } from '../data/yogaData'
import '../styles/DailyPlan.css'

const CATEGORY_COLORS = {
  hydration:  { bg: '#EFF6FF', color: '#1D4ED8' },
  nutrition:  { bg: '#F0FDF4', color: '#15803D' },
  movement:   { bg: '#FEF3C7', color: '#92400E' },
  breathwork: { bg: '#E0F2FE', color: '#075985' },
  supplement: { bg: '#FDF4FF', color: '#7E22CE' },
  skincare:   { bg: '#FCE7F3', color: '#9D174D' },
  habits:     { bg: '#F3F4F6', color: '#374151' },
  meals:      { bg: '#FFF7ED', color: '#C2410C' },
  yoga:       { bg: '#F0FDF4', color: '#15803D' },
}

function buildPlanSections(conditionId) {
  const sections = []

  // 1. Core habits from planData
  const coreTasks = (PLAN_TASKS[conditionId] || []).map(t => ({ ...t }))
  if (coreTasks.length) {
    sections.push({ title: 'Daily Habits & Nutrition', icon: '✅', color: CATEGORY_COLORS.habits, tasks: coreTasks })
  }

  // 2. Yoga + breathwork
  const yogaPlan = YOGA_PLANS[conditionId]
  if (yogaPlan?.poses?.length) {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
    const pose = yogaPlan.poses[dayOfYear % yogaPlan.poses.length]
    const yogaTasks = [{
      id: `${conditionId}_yoga_today`,
      title: `${pose.name} (${pose.duration})`,
      icon: '🧘', category: 'yoga', time: yogaPlan.bestTime,
      why: pose.benefits, steps: pose.steps, conditionId,
    }]
    if (yogaPlan.breathwork?.length) {
      const bw = yogaPlan.breathwork[0]
      yogaTasks.push({
        id: `${conditionId}_breathwork_today`,
        title: `${bw.name} (${bw.duration})`,
        icon: '🫁', category: 'breathwork', time: 'Morning',
        why: bw.benefit || '', steps: bw.steps || [], conditionId,
      })
    }
    sections.push({ title: 'Yoga & Breathwork', icon: '🧘', color: CATEGORY_COLORS.yoga, tasks: yogaTasks })
  }

  // 3. Meals — all 3 options per slot
  const mealPlan = MEAL_PLANS[conditionId]
  if (mealPlan) {
    const mealTasks = ['breakfast', 'lunch', 'dinner'].map(slot => {
      const options = mealPlan[slot] || []
      return {
        id: `${conditionId}_${slot}_group`,
        title: slot.charAt(0).toUpperCase() + slot.slice(1),
        icon: slot === 'breakfast' ? '🍳' : slot === 'lunch' ? '🥗' : '🍲',
        category: 'meals', time: slot === 'breakfast' ? 'Morning' : slot === 'lunch' ? 'Midday' : 'Evening',
        isMealGroup: true, conditionId,
        options: options.map((o, i) => ({
          id: `${conditionId}_${slot}_${i}`, name: o.name,
          desc: o.description, prep: o.prepTime, tags: o.tags || [], benefits: o.benefits,
        })),
      }
    }).filter(t => t.options.length > 0)
    if (mealTasks.length) sections.push({ title: 'Meals', icon: '🍽️', color: CATEGORY_COLORS.meals, tasks: mealTasks })
  }

  return sections
}

export default function DailyPlan() {
  const navigate = useNavigate()
  const { activePlans, stoppedPlans, todayCompleted, toggleTask, getPlanDays, loading, startPlan, stopPlan } = usePlan()

  const [selectedPlan, setSelectedPlan] = useState(null)
  const [expandedTask, setExpandedTask] = useState(null)

  const todayDisplay = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

  if (loading) return (
    <div className="daily-plan">
      <div className="plan-empty"><div className="plan-empty-icon">⏳</div><h3>Loading your plans...</h3></div>
    </div>
  )

  const displayedPlanId = selectedPlan || activePlans[0]?.id

  return (
    <div className="daily-plan">
      <div className="plan-header">
        <div>
          <h1 className="plan-title">Daily Plan</h1>
          <p className="plan-date">{todayDisplay}</p>
        </div>
      </div>

      {activePlans.length === 0 && (!stoppedPlans || stoppedPlans.length === 0) ? (
        <div className="plan-empty">
          <div className="plan-empty-icon">📋</div>
          <h3>No active 60-day plans</h3>
          <p>Start a plan from the Dashboard or any condition page to see your daily tasks here.</p>
          <button className="generate-btn generate-btn--inline" onClick={() => navigate('/')}>Go to Dashboard →</button>
        </div>
      ) : (
        <div className="plans-tab-body">

          {/* Plan tabs if multiple */}
          {activePlans.length > 1 && (
            <div className="plan-selector">
              {activePlans.map(plan => {
                const cond = CONDITIONS.find(c => c.id === plan.id)
                const { dayNum } = getPlanDays(plan)
                return (
                  <button key={plan.id}
                    className={`plan-selector-btn ${displayedPlanId === plan.id ? 'plan-selector-btn--active' : ''}`}
                    onClick={() => setSelectedPlan(plan.id)}>
                    <span>{cond?.name || plan.id}</span>
                    <span className="plan-selector-day">Day {dayNum}</span>
                  </button>
                )
              })}
            </div>
          )}

          {/* Stopped plans — show resume option */}
          {stoppedPlans?.length > 0 && (
            <div className="stopped-plans">
              <h3 className="stopped-plans-title">Paused Plans</h3>
              {stoppedPlans.map(plan => {
                const cond = CONDITIONS.find(c => c.id === plan.conditionId)
                return (
                  <div key={plan.conditionId} className="stopped-plan-card">
                    <div>
                      <span className="stopped-plan-name">{cond?.name || plan.conditionId}</span>
                      <span className="stopped-plan-date">Stopped · Started {new Date(plan.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <button className="resume-btn" onClick={() => startPlan(plan.conditionId, cond?.name || plan.conditionId, plan.startDate)}>
                      Resume Plan →
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* Active plan detail */}
          {displayedPlanId && (() => {
            const plan = activePlans.find(p => p.id === displayedPlanId)
            if (!plan) return null
            const cond = CONDITIONS.find(c => c.id === plan.id)
            const { dayNum, remaining, pct } = getPlanDays(plan)
            const sections = buildPlanSections(plan.id)
            const allTasks = sections.flatMap(s => s.tasks)
            const doneCount = allTasks.filter(t =>
              t.isMealGroup
                ? t.options.some(o => todayCompleted.includes(o.id))
                : todayCompleted.includes(t.id)
            ).length

            return (
              <div className="plan-detail-view">
                {/* Status card */}
                <div className="plan-status-card">
                  <div className="psc-left">
                    <h2>{cond?.name || plan.id}</h2>
                    <p>Day {dayNum} of 60 · {remaining} days remaining</p>
                    <div className="psc-bar"><div className="psc-bar-fill" style={{ width: `${pct}%` }} /></div>
                  </div>
                  <div className="psc-right">
                    <div className="psc-score-ring">
                      <svg viewBox="0 0 60 60" width="70" height="70">
                        <circle cx="30" cy="30" r="24" fill="none" stroke="#1F2937" strokeWidth="6"/>
                        <circle cx="30" cy="30" r="24" fill="none" stroke="#4ADE80" strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 24}`}
                          strokeDashoffset={`${2 * Math.PI * 24 * (1 - doneCount / Math.max(allTasks.length, 1))}`}
                          transform="rotate(-90 30 30)"
                          style={{ transition: 'stroke-dashoffset 0.5s' }}
                        />
                      </svg>
                      <div className="psc-score-inner">
                        <span className="psc-score-num">{doneCount}</span>
                        <span className="psc-score-of">/{allTasks.length}</span>
                      </div>
                    </div>
                    <span className="psc-score-label">today</span>
                  </div>
                  <button className="psc-stop-btn" onClick={() => stopPlan(plan.id)}>Stop plan</button>
                </div>

                {/* Sections */}
                {sections.map(section => (
                  <div key={section.title} className="plan-section-group">
                    <div className="psg-header">
                      <span className="psg-icon">{section.icon}</span>
                      <span className="psg-title" style={{ color: section.color.color }}>{section.title}</span>
                      <span className="psg-count">
                        {section.tasks.filter(t =>
                          t.isMealGroup
                            ? t.options.some(o => todayCompleted.includes(o.id))
                            : todayCompleted.includes(t.id)
                        ).length}/{section.tasks.length}
                      </span>
                    </div>

                    {section.tasks.map(task => {
                      const isDone     = todayCompleted.includes(task.id)
                      const isExpanded = expandedTask === task.id

                      if (task.isMealGroup) {
                        const chosenOption = task.options.find(o => todayCompleted.includes(o.id))
                        return (
                          <div key={task.id} className={`plan-task-item ${chosenOption ? 'plan-task-item--done' : ''}`}>
                            <div className="pti-header" onClick={() => setExpandedTask(isExpanded ? null : task.id)}>
                              <span className="pti-icon">{task.icon}</span>
                              <div className="pti-info">
                                <span className="pti-title">{task.title}</span>
                                <span className="pti-time">{task.time}</span>
                              </div>
                              {chosenOption
                                ? <span className="pti-chosen">✓ {chosenOption.name}</span>
                                : <span className="pti-choose-hint">Pick one →</span>
                              }
                            </div>
                            {isExpanded && (
                              <div className="meal-options">
                                {task.options.map(opt => {
                                  const isChosen = todayCompleted.includes(opt.id)
                                  return (
                                    <div key={opt.id}
                                      className={`meal-option ${isChosen ? 'meal-option--chosen' : ''}`}
                                      onClick={() => {
                                        task.options.forEach(o => { if (todayCompleted.includes(o.id)) toggleTask(o.id) })
                                        if (!isChosen) toggleTask(opt.id)
                                      }}>
                                      <div className="mo-top">
                                        <span className="mo-name">{opt.name}</span>
                                        <span className={`mo-check ${isChosen ? 'mo-check--done' : ''}`}>{isChosen ? '✓' : ''}</span>
                                      </div>
                                      <p className="mo-desc">{opt.desc}</p>
                                      <div className="mo-meta">
                                        <span>⏱ {opt.prep}</span>
                                        {opt.tags.slice(0, 2).map(tag => <span key={tag} className="mo-tag">{tag}</span>)}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      }

                      return (
                        <div key={task.id} className={`plan-task-item ${isDone ? 'plan-task-item--done' : ''}`}>
                          <button className={`pti-check ${isDone ? 'pti-check--done' : ''}`} onClick={() => toggleTask(task.id)}>
                            {isDone ? '✓' : ''}
                          </button>
                          <div className="pti-header" onClick={() => setExpandedTask(isExpanded ? null : task.id)}>
                            <span className="pti-icon">{task.icon}</span>
                            <div className="pti-info">
                              <span className="pti-title">{task.title}</span>
                              <span className="pti-time">{task.time}</span>
                            </div>
                            <span className="pti-expand">{isExpanded ? '▲' : '▼'}</span>
                          </div>
                          {isExpanded && (
                            <div className="pti-expanded">
                              <div className="pti-why">
                                <span className="why-label">Why this matters</span>
                                <p>{task.why}</p>
                              </div>
                              {task.steps?.length > 0 && (
                                <div className="pti-steps">
                                  <span className="why-label">Steps</span>
                                  {task.steps.map((step, i) => (
                                    <div key={i} className="pti-step">
                                      <span className="pti-step-num">{i + 1}</span>
                                      <p>{step}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}