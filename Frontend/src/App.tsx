import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="px-72 py-5">
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
