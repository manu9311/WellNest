// ============================================================
// FILE: src/pages/MealPlanner.jsx
// TYPE: Page Component
// PURPOSE: Shows the full condition-specific meal plan.
//          User arrives here from ConditionDetail page.
//
// URL: /meals/:conditionId
//      e.g. /meals/pcos or /meals/bloating
//
// WHAT IT SHOWS:
//   - Core eating principles for the condition
//   - 3 breakfast options (user picks one to view details)
//   - 3 lunch options
//   - 3 dinner options
//   - Snack ideas
//   - Weekly tip
//
// NEW CONCEPTS IN THIS FILE:
//   - Meal tabs (Breakfast / Lunch / Dinner)
//   - Selected meal card (clicking a card expands it)
//   - Tag rendering with dynamic colors from TAG_COLORS
// ============================================================

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { getMealPlan, TAG_COLORS } from '../data/mealsData'
import { getConditionById, getCategoryById } from '../data/healthData'

import '../styles/MealPlanner.css'


// ─────────────────────────────────────────────
// MEAL TYPE TABS
// ─────────────────────────────────────────────

const MEAL_TABS = [
  { id: 'breakfast', label: 'Breakfast', icon: '🌅', time: '7–9 AM' },
  { id: 'lunch',     label: 'Lunch',     icon: '☀️', time: '12–2 PM' },
  { id: 'dinner',    label: 'Dinner',    icon: '🌙', time: '7–8 PM' },
]


// ─────────────────────────────────────────────
// MEAL CARD COMPONENT
// A reusable card for a single meal option.
// Defined here (not in components/) because it is
// only used inside this one page.
//
// Props:
//   meal       → the meal object from mealsData.js
//   isSelected → whether this card is expanded
//   onSelect   → function to call when clicked
// ─────────────────────────────────────────────

function MealCard({ meal, isSelected, onSelect }) {
  return (
    <div
      className={`meal-card ${isSelected ? 'meal-card--selected' : ''}`}
      onClick={onSelect}
    >
      {/* Card Header */}
      <div className="meal-card-header">
        <h3 className="meal-card-name">{meal.name}</h3>
        <span className="meal-card-prep">⏱ {meal.prepTime}</span>
      </div>

      {/* Tags */}
      <div className="meal-card-tags">
        {meal.tags.map((tag) => {
          const style = TAG_COLORS[tag] || { bg: '#F3F4F6', color: '#374151' }
          return (
            <span
              key={tag}
              className="meal-tag"
              style={{ background: style.bg, color: style.color }}
            >
              {tag.replace(/-/g, ' ')}
            </span>
          )
        })}
      </div>

      {/* Description — always visible */}
      <p className="meal-card-description">{meal.description}</p>

      {/* Benefits — only visible when selected */}
      {isSelected && (
        <div className="meal-card-benefits">
          <h4>Why this helps</h4>
          <p>{meal.benefits}</p>
        </div>
      )}

      <div className="meal-card-footer">
        <span className="meal-card-toggle">
          {isSelected ? '▲ Less info' : '▼ Why this helps'}
        </span>
      </div>
    </div>
  )
}


// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────

