import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      navigate("/feed")

    } catch (error) {

      alert(error.message)

    }
  }

  return (

    <div className="min-h-screen bg-black text-white flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden border-r border-white/10">

        <div className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-10 max-w-md text-center px-6"
        >

          <h1 className="text-6xl font-black tracking-widest mb-6">
            UN-SAID 🪼
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed">
            Some feelings are easier to send
            when nobody knows it was you.
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
            Welcome Back
          </h2>

          <p className="text-zinc-400 mb-8">
            Login to continue your journey.
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-400 transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-400 transition"
            />

            <button
              type="submit"
              className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:scale-[1.02] hover:bg-zinc-300 transition duration-300"
            >
              Login
            </button>

          </form>

          <p className="text-zinc-500 text-center mt-8">

            Don’t have an account?{" "}

            <Link
              to="/signup"
              className="text-white hover:text-purple-300 transition"
            >
              Sign Up
            </Link>

          </p>

        </motion.div>

      </div>

    </div>
  )
}

export default Login