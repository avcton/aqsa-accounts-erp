import PageAnimation from "./utils/PageAnimation"
import logo from "./assets/logo.png"
import NavBar from "./utils/navBar"
import TopBar from "./utils/topBar"
import BottomFooter from "./utils/footer"
import { useLocation } from "react-router-dom"

function Home(){
    const { state } = useLocation()
    const { name, role } = state
    return (
        <PageAnimation>
            <div className=" flex">
                {/* Nav Bar */}
                    <NavBar/>
                {/* Top Bar */}
                    <TopBar name={name} role={role}/>
                {/* Bottom Bar */}
                    <BottomFooter/>
                {/* Page Content */}
                <div className=" flex flex-col justify-center items-center h-screen w-screen">
                    <h3 className=" text-black">This is the home page</h3>
                </div>
            </div>
        </PageAnimation>
    )
}

export default Home