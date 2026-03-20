// ============================================================
// FILE: src/pages/ConditionDetail.jsx
// TYPE: Page Component
// PURPOSE: Shows the full lifestyle plan for ONE condition.
//          User arrives here from Dashboard after clicking a condition.
//
// HOW IT KNOWS WHICH CONDITION TO SHOW:
//   The URL is /condition/pcos or /condition/gerd etc.
//   useParams() reads the :id part from the URL.
//   We then look up that id in our healthData.js file.
//
// TABS:
//   Overview → Yoga → Diet → Sleep → Habits → Supplements
//   Only one tab's content shows at a time (useState controls this)
// ============================================================


// ─────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────

import { useState } from 'react'

// useParams  → reads URL parameters (:id from the route)
// useNavigate → lets us go back to dashboard programmatically
import { useParams, useNavigate } from 'react-router-dom'

// Data helpers from Step 1
import { getConditionById, getCategoryById } from '../data/healthData'

// CSS for this page
import '../styles/ConditionDetail.css'


// ─────────────────────────────────────────────
// TAB DEFINITIONS
// An array of tab objects so we can .map() over them
// instead of repeating JSX for each tab manually.
// Adding a new tab = just add one object here.
// ─────────────────────────────────────────────

const TABS = [
  { id: 'overview',     label: 'Overview',     icon: '📋' },
  { id: 'yoga',         label: 'Yoga',         icon: '🧘' },
  { id: 'diet',         label: 'Diet',         icon: '🥗' },
  { id: 'sleep',        label: 'Sleep',        icon: '😴' },
  { id: 'habits',       label: 'Habits',       icon: '🌱' },
  { id: 'supplements',  label: 'Supplements',  icon: '💊' },
]


// ─────────────────────────────────────────────
// THE CONDITIONDETAIL COMPONENT
// ─────────────────────────────────────────────

