// src/pages/Yoga.jsx
import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { YOGA_PLANS, DIFFICULTY_COLORS } from '../data/yogaData'
import { CONDITIONS } from '../data/healthData'
import '../styles/Yoga.css'

const CONDITION_META = {
  bloating:          { icon: '🫁', color: '#F97316' },
  gerd:              { icon: '🔥', color: '#EF4444' },
  ibs:               { icon: '🌿', color: '#10B981' },
  pcos:              { icon: '🌸', color: '#EC4899' },
  hypothyroidism:    { icon: '🦋', color: '#8B5CF6' },
  low_immunity:      { icon: '🛡️', color: '#3B82F6' },
  anxiety:           { icon: '🧘', color: '#6366F1' },
  brain_fog:         { icon: '🧠', color: '#0891B2' },
  insulin_resistance:{ icon: '⚖️', color: '#D97706' },
  back_pain:         { icon: '🦴', color: '#64748B' },
  acne:              { icon: '✨', color: '#A855F7' },
  hair_fall:         { icon: '💆', color: '#059669' },
}

function getAllPoses() {
  const seen = new Set()
  const poses = []
  Object.values(YOGA_PLANS).forEach(plan => {
    plan.poses.forEach(pose => {
      if (!seen.has(pose.id)) {
        seen.add(pose.id)
        poses.push({ ...pose, conditionId: plan.conditionId })
      }
    })
  })
  return poses
}

