// src/context/PlanContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { doc, collection, getDocs, setDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from './AuthContext'
import { getTasksForConditions, calcPlanScore } from '../data/planData'

const PlanContext = createContext(null)

export function PlanProvider({ children }) {
  const { user } = useAuth()
  const [activePlans, setActivePlans]   = useState([])
  const [stoppedPlans, setStoppedPlans] = useState([]) // paused plans with original startDate
  const [dailyLogs, setDailyLogs]       = useState({})
  const [loading, setLoading]           = useState(true)

  const todayKey = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    if (!user) { setActivePlans([]); setStoppedPlans([]); setDailyLogs({}); setLoading(false); return }
    const load = async () => {
      try {
        const plansRef  = collection(db, 'users', user.uid, 'activePlans')
        const plansSnap = await getDocs(plansRef)
        const active  = []
        const stopped = []
        plansSnap.docs.forEach(d => {
          const data = { id: d.id, ...d.data() }
          if (data.stopped) stopped.push(data)
          else active.push(data)
        })
        setActivePlans(active)
        setStoppedPlans(stopped)

        const logRef  = doc(db, 'users', user.uid, 'dailyLogs', todayKey)
        const logSnap = await getDoc(logRef)
        setDailyLogs({ [todayKey]: logSnap.exists() ? logSnap.data() : {} })
      } catch (e) { console.error(e) }
      setLoading(false)
    }
    load()
  }, [user, todayKey])

  // Start or resume a plan
  const startPlan = async (conditionId, conditionName, originalStartDate) => {
    if (!user) return
    const plan = {
      conditionId,
      conditionName,
      startDate:    originalStartDate || todayKey, // preserve original if resuming
      durationDays: 60,
      stopped:      false,
      createdAt:    new Date().toISOString(),
    }
    const ref = doc(db, 'users', user.uid, 'activePlans', conditionId)
    await setDoc(ref, plan)
    const newPlan = { id: conditionId, ...plan }
    setActivePlans(prev => {
      const exists = prev.find(p => p.id === conditionId)
      return exists ? prev.map(p => p.id === conditionId ? newPlan : p) : [...prev, newPlan]
    })
    setStoppedPlans(prev => prev.filter(p => p.conditionId !== conditionId))
  }

  // Stop (pause) a plan — keeps it in Firestore with stopped: true
  const stopPlan = async (conditionId) => {
    if (!user) return
    const plan = activePlans.find(p => p.id === conditionId)
    if (!plan) return
    const stoppedPlan = { ...plan, stopped: true }
    const ref = doc(db, 'users', user.uid, 'activePlans', conditionId)
    await setDoc(ref, stoppedPlan)
    setActivePlans(prev => prev.filter(p => p.id !== conditionId))
    setStoppedPlans(prev => [...prev.filter(p => p.conditionId !== conditionId), { ...stoppedPlan, conditionId }])
  }

  const toggleTask = async (taskId) => {
    if (!user) return
    const current = dailyLogs[todayKey] || {}
    const updated = { ...current, [taskId]: !current[taskId] }
    setDailyLogs(prev => ({ ...prev, [todayKey]: updated }))
    const ref = doc(db, 'users', user.uid, 'dailyLogs', todayKey)
    await setDoc(ref, updated, { merge: true })
  }

  const todayCompleted = Object.entries(dailyLogs[todayKey] || {})
    .filter(([, v]) => v).map(([k]) => k)

  const allActiveTasks = getTasksForConditions(activePlans.map(p => p.id))
  const todayScore     = calcPlanScore(allActiveTasks, todayCompleted)

  const getPlanDays = (plan) => {
    const start     = new Date(plan.startDate)
    const today     = new Date()
    const elapsed   = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1
    const dayNum    = Math.min(elapsed, 60)
    const remaining = Math.max(60 - dayNum, 0)
    return { dayNum, remaining, pct: Math.round((dayNum / 60) * 100) }
  }

  return (
    <PlanContext.Provider value={{
      activePlans, stoppedPlans, dailyLogs, loading,
      startPlan, stopPlan, toggleTask,
      todayCompleted, allActiveTasks, todayScore,
      getPlanDays, todayKey,
    }}>
      {children}
    </PlanContext.Provider>
  )
}

export const usePlan = () => useContext(PlanContext)