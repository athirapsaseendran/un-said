import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="w-full px-8 py-5 flex justify-between items-center bg-black/30 backdrop-blur-md text-white border-b border-zinc-800 sticky top-0 z-50">

      <h1 className="text-2xl font-black tracking-widest">
        UN-SAID
      </h1>
     
     <div className="flex items-center gap-6 text-sm">

  <button className="hover:text-zinc-400 transition">
    About
  </button>

  <Link to="/login">
    <button className="hover:text-zinc-400 transition">
      Login
    </button>
  </Link>

  <Link to="/signup">
    <button className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:bg-zinc-300 transition">
      Sign Up
    </button>
  </Link>

</div>
      
    </nav>
  )
}

export default Navbar