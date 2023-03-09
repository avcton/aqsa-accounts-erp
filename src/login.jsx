import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './assets/logo.png'
import PageAnimation from './utils/PageAnimation'
import { baseURL } from './utils/constants'
import Swal from 'sweetalert2'

function LogIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function navigateHome(){
  navigate("home", {replace: true});
  }

  async function validateCredentials(creds){
    return await fetch(`${baseURL}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(creds)
    })
    .then(data => {
      if(!data.ok){
        return null;
      }
      return data.json()
    })
    .catch(err => console.error('An execption is caught: ', err))
  }

  // This master function validates the response from server and displays message accordingly 
  async function loginUser(event) {
    event.preventDefault();
    const response = await validateCredentials({username, password});
    if (response != null){
      Swal.fire({
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 2000,
        }).then(navigateHome);
    }
    else {
      Swal.fire({
        icon: 'error',
        showConfirmButton: false,
        title: 'Incorrect Credentials',
        timer: 2000,
      })
    }
  }

  return (
    <PageAnimation>
      <div className=' bg-white flex flex-col h-screen w-screen justify-center items-center'>
        <div className=' p-20 bg-white rounded-2xl shadow-2xl justify-center items-center flex flex-col'>
          {/* <h3 className=' font-bold text-3xl text-black'>LogIn</h3> */}
          <img src={logo} alt="Corporate Logo" className=' w-1/2'></img>
          <form onSubmit={loginUser} noValidate className='  mt-10 flex flex-col items-center'>
            <input onChange={e => setUsername(e.target.value)} id="username" type="text" placeholder="Username" class=" focus:outline-blue-400 bg-gray-50 shadow-md border rounded-md w-full py-2 px-3 text-black focus:outline-double outline-yellow-100 focus:shadow-outline"></input>
            <input onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder="Password" class=" mt-5 focus:outline-blue-400 bg-gray-50 shadow-md border rounded-md w-full py-2 px-3 text-black focus:outline-double outline-yellow-100 focus:shadow-outline"></input>
            <a href='#' className=' mt-5 text-blue-300 underline'>Forgot Password</a>
            <button className=' transition ease-in-out delay-150 duration-300 transform hover:scale-105 mt-5 focus:outline-none'>login</button>
          </form>
        </div>
    </div>
    </PageAnimation>
  )
}

export default LogIn
