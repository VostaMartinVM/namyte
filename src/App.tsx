import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { LanguageProvider } from "./context/LanguageContext"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import BackToTop from "./components/BackToTop/BackToTop"
import RequireAuth from "./components/RequireAuth"
import Home from "./pages/Home/Home"
import Menu from "./pages/Menu/Menu"
import Rooms from "./pages/Rooms/Rooms"
import Gallery from "./pages/Gallery/Gallery"
import Activities from "./pages/Activities/Activities"
import Contact from "./pages/Contact/Contact"
import Login from "./pages/Login/Login"
import Admin from "./pages/Admin/Admin"
import "./styles/globals.scss"

const App = () => {
  const location = useLocation()
  const isAdminArea = ["/login", "/admin"].includes(location.pathname.toLowerCase())

  return (
    <LanguageProvider>
      {!isAdminArea && <Navbar />}
      <AnimatePresence mode='wait'>
        <Routes key={location.pathname} location={location}>
          <Route index element={<Home />} />
          <Route path='menu' element={<Menu />} />
          <Route path='rooms' element={<Rooms />} />
          <Route path='gallery' element={<Gallery />} />
          <Route path='activities' element={<Activities />} />
          <Route path='contact' element={<Contact />} />
          <Route path='login' element={<Login />} />
          <Route
            path='admin'
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />
          {/* Legacy Czech routes */}
          <Route path='DenniNabidka' element={<Navigate to='/' replace />} />
          <Route path='NabidkaJidel' element={<Navigate to='/menu' replace />} />
          <Route path='Ubytovani' element={<Navigate to='/rooms' replace />} />
          <Route path='Galerie' element={<Navigate to='/gallery' replace />} />
          <Route path='Aktivity' element={<Navigate to='/activities' replace />} />
          <Route path='Onas' element={<Navigate to='/contact' replace />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </AnimatePresence>
      {!isAdminArea && <Footer />}
      {!isAdminArea && <BackToTop />}
    </LanguageProvider>
  )
}

export default App
