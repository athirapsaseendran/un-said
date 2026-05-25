import BottomNav from "../components/BottomNav"
import { auth, db } from "../firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"

function Space() {

  const [posts, setPosts] = useState([])

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

    return () => unsub()

  }, [])

  const currentUserPosts = posts.filter(
    (post) => post.username === auth.currentUser?.email
  )

  return (

    <div className="min-h-screen bg-[#F7F2FF] pb-28 px-5 pt-8">

      <div className="bg-linear-to-br from-purple-400 to-pink-300 rounded-[40px] p-8 text-white">

        <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-lg flex items-center justify-center text-4xl font-bold">

          {auth.currentUser?.email
            ?.split("@")[0]
            ?.charAt(0)
            .toUpperCase() || "A"}

        </div>

        <h1 className="text-4xl font-black mt-6">

          {auth.currentUser?.email?.split("@")[0]} 🌙

        </h1>

        <p className="mt-3 text-white/80 leading-relaxed">
          “Healing is not linear, and that’s okay.”
        </p>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        

        <div className="bg-white rounded-3xl p-5">

          <p className="text-zinc-400 text-sm">
            Posts shared
          </p>

          <h2 className="text-3xl font-black mt-2 text-zinc-800">
            {currentUserPosts.length}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-5">

          <p className="text-zinc-400 text-sm">
            Comfort reactions
          </p>

          <h2 className="text-3xl font-black mt-2 text-zinc-800">

            {currentUserPosts.reduce(
              (total, post) =>
                total +
                (post.hearYou || 0) +
                (post.stayStrong || 0),
              0
            )}

          </h2>

        </div>

      </div>

      <div className="bg-white rounded-3xl p-5 mt-4">

  <p className="text-zinc-400 text-sm">
    Comfort Collection
  </p>

  <h2 className="text-3xl font-black mt-2 text-zinc-800">
    ∞
  </h2>

</div>

      <div className="bg-white rounded-3xl p-6 mt-6">

        <h2 className="text-xl font-bold text-zinc-800">
          Safe Space 💜
        </h2>

        <p className="text-zinc-500 leading-relaxed mt-3">
          A quiet place for thoughts that are difficult to say out loud.
        </p>

      </div>

      <div className="mt-8">

        <h2 className="text-2xl font-bold text-zinc-800 mb-4">
          Your Shared Thoughts ✨
        </h2>

        <div className="space-y-4">

          {currentUserPosts.map((post) => (

            <div
              key={post.id}
              className="bg-white rounded-3xl p-5 shadow-sm"
            >

              <div className="flex gap-2 mb-3">

                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs">
                  {post.category}
                </span>

                <span className="bg-pink-100 text-pink-500 px-3 py-1 rounded-full text-xs">
                  {post.mood}
                </span>

              </div>

              <p className="text-zinc-800 leading-relaxed">
                {post.text}
              </p>

            </div>

          ))}

          {currentUserPosts.length === 0 && (

            <div className="bg-white rounded-3xl p-8 text-center shadow-sm">

              <h2 className="text-xl font-bold text-zinc-800">
                No thoughts shared yet 🌙
              </h2>

              <p className="text-zinc-500 mt-3">
                Your safe thoughts will appear here once you post.
              </p>

            </div>

          )}

        </div>

      </div>

      <BottomNav />

    </div>
  )
}

export default Space