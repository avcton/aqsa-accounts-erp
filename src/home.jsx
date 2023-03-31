import { useState } from "react"
import PageAnimation from "./utils/PageAnimation"
import NavBar from "./utils/navBar"
import TopBar from "./utils/topBar"
import BottomFooter from "./utils/footer"
import { useLocation } from "react-router-dom"

function Home(){
    const { state } = useLocation()
    const { name, role } = state
    const [page, changePage] = useState('Dashboard')
    return (
        <PageAnimation>
            <div className=" flex">
                {/* Nav Bar */}
                    <NavBar changePage={changePage}/>
                {/* Top Bar */}
                    <TopBar name={name} role={role}/>
                {/* Bottom Bar */}
                    <BottomFooter/>
                {/* Page Content */}
                <div className=" flex flex-col justify-center items-center h-screen w-screen bg-slate-100">
                    <h3 className=" text-black">{page}</h3>
                </div>
            </div>
        </PageAnimation>
    )
}

export default Home