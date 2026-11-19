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
import ProtectedRoute from "../components/ProtectedRoute"

const guard = (page) => <ProtectedRoute>{page}</ProtectedRoute>

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/u/:username" element={<Profile />} />

        <Route path="/dashboard" element={guard(<Dashboard />)} />
        <Route path="/feed" element={guard(<Feed />)} />
        <Route path="/create" element={guard(<CreatePost />)} />
        <Route path="/space" element={guard(<Space />)} />
        <Route path="/mood" element={guard(<Mood />)} />
        <Route path="/settings" element={guard(<Settings />)} />
        <Route path="/insights" element={guard(<Insights />)} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter