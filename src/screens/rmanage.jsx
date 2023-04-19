import { useState, useEffect } from "react";
import { baseURL } from "../utils/constants";
import Swal from "sweetalert2";
import LoaderAnimation from "../utils/loader";

function RoleManagement() {

    // App Objects
    const [AppObjects, setAppObjects] = useState([])

    const [roles, setRoles] = useState([]);
    const [AppObjectsFetched, setAppObjectsFetched] = useState(false)
    const [rolesFetched, setRolesFetched] = useState(false)
    const [newRole, setNewRole] = useState(
        { RoleName: "" });
    const [roleObjectState, setRoleObjectState] = useState([])

    // Getting roles on the first render
    useEffect(() => {
        getRoles()
        getAppObjects()
    }, [])

    useEffect(() => {
        setRoleObjectState(new Array(AppObjects.length).fill(false))
    }, [AppObjectsFetched])

    async function getRoles() {
        setRolesFetched(false)
        return await fetch(`${baseURL}/api/role`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                setRoles(await data.json())
                setRolesFetched(true);
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    async function getAppObjects() {
        setAppObjectsFetched(false)
        return await fetch(`${baseURL}/api/appobject`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                setAppObjects(await data.json())
                setAppObjectsFetched(true);
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    async function postRole() {
        return await fetch(`${baseURL}/api/role`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRole),
        })
            .then(async response => {
                const success = response.ok
                response = await response.json()
                return { Success: success, Message: response.Message }
            })
            .catch(err => { console.log(err) })
    }

    // This function gets the role code for the selected role
    async function getRoleCode(role) {
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

    async function postRoleObjects() {
        const code = await getRoleCode(newRole.RoleName)
        if (code != null) {
            roleObjectState.map(async (state, index) => {
                if (state) {
                    await fetch(`${baseURL}/api/roleobject`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ RoleCode: code, ObjCode: AppObjects[index].ObjCode }),
                    }).then(async response => {
                        const success = response.ok
                        response = await response.json()
                        if (!success) return { Success: success, Message: response }
                    })
                }
            })
            return { Success: true, Message: "Role Objects Posted Succesfully" }
        }
        else {
            return { Success: false, Message: "Invalid Role Code" };
        }
    }

    // Hanlding Deletion
    async function deleteUser(roleName) {
        const roleCode = await getRoleCode(roleName)
        if (roleCode != null) {
            return await fetch(`${baseURL}/api/role?rolecode=${roleCode}`, {
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
        }
        return { Success: false, Message: "Invalid Role Code" }
    };

    const handleRoleDelete = async (roleName) => {
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
                const response = await deleteUser(roleName)
                Swal.hideLoading()
                if (response.Success) {
                    getRoles()
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

    const handleCheckChange = (index) => {
        const updatedRoleObject = roleObjectState.map((item, idx) => idx == index ? !item : item)

        setRoleObjectState(updatedRoleObject)
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        Swal.showLoading()

        const resRole = await postRole()
        const resRoleObj = await postRoleObjects()

        // Handling Reponse Accordingly
        if (resRole.Success && resRoleObj.Success) {
            setNewRole({ RoleName: "" });
            getRoles()
            // Success Message
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: resRole.Message,
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
                text: resRole.Success ? resRoleObj.Message : resRole.Message,
                timer: 2000,
            })
        }
    };

    return (
        <div className=" flex flex-col mt-14 items-center h-screen w-screen bg-slate-50 overflow-auto">

            <div className=" flex flex-col justify-center items-center mt-14">
                <h3 className=" text-black text-3xl font-bold mb-6 ">Add New Role</h3>

                {/* Add Role Form */}
                <form onSubmit={handleFormSubmit} className=' justify-center items-center'>
                    {AppObjectsFetched ? <div className="grid grid-cols-1 md:grid-cols-2 -mx-1 justify-center items-center">
                        {AppObjects.map(({ ObjName, ObjCode }, index) => {
                            return (
                                <div className="w-full px-3 py-3 flex flex-col items-center">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                        {ObjName}
                                    </label>
                                    <input onChange={() => handleCheckChange(index)} name={ObjName} value={ObjCode} checked={roleObjectState[index]} className="appearance-textfield block cursor-pointer w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="checkbox" />
                                </div>
                            )
                        })}
                    </div> : <LoaderAnimation />}

                    {/* Role Name */}
                    <div className="flex md:flex-row flex-col -mx-1">
                        <div className="w-full px-3 py-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Role Name
                            </label>
                            <input name="RoleName" value={newRole.RoleName} onChange={(e) => { setNewRole({ [e.target.name]: e.target.value }) }} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                          leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="Description" />
                        </div>
                    </div>

                    <div className="flex justify-center px-4 py-2">
                        <button
                            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md"
                            type="submit" >
                            Create Role
                        </button>
                    </div>
                </form>
            </div>

            <h3 className=" text-black text-3xl font-bold mt-9 mb-1">Existing Roles</h3>

            {/* Role List */}
            {rolesFetched ? <ul className="mt-10 mb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {roles.map((role) => (
                    <li key={role.id} className="m-2">
                        <div className="bg-white rounded-lg p-4 flex justify-between items-center">
                            <div className=" mr-6">
                                <div className="text-gray-500 flex flex-row">
                                    <h6 className=" font-bold mr-2">Role:</h6>
                                    {role.RoleName}
                                </div>
                            </div>
                            <div className=" flex flex-col">
                                {/* Update Button */}
                                {/* <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mb-2"
                                    onClick={() => handleUserDelete(role.username)}>
                                    Update
                                </button> */}
                                {/* Delete Button */}
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                    onClick={() => handleRoleDelete(role.RoleName)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul> : <LoaderAnimation />}
        </div>
    );
}

export default RoleManagement;