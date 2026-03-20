// ============================================================
// FILE: src/components/SearchBar.jsx
// TYPE: Reusable Component
// PURPOSE: A search input that filters across ALL conditions
//          in real time and shows a dropdown of results.
//
// WHY IS THIS IN components/ AND NOT pages/?
//   - pages/ = full page views tied to a URL route
//   - components/ = reusable UI pieces used INSIDE pages
//   This SearchBar is used inside Dashboard.jsx but could
//   also be used in a header, a sidebar, anywhere.
//
// PROPS THIS COMPONENT RECEIVES:
//   - onSelect(conditionId) → function called when user picks a result
//     The parent (Dashboard) decides what to DO with the selection.
//     SearchBar just reports what was picked. This is called
//     "lifting state up" — the child doesn't navigate itself,
//     it tells the parent and the parent acts.
//
// HOOKS USED:
//   useState  → tracks the typed query and whether dropdown is open
//   useMemo   → only re-runs the search filter when query changes
//   useEffect → detects clicks outside the box to close dropdown
//   useRef    → holds a reference to the DOM element (for outside click)
// ============================================================

import { useState, useMemo, useEffect, useRef } from 'react'

// We search across ALL conditions
import { CONDITIONS, getCategoryById } from '../data/healthData'

import '../styles/SearchBar.css'


// ─────────────────────────────────────────────
// SEARCH LOGIC
// This function lives OUTSIDE the component because
// it doesn't need access to React state or props.
// Pure functions outside = cleaner + slightly faster.
//
// It searches across: name, tagline, symptoms, rootCauses
// Returns a filtered array of condition objects.
// ─────────────────────────────────────────────

const searchConditions = (query) => {
  // Normalise: lowercase and trim whitespace
  const q = query.toLowerCase().trim()

  // Empty query = no results
  if (!q) return []

  return CONDITIONS.filter((condition) => {
    // Check condition name
    if (condition.name.toLowerCase().includes(q)) return true

    // Check tagline
    if (condition.tagline.toLowerCase().includes(q)) return true

    // Check any symptom
    if (condition.symptoms.some(s => s.toLowerCase().includes(q))) return true

    // Check any root cause
    if (condition.rootCauses.some(r => r.toLowerCase().includes(q))) return true

    // No match
    return false
  })
}


// ─────────────────────────────────────────────
// THE SEARCHBAR COMPONENT
// ─────────────────────────────────────────────

// We destructure props directly in the function signature.
// { onSelect } means this component expects a prop called onSelect.
function SearchBar({ onSelect }) {

  // ── STATE ──────────────────────────────────
  const [query, setQuery]       = useState('')     // what user typed
  const [isOpen, setIsOpen]     = useState(false)  // dropdown visible?

  // ── REF ────────────────────────────────────
  // useRef gives us a direct reference to a DOM element.
  // We attach it to the wrapper div to detect outside clicks.
  // Unlike useState, changing a ref does NOT cause a re-render.
  const wrapperRef = useRef(null)


  // ── MEMOISED SEARCH RESULTS ────────────────
  // useMemo runs the function and CACHES the result.
  // It only re-runs when `query` changes.
  // Without useMemo, searchConditions() would run on EVERY
  // render — even renders caused by unrelated state changes.
  //
  // Think of it as: "only recalculate this when query changes"
  const results = useMemo(() => searchConditions(query), [query])


  // ── OUTSIDE CLICK DETECTION ────────────────
  // useEffect runs AFTER the component renders.
  // Here we attach a click listener to the whole document.
  // If the click target is NOT inside our wrapper div,
  // we close the dropdown.
  //
  // The return function is a CLEANUP — it removes the listener
  // when the component unmounts (leaves the screen).
  // Always clean up event listeners to avoid memory leaks.
  useEffect(() => {
    const handleClickOutside = (event) => {
      // wrapperRef.current = the actual DOM div element
      // .contains(event.target) = was the click inside it?
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    // Cleanup function — runs when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, []) // empty [] means this effect runs only once on mount


  // ── EVENT HANDLERS ─────────────────────────

  const handleInputChange = (e) => {
    setQuery(e.target.value)
    setIsOpen(true) // open dropdown whenever user types
  }

  const handleResultClick = (conditionId) => {
    // Tell the parent which condition was selected
    onSelect(conditionId)
    // Clear and close
    setQuery('')
    setIsOpen(false)
  }

  const handleClear = () => {
    setQuery('')
    setIsOpen(false)
  }


  // ── JSX ────────────────────────────────────
  return (
    // We attach wrapperRef to this div — this is the "outside click" boundary
    <div className="searchbar-wrapper" ref={wrapperRef}>

      {/* Input row */}
      <div className="searchbar-input-row">
        <span className="searchbar-icon">🔍</span>

        <input
          type="text"
          className="searchbar-input"
          placeholder="Search conditions, symptoms, or causes..."
          value={query}
          onChange={handleInputChange}
          // Open dropdown when user focuses the input
          onFocus={() => query && setIsOpen(true)}
        />

        {/* Clear button — only shows when there's text */}
        {query && (
          <button className="searchbar-clear" onClick={handleClear}>
            ✕
          </button>
        )}
      </div>


      {/* Dropdown results — only renders when open AND there's a query */}
      {isOpen && query && (
        <div className="searchbar-dropdown">

          {results.length === 0 ? (
            // No results state
            <div className="searchbar-empty">
              <span>😔</span>
              <p>No conditions found for "<strong>{query}</strong>"</p>
              <span className="searchbar-empty-hint">
                Try searching by symptom, e.g. "bloating" or "fatigue"
              </span>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="searchbar-results-label">
                {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </div>

              {/* Result items */}
              {results.map((condition) => {
                // Get parent category for color and icon
                const category = getCategoryById(condition.categoryId)

                return (
                  <div
                    key={condition.id}
                    className="searchbar-result-item"
                    onClick={() => handleResultClick(condition.id)}
                  >
                    {/* Left: category color bar */}
                    <div
                      className="result-color-bar"
                      style={{ background: category?.color }}
                    />

                    {/* Middle: condition info */}
                    <div className="result-info">
                      <span className="result-name">{condition.name}</span>
                      <span className="result-category">
                        {category?.icon} {category?.label}
                      </span>
                      <span className="result-tagline">{condition.tagline}</span>
                    </div>

                    {/* Right: arrow */}
                    <span className="result-arrow">→</span>
                  </div>
                )
              })}
            </>
          )}

        </div>
      )}

    </div>
  )
}

export default SearchBar