import { useState } from "react";
import Swal from "sweetalert2";

function UserManagement() {
    const [users, setUsers] = useState([
        { username: 'admin', name: 'Usman', role: 'Admin' },
        { username: "sparky123", name: 'Imran', role: 'Manager' },
        { username: "lassy", name: 'Sufyan', role: 'Accountant' },
    ]);
    const [newUser, setNewUser] = useState(
        { Name: "", Username: "", Password: "", Role: '' });

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Success Message
        Swal.fire({
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 2000,
          });
        const user = { ...newUser };
        setUsers([...users, user]);
        setNewUser({ Name: "", Username: "", Password: "", Role: '' });
    };

    const handleUserDelete = (username) => {
        const updatedUsers = users.filter((user) => user.username !== username);
        setUsers(updatedUsers);
    };

    return (
        <div className=" flex flex-col mt-14 items-center justify-center h-screen w-screen bg-slate-50 overflow-auto">

            <div className=" flex flex-col justify-center items-center mt-32">
                <h3 className=" text-black text-3xl font-bold mb-6 ">Add New User</h3>

                {/* Add User Form */}
                <form onSubmit={handleFormSubmit} className=' justify-center items-center'>
                    <div className="grid grid-cols-1 md:grid-cols-2 -mx-1">
                        <div className="w-full px-3 py-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Username
                            </label>
                            <input onChange={handleInputChange} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="Username" />
                        </div>

                        <div className="w-full px-3 py-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Full Name
                            </label>
                            <input onChange={handleInputChange} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="Full Name" />
                        </div>

                        <div className="w-full px-3 py-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Password
                            </label>
                            <input onChange={handleInputChange} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="Password" />
                        </div>

                        <div className="w-full px-3 py-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Role
                            </label>
                            <input onChange={handleInputChange} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="User Role" />
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
                {users.map((user) => (
                    <li key={user.id} className="m-2">
                        <div className="bg-white rounded-lg p-4 flex justify-between items-center">
                            <div className=" mr-6">
                                <div className="text-lg text-black font-bold">
                                    {user.name}</div>
                                <div className="text-gray-500 flex flex-row">
                                    <h6 className=" font-bold mr-2">Username:</h6>
                                    {user.username}</div>
                                <div className="text-gray-500 flex flex-row">
                                    <h6 className=" font-bold mr-2">Role:</h6>
                                    {user.role}
                                </div>
                            </div>
                            <div className=" flex flex-col">
                                {/* Update Button */}
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mb-2"
                                    onClick={() => handleUserDelete(user.username)}>
                                    Update
                                </button>
                                {/* Remove Button */}
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                    onClick={() => handleUserDelete(user.username)}>
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