export default function Yoga() {
  const navigate   = useNavigate()
  const location   = useLocation()

  // Read ?plan=conditionId from URL (set by ConditionDetail)
  const urlPlan = new URLSearchParams(location.search).get('plan')

  const [tab, setTab]                   = useState('plans')
  const [selectedPlan, setSelectedPlan] = useState(urlPlan || null)
  const [selectedPose, setSelectedPose] = useState(null)
  const [diffFilter, setDiffFilter]     = useState('all')
  const [expandedStep, setExpandedStep] = useState(null)

  // If URL plan param changes, open that plan
  useEffect(() => {
    if (urlPlan && YOGA_PLANS[urlPlan]) setSelectedPlan(urlPlan)
  }, [urlPlan])

  const allPoses = useMemo(getAllPoses, [])

  const filteredPoses = useMemo(() => {
    if (diffFilter === 'all') return allPoses
    return allPoses.filter(p => p.difficulty === diffFilter)
  }, [allPoses, diffFilter])

  const plansList = useMemo(() =>
    Object.values(YOGA_PLANS).map(plan => ({
      ...plan,
      condition: CONDITIONS.find(c => c.id === plan.conditionId),
      meta: CONDITION_META[plan.conditionId] || { icon: '🧘', color: '#10B981' },
    }))
  , [])

  // ── POSE DETAIL VIEW ──
  if (selectedPose) {
    const diff = DIFFICULTY_COLORS[selectedPose.difficulty] || DIFFICULTY_COLORS.beginner
    return (
      <div className="yoga-page">
        <button className="yoga-back-btn" onClick={() => setSelectedPose(null)}>← Back</button>
        <div className="pose-detail">
          <div className="pose-detail-header">
            <div>
              <span className="pose-detail-sanskrit">{selectedPose.sanskritName}</span>
              <h1 className="pose-detail-name">{selectedPose.name}</h1>
              <div className="pose-detail-tags">
                <span className="pose-tag" style={{ background: diff.bg, color: diff.color }}>{diff.label}</span>
                <span className="pose-tag pose-tag--duration">⏱ {selectedPose.duration}</span>
              </div>
            </div>
          </div>

          <div className="pose-detail-body">
            <div className="pose-detail-main">
              {/* Benefits */}
              <div className="pose-section">
                <h3>Why this pose helps</h3>
                <p>{selectedPose.benefits}</p>
              </div>

              {/* Steps */}
              <div className="pose-section">
                <h3>Step-by-step</h3>
                <div className="pose-steps">
                  {selectedPose.steps.map((step, i) => (
                    <div
                      key={i}
                      className={`pose-step ${expandedStep === i ? 'pose-step--active' : ''}`}
                      onClick={() => setExpandedStep(expandedStep === i ? null : i)}
                    >
                      <span className="pose-step-num">{i + 1}</span>
                      <p className="pose-step-text">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pose-detail-side">
              {/* Breathing */}
              <div className="pose-info-card pose-info-card--breath">
                <span className="pose-info-icon">🫁</span>
                <div>
                  <h4>Breathing cue</h4>
                  <p>{selectedPose.breathingCue}</p>
                </div>
              </div>

              {/* Modification */}
              <div className="pose-info-card pose-info-card--mod">
                <span className="pose-info-icon">🌱</span>
                <div>
                  <h4>Easier modification</h4>
                  <p>{selectedPose.modification}</p>
                </div>
              </div>

              {/* Avoid */}
              <div className="pose-info-card pose-info-card--avoid">
                <span className="pose-info-icon">⚠️</span>
                <div>
                  <h4>When to avoid</h4>
                  <p>{selectedPose.avoid}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── PLAN DETAIL VIEW ──
  if (selectedPlan) {
    const plan = YOGA_PLANS[selectedPlan]
    if (!plan) return null
    const meta = CONDITION_META[selectedPlan] || { icon: '🧘', color: '#10B981' }
    const condition = CONDITIONS.find(c => c.id === selectedPlan)
    return (
      <div className="yoga-page">
        <button className="yoga-back-btn" onClick={() => setSelectedPlan(null)}>← All Plans</button>

        <div className="plan-detail">
          <div className="plan-detail-header" style={{ '--plan-color': meta.color }}>
            <span className="plan-detail-icon">{meta.icon}</span>
            <div>
              <p className="plan-detail-condition">{condition?.name || selectedPlan}</p>
              <h1 className="plan-detail-title">{plan.sequenceTitle}</h1>
              <div className="plan-detail-meta">
                <span>⏱ {plan.duration}</span>
                <span>🕐 {plan.bestTime}</span>
              </div>
            </div>
          </div>

          <p className="plan-intro">{plan.intro}</p>

          {/* Poses sequence */}
          <h2 className="plan-section-title">Pose Sequence</h2>
          <div className="plan-poses-list">
            {plan.poses.map((pose, i) => {
              const diff = DIFFICULTY_COLORS[pose.difficulty] || DIFFICULTY_COLORS.beginner
              return (
                <div key={pose.id} className="plan-pose-row">
                  <div className="plan-pose-num">{i + 1}</div>
                  <div className="plan-pose-info">
                    <div className="plan-pose-top">
                      <span className="plan-pose-name">{pose.name}</span>
                      <span className="plan-pose-sanskrit">{pose.sanskritName}</span>
                    </div>
                    <p className="plan-pose-benefits">{pose.benefits}</p>
                    <div className="plan-pose-tags">
                      <span className="pose-tag" style={{ background: diff.bg, color: diff.color }}>{diff.label}</span>
                      <span className="pose-tag pose-tag--duration">⏱ {pose.duration}</span>
                    </div>
                  </div>
                  <button className="plan-pose-btn" onClick={() => setSelectedPose(pose)}>
                    Steps →
                  </button>
                </div>
              )
            })}
          </div>

          {/* Breathwork */}
          {plan.breathwork?.length > 0 && (
            <>
              <h2 className="plan-section-title" style={{ marginTop: '2rem' }}>Breathwork</h2>
              <div className="breathwork-list">
                {plan.breathwork.map((b, i) => (
                  <div key={i} className="breathwork-card">
                    <div className="breathwork-header">
                      <span className="breathwork-icon">🫁</span>
                      <div>
                        <h3>{b.name}</h3>
                        <span className="breathwork-duration">{b.duration}</span>
                      </div>
                    </div>
                    {b.steps?.length > 0 && (
                      <div className="breathwork-steps">
                        {b.steps.map((step, si) => (
                          <div key={si} className="breathwork-step">
                            <span className="breathwork-step-num">{si + 1}</span>
                            <p>{step}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {b.benefit && <p className="breathwork-benefits">✦ {b.benefit}</p>}
                    {b.avoid   && <p className="breathwork-avoid">⚠️ {b.avoid}</p>}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  // ── MAIN VIEW ──
  return (
    <div className="yoga-page">
      <div className="yoga-header">
        <div>
          <h1 className="yoga-title">Yoga</h1>
          <p className="yoga-subtitle">Condition-specific sequences and pose library</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="yoga-tabs">
        <button className={`yoga-tab ${tab === 'plans' ? 'yoga-tab--active' : ''}`} onClick={() => setTab('plans')}>
          Condition Plans
          <span className="yoga-tab-count">{plansList.length}</span>
        </button>
        <button className={`yoga-tab ${tab === 'library' ? 'yoga-tab--active' : ''}`} onClick={() => setTab('library')}>
          Pose Library
          <span className="yoga-tab-count">{allPoses.length}</span>
        </button>
      </div>

      {/* Plans tab */}
      {tab === 'plans' && (
        <div className="plans-grid">
          {plansList.map(plan => (
            <button
              key={plan.conditionId}
              className="plan-card"
              onClick={() => setSelectedPlan(plan.conditionId)}
              style={{ '--plan-color': plan.meta.color }}
            >
              <div className="plan-card-top">
                <span className="plan-card-icon">{plan.meta.icon}</span>
                <div className="plan-card-info">
                  <span className="plan-card-condition">{plan.condition?.name || plan.conditionId}</span>
                  <span className="plan-card-title">{plan.sequenceTitle}</span>
                </div>
              </div>
              <div className="plan-card-bottom">
                <span>⏱ {plan.duration}</span>
                <span>{plan.poses.length} poses</span>
                <span className="plan-card-arrow">→</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Library tab */}
      {tab === 'library' && (
        <div className="library-section">
          <div className="library-filters">
            {['all', 'beginner', 'intermediate', 'advanced'].map(d => (
              <button
                key={d}
                className={`diff-filter ${diffFilter === d ? 'diff-filter--active' : ''}`}
                onClick={() => setDiffFilter(d)}
              >
                {d === 'all' ? `All · ${allPoses.length}` : DIFFICULTY_COLORS[d].label}
              </button>
            ))}
          </div>
          <div className="library-grid">
            {filteredPoses.map(pose => {
              const diff = DIFFICULTY_COLORS[pose.difficulty] || DIFFICULTY_COLORS.beginner
              const meta = CONDITION_META[pose.conditionId] || { icon: '🧘', color: '#10B981' }
              return (
                <button
                  key={pose.id}
                  className="library-card"
                  onClick={() => setSelectedPose(pose)}
                >
                  <div className="library-card-top">
                    <div className="library-card-info">
                      <span className="library-card-sanskrit">{pose.sanskritName}</span>
                      <span className="library-card-name">{pose.name}</span>
                    </div>
                  </div>
                  <p className="library-card-benefits">{pose.benefits.slice(0, 90)}…</p>
                  <div className="library-card-tags">
                    <span className="pose-tag" style={{ background: diff.bg, color: diff.color }}>{diff.label}</span>
                    <span className="pose-tag pose-tag--duration">⏱ {pose.duration}</span>
                    <span className="pose-tag" style={{ background: '#F3F4F6', color: '#6B7280' }}>
                      {meta.icon} {pose.conditionId.replace('_', ' ')}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}