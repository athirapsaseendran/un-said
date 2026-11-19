import BottomNav from "../components/BottomNav"
import { useState, useEffect } from "react"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { auth } from "../firebase"

function Settings() {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("unsaid-dark") === "true")

  useEffect(() => {
    localStorage.setItem("unsaid-dark", darkMode)
  }, [darkMode])

  const handleLogout = async () => {
    await signOut(auth)
    toast.success("Logged out")
    navigate("/login")
  }

  const card = darkMode ? "bg-zinc-800 text-white" : "bg-white text-zinc-800"

  return (
    <div
      className={`min-h-screen pb-28 px-5 pt-8 transition-colors duration-500 ${
        darkMode ? "bg-[#121212]" : "bg-[#F7F2FF]"
      }`}
    >
      <h1 className={`text-4xl font-black ${darkMode ? "text-white" : "text-zinc-800"}`}>Settings ⚙️</h1>

      <p className={`mt-3 text-sm ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
        Signed in as {auth.currentUser?.displayName || auth.currentUser?.email}
      </p>

      <div className="space-y-4 mt-8">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`${card} rounded-3xl p-5 w-full flex justify-between items-center`}
        >
          <span>Dark Mode 🌙</span>
          <span className="text-purple-500 font-semibold">{darkMode ? "ON" : "OFF"}</span>
        </button>

        <button onClick={() => navigate("/insights")} className={`${card} rounded-3xl p-5 w-full text-left`}>
          Mood Insights 📊
        </button>

        <div className={`${card} rounded-3xl p-5`}>Privacy 🔒</div>
        <div className={`${card} rounded-3xl p-5`}>Notifications 🔔</div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white rounded-3xl p-5 font-semibold"
        >
          Log out
        </button>
      </div>

      <BottomNav />
    </div>
  )
}

export default Settings