import { Link } from "react-router-dom"
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase"
import { doc, setDoc } from "firebase/firestore"


function Signup() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [username, setUsername] = useState("")
const handleSignup = async (e) => {
  e.preventDefault()

  try {
    const userCredential = await createUserWithEmailAndPassword(
  auth,
  email,
  password
)

const user = userCredential.user

await setDoc(doc(db, "users", user.uid), {
  username,
  email,
  uid: user.uid,
})
    alert("Account created successfully 😭🔥")
    navigate("/dashboard")
  } catch (error) {
    alert(error.message)
  }
}
  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden border-r border-white/10">

        <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 max-w-md text-center px-6"
        >

          <h1 className="text-6xl font-black tracking-widest mb-6">
            UN-SAID 🪼
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed">
            Create your space.
            Share what words alone could never say.
          </p>

        </motion.div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center px-6">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8"
        >

          <h2 className="text-4xl font-black mb-2">
            Create Account
          </h2>

          <p className="text-zinc-400 mb-8">
            Start your anonymous journey.
          </p>

          <form onSubmit={handleSignup} className="space-y-5">

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
            />

            <button
              className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:scale-[1.02] hover:bg-zinc-300 transition duration-300"
            >
              Sign Up
            </button>

          </form>

          <p className="text-zinc-500 text-center mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white hover:text-cyan-300 transition"
            >
              Login
            </Link>
          </p>

        </motion.div>

      </div>
    </div>
  )
}

export default Signup