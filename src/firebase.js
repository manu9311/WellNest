import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            "AIzaSyDkfVBctDwjMJ7km7u2rnQ9ASRXvsEHnyQ",
  authDomain:        "wellnest-b5658.firebaseapp.com",
  projectId:         "wellnest-b5658",
  storageBucket:     "wellnest-b5658.firebasestorage.app",
  messagingSenderId: "540606719970",
  appId:             "1:540606719970:web:609023f2856eac70c13bbb"
}

const app      = initializeApp(firebaseConfig)
export const auth     = getAuth(app)
export const db       = getFirestore(app)
export const provider = new GoogleAuthProvider()

// Set persistence to local so session survives page refreshes
setPersistence(auth, browserLocalPersistence)