import { useState, useEffect } from "react"
import PageAnimation from "./utils/PageAnimation"
import { useNavigate } from 'react-router-dom'
import NavBar from "./utils/navBar"
import TopBar from "./utils/topBar"
import BottomFooter from "./utils/footer"
import { useLocation } from "react-router-dom"
import { GetScreen } from "./utils/pageNavigation"

function Home() {
    const { state } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!state) {
            navigate("/")
        }
    }, [state, navigate])

    if (!state) { return null }

    // Name, Role and User Rights
    const { name, role, rights } = state || {}

    // Initial Page = Dashboard
    const [page, changePage] = useState('Dashboard')
    return (
        <PageAnimation>
            <div className=" flex">
                {/* Nav Bar */}
                <NavBar rights={rights} changePage={changePage} />
                {/* Top Bar */}
                <TopBar name={name} role={role} />
                {/* Bottom Bar */}
                <BottomFooter />
                {/* Page Content */}
                <GetScreen screen={page} user={{ name, role, rights }} />
            </div>
        </PageAnimation>
    )
}

export default Home