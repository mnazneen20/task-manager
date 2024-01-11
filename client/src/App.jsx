import Modal from "./components/Modal"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Private from "./components/Private"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Private><Home /></Private>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Modal />
    </div>
  )
}

export default App
