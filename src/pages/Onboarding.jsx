// src/pages/Onboarding.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { CONDITIONS } from '../data/healthData'
import '../styles/Onboarding.css'

// Keyword → condition mapping for text scanning
const SYMPTOM_MAP = {
  bloating:   ['bloat','gas','gassy','distended','stomach pain','stomach ache','fullness after eating','burp','flatulence'],
  gerd:       ['acid','reflux','heartburn','acidity','chest burn','regurgitat','sour taste','throat burn'],
  ibs:        ['ibs','irritable bowel','diarrhea','diarrhoea','constipat','cramping','bowel','loose stool'],
  pcos:       ['pcos','irregular period','missed period','facial hair','hormonal acne','ovary','ovarian','pcod'],
  hypothyroidism: ['thyroid','hypothyroid','slow metabolism','weight gain','fatigue','hair loss','cold hands','cold feet','brain fog'],
  low_immunity:   ['immunity','frequent cold','sick often','slow healing','infection','weak immune'],
  anxiety:    ['anxiety','anxious','panic','worry','restless','racing thoughts','stress','tension','nervous'],
  brain_fog:  ['brain fog','foggy','can\'t concentrate','memory','forgetful','mental fatigue','focus','clarity'],
  insulin_resistance: ['blood sugar','sugar craving','energy crash','belly fat','insulin','pre-diabetic','diabetic','sweet craving'],
  back_pain:  ['back pain','lower back','spine','posture','stiff back','back ache','backache','sciatica'],
  acne:       ['acne','pimple','breakout','oily skin','cystic','spot','blemish'],
  hair_fall:  ['hair fall','hair loss','thinning hair','bald','shedding','hair break'],
}

function detectConditions(text) {
  const lower = text.toLowerCase()
  const found = new Set()
  Object.entries(SYMPTOM_MAP).forEach(([condId, keywords]) => {
    if (keywords.some(kw => lower.includes(kw))) found.add(condId)
  })
  return [...found]
}

const STEPS = ['intro', 'symptoms', 'confirm', 'goals']

export default function Onboarding() {
  const { user, saveProfile } = useAuth()
  const navigate = useNavigate()

  const [step, setStep]                   = useState('intro')
  const [symptomText, setSymptomText]     = useState('')
  const [detectedConds, setDetectedConds] = useState([])
  const [selectedConds, setSelectedConds] = useState([])
  const [customGoals, setCustomGoals]     = useState([])
  const [goalInput, setGoalInput]         = useState('')
  const [saving, setSaving]               = useState(false)

  const GOAL_PRESETS = [
    { id: 'sleep',      label: 'Improve sleep',      icon: '😴' },
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
    { id: 'acidity',    label: 'Reduce acidity',     icon: '🔥' },
  ]

  const [selectedGoals, setSelectedGoals] = useState([])

  const handleScanSymptoms = () => {
    const found = detectConditions(symptomText)
    setDetectedConds(found)
    setSelectedConds(found)
    setStep('confirm')
  }

  const toggleCondition = (id) => {
    setSelectedConds(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const toggleGoal = (id) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  const addCustomGoal = () => {
    const text = goalInput.trim()
    if (!text) return
    setCustomGoals(prev => [...prev, { id: `custom-${Date.now()}`, label: text, icon: '🎯' }])
    setGoalInput('')
  }

  const handleFinish = async () => {
    setSaving(true)
    const allGoals = [
      ...GOAL_PRESETS.filter(g => selectedGoals.includes(g.id)),
      ...customGoals,
    ]
    await saveProfile({
      conditions:        selectedConds,
      goals:             allGoals,
      onboardingDone:    true,
      onboardedAt:       new Date().toISOString(),
      displayName:       user?.displayName || '',
      photoURL:          user?.photoURL || '',
    })
    setSaving(false)
    navigate('/')
  }

  const firstName = user?.displayName?.split(' ')[0] || 'there'

  return (
    <div className="onboarding-page">
      <div className="onboarding-card">

        {/* Progress dots */}
        <div className="onboarding-progress">
          {['Tell us', 'Confirm', 'Goals'].map((label, i) => {
            const stepIdx = ['symptoms', 'confirm', 'goals'].indexOf(step)
            return (
              <div key={label} className={`ob-dot ${i <= stepIdx ? 'ob-dot--done' : ''}`}>
                <div className="ob-dot-circle" />
                <span>{label}</span>
              </div>
            )
          })}
        </div>

        {/* ── INTRO ── */}
        {step === 'intro' && (
          <div className="ob-step">
            <span className="ob-big-icon">🌿</span>
            <h1>Welcome, {firstName}!</h1>
            <p>WellNest will build a personalised health plan just for you — covering yoga, meals, daily habits and more.</p>
            <p>It only takes 2 minutes to set up.</p>
            <button className="ob-primary-btn" onClick={() => setStep('symptoms')}>
              Let's get started →
            </button>
          </div>
        )}

        {/* ── SYMPTOMS TEXT ── */}
        {step === 'symptoms' && (
          <div className="ob-step">
            <span className="ob-big-icon">💬</span>
            <h1>How have you been feeling?</h1>
            <p>Describe your symptoms, concerns, or health goals in your own words. Don't worry about being technical.</p>
            <textarea
              className="ob-textarea"
              placeholder="e.g. I've been feeling bloated after meals, my skin breaks out a lot, and I'm always tired in the afternoon..."
              value={symptomText}
              onChange={e => setSymptomText(e.target.value)}
              rows={5}
              autoFocus
            />
            <button
              className="ob-primary-btn"
              onClick={handleScanSymptoms}
              disabled={symptomText.trim().length < 10}
            >
              Analyse my symptoms →
            </button>
            <button className="ob-skip-btn" onClick={() => { setDetectedConds([]); setSelectedConds([]); setStep('confirm') }}>
              Skip — I'll select manually
            </button>
          </div>
        )}

        {/* ── CONFIRM CONDITIONS ── */}
        {step === 'confirm' && (
          <div className="ob-step">
            <span className="ob-big-icon">🔍</span>
            <h1>
              {detectedConds.length > 0
                ? `We found ${detectedConds.length} possible condition${detectedConds.length > 1 ? 's' : ''}`
                : 'Select your health concerns'}
            </h1>
            <p>
              {detectedConds.length > 0
                ? 'These match your symptoms. Confirm or adjust — you can always change this later.'
                : 'Select all that apply to you.'}
            </p>
            <div className="ob-conditions-grid">
              {CONDITIONS.map(cond => {
                const isSelected = selectedConds.includes(cond.id)
                const isDetected = detectedConds.includes(cond.id)
                return (
                  <button
                    key={cond.id}
                    className={`ob-condition-btn ${isSelected ? 'ob-condition-btn--selected' : ''}`}
                    onClick={() => toggleCondition(cond.id)}
                  >
                    <span className="ob-cond-name">{cond.name}</span>
                    {isDetected && <span className="ob-detected-badge">matched</span>}
                    {isSelected && <span className="ob-check">✓</span>}
                  </button>
                )
              })}
            </div>
            <button
              className="ob-primary-btn"
              onClick={() => setStep('goals')}
            >
              Continue →
            </button>
            <button className="ob-back-btn" onClick={() => setStep('symptoms')}>← Back</button>
          </div>
        )}

        {/* ── GOALS ── */}
        {step === 'goals' && (
          <div className="ob-step">
            <span className="ob-big-icon">🎯</span>
            <h1>What are your health goals?</h1>
            <p>Select as many as you want. You can always add or change these later.</p>
            <div className="ob-goals-grid">
              {GOAL_PRESETS.map(goal => (
                <button
                  key={goal.id}
                  className={`ob-goal-btn ${selectedGoals.includes(goal.id) ? 'ob-goal-btn--selected' : ''}`}
                  onClick={() => toggleGoal(goal.id)}
                >
                  <span>{goal.icon}</span>
                  <span>{goal.label}</span>
                  {selectedGoals.includes(goal.id) && <span className="ob-check">✓</span>}
                </button>
              ))}
            </div>

            {/* Custom goal input */}
            <div className="ob-custom-goal">
              <input
                type="text"
                placeholder="Add your own goal..."
                value={goalInput}
                onChange={e => setGoalInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') addCustomGoal() }}
              />
              <button onClick={addCustomGoal}>Add</button>
            </div>

            {customGoals.length > 0 && (
              <div className="ob-custom-list">
                {customGoals.map(g => (
                  <span key={g.id} className="ob-custom-tag">
                    🎯 {g.label}
                    <button onClick={() => setCustomGoals(prev => prev.filter(x => x.id !== g.id))}>×</button>
                  </span>
                ))}
              </div>
            )}

            <button
              className="ob-primary-btn"
              onClick={handleFinish}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Take me to my dashboard →'}
            </button>
            <button className="ob-back-btn" onClick={() => setStep('confirm')}>← Back</button>
          </div>
        )}

      </div>
    </div>
  )
}