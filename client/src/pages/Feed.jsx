import BottomNav from "../components/BottomNav"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  collection,
  doc,
  updateDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore"
import { db } from "../firebase"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"

function Feed() {

  const navigate = useNavigate()

  const [posts, setPosts] = useState([])
  const [commentText, setCommentText] = useState("")
  const [selectedMood, setSelectedMood] = useState("All")
  const [comments, setComments] = useState([])
  const [search, setSearch] = useState("")
  const [savedPosts, setSavedPosts] = useState([])
  const [notifications, setNotifications] = useState([])

  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "posts"),
      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setPosts(data)
      }
    )

    const commentsUnsub = onSnapshot(
      collection(db, "comments"),
      (snapshot) => {

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setComments(data)
      }
    )

    return () => {
      unsub()
      commentsUnsub()
    }

  }, [])

  const addNotification = (message) => {

    setNotifications((prev) => [
      {
        id: Date.now(),
        text: message,
      },
      ...prev,
    ])
  }

  const handleReaction = async (
    postId,
    field,
    currentValue
  ) => {

    try {

      const postRef = doc(db, "posts", postId)

      await updateDoc(postRef, {
        [field]: currentValue + 1,
      })

      addNotification("Someone supported a post 💜")

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, [field]: currentValue + 1 }
            : post
        )
      )

    } catch (error) {
      console.log(error)
    }
  }

  const handleAddComment = async (postId) => {

    if (!commentText) return

    try {

      await addDoc(collection(db, "comments"), {
        postId,
        text: commentText,
        createdAt: new Date(),
      })

      alert("Support sent 💜")

      setCommentText("")

      addNotification("New comforting reply received ✨")

    } catch (error) {
      console.log(error)
    }
  }

  const handleSavePost = (postId) => {

    if (savedPosts.includes(postId)) {

      setSavedPosts(
        savedPosts.filter((id) => id !== postId)
      )

    } else {

      setSavedPosts([...savedPosts, postId])

    }
  }

  return (

    <div className="min-h-screen bg-[#F7F2FF] relative overflow-hidden pb-28 px-5 pt-8">

      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-40"></div>

      <h1 className="text-4xl font-black text-zinc-800">
        Unsaid 💜
      </h1>

      <div className="mt-6">

        <input
          type="text"
          placeholder="Search feelings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white rounded-3xl p-4 outline-none shadow-sm"
        />

      </div>

      <div className="flex gap-3 mt-6 overflow-x-auto pb-2">

        {["All", "Anxious", "Lonely", "Stressed", "Happy"].map((mood) => (

          <button
            key={mood}
            onClick={() => setSelectedMood(mood)}
            className={`px-5 py-2 rounded-2xl whitespace-nowrap transition ${
              selectedMood === mood
                ? "bg-purple-500 text-white"
                : "bg-white text-zinc-600"
            }`}
          >
            {mood}
          </button>

        ))}

      </div>

      <div className="bg-white rounded-3xl p-5 mt-6 shadow-sm">

        <p className="text-zinc-500 text-sm">
          Today's gentle message
        </p>

        <h2 className="text-xl mt-2 font-semibold text-zinc-800">
          You don’t have to figure everything out today.
        </h2>

      </div>

      <div className="space-y-3 mb-6 mt-6">

        {notifications.map((note) => (

          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 shadow-sm"
          >

            <p className="text-sm text-zinc-700">
              {note.text}
            </p>

          </motion.div>

        ))}

      </div>

      <div className="mt-8 space-y-5">

        {posts.length === 0 && (

          <div className="bg-white rounded-3xl p-10 text-center shadow-sm">

            <h2 className="text-2xl font-bold text-zinc-800">
              Quiet here... 🌙
            </h2>

            <p className="text-zinc-500 mt-3">
              Be the first soul to share something today.
            </p>

          </div>

        )}

        {posts
          .filter((post) => {

            const matchesMood =
              selectedMood === "All"
                ? true
                : post.mood === selectedMood

            const matchesSearch =
              post.text
                ?.toLowerCase()
                .includes(search.toLowerCase())

            return matchesMood && matchesSearch
          })
          .map((post) => (

            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-5 shadow-sm hover:scale-[1.02] transition"
            >

              <div className="flex items-center gap-3 mb-4">

                <img
                  src={post.avatar}
                  alt=""
                  className="w-12 h-12 rounded-full bg-zinc-200"
                />

                <div>

                  <p className="font-semibold text-zinc-800">
                    {post.username?.split("@")[0] || "Anonymous Soul"}
                  </p>

                  <p className="text-xs text-zinc-400">
                    Safe Space Member
                  </p>

                </div>

              </div>

              <p className="text-zinc-400 text-sm mb-3">

                {post.createdAt
                  ? formatDistanceToNow(
                      post.createdAt.toDate(),
                      {
                        addSuffix: true,
                      }
                    )
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

              <h2 className="mt-3 text-lg text-zinc-800 leading-relaxed">
                {post.text}
                <div className="mt-4 bg-purple-50 border border-purple-100 rounded-2xl p-4">

  <p className="text-xs text-purple-500 font-semibold mb-1">
    AI Companion ✨
  </p>

  <p className="text-sm text-zinc-700 leading-relaxed">
    {post.aiReply}
  </p>

</div>
              </h2>

              <div className="flex gap-3 mt-5 flex-wrap">

                <button
                  onClick={() =>
                    handleReaction(
                      post.id,
                      "hearYou",
                      post.hearYou || 0
                    )
                  }
                  className="bg-purple-100 text-purple-600 px-4 py-2 rounded-2xl text-sm"
                >
                  🫶 {post.hearYou || 0} I hear you
                </button>

                <button
                  onClick={() =>
                    handleReaction(
                      post.id,
                      "stayStrong",
                      post.stayStrong || 0
                    )
                  }
                  className="bg-orange-100 text-orange-500 px-4 py-2 rounded-2xl text-sm"
                >
                  💛 {post.stayStrong || 0} Stay strong
                </button>

                <button
                  onClick={() => handleSavePost(post.id)}
                  className={`px-4 py-2 rounded-2xl text-sm transition ${
                    savedPosts.includes(post.id)
                      ? "bg-pink-500 text-white"
                      : "bg-zinc-200 text-zinc-700"
                  }`}
                >

                  {savedPosts.includes(post.id)
                    ? "💖 Saved"
                    : "🤍 Save"}

                </button>

              </div>

              <div className="mt-5">

                <input
                  type="text"
                  placeholder="Say something gentle..."
                  className="w-full p-3 rounded-2xl bg-zinc-100 text-black outline-none"
                  value={commentText}
                  onChange={(e) =>
                    setCommentText(e.target.value)
                  }
                />

                <button
                  onClick={() =>
                    handleAddComment(post.id)
                  }
                  className="mt-3 bg-black text-white px-5 py-3 rounded-2xl hover:scale-[1.02] transition"
                >
                  Send 💜
                </button>

              </div>

              <div className="mt-5 space-y-3">

                {comments
                  .filter(
                    (comment) =>
                      comment.postId === post.id
                  )
                  .map((comment) => (

                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-zinc-100 rounded-2xl p-3"
                    >

                      <p className="text-sm text-zinc-700">
                        {comment.text}
                      </p>

                    </motion.div>

                  ))}

              </div>

            </motion.div>

          ))}

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