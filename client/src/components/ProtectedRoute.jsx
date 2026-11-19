import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { Navigate } from "react-router-dom"
import { auth } from "../firebase"

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined)

  useEffect(() => onAuthStateChanged(auth, setUser), [])

  if (user === undefined) {
    return (
      <div className="min-h-screen bg-[#F7F2FF] flex items-center justify-center text-zinc-500">
        Loading 🌙
      </div>
    )
  }

  return user ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute