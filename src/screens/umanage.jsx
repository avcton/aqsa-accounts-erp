import { useState } from "react";

function UserManagement() {
    const [users, setUsers] = useState([
        { id: 1, username: 'admin', name: 'Usman', role: 'Admin' },
        { id: 2, username: "sparky123", name: 'Imran', role: 'Manager' },
        { id: 3, username: "lassy", name: 'Sufyan', role: 'Accountant' },
    ]);
    const [newUser, setNewUser] = useState({ name: "", username: "", password: "", role: '' });

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const id = users.length + 1;
        const user = { id, ...newUser };
        setUsers([...users, user]);
        setNewUser({ name: "", username: "", password: "", role: '' });
    };

    const handleUserDelete = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
    };

    return (
        <div className=" flex flex-col mt-14 items-center justify-center h-screen overflow-y-auto w-screen bg-slate-50">

            <h3 className=" text-black text-3xl font-bold mt-10 mb-6 ">Add New User</h3>

            {/* Add User Form */}
            <form onSubmit={handleFormSubmit} className=' justify-center items-center'>
                <div className="flex md:flex-row flex-col -mx-1">
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

            <h3 className=" text-black text-2xl font-bold mt-9 mb-1">Current Users</h3>
            {/* User List */}
            <ul className="mt-10 mb-32 grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                onClick={() => handleUserDelete(user.id)}>
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserManagement;