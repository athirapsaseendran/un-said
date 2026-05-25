import BottomNav from "../components/BottomNav"
import { useState } from "react"

function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <div className={`min-h-screen pb-28 px-5 pt-8 transition-colors duration-500 ${
  darkMode
    ? "bg-[#121212]"
    : "bg-[#F7F2FF]"
}`}>

      <h1 className={`text-4xl font-black ${darkMode ? "text-white" : "text-zinc-800"}`}>
        Settings ⚙️
      </h1>

      <div className="space-y-4 mt-8">

       <button
  onClick={() => setDarkMode(!darkMode)}
  className="bg-white rounded-3xl p-5 w-full flex justify-between items-center"
>

  <span>
    Dark Mode 🌙
  </span>

  <span className="text-purple-500 font-semibold">

    {darkMode ? "ON" : "OFF"}

  </span>

</button>

        <div className="bg-white rounded-3xl p-5">
          Privacy 🔒
        </div>

        <div className="bg-white rounded-3xl p-5">
          Notifications 🔔
        </div>

      </div>

      <BottomNav />

    </div>
  )
}

export default Settings