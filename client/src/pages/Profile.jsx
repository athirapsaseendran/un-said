import { useParams } from "react-router-dom"
import { useState } from "react"
import { db } from "../firebase"
import { addDoc, collection } from "firebase/firestore"

function Profile() {

  const { username } = useParams()
  const [message, setMessage] = useState("")

  const handleSendMessage = async () => {

  if (!message) return

  try {

    await addDoc(collection(db, "messages"), {
      username,
      text: message,
      createdAt: new Date(),
    })

    alert("Anonymous message sent 😭🔥")

    setMessage("")

  } catch (error) {
    alert(error.message)
  }
}

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">

        <h1 className="text-5xl font-black mb-4">
          @{username}
        </h1>

        <p className="text-zinc-400 mb-10">
          Send an anonymous message 👀
        </p>

        <textarea
          placeholder="Write your message..."
          value={message}
onChange={(e) => setMessage(e.target.value)}
          className="w-full h-40 bg-black/30 border border-white/10 rounded-2xl p-5 outline-none resize-none focus:border-purple-400 transition"
        />

        <button
          onClick={handleSendMessage}
          className="mt-6 w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-zinc-300 transition"
        >
          Send Message
        </button>

      </div>

    </div>
  )
}

export default Profile