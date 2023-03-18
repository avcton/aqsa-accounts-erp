import { Route, Routes, useLocation } from "react-router-dom"
import LogIn from "./login"
import Home from "./home"
import { AnimatePresence } from "framer-motion"

function App(){
    const location = useLocation()
    return (
        <div className="App">
            <AnimatePresence mode="wait">
                <Routes key={location.pathname} location={location}>
                    <Route path="/" element={<LogIn/>} />
                    <Route path="home" element={<Home/>} />
                </Routes>
            </AnimatePresence>
        </div>
    )
}

export default App