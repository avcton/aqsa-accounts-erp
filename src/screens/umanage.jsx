import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { baseURL } from "../utils/constants";
import Swal from "sweetalert2";
import LoaderAnimation from "../utils/loader";
import { SelectDown, SelectDownV2 } from "../utils/dropdown";
import Select from "react-select";

function UserManagement() {
    const [roleOptions, setRoleOptions] = useState([]);
    const [roleOptionsFetched, setRoleOptionsFetched] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [users, setUsers] = useState([{}]);
    const [usersFetched, setUsersFetched] = useState(false)
    const [newUser, setNewUser] = useState(
        { Name: '', UserName: '', Password: '', RoleCode: '' });

    // Getting users and roles on the first render
    useEffect(() => {
        getUsers();
        getRoles();
    }, [])

    // This functions handels the input field changes
    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    // This function gets the role code for the selected role
    async function getRoleCode(role) {
        if (role == null) return null;
        return await fetch(`${baseURL}/api/role?RoleName=${role}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async response => {
                const success = response.ok
                response = await response.json()
                if (success) { return response.RoleCode }
                return null;
            })
            .catch(err => { console.log(err) })
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        const user = { ...newUser };
        Swal.showLoading()
        if (selectedRole == null) {
            Swal.fire({
                icon: 'error',
                showConfirmButton: false,
                title: 'Failure',
                text: 'No role was selected',
                timer: 2000,
            })
            return;
        }
        const roleCode = await getRoleCode(selectedRole)
        user.RoleCode = roleCode
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

    async function getRoles() {
        return await fetch(`${baseURL}/api/role`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                data = await data.json()
                data.map((value) => {
                    const roleOption = { label: value.RoleName[0].toUpperCase() + value.RoleName.substring(1), value: value.RoleName }
                    setRoleOptions((prevOptions) => [...prevOptions, roleOption])
                })
                setRoleOptionsFetched(true)
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    async function changeRole(username, roleName) {
        Swal.showLoading()
        const roleCode = await getRoleCode(roleName)
        return await fetch(`${baseURL}/api/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: username,
                RoleCode: roleCode
            })
        })
            .then(async data => {
                Swal.hideLoading()
                if (data.ok) {
                    getUsers()
                    data = await data.json()
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: data,
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
                else {
                    data = await data.json()
                    Swal.fire({
                        icon: 'error',
                        showConfirmButton: false,
                        title: 'Failure',
                        text: data,
                        timer: 2000,
                    })
                }
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    return (
        <div className=" bg-slate-50 z-20">
            <motion.div initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }} className=" flex flex-col mt-14 items-center h-screen w-screen bg-slate-50 overflow-auto">

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
                                <SelectDown
                                    isLoading={roleOptionsFetched ? false : true}
                                    options={roleOptions} setChange={setSelectedRole} placeholder={"Select a Role"} />
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
                {usersFetched ? <ul className="mt-10 mb-32 w-8/12 grid grid-cols-1 ">
                    {users.map((user) => (
                        <li key={user.UserName} className="m-2">
                            <div className="bg-white rounded-lg p-5 flex justify-between items-center">
                                <div className=" mr-6">
                                    <div className="text-lg text-black font-bold">
                                        {user.Name}</div>
                                    <div className="text-gray-500 flex flex-row">
                                        <h6 className=" font-bold mr-2">Username:</h6>
                                        {user.UserName}</div>
                                    <div className="text-gray-500 flex flex-row">
                                        <h6 className=" font-bold mr-2">Status:</h6>
                                        {user.Status ? "Active" : "Inactive"}
                                    </div>
                                </div>
                                <div className=" flex flex-col md:flex-row space-x-4 justify-center items-center">
                                    <div className=" flex flex-col space-y-1">
                                        {/* Role Update */}
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold " htmlFor="grid-last-name">
                                            Role
                                        </label>
                                        <Select
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    backgroundColor: '#F3F4F6',
                                                    borderRadius: '0.5rem',
                                                    height: '53px',
                                                    borderColor: state.isFocused ? '#6B7280' : '#D1D5DB',
                                                    boxShadow: state.isFocused ? '0 0 0 1px gray-400' : 'none',
                                                    '&:hover': {
                                                        borderColor: state.isFocused ? '#9CA3AF' : '#D1D5DB'
                                                    }
                                                }),
                                                menu: (baseStyles) => ({
                                                    ...baseStyles,
                                                    backgroundColor: 'white',
                                                    borderRadius: '0.5rem',
                                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                                                    marginTop: '0.5rem'
                                                }),
                                                option: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    backgroundColor: state.isSelected ? '#F3F4F6' : 'white',
                                                    color: state.isSelected ? '#111827' : '#374151',
                                                    '&:hover': {
                                                        backgroundColor: '#F3F4F6',
                                                        color: 'gray-900'
                                                    }
                                                }),
                                                singleValue: (baseStyles) => ({
                                                    ...baseStyles,
                                                    color: 'black'
                                                }),
                                                placeholder: (baseStyles) => ({
                                                    ...baseStyles,
                                                    color: '#9CA3AF'
                                                })
                                            }}
                                            isLoading={roleOptionsFetched ? false : true}
                                            value={{ label: user.RoleName == null ? 'NA' : user.RoleName, value: user.RoleCode }}
                                            options={[{ label: 'NA', value: null }, ...roleOptions]}
                                            onChange={(value) => {
                                                changeRole(user.UserName, value.value)
                                            }}
                                        />
                                    </div>
                                    {/* Remove Button */}
                                    <button
                                        className="bg-CancelExcel hover:bg-CancelExcelHover text-white h-12 px-4 mt-4 py-2 rounded-md"
                                        onClick={() => handleUserDelete(user.UserName)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul> : <LoaderAnimation />
                }
            </motion.div>
        </div>
    );
}

export default UserManagement;