import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './assets/logo.png'
import PageAnimation from './PageAnimation'

function LogIn() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  function navigateHome(){
    navigate("home", {replace: true});
  }

  return (
    <PageAnimation>
      <div className=' bg-white flex flex-col h-screen w-screen justify-center items-center'>
        <div className=' p-20 bg-white rounded-2xl shadow-2xl justify-center items-center flex flex-col'>
          {/* <h3 className=' font-bold text-3xl text-black'>LogIn</h3> */}
          <img src={logo} alt="Corporate Logo" className=' w-1/2'></img>
          <form className='  mt-10 flex flex-col'>
            <input id="username" type="text" placeholder="Username" class=" focus:outline-blue-400 bg-gray-50 shadow-md border rounded-md w-full py-2 px-3 text-black focus:outline-double outline-yellow-100 focus:shadow-outline"></input>
            <input id="password" type="password" placeholder="Password" class=" mt-5 focus:outline-blue-400 bg-gray-50 shadow-md border rounded-md w-full py-2 px-3 text-black focus:outline-double outline-yellow-100 focus:shadow-outline"></input>
          </form>
          <a href='#' className=' mt-5 text-blue-300 underline'>Forgot Password</a>
          <button onClick={navigateHome} className=' transition ease-in-out delay-150 duration-300 transform hover:scale-105 mt-5 focus:outline-none '>login</button>
        </div>
    </div>
    </PageAnimation>
  )
}

export default LogIn
