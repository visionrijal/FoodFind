import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import MainApp from "./pages/MainApp"
import RestaurantProfile from "./pages/RestaurantProfile"
import FoodPage from "./pages/food"
import UserProfile from "./pages/Profile"
import MapComponent from "./pages/map"

function App() {
  return (
    <div className="px-5 py-5">
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route  path="/restaurant" element={<MainApp/>} />
          <Route  path="/food" element={<FoodPage/>} />
          <Route  path="/map" element={<MapComponent/>} />
          <Route path="/profile" element={<UserProfile />} />
          <Route  path="/restaurant/:restaurantId" element={<RestaurantProfile/>}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}
export default App
