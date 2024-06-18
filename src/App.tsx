import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import MainApp from "./pages/MainApp"
import RestaurantProfile from "./pages/RestaurantProfile"

function App() {
  return (
    <div className="px-16 py-5">
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route  path="/restaurant" element={<MainApp/>} />
          <Route  path="/restaurant/:restaurantId" element={<RestaurantProfile/>}/>
        </Routes>
      </Router>
    </div>
  )
}
export default App
