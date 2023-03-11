import { useState } from 'react';
import icon from '../assets/arrow.png'

function NavBar(){
    const [open, setOpen] = useState(false)
    return (
        <div className={` ${open? "w-72" : "w-20"} z-10 bg-white duration-300 h-screen shadow-2xl relative`}>
            <img 
                src={icon}
                className= {` absolute cursor-pointer duration-500 rounded-full ${!open? "rotate-180": "rotate-0"}
                -right-3 top-14 border-4 border-white`}
                onClick={()=> setOpen(!open)}
            />
        </div>
    )
}

export default NavBar;