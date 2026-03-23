import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, provider } from '../firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(undefined)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    // Handle redirect result when user returns from Google
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          setUser(result.user)
          const ref  = doc(db, 'users', result.user.uid)
          const snap = await getDoc(ref)
          setProfile(snap.exists() ? snap.data() : null)
        }
      })
      .catch(console.error)

    // Listen for auth state
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

  const loading = user === undefined

  const loginWithGoogle = () => signInWithRedirect(auth, provider)

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