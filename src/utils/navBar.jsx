import { useEffect, useState } from 'react';
import logo from "../assets/logo.png"
import rarrow from '../assets/MenuIcons/right-arrow.svg'
import darrow from '../assets/MenuIcons/down-arrow.svg'
import { Menus } from './menuItems';

function NavBar({changePage}){
    const [menuOpen, setmenuOpen] = useState(false)
    const [whichMenuOpen, setwhichMenuOpen] = useState(0)
    const [subMenuOpen, setSubMenuOpen] = useState(-1)
    useEffect(() => {
        if(subMenuOpen != -1){
            var indx = whichMenuOpen - (subMenuOpen * 10)
            var title = Menus[subMenuOpen].subMenus[indx].title
            changePage(title)
        }
        else {
            changePage(Menus[whichMenuOpen].title)
        }
    }, [whichMenuOpen])
    function updateMenu(Menu, Index) {
        if (Index == subMenuOpen){
            if(menuOpen){ setSubMenuOpen(-1) }
            else { setmenuOpen(!menuOpen) }
        }
        else if (Menu.subMenus){
            setSubMenuOpen(Index)
            if(!menuOpen){
                setmenuOpen(!menuOpen)
                setSubMenuOpen(Index)
            }
        }
        else {
            setwhichMenuOpen(Index)
            setSubMenuOpen(-1)
            setmenuOpen(false)
        }
    }
    function updateSubMenu(Index, index) {
        // Max 10 Entries for each SubMenu
        setwhichMenuOpen(Index * 10 + index)
        setmenuOpen(false)
    }
    function checkIfParentMenu(Index){
        var indx = whichMenuOpen - (Index * 10)
        if(Menus[Index].subMenus && Menus[Index].subMenus[indx]) { return true }
        return false
    }
    return (
        <div className={` ${menuOpen? "w-72" : "w-20"} z-10 bg-slate-50 duration-300 h-screen shadow-2xl relative p-2 pt-3`}>
            <img 
                src={rarrow}
                className= {` absolute w-12 cursor-pointer duration-500 z-1 rounded-full ${!menuOpen? "rotate-0": "rotate-180"}
                -right-2 shadow-md bg-white top-16 border-4 border-white`}
                onClick={() => {
                    if(menuOpen && subMenuOpen != -1){ 
                        var indx = whichMenuOpen - (subMenuOpen * 10)
                        if(!Menus[subMenuOpen].subMenus[indx]){
                            setSubMenuOpen(-1)
                        }
                    }
                    setmenuOpen(!menuOpen)}}
            />
            {/* Logo */}
            <div className=' items-center px-2'>
                <img src={logo} className=' object-scale-down h-10 w-96'></img>
            </div>
            {/* Menu */}
            <ul className=' pt-14 h-screen overflow-y-auto'>
                {Menus.map((Menu, Index) => (
                    <div>
                        <li key={Index} onClick={() => {updateMenu(Menu, Index)}} className={` flex rounded-md p-2 relative cursor-pointer text-black text-base ${(whichMenuOpen == Index || checkIfParentMenu(Index))?'bg-slate-200': 'hover:bg-slate-100'} items-center gap-x-4 ${Menu.gap? 'mt-9': 'mt-2'}`}>
                            {/* Icon */}
                            <img src={Menu.icon} className={' mx-1 w-10'} alt={Menu.title} />
                            {/* Title */}
                            <span className={` whitespace-nowrap origin-left duration-500 ${!menuOpen && 'hidden'}`}>{Menu.title}</span>
                            {/* Trailing */}
                            {Menu.subMenus && menuOpen && (<img src={darrow} className={` ${subMenuOpen == Index && 'rotate-180'} w-10 absolute right-0`}/>)}
                        </li>
                        {Menu.subMenus && subMenuOpen == Index && menuOpen && (
                            <ul className={` pt-2`}>
                                {Menu.subMenus.map((subMenuItem, idx) => (
                                    <li key={idx} onClick={()=>{updateSubMenu(Index, idx)}} className={` flex px-5 duration-300 cursor-pointer text-sm text-black py-1  ${whichMenuOpen == Index * 10 + idx? 'bg-slate-200': 'hover:bg-slate-100'} whitespace-nowrap`}>
                                        {subMenuItem.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default NavBar;