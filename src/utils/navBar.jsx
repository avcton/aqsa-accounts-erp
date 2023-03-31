import { useState } from 'react';
import logo from "../assets/logo.png"
import arrow from '../assets/MenuIcons/left-arrow.svg'
import i_coa from '../assets/MenuIcons/coa-icon.svg'
import i_dashboard from '../assets/MenuIcons/dashboard-icon.svg'
import i_manage from '../assets/MenuIcons/manage-icon.svg'
import i_reports from '../assets/MenuIcons/reports-icon.svg'
import i_setup from '../assets/MenuIcons/setup-icon.svg'
import i_voucher from '../assets/MenuIcons/voucher-icon.svg'

function NavBar(){
    const [open, setOpen] = useState(false)
    const Menus = [
        {title: "Dashboard", icon: i_dashboard, gap: true},
        {title: "Vouchers", gap: true, icon: i_voucher},
        {title: "Chart of Accounts", icon: i_coa},
        {title: "Reports", icon: i_reports, gap: true},
        {title: "Application Setup", icon: i_setup, gap: true, highAuth: 1},
        {title: "User Management", icon: i_manage, highAuth: 1},
    ]
    return (
        <div className={` ${open? "w-72" : "w-20"} z-10 bg-slate-50 duration-300 h-screen shadow-2xl relative p-2 pt-3`}>
            <img 
                src={arrow}
                className= {` absolute w-12  cursor-pointer duration-500 rounded-full ${!open? "rotate-180": "rotate-0"}
                -right-2 shadow-md bg-white top-16 border-4 border-white`}
                onClick={()=> setOpen(!open)}
            />
            {/* Logo */}
            <div className=' items-center px-2'>
                <img src={logo} className=' object-scale-down h-10 w-96'></img>
            </div>
            {/* Menu */}
            <ul className=' pt-14'>
                {Menus.map((Menu, Index) => (
                    <li key={Index} className={` flex rounded-md p-2 cursor-pointer hover:bg-slate-200 text-black text-sm items-center gap-x-4 ${Menu.gap? 'mt-9': 'mt-2'}`}>
                        <img src={Menu.icon} className={' mx-1 w-10'} alt={Menu.title} />
                        <span className={` whitespace-nowrap origin-left duration-300 ${!open && 'hidden'}`}>{Menu.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NavBar;