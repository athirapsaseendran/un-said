import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"


function Dashboard() {

    const [messages, setMessages] = useState([])
  
    useEffect(() => {

  const fetchMessages = async () => {

    const querySnapshot = await getDocs(collection(db, "messages"))

    const fetchedMessages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    setMessages(fetchedMessages)
  }

  fetchMessages()

}, [])

  const handleLogout = async () => {
    await signOut(auth)
    alert("Logged out")
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <div className="flex justify-between items-center border-b border-white/10 pb-5">

        <h1 className="text-4xl font-black tracking-widest">
          UN-SAID 🪼
        </h1>

        <button
          onClick={handleLogout}
          className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:bg-zinc-300 transition"
        >
          Logout
        </button>

      </div>

      <div className="mt-20">

        <h2 className="text-5xl font-black mb-4">
          Welcome Back 👀
        </h2>

        <p className="text-zinc-400 text-lg">
          Your anonymous world starts here.
        </p>

        <div className="grid gap-6 mt-12">

  {messages.map((msg) => (

    <div
      key={msg.id}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
    >

      <p className="text-lg leading-relaxed">
        {msg.text}
      </p>

      <p className="text-zinc-500 text-sm mt-4">
        sent anonymously 👀
      </p>

    </div>

  ))}

</div>

      </div>

    </div>
  )
}

export default Dashboard