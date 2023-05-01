import { Route, Routes, useLocation, Navigate } from "react-router-dom"
import { useState } from "react"
import LogIn from "./login"
import Home from "./home"
import { AnimatePresence } from "framer-motion"

function App() {
    const location = useLocation()
    const [authenticated, setAuthenticated] = useState(false)
    return (
        <div className="App">
            <AnimatePresence mode="wait">
                <Routes key={location.pathname} location={location}>
                    <Route path="/" element={<LogIn setAuthenticated={setAuthenticated} />} />
                    <Route path="home" element={!authenticated ? <Navigate to="/" /> : <Home />} />
                </Routes>
            </AnimatePresence>
        </div>
    )
}

export default App