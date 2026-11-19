import { House, Smile, User, Settings } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

const items = [
  { path: "/feed", label: "Home", Icon: House },
  { path: "/mood", label: "Mood", Icon: Smile },
  { path: "/space", label: "Space", Icon: User },
  { path: "/settings", label: "Settings", Icon: Settings },
]

function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-zinc-200 flex justify-around items-center py-4 rounded-t-3xl z-40">
      {items.map(({ path, label, Icon }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className={`flex flex-col items-center ${
            pathname === path ? "text-purple-500" : "text-zinc-500"
          }`}
        >
          <Icon size={22} />
          <span className="text-xs mt-1">{label}</span>
        </button>
      ))}
    </div>
  )
}

export default BottomNav