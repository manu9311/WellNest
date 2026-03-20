// ============================================================
// FILE: src/components/Layout.jsx
// TYPE: Reusable Layout Component
// PURPOSE: Wraps every page with the sidebar + top bar.
//          Instead of copying the sidebar into every page,
//          we wrap pages with this Layout component in App.jsx.
//
// HOW IT WORKS IN App.jsx:
//   <Route path="/" element={<Layout><Dashboard /></Layout>} />
//
// This means Dashboard renders inside Layout automatically.
// Sidebar and topbar appear on every page without repeating code.
//
// PROPS:
//   children → whatever page is rendered inside this layout
// ============================================================

import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useAuth } from '../context/AuthContext'
import '../styles/Layout.css'

// ── NAV ITEMS ──────────────────────────────────────────────
// Each item has a path (URL), label, and icon
// `exact` means only highlight when URL matches exactly
const NAV_ITEMS = [
  { path: '/',            label: 'Dashboard',   icon: '🏠' },
  { path: '/daily-plan',  label: 'Daily Plan',  icon: '📋' },
  { path: '/my-plans',    label: 'My Plans',    icon: '🎯' },
  { path: '/health-score',label: 'Health Score',icon: '🏅' },
  { path: '/yoga',        label: 'Yoga',        icon: '🧘' },
]

function Layout({ children }) {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { user, logout } = useAuth()

  // Sidebar collapsed state — starts expanded on desktop
  const [collapsed, setCollapsed] = useState(false)

  // Mobile sidebar open state
  const [mobileOpen, setMobileOpen] = useState(false)

  const [showMenu, setShowMenu] = useState(false)

  // Check if a nav item is active
  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path
    return location.pathname.startsWith(item.path)
  }

  const handleSearchSelect = (conditionId) => {
    navigate(`/condition/${conditionId}`)
    setMobileOpen(false)
  }

  return (
    <div className={`layout ${collapsed ? 'layout--collapsed' : ''}`}>

      {/* ── MOBILE OVERLAY ──
          Dark background when sidebar is open on mobile.
          Clicking it closes the sidebar.
      */}
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`sidebar ${mobileOpen ? 'sidebar--mobile-open' : ''}`}>

        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-logo">
            <div className="brand-logo-icon">✦</div>
          </div>
          {!collapsed && (
            <div className="brand-text">
              <span className="brand-name">WellNest</span>
              <span className="brand-tagline">Your health companion</span>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${isActive(item) ? 'nav-item--active' : ''}`}
              onClick={() => {
                navigate(item.path)
                setMobileOpen(false)
              }}
              title={collapsed ? item.label : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
              {isActive(item) && !collapsed && (
                <span className="nav-active-dot" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom: collapse toggle (desktop only) */}
        <button
          className="sidebar-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span>{collapsed ? '→' : '←'}</span>
          {!collapsed && <span>Collapse</span>}
        </button>

      </aside>

      {/* ── MAIN AREA ── */}
      <div className="layout-main">

        {/* Top bar */}
        <header className="topbar">

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>

          {/* Search — takes up center space */}
          <div className="topbar-search">
            <SearchBar onSelect={handleSearchSelect} />
          </div>

          {/* Right side */}
          <div className="topbar-right">
            <div className="topbar-date">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'short',
                month:   'short',
                day:     'numeric',
              })}
            </div>
            <div className="topbar-avatar-wrap">
              <button className="topbar-avatar" onClick={() => setShowMenu(m => !m)}>
                {user?.photoURL
                  ? <img src={user.photoURL} alt="avatar" referrerPolicy="no-referrer" onError={e => { e.target.style.display='none' }} />
                  : <span>{user?.displayName?.[0]?.toUpperCase() || 'W'}</span>
                }
              </button>
              {showMenu && (
                <div className="topbar-menu">
                  <div className="topbar-menu-name">{user?.displayName}</div>
                  <div className="topbar-menu-email">{user?.email}</div>
                  <hr />
                  <button className="topbar-menu-logout" onClick={() => { logout(); setShowMenu(false) }}>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

        </header>

        {/* Page content */}
        <main className="layout-content">
          {children}
        </main>

      </div>

    </div>
  )
}

export default Layout