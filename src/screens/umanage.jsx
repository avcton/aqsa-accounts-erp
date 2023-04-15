import { useState, useEffect } from "react";
import { baseURL } from "../utils/constants";
import Swal from "sweetalert2";

function UserManagement() {
    const [users, setUsers] = useState([{}]);
    const [usersFetched, setUsersFetched] = useState(false)
    const [newUser, setNewUser] = useState(
        { Name: null, UserName: null, Password: null, RoleCode: null });

    // Getting users on the first render
    useEffect(() => {
        getUsers();
    }, [])

    // This functions handels the input field changes
    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const user = { ...newUser };
        Swal.showLoading()
        const res = await postUser(user)

        // Handling Reponse Accordingly
        if (res.Success) {
            setNewUser({ Name: '', UserName: '', Password: '', RoleCode: '' });
            Swal.hideLoading()
            getUsers() // Updating Current Users Display
            // // Success Message
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.Message,
                showConfirmButton: false,
                timer: 2000,
            });
        }
        else {
            Swal.hideLoading()
            Swal.fire({
                icon: 'error',
                showConfirmButton: false,
                title: 'Failure',
                text: res.Message,
                timer: 2000,
            })
        }
    };

    const handleUserDelete = async (username) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.showLoading()
                const response = await deleteUser(username)
                Swal.hideLoading()
                if (response.Success) {
                    getUsers()
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: response.Message,
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        showConfirmButton: false,
                        title: 'Failure',
                        text: response.Message,
                        timer: 2000,
                    })
                }
            }
        })
    }

    // Hanlding Deletion
    async function deleteUser(username) {
        return await fetch(`${baseURL}/api/user?username=${username}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async response => {
                const success = response.ok
                response = await response.json()
                return { Success: success, Message: response }
            })
            .catch(err => { console.log(err) })
    };

    async function postUser(user) {
        return await fetch(`${baseURL}/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then(async response => {
                const success = response.ok
                response = await response.json()
                return { Success: success, Message: response.Message }
            })
            .catch(err => { console.log(err) })
    }

    async function getUsers() {
        setUsersFetched(false)
        return await fetch(`${baseURL}/api/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                setUsers(await data.json())
                setUsersFetched(true);
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    return (
        <div className=" flex flex-col mt-14 items-center h-screen w-screen bg-slate-50 overflow-auto">

            <div className=" flex flex-col justify-center items-center mt-14">
                <h3 className=" text-black text-3xl font-bold mb-6 ">Add New User</h3>

                {/* Add User Form */}
                <form onSubmit={handleFormSubmit} className=' justify-center items-center'>
                    <div className="grid grid-cols-1 md:grid-cols-2 -mx-1">
                        <div className="w-full px-3 py-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Username
                            </label>
                            <input name="UserName" onChange={handleInputChange} value={newUser.UserName} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="Username" />
                        </div>

                        <div className="w-full px-3 py-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Full Name
                            </label>
                            <input name="Name" onChange={handleInputChange} value={newUser.Name} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="Full Name" />
                        </div>

                        <div className="w-full px-3 py-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Password
                            </label>
                            <input name="Password" onChange={handleInputChange}
                                value={newUser.Password} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="Password" />
                        </div>

                        <div className="w-full px-3 py-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Role
                            </label>
                            <input name="RoleCode" onChange={handleInputChange}
                                value={newUser.RoleCode} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="number" placeholder="User Role" />
                        </div>
                    </div>
                    <div className="flex justify-center px-4 py-2">
                        <button
                            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md"
                            type="submit" >
                            Add User
                        </button>
                    </div>
                </form>
            </div>

            <h3 className=" text-black text-3xl font-bold mt-9 mb-1">Current Users</h3>

            {/* User List */}
            <ul className="mt-10 mb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {usersFetched && users.map((user) => (
                    <li key={user.UserName} className="m-2">
                        <div className="bg-white rounded-lg p-4 flex justify-between items-center">
                            <div className=" mr-6">
                                <div className="text-lg text-black font-bold">
                                    {user.Name}</div>
                                <div className="text-gray-500 flex flex-row">
                                    <h6 className=" font-bold mr-2">Username:</h6>
                                    {user.UserName}</div>
                                <div className="text-gray-500 flex flex-row">
                                    <h6 className=" font-bold mr-2">Role:</h6>
                                    {user.RoleName}
                                </div>
                                <div className="text-gray-500 flex flex-row">
                                    <h6 className=" font-bold mr-2">Status:</h6>
                                    {user.Status ? "Active" : "Inactive"}
                                </div>
                            </div>
                            <div className=" flex flex-col">
                                {/* Update Button */}
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mb-2"
                                    onClick={() => handleUserDelete(user.UserName)}>
                                    Update
                                </button>
                                {/* Remove Button */}
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                    onClick={() => handleUserDelete(user.UserName)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserManagement;