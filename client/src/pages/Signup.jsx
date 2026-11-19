
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import { auth, db } from "../firebase"

function Signup() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!username.trim()) {
      toast.error("Please choose a username")
      return
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await updateProfile(user, {
        displayName: username.trim()
      })

      await setDoc(doc(db, "users", user.uid), {
        username: username.trim(),
        email,
        uid: user.uid
      })

      toast.success("Welcome to Unsaid 💜")
      navigate("/feed")
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F2FF] flex items-center justify-center px-5 py-10">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-[35px] p-8 shadow-xl"
      >

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-purple-600">
            UN-SAID 🪼
          </h1>

          <p className="text-zinc-500 mt-3">
            A little space for everything unsaid 💜
          </p>
        </div>

        <h2 className="text-2xl font-bold text-zinc-800">
          Create Account
        </h2>

        <p className="text-sm text-zinc-400 mt-2">
          Your safe space starts here.
        </p>

        <form onSubmit={handleSignup} className="mt-7 space-y-5">

          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-4 rounded-2xl bg-zinc-100 outline-none focus:ring-2 focus:ring-purple-300"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 rounded-2xl bg-zinc-100 outline-none focus:ring-2 focus:ring-purple-300"
          />

          <input
            type="password"
            placeholder="Create password (minimum 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            className="w-full p-4 rounded-2xl bg-zinc-100 outline-none focus:ring-2 focus:ring-purple-300"
          />

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-4 rounded-2xl font-semibold hover:bg-purple-600 transition"
          >
            Create Account 💜
          </button>

        </form>

        <p className="text-center text-sm text-zinc-500 mt-7">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-semibold">
            Login
          </Link>
        </p>

        <Link
          to="/"
          className="block text-center text-xs text-zinc-400 mt-6"
        >
          ← Back to Home
        </Link>

      </motion.div>

    </div>
  )
}

export default Signup
