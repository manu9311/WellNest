// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, provider } from '../firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(undefined) // undefined = still loading
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        const ref  = doc(db, 'users', firebaseUser.uid)
        const snap = await getDoc(ref)
        setProfile(snap.exists() ? snap.data() : null)
      } else {
        setUser(null)
        setProfile(null)
      }
    })
    return unsub
  }, [])

  const loading = user === undefined // true only while Firebase is restoring session

  const loginWithGoogle = () => signInWithPopup(auth, provider)

  const logout = () => {
    signOut(auth)
    setUser(null)
    setProfile(null)
  }

  const saveProfile = async (profileData) => {
    if (!user) return
    const ref     = doc(db, 'users', user.uid)
    const updated = {
      ...profile,
      ...profileData,
      uid:       user.uid,
      email:     user.email,
      updatedAt: new Date().toISOString(),
    }
    await setDoc(ref, updated, { merge: true })
    setProfile(updated)
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, loginWithGoogle, logout, saveProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)