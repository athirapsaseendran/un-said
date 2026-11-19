import BottomNav from "../components/BottomNav"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  collection,
  doc,
  updateDoc,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  increment,
  serverTimestamp,
} from "firebase/firestore"
import { db, auth } from "../firebase"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"
import toast from "react-hot-toast"

const load = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || []
  } catch {
    return []
  }
}

function Feed() {
  const navigate = useNavigate()
  const location = useLocation()

  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [commentTexts, setCommentTexts] = useState({})
  const [selectedMood, setSelectedMood] = useState(location.state?.mood || "All")
  const [search, setSearch] = useState("")
  const [savedPosts, setSavedPosts] = useState(() => load("unsaid-saved"))
  const [reacted, setReacted] = useState(() => load("unsaid-reacted"))

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "posts"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
      }
    )

    const commentsUnsub = onSnapshot(collection(db, "comments"), (snapshot) => {
      setComments(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
    })

    return () => {
      unsub()
      commentsUnsub()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("unsaid-saved", JSON.stringify(savedPosts))
  }, [savedPosts])

  useEffect(() => {
    localStorage.setItem("unsaid-reacted", JSON.stringify(reacted))
  }, [reacted])

  const handleReaction = async (postId, field) => {
    const key = `${postId}-${field}`
    if (reacted.includes(key)) {
      toast("You already sent this 💜")
      return
    }

    try {
      await updateDoc(doc(db, "posts", postId), { [field]: increment(1) })
      setReacted((prev) => [...prev, key])
    } catch (error) {
      toast.error("Couldn't send support, try again")
      console.log(error)
    }
  }

  const handleAddComment = async (postId) => {
    const text = (commentTexts[postId] || "").trim()
    if (!text) return

    try {
      await addDoc(collection(db, "comments"), {
        postId,
        text,
        uid: auth.currentUser?.uid,
        createdAt: serverTimestamp(),
      })

      setCommentTexts((prev) => ({ ...prev, [postId]: "" }))
      toast.success("Support sent 💜")
    } catch (error) {
      toast.error("Couldn't send, try again")
      console.log(error)
    }
  }

  const handleSavePost = (postId) => {
    setSavedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    )
  }

  const visiblePosts = posts.filter((post) => {
    const matchesMood = selectedMood === "All" || post.mood === selectedMood
    const matchesSearch = (post.text || "").toLowerCase().includes(search.toLowerCase())
    return matchesMood && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#F7F2FF] relative overflow-hidden pb-28 px-5 pt-8">
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-40"></div>

      <div className="relative">
        <h1 className="text-4xl font-black text-zinc-800">Unsaid 💜</h1>

        <input
          type="text"
          placeholder="Search feelings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mt-6 bg-white rounded-3xl p-4 outline-none shadow-sm"
        />

        <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
          {["All", "Anxious", "Lonely", "Stressed", "Happy"].map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`px-5 py-2 rounded-2xl whitespace-nowrap transition ${
                selectedMood === mood ? "bg-purple-500 text-white" : "bg-white text-zinc-600"
              }`}
            >
              {mood}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-5 mt-6 shadow-sm">
          <p className="text-zinc-500 text-sm">Today's gentle message</p>
          <h2 className="text-xl mt-2 font-semibold text-zinc-800">
            You don’t have to figure everything out today.
          </h2>
        </div>

        <div className="mt-8 space-y-5">
          {visiblePosts.length === 0 && (
            <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-zinc-800">Quiet here... 🌙</h2>
              <p className="text-zinc-500 mt-3">Be the first soul to share something today.</p>
            </div>
          )}

          {visiblePosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <img src={post.avatar} alt="" className="w-12 h-12 rounded-full bg-zinc-200" />
                <div>
                  <p className="font-semibold text-zinc-800">
                    {post.username?.split("@")[0] || "Anonymous Soul"}
                  </p>
                  <p className="text-xs text-zinc-400">Safe Space Member</p>
                </div>
              </div>

              <p className="text-zinc-400 text-sm mb-3">
                {post.createdAt?.toDate
                  ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true })
                  : "just now"}
              </p>

              <div className="flex gap-2">
                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs">
                  {post.category}
                </span>
                <span className="bg-pink-100 text-pink-500 px-3 py-1 rounded-full text-xs">
                  {post.mood}
                </span>
              </div>

              <p className="mt-3 text-lg text-zinc-800 leading-relaxed wrap-break-words">{post.text}</p>

              {post.aiReply && (
                <div className="mt-4 bg-purple-50 border border-purple-100 rounded-2xl p-4">
                  <p className="text-xs text-purple-500 font-semibold mb-1">Gentle note ✨</p>
                  <p className="text-sm text-zinc-700 leading-relaxed">{post.aiReply}</p>
                </div>
              )}

              <div className="flex gap-3 mt-5 flex-wrap">
                <button
                  onClick={() => handleReaction(post.id, "hearYou")}
                  className="bg-purple-100 text-purple-600 px-4 py-2 rounded-2xl text-sm"
                >
                  🫶 {post.hearYou || 0} I hear you
                </button>

                <button
                  onClick={() => handleReaction(post.id, "stayStrong")}
                  className="bg-orange-100 text-orange-500 px-4 py-2 rounded-2xl text-sm"
                >
                  💛 {post.stayStrong || 0} Stay strong
                </button>

                <button
                  onClick={() => handleSavePost(post.id)}
                  className={`px-4 py-2 rounded-2xl text-sm transition ${
                    savedPosts.includes(post.id) ? "bg-pink-500 text-white" : "bg-zinc-200 text-zinc-700"
                  }`}
                >
                  {savedPosts.includes(post.id) ? "💖 Saved" : "🤍 Save"}
                </button>
              </div>

              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Say something gentle..."
                  className="w-full p-3 rounded-2xl bg-zinc-100 text-black outline-none"
                  value={commentTexts[post.id] || ""}
                  onChange={(e) => setCommentTexts((prev) => ({ ...prev, [post.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="mt-3 bg-black text-white px-5 py-3 rounded-2xl hover:scale-[1.02] transition"
                >
                  Send 💜
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {comments
                  .filter((c) => c.postId === post.id)
                  .map((c) => (
                    <div key={c.id} className="bg-zinc-100 rounded-2xl p-3">
                      <p className="text-sm text-zinc-700 wrap-break-words">{c.text}</p>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <button
        onClick={() => navigate("/create")}
        className="fixed bottom-24 right-6 w-16 h-16 rounded-full bg-purple-500 text-white text-4xl shadow-lg flex items-center justify-center hover:scale-110 transition"
      >
        +
      </button>

      <BottomNav />
    </div>
  )
}

export default Feed