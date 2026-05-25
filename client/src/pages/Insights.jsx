import BottomNav from "../components/BottomNav"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"
import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

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
    Anxious: 0,
    Lonely: 0,
    Stressed: 0,
    Happy: 0,
  }

  posts.forEach((post) => {

    if (moodCounts[post.mood] !== undefined) {
      moodCounts[post.mood]++
    }

  })

  const data = [
    {
      name: "Anxious",
      value: moodCounts.Anxious,
    },
    {
      name: "Lonely",
      value: moodCounts.Lonely,
    },
    {
      name: "Stressed",
      value: moodCounts.Stressed,
    },
    {
      name: "Happy",
      value: moodCounts.Happy,
    },
  ]

  const COLORS = [
    "#a855f7",
    "#ec4899",
    "#f97316",
    "#22c55e",
  ]

  return (

    <div className="min-h-screen bg-[#F7F2FF] pb-28 px-5 pt-8">

      <h1 className="text-4xl font-black text-zinc-800">
        Mood Insights 🌈
      </h1>

      <div className="bg-white rounded-[40px] p-5 mt-8 h-87.5">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >

              {data.map((entry, index) => (

                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Pie>

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">

        {data.map((item) => (

          <div
            key={item.name}
            className="bg-white rounded-3xl p-5"
          >

            <p className="text-zinc-400 text-sm">
              {item.name}
            </p>

            <h2 className="text-3xl font-black mt-2 text-zinc-800">
              {item.value}
            </h2>

          </div>

        ))}

      </div>

      <BottomNav />

    </div>
  )
}

export default Insights