import { BrowserRouter, Route, Routes } from "react-router-dom"
import Admin from "../pages/Admin"
import Booking from "../pages/Booking"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Staff from "../pages/Staff"
import TinTuc from "../pages/TinTuc"
import TinTucDetail from "../pages/TinTucDetail"
import TourDetail from "../pages/TourDetail"
import Footer from "./Footer"
import Header from "./Header"

function Body() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tours/:tourID/" element={<TourDetail />} />
                <Route path="/tours/:tourID/booking/" element={<Booking />} />
                <Route path='/register/' element={<Register />} />
                <Route path='/login/' element={<Login />} />
                <Route path="/tin-tuc/" element={<TinTuc />} />
                <Route path="/tin-tuc/:tinTucID/" element={<TinTucDetail />} />
                <Route path="/admin/" element={<Admin />} />
                <Route path="/staff/" element={<Staff />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    )
}

export default Body