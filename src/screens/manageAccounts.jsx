import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom'

function ManageAccounts() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([
        { Code: '1-101', name: 'Current Assets', Group: 'abc', Type: '1xyz' },
        { Code: '1-102', name: 'Current Liabilities', Group: 'abc', Type: 'mnb' },
        { Code: '1-125', name: 'Depreciation', Group: 'abc', Type: 'wer' },

    ]);
    const [newUser, setNewUser] = useState(
        { Name: "", Username: "", Password: "", Role: '' });

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const user = { ...newUser };
        setUsers([...users, user]);
        setNewUser({ Code: "", name: "", Group: "", Type: '' });
        Swal.fire({
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 2000,
        });
    };

    const handleAccountDelete = (Code) => {
        const updatedUsers = users.filter((user) => user.Code !== Code);
        setUsers(updatedUsers);
    };

    const handleUpdateRequest = () => {
        navigate("modify-account", { state: {} })
    }

    return (
        <div className=" bg-slate-50 z-20">
            <motion.div initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }} className=" flex flex-col mt-14 ml-20 md:ml-0 items-center h-screen w-screen bg-slate-50 overflow-auto">

                <div className=" flex flex-col justify-center items-center mt-14">
                    <h3 className="text-black text-3xl font-bold mb-6 ">Manage Accounts</h3>

                    {/* Add Account Form */}
                    <form onSubmit={handleFormSubmit} className=' justify-center items-center'>
                        <div className="grid grid-cols-1 md:grid-cols-2 -mx-1">
                            <div className="w-full px-3 py-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Account Code
                                </label>
                                <input onChange={handleInputChange} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="1-101" />
                            </div>

                            <div className="w-full px-3 py-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Account Name
                                </label>
                                <input onChange={handleInputChange} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="abc" />
                            </div>

                            <div className="w-full px-3 py-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Account Group
                                </label>
                                <input onChange={handleInputChange} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="xyz" />
                            </div>

                            <div className="w-full px-3 py-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Account Type
                                </label>
                                <input onChange={handleInputChange} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="xyz" />
                            </div>
                        </div>
                        <div className="flex justify-center px-4 py-2">
                            <button
                                className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md"
                                type="submit" >
                                Add Account
                            </button>
                        </div>
                    </form>
                </div>

                <h3 className=" text-3xl text-black font-bold mt-9 mb-1">Existing Accounts</h3>

                {/* User List */}
                <ul className="mt-10 mb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {users.map((user) => (
                        <li key={user.Code} className="m-2">
                            <div className="bg-white rounded-lg p-4 flex justify-between items-center">
                                <div className=" mr-6">
                                    <div className="text-lg text-black font-bold">
                                        {user.name}</div>
                                    <div className="text-gray-500 flex flex-row">
                                        <h6 className=" font-bold mr-2"> Code:</h6>
                                        {user.Code}</div>
                                    <div className="text-gray-500 flex flex-row">
                                        <h6 className=" font-bold mr-2">Group:</h6>
                                        {user.Group}
                                    </div>
                                    <div className="text-gray-500 flex flex-row">
                                        <h6 className=" font-bold mr-2">Type:</h6>
                                        {user.Type}
                                    </div>
                                </div>
                                <div className=" flex flex-col">
                                    {/* Update Button */}
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mb-2"
                                        onClick={() => handleUpdateRequest()}>
                                        Modify
                                    </button>
                                    {/* Remove Button */}
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                        onClick={() => handleAccountDelete(user.username)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div >
    );
}

export default ManageAccounts;