import { House, Smile, User, Settings } from "lucide-react"
import { useNavigate } from "react-router-dom"
function BottomNav() {
  const navigate = useNavigate()
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-zinc-200 flex justify-around items-center py-4 rounded-t-3xl">

      <button className="flex flex-col items-center text-purple-500" onClick={() => navigate("/feed")}>
        <House size={22} />
        <span className="text-xs mt-1">Home</span>
      </button>

      <button className="flex flex-col items-center text-zinc-500" onClick={() => navigate("/mood")}>
        <Smile size={22} />
        <span className="text-xs mt-1">Mood</span>
      </button>

      <button className="flex flex-col items-center text-zinc-500" onClick={() => navigate("/space")}>
        <User size={22} />
        <span className="text-xs mt-1">Space</span>
      </button>

      <button className="flex flex-col items-center text-zinc-500" onClick={() => navigate("/settings")}>
        <Settings size={22} />
        <span className="text-xs mt-1">Settings</span>
      </button>

    </div>
  )
}

export default BottomNav