function MealPlanner() {

  // ── URL PARAM ──────────────────────────────
  const { conditionId } = useParams()
  const navigate = useNavigate()

  // ── DATA LOOKUP ────────────────────────────
  const mealPlan   = getMealPlan(conditionId)
  const condition  = getConditionById(conditionId)
  const category   = condition ? getCategoryById(condition.categoryId) : null

  // ── STATE ──────────────────────────────────
  // Which meal tab is active: breakfast / lunch / dinner
  const [activeMealTab, setActiveMealTab] = useState('breakfast')

  // Which meal card is expanded (stores the index, or null)
  // We use index because meal names could repeat across conditions
  const [selectedMealIndex, setSelectedMealIndex] = useState(null)


  // ── GUARD ──────────────────────────────────
  if (!mealPlan || !condition) {
    return (
      <div className="not-found">
        <h2>Meal plan not found</h2>
        <p>No meal plan exists for: <strong>{conditionId}</strong></p>
        <button onClick={() => navigate('/')}>← Back to Dashboard</button>
      </div>
    )
  }


  // ── DERIVED: current meal list ─────────────
  // Based on which tab is active, pick the right array
  const currentMeals = mealPlan[activeMealTab] || []


  // ── HANDLERS ───────────────────────────────
  const handleMealTabChange = (tabId) => {
    setActiveMealTab(tabId)
    setSelectedMealIndex(null) // collapse any open card when switching tabs
  }

  const handleMealSelect = (index) => {
    // Toggle: if same card clicked again, collapse it
    setSelectedMealIndex(selectedMealIndex === index ? null : index)
  }


  // ── JSX ────────────────────────────────────
  return (
    <div className="meal-planner">

      {/* ── NAV ── */}
      <nav className="detail-nav">
        <button
          className="back-button"
          onClick={() => navigate(`/condition/${conditionId}`)}
        >
          ← Back to {condition.name}
        </button>
        <div className="breadcrumb">
          <span style={{ color: category?.color }}>
            {category?.icon} {category?.label}
          </span>
          <span className="breadcrumb-sep">›</span>
          <span>{condition.name}</span>
          <span className="breadcrumb-sep">›</span>
          <span>Meal Plan</span>
        </div>
      </nav>


      {/* ── HERO ── */}
      <header
        className="meal-hero"
        style={{ '--accent-color': category?.color }}
      >
        <div className="meal-hero-content">
          <span className="meal-hero-icon">🥗</span>
          <div>
            <h1>Meal Plan for {condition.name}</h1>
            <p>Condition-specific nutrition to support your healing</p>
          </div>
        </div>
      </header>


      <main className="meal-main">

        {/* ── PRINCIPLES ── */}
        <section className="principles-section">
          <h2 className="section-heading">
            <span>📌</span> Core Eating Principles
          </h2>
          <p className="section-subheading">
            Follow these rules before worrying about specific meals.
          </p>
          <div className="principles-grid">
            {mealPlan.principles.map((principle, i) => (
              <div key={i} className="principle-card">
                <span className="principle-number">{i + 1}</span>
                <p>{principle}</p>
              </div>
            ))}
          </div>
        </section>


        {/* ── MEAL TABS ── */}
        <section className="meals-section">
          <h2 className="section-heading">
            <span>🍽️</span> Daily Meal Options
          </h2>
          <p className="section-subheading">
            3 options per meal — pick what works for you each day.
          </p>

          {/* Tab bar */}
          <div className="meal-tabs-bar">
            {MEAL_TABS.map((tab) => (
              <button
                key={tab.id}
                className={`meal-tab-btn ${activeMealTab === tab.id ? 'meal-tab-btn--active' : ''}`}
                onClick={() => handleMealTabChange(tab.id)}
                style={{ '--accent-color': category?.color }}
              >
                <span className="meal-tab-icon">{tab.icon}</span>
                <span className="meal-tab-label">{tab.label}</span>
                <span className="meal-tab-time">{tab.time}</span>
              </button>
            ))}
          </div>

          {/* Meal cards for active tab */}
          <div className="meal-cards-grid">
            {currentMeals.map((meal, index) => (
              <MealCard
                key={index}
                meal={meal}
                isSelected={selectedMealIndex === index}
                onSelect={() => handleMealSelect(index)}
              />
            ))}
          </div>
        </section>


        {/* ── SNACKS ── */}
        <section className="snacks-section">
          <h2 className="section-heading">
            <span>🍎</span> Healthy Snack Ideas
          </h2>
          <div className="snacks-grid">
            {mealPlan.snacks.map((snack, i) => (
              <div key={i} className="snack-item">
                <span className="snack-bullet">✦</span>
                <p>{snack}</p>
              </div>
            ))}
          </div>
        </section>


        {/* ── WEEKLY TIP ── */}
        <section className="weekly-tip-section">
          <div className="weekly-tip-card">
            <div className="weekly-tip-header">
              <span>💡</span>
              <h3>This Week's Challenge</h3>
            </div>
            <p>{mealPlan.weeklyTip}</p>
          </div>
        </section>

      </main>

    </div>
  )
}

export default MealPlanner