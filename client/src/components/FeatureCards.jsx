import { motion } from "framer-motion"

const features = [
  {
    title: "Anonymous Messages",
    desc: "Send thoughts and feelings without revealing your identity.",
  },
  {
    title: "Safe Space",
    desc: "Express emotions freely in a calm and private environment.",
  },
  {
    title: "Real Connections",
    desc: "Turn silence into meaningful conversations and understanding.",
  },
]

function FeatureCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-24 px-8">

      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-8 hover:bg-white/10 transition"
        >

          <h2 className="text-2xl font-bold mb-4">
            {feature.title}
          </h2>

          <p className="text-zinc-400 leading-relaxed">
            {feature.desc}
          </p>

        </motion.div>
      ))}

    </div>
  )
}

export default FeatureCards