import { useState } from "react"
import { db, auth } from "../firebase"
import { addDoc, collection } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

const detectMood = (text) => {

  const lower = text.toLowerCase()

  if (
    lower.includes("sad") ||
    lower.includes("lonely") ||
    lower.includes("alone")
  ) {
    return "Lonely"
  }

  if (
    lower.includes("stress") ||
    lower.includes("tired") ||
    lower.includes("pressure")
  ) {
    return "Stressed"
  }

  if (
    lower.includes("happy") ||
    lower.includes("excited") ||
    lower.includes("good")
  ) {
    return "Happy"
  }

  return "Anxious"
}

function CreatePost() {

  const [text, setText] = useState("")
  const [mood, setMood] = useState("Anxious")
  const [selected, setSelected] = useState("Vent")

  const navigate = useNavigate()

const generateAIReply = () => {

  const replies = [

    "You deserve kindness, even on difficult days 💜",

    "Your feelings are valid and heard 🌙",

    "Healing takes time. Be gentle with yourself ✨",

    "You are not alone in this feeling 🤍",

    "Even small steps forward still matter 🌱",

  ]

  return replies[
    Math.floor(Math.random() * replies.length)
  ]
}

  const handleCreatePost = async () => {

    if (!text) return

    try {

      await addDoc(collection(db, "posts"), {

        text,

        category: selected,

        mood: detectMood(text),

        createdAt: new Date(),

        hearYou: 0,
        stayStrong: 0,

        username: auth.currentUser?.email,

        avatar:
          "https://api.dicebear.com/7.x/fun-emoji/svg?seed=" +
          Math.random(),

          aiReply: generateAIReply(),

      })

      alert("Post shared safely 💜")

      navigate("/feed")

    } catch (error) {

      alert(error.message)

    }
  }

  return (

    <div className="min-h-screen bg-[#F7F2FF] px-5 pt-8">

      <h1 className="text-3xl font-black text-zinc-800">
        New Post
      </h1>

      <div className="flex gap-3 mt-8">

        {["Vent", "Advice", "Just sharing"].map((item) => (

          <button
            key={item}
            onClick={() => setSelected(item)}
            className={`px-5 py-3 rounded-2xl text-sm font-medium transition ${
              selected === item
                ? "bg-purple-500 text-white"
                : "bg-white text-zinc-600"
            }`}
          >
            {item}
          </button>

        ))}

      </div>

      <div className="flex gap-3 mt-6 overflow-x-auto">

        {["Anxious", "Lonely", "Stressed", "Happy"].map((item) => (

          <button
            key={item}
            onClick={() => setMood(item)}
            className={`px-5 py-2 rounded-2xl whitespace-nowrap transition ${
              mood === item
                ? "bg-purple-500 text-white"
                : "bg-white text-zinc-600"
            }`}
          >
            {item}
          </button>

        ))}

      </div>

      <textarea
        placeholder="What's on your mind?"
        className="w-full h-56 mt-8 rounded-3xl bg-white p-5 outline-none resize-none text-zinc-700"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleCreatePost}
        className="w-full mt-8 bg-purple-500 text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition"
      >
        Share safely 💜
      </button>

    </div>
  )
}

export default CreatePost