function ConditionDetail() {

  // ── READ URL PARAM ─────────────────────────
  // useParams() returns an object with all URL params.
  // Our route is /condition/:id so we destructure `id`.
  // Example: URL is /condition/pcos → id = "pcos"
  const { id } = useParams()

  const navigate = useNavigate()

  // ── LOOK UP DATA ───────────────────────────
  // Use our helper function from healthData.js
  // to find the condition that matches this id.
  const condition = getConditionById(id)

  // Also get the parent category data (for color/icon)
  const category = condition ? getCategoryById(condition.categoryId) : null


  // ── STATE ──────────────────────────────────
  // activeTab tracks which tab the user is currently on.
  // Starts on 'overview'.
  const [activeTab, setActiveTab] = useState('overview')


  // ── GUARD CLAUSE ───────────────────────────
  // If no condition was found for this id (e.g. user typed
  // a wrong URL like /condition/xyz), show a not-found message.
  // This is called a "guard clause" — we return early
  // before the main JSX if something is wrong.
  if (!condition) {
    return (
      <div className="not-found">
        <h2>Condition not found</h2>
        <p>No condition exists with the id: <strong>{id}</strong></p>
        <button onClick={() => navigate('/')}>← Back to Dashboard</button>
      </div>
    )
  }


  // ── SEVERITY HELPER (same as Dashboard) ────
  const getSeverityStyle = (severity) => {
    const map = {
      mild:     { label: 'Mild',     bg: '#D1FAE5', color: '#065F46' },
      moderate: { label: 'Moderate', bg: '#FEF3C7', color: '#92400E' },
      serious:  { label: 'Serious',  bg: '#FEE2E2', color: '#991B1B' },
    }
    return map[severity] || map['mild']
  }

  const sev = getSeverityStyle(condition.severity)


  // ─────────────────────────────────────────────
  // TAB CONTENT RENDERER
  // A function that returns different JSX based on activeTab.
  // We call this inside the main return below.
  //
  // Why a function instead of if/else in JSX?
  // Cleaner to read — keeps the main JSX uncluttered.
  // ─────────────────────────────────────────────

  const renderTabContent = () => {

    switch (activeTab) {

      // ── OVERVIEW TAB ─────────────────────
      case 'overview':
        return (
          <div className="tab-content">

            <div className="overview-grid">

              {/* Symptoms */}
              <div className="overview-card">
                <h3 className="overview-card-title">
                  <span>⚠️</span> Common Symptoms
                </h3>
                <ul className="overview-list">
                  {condition.symptoms.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Root Causes */}
              <div className="overview-card">
                <h3 className="overview-card-title">
                  <span>🔍</span> Root Causes
                </h3>
                <ul className="overview-list">
                  {condition.rootCauses.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Plan summary — what's included */}
            <div className="plan-summary">
              <h3>Your Lifestyle Plan Includes</h3>
              <div className="plan-pillars">
                <div className="pillar">🧘 Yoga Sequence</div>
                <div className="pillar">🥗 Diet Plan</div>
                <div className="pillar">😴 Sleep Protocol</div>
                <div className="pillar">🌱 Daily Habits</div>
                <div className="pillar">💊 Supplements</div>
              </div>
            </div>

          </div>
        )


      // ── YOGA TAB ─────────────────────────
      case 'yoga':
        return (
          <div className="tab-content">

            <div className="section-intro-block">
              <h3>{condition.plan.yoga.title}</h3>
              <p>Practice this sequence daily, ideally in the morning on an empty stomach.</p>
            </div>

            <div className="yoga-poses-list">
              {condition.plan.yoga.poses.map((pose, index) => (
                <div key={index} className="yoga-pose-card">
                  <div className="pose-number">{index + 1}</div>
                  <div className="pose-details">
                    <h4 className="pose-name">{pose.name}</h4>
                    <span className="pose-duration">⏱ {pose.duration}</span>
                    <p className="pose-benefit">✦ {pose.benefit}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="yoga-full-plan-btn"
              onClick={() => navigate(`/yoga?plan=${condition.id}`)}
            >
              🧘 View Full Yoga Plan with Step-by-Step Instructions →
            </button>

          </div>
        )


      // ── DIET TAB ─────────────────────────
      case 'diet':
        return (
          <div className="tab-content">

            <div className="diet-grid">

              {/* Include */}
              <div className="diet-card diet-card--include">
                <h3>✅ Include</h3>
                <ul>
                  {condition.plan.diet.include.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Avoid */}
              <div className="diet-card diet-card--avoid">
                <h3>❌ Avoid</h3>
                <ul>
                  {condition.plan.diet.avoid.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Tips */}
            <div className="diet-tips">
              <h3>💡 Tips</h3>
              <ul>
                {condition.plan.diet.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

          </div>
        )


      // ── SLEEP TAB ────────────────────────
      case 'sleep':
        return (
          <div className="tab-content">

            <div className="sleep-hours-card">
              <span className="sleep-icon">😴</span>
              <div>
                <p className="sleep-label">Recommended Sleep</p>
                <p className="sleep-hours">{condition.plan.sleep.hours} hours</p>
              </div>
            </div>

            <div className="sleep-tips-list">
              <h3>Sleep Protocol</h3>
              <ul>
                {condition.plan.sleep.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

          </div>
        )


      // ── HABITS TAB ───────────────────────
      case 'habits':
        return (
          <div className="tab-content">

            <div className="habits-section">
              <h3>✅ Daily Habits to Build</h3>
              <div className="habits-list">
                {condition.plan.habits.map((habit, i) => (
                  <div key={i} className="habit-item">
                    <span className="habit-number">{i + 1}</span>
                    <p>{habit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="avoid-section">
              <h3>🚫 Things to Avoid</h3>
              <div className="avoid-list">
                {condition.plan.avoid.map((item, i) => (
                  <div key={i} className="avoid-item">
                    <span>✗</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )


      // ── SUPPLEMENTS TAB ──────────────────
      case 'supplements':
        return (
          <div className="tab-content">

            <div className="supplements-note">
              <p>
                🌿 These are <strong>natural supplements</strong>, not medicines.
                Always consult a healthcare professional before starting any supplement,
                especially if you are on medication.
              </p>
            </div>

            <div className="supplements-grid">
              {condition.plan.supplements.map((supp, i) => (
                <div key={i} className="supplement-card">
                  <span className="supplement-icon">💊</span>
                  <p>{supp}</p>
                </div>
              ))}
            </div>

          </div>
        )


      default:
        return null
    }
  }


  // ─────────────────────────────────────────────
  // MAIN JSX RETURN
  // ─────────────────────────────────────────────

  return (
    <div className="condition-detail">

      {/* ── TOP NAV ── */}
      <nav className="detail-nav">
        <button
          className="back-button"
          onClick={() => navigate('/')}
        >
          ← Back to Dashboard
        </button>

        {/* Breadcrumb: Category → Condition */}
        <div className="breadcrumb">
          <span style={{ color: category?.color }}>{category?.icon} {category?.label}</span>
          <span className="breadcrumb-sep">›</span>
          <span>{condition.name}</span>
        </div>
      </nav>


      {/* ── CONDITION HERO ── */}
      <header
        className="condition-hero"
        style={{ '--accent-color': category?.color }}
      >
        <div className="hero-content">

          <span
            className="severity-badge-large"
            style={{ background: sev.bg, color: sev.color }}
          >
            {sev.label}
          </span>

          <h1 className="condition-title">{condition.name}</h1>
          <p className="condition-tagline-large">{condition.tagline}</p>

        </div>
      </header>


      {/* ── TABS ── */}
      <div className="tabs-wrapper">
        <div className="tabs-bar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'tab-button--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}

              // Pass the accent color so active tab uses it
              style={{ '--accent-color': category?.color }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content renders here based on activeTab */}
        <div className="tab-panel">
          {renderTabContent()}
        </div>
      </div>

    </div>
  )
}

export default ConditionDetail