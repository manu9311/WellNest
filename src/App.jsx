import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { PlanProvider } from './context/PlanContext'

import Layout          from './components/Layout'
import Dashboard       from './pages/Dashboard'
import ConditionDetail from './pages/ConditionDetail'
import MealPlanner     from './pages/MealPlanner'
import DailyPlan       from './pages/DailyPlan'
import Schedule        from './pages/Schedule'
import MyPlans         from './pages/MyPlans'
import HealthScore     from './pages/HealthScore'
import Yoga            from './pages/Yoga'
import Login           from './pages/Login'
import Onboarding      from './pages/Onboarding'

const NotFound = () => <div style={{padding:'2rem'}}><h2>404 — Page not found</h2></div>

function ProtectedRoute({ children }) {
  const { user, profile, loading } = useAuth()
  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontSize:'2rem'}}>🌿</div>
  if (!user) return <Navigate to="/login" replace />
  if (!profile?.onboardingDone) return <Navigate to="/onboarding" replace />
  return children
}

function AppRoutes() {
  const { user, profile, loading } = useAuth()
  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontSize:'2rem'}}>🌿</div>

  return (
    <Routes>
      <Route path="/login"      element={!user ? <Login /> : <Navigate to="/" replace />} />
      <Route path="/onboarding" element={user && !profile?.onboardingDone ? <Onboarding /> : <Navigate to="/" replace />} />

      <Route path="/"                   element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/condition/:id"      element={<ProtectedRoute><Layout><ConditionDetail /></Layout></ProtectedRoute>} />
      <Route path="/meals/:conditionId" element={<ProtectedRoute><Layout><MealPlanner /></Layout></ProtectedRoute>} />
      <Route path="/meals"              element={<ProtectedRoute><Layout><MealPlanner /></Layout></ProtectedRoute>} />
      <Route path="/daily-plan"         element={<ProtectedRoute><Layout><DailyPlan /></Layout></ProtectedRoute>} />
      <Route path="/schedule"           element={<ProtectedRoute><Layout><Schedule /></Layout></ProtectedRoute>} />
      <Route path="/my-plans"           element={<ProtectedRoute><Layout><MyPlans /></Layout></ProtectedRoute>} />
      <Route path="/yoga"               element={<ProtectedRoute><Layout><Yoga /></Layout></ProtectedRoute>} />
      <Route path="/health-score"       element={<ProtectedRoute><Layout><HealthScore /></Layout></ProtectedRoute>} />
      <Route path="*"                   element={<NotFound />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PlanProvider>
          <AppRoutes />
        </PlanProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App