import { useState } from "react"
import { db, auth } from "../firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const MOODS = ["Anxious", "Lonely", "Stressed", "Happy"]

const detectMood = (text) => {
  const lower = text.toLowerCase()
  if (["sad", "lonely", "alone"].some((w) => lower.includes(w))) return "Lonely"
  if (["stress", "tired", "pressure"].some((w) => lower.includes(w))) return "Stressed"
  if (["happy", "excited", "good"].some((w) => lower.includes(w))) return "Happy"
  return "Anxious"
}

const needsSupport = (text) => {
  const lower = text.toLowerCase()
  return ["suicide", "kill myself", "end my life", "want to die", "self harm", "hurt myself"].some((w) =>
    lower.includes(w)
  )
}

const REPLIES = [
  "You deserve kindness, even on difficult days 💜",
  "Your feelings are valid and heard 🌙",
  "Healing takes time. Be gentle with yourself ✨",
  "You are not alone in this feeling 🤍",
  "Even small steps forward still matter 🌱",
]

function CreatePost() {
  const [text, setText] = useState("")
  const [mood, setMood] = useState(null) // null = auto-detect
  const [selected, setSelected] = useState("Vent")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleCreatePost = async () => {
    if (!text.trim() || loading) return

    setLoading(true)
    try {
      await addDoc(collection(db, "posts"), {
        text: text.trim(),
        category: selected,
        mood: mood || detectMood(text),
        createdAt: serverTimestamp(),
        hearYou: 0,
        stayStrong: 0,
        uid: auth.currentUser?.uid,
        username: auth.currentUser?.displayName || auth.currentUser?.email,
        avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=" + auth.currentUser?.uid,
        aiReply: REPLIES[Math.floor(Math.random() * REPLIES.length)],
      })

      toast.success("Post shared safely 💜")
      navigate("/feed")
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F2FF] px-5 pt-8 pb-10">
      <h1 className="text-3xl font-black text-zinc-800">New Post</h1>

      <div className="flex gap-3 mt-8">
        {["Vent", "Advice", "Just sharing"].map((item) => (
          <button
            key={item}
            onClick={() => setSelected(item)}
            className={`px-5 py-3 rounded-2xl text-sm font-medium transition ${
              selected === item ? "bg-purple-500 text-white" : "bg-white text-zinc-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="text-xs text-zinc-400 mt-6">
        How are you feeling? (skip and we'll guess from your words)
      </p>
      <div className="flex gap-3 mt-2 overflow-x-auto">
        {MOODS.map((item) => (
          <button
            key={item}
            onClick={() => setMood(mood === item ? null : item)}
            className={`px-5 py-2 rounded-2xl whitespace-nowrap transition ${
              mood === item ? "bg-purple-500 text-white" : "bg-white text-zinc-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <textarea
        placeholder="What's on your mind?"
        className="w-full h-56 mt-6 rounded-3xl bg-white p-5 outline-none resize-none text-zinc-700"
        value={text}
        maxLength={1000}
        onChange={(e) => setText(e.target.value)}
      />

      {needsSupport(text) && (
        <div className="mt-4 bg-white border border-purple-200 rounded-3xl p-5">
          <p className="font-semibold text-zinc-800">You matter, and you don't have to carry this alone 💜</p>
          <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
            If you're in India, Tele-MANAS offers free, 24/7 support on <b>14416</b>. If you're in immediate
            danger, please contact local emergency services or someone you trust. You can still share your
            post below.
          </p>
        </div>
      )}

      <button
        onClick={handleCreatePost}
        disabled={loading}
        className="w-full mt-6 bg-purple-500 text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition disabled:opacity-60"
      >
        {loading ? "Sharing..." : "Share safely 💜"}
      </button>
    </div>
  )
}

export default CreatePost