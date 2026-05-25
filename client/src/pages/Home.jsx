import Navbar from "../components/Navbar"
import { motion } from "framer-motion"
import FeatureCards from "../components/FeatureCards"
import Footer from "../components/Footer"


function Home() {
  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">

      <Navbar />

      <div className="relative flex flex-col items-center justify-center h-[85vh] text-center px-6">

        {/* Glow Effect */}
        <div className="absolute w-72 h-72 bg-purple-500/20 blur-3xl rounded-full top-20"></div>

        <div className="absolute w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full bottom-10 right-10"></div>

       <div className="absolute w-80 h-80 bg-pink-500/10 blur-3xl rounded-full left-10 bottom-20"></div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl md:text-8xl font-black tracking-widest z-10"
        >
          UN-SAID 🪼
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-zinc-400 max-w-2xl text-lg z-10"
        >
          A safe place where unspoken feelings become messages,
          emotions become connections,
          and silence finally finds a voice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex gap-4 mt-10 z-10"
        >

          <button className="bg-white text-black px-7 py-3 rounded-2xl font-semibold hover:bg-zinc-300 transition duration-300">
            Get Started
          </button>

          <button className="border border-zinc-700 px-7 py-3 rounded-2xl hover:scale-105 hover:bg-zinc-900 transition duration-300">
            Explore
          </button>

        </motion.div>

      </div>
      <FeatureCards />
      <Footer />
    </div>
  )
}

export default Home