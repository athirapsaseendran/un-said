import BottomNav from "../components/BottomNav"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"
import { useEffect, useState } from "react"

function Insights() {

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

  const moodCounts = {

    Happy: 0,
    Anxious: 0,
    Lonely: 0,
    Stressed: 0,

  }

  posts.forEach((post) => {

    if (moodCounts[post.mood] !== undefined) {
      moodCounts[post.mood]++
    }

  })

  const data = Object.keys(moodCounts).map((mood) => ({
    name: mood,
    value: moodCounts[mood],
  }))

  const COLORS = [
    "#A855F7",
    "#EC4899",
    "#F59E0B",
    "#6366F1",
  ]

  return (

    <div className="min-h-screen bg-[#F7F2FF] dark:bg-black px-5 pt-8 pb-28">

      <h1 className="text-4xl font-black text-zinc-800 dark:text-white">
        Emotional Insights 📊
      </h1>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 mt-8 shadow-sm">

        <h2 className="text-xl font-bold text-zinc-800 dark:text-white mb-6">
          Community Mood
        </h2>

        <div className="w-full h-80">

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                outerRadius={110}
                label
              >

                {data.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      <BottomNav />

    </div>
  )
}

export default Insights