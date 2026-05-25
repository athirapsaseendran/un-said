import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Dashboard from "../pages/Dashboard"
import Profile from "../pages/Profile"
import Feed from "../pages/Feed"
import CreatePost from "../pages/CreatePost"
import Space from "../pages/Space"
import Mood from "../pages/Mood"
import Settings from "../pages/Settings"
import Insights from "../pages/Insights"

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/u/:username" element={<Profile />} />

        <Route path="/feed" element={<Feed />} />

        <Route path="/create" element={<CreatePost />} />
       
        <Route path="/space" element={<Space />} />

        <Route path="/mood" element={<Mood />} />
      
        <Route path="/settings" element={<Settings />} />
      
        <Route path="/insights" element={<Insights />} />
      
      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter