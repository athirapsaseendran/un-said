import BottomNav from "../components/BottomNav"

function Mood() {
  return (
    <div className="min-h-screen bg-[#F7F2FF] pb-28 px-5 pt-8">

      <h1 className="text-4xl font-black text-zinc-800">
        Mood Space 🌈
      </h1>

      <p className="text-zinc-500 mt-3">
        Explore posts based on how you feel today.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-8">

        {["Anxious", "Lonely", "Happy", "Stressed"].map((mood) => (

          <div
            key={mood}
            className="bg-white rounded-3xl p-8 shadow-sm text-center"
          >

            <h2 className="text-xl font-bold text-zinc-800">
              {mood}
            </h2>

          </div>

        ))}

      </div>

      <BottomNav />

    </div>
  )
}

export default Mood