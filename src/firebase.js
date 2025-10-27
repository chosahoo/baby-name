import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase 설정 (bebe-note 프로젝트 공유)
const firebaseConfig = {
  apiKey: "AIzaSyBmfa0NXg38Z6AuFI0etoOPzDk18II3HFo",
  authDomain: "bebe-note.firebaseapp.com",
  projectId: "bebe-note",
  storageBucket: "bebe-note.firebasestorage.app",
  messagingSenderId: "314067676587",
  appId: "1:314067676587:web:8b8dd36dcbb46ff23976ee",
  measurementId: "G-EEKEZPY4TX"
}

// Firebase 초기화
const app = initializeApp(firebaseConfig)

// Auth 설정
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Firestore 설정
export const db = getFirestore(app)

export default app
