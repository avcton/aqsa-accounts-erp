import { useState } from "react"
import PageAnimation from "./utils/PageAnimation"
import NavBar from "./utils/navBar"
import TopBar from "./utils/topBar"
import BottomFooter from "./utils/footer"
import { useLocation } from "react-router-dom"
import { PageNavigation } from "./utils/menuItems"

function Home(){
    // const { state } = useLocation()
    // const { name, role } = state
    const [page, changePage] = useState('Dashboard')
    return (
        <PageAnimation>
            <div className=" flex">
                {/* Nav Bar */}
                    <NavBar changePage={changePage}/>
                {/* Top Bar */}
                    <TopBar name={'Name'} role={'Role'}/>
                {/* Bottom Bar */}
                    <BottomFooter/>
                {/* Page Content */}
                    {PageNavigation[page]}
            </div>
        </PageAnimation>
    )
}

export default Home