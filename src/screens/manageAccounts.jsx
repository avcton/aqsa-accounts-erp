import { motion } from "framer-motion";
import { useState, useEffect } from "react"
import { baseURL } from "../utils/constants"
import Swal from "sweetalert2";
import LoaderAnimation from "../utils/loader";
import { SelectDown } from "../utils/dropdown";
import Select from "react-select";

function ManageAccounts() {
    const accountLevels = [
        { label: 'Group', value: 'group' },
        { label: 'Detail', value: 'detail' },
    ]
    const [accounts, setAccounts] = useState([])
    const [accountsFetched, setAccountsFetched] = useState(false)
    const [levelSelected, setLevelSelected] = useState(null)
    const [parentSelected, setParentSelected] = useState(null)
    const [parentAccounts, setParentAccounts] = useState([])
    const [parentAccountsFetched, setParentAccountsFetched] = useState(false)
    const [parentNames, setParentNames] = useState([])
    const [parentNamesFetched, setParentNamesFetched] = useState(false)
    const [accountCode, setAccountCode] = useState(null)
    const [accountCodeFetched, setAccountCodeFetched] = useState(false)
    const [newAccount, setNewAccount] = useState(
        { AccountName: '', ParentCode: null, ParentLevel: null });

    useEffect(() => {
        getAccounts();
    }, [])

    useEffect(() => {
        if (levelSelected != null) {
            setParentSelected(null)
            setAccountCode('')
            getParentAccounts();
        }
    }, [levelSelected])

    useEffect(() => {
        if (parentAccounts.length > 0) {
            setParentNamesFetched(false)
            const names = parentAccounts.map((parent) => {
                return { label: parent.AccountName[0].toUpperCase() + parent.AccountName.substring(1), value: parent.AccountName }
            })
            setParentNames(names)
            setParentNamesFetched(true)
        }
    }, [parentAccounts])

    useEffect(() => {
        if (parentSelected != null) {
            getChildAccountCode()
        }
    }, [parentSelected])

    const getChildAccountCode = async () => {
        const parentData = {
            ParentCode: getParentCode(parentSelected.value),
            ParentLevel: levelSelected == 'group' ? 1 : 2
        }
        setAccountCodeFetched(false)
        return await fetch(`${baseURL}/api/accounttree`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parentData)
        })
            .then(async data => {
                setAccountCode(await data.json())
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    const getParentCode = (ParentName) => {
        const parentAccount = parentAccounts.find(a => a.AccountName == ParentName)
        return parentAccount ? parentAccount.AccountCode : null;
    }

    const handleInputChange = (e) => {
        setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
    };

    async function handleFormSubmit(e) {
        e.preventDefault();
        const Account = { ...newAccount };
        Account.ParentCode = getParentCode(parentSelected?.value)
        Account.ParentLevel = levelSelected == 'group' ? 1 : 2;
        Swal.showLoading()
        const res = await postAccount(Account)

        // Handling Reponse Accordingly
        if (res.Success) {
            setAccountCode('')
            getParentAccounts()
            setParentSelected(null)
            setNewAccount({ AccountName: '', ParentCode: null, ParentLevel: null });
            Swal.hideLoading()
            getAccounts() // Updating Current Accounts Display
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

    async function postAccount(Account) {
        return await fetch(`${baseURL}/api/account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Account),
        })
            .then(async response => {
                const success = response.ok
                response = await response.json()
                return { Success: success, Message: response.Message }
            })
            .catch(err => { console.log(err) })
    }

    const handleAccountDelete = async (accountCode) => {
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
                const response = await deleteAccount(accountCode)
                Swal.hideLoading()
                if (response.Success) {
                    getAccounts();
                    getParentAccounts();
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
    async function deleteAccount(accountCode) {
        return await fetch(`${baseURL}/api/account/${accountCode}`, {
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

    const handleUpdateRequest = () => {
        navigate("modify-account", { state: {} })
    }

    const getAccounts = async () => {
        setAccountsFetched(false)
        return await fetch(`${baseURL}/api/account`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                setAccounts(await data.json())
                setAccountsFetched(true);
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    const getParentAccounts = async () => {
        setParentAccountsFetched(false)
        const parentLevel = levelSelected == 'group' ? 1 : 2
        return await fetch(`${baseURL}/api/accounttree?level=${parentLevel}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                setParentAccounts(await data.json())
                setParentAccountsFetched(true);
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
                    <h3 className="text-black text-3xl font-bold mb-6 ">Create Ledger Account</h3>

                    {/* Dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="w-full px-3 py-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Account Type
                            </label>
                            <SelectDown options={accountLevels} setChange={setLevelSelected} placeholder={"Select Account Type"} />
                        </div>

                        <div className="w-full px-3 py-3 flex flex-col">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Parent Account
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
                                options={parentNames}
                                value={parentSelected}
                                isLoading={parentNamesFetched || levelSelected == null ? false : true}
                                onChange={(value) => { setParentSelected(value) }}
                                placeholder={"Select Parent Account"}
                            />
                        </div>
                    </div>

                    {/* Add Account Form */}
                    <form onSubmit={handleFormSubmit} className=' justify-center items-center'>
                        <div className="grid grid-cols-1">
                            <div className="w-full px-3 py-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Account Code
                                </label>
                                <input readOnly value={accountCode} className="appearance-textfield block w-full text-black border rounded-lg py-4 px-4 mb-3 
                            leading-tight outline-none bg-gray-50 border-gray-300" id="grid-card-number" type="text" />
                            </div>

                            <div className="w-full px-3 py-1">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Account Name
                                </label>
                                <input name="AccountName" value={newAccount.AccountName} onChange={handleInputChange} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                            leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="abc" />
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

                {/* Accounts List */}
                {accountsFetched ? <ul className="mt-10 mb-32 w-8/12 grid grid-cols-1">
                    {accounts.map((acc) => (
                        <li key={acc.AccountCode} className="m-2">
                            <div className={`
                             ${acc.AccountType == null && 'bg-COALevel1'}
                             ${acc.AccountType != null && acc.AccountGroup == null && 'bg-COALevel2'}
                             ${acc.AccountType != null && acc.AccountGroup != null && 'bg-COALevel3'}  
                             rounded-lg p-4 flex flex-row justify-between items-center`}>
                                <div className=" mr-6">
                                    <div className="text-lg text-black font-bold">
                                        {acc.AccountName}</div>
                                    <div className="text-gray-500 flex flex-col md:flex-row">
                                        <div className=" text-black flex font-bold flex-row">
                                            <h6 className=" text-gray-500 font-bold mr-2">Code:</h6>
                                            {acc.AccountCode}
                                        </div>
                                        {acc.AccountGroup != null && <div className="text-gray-500 flex flex-row md:ml-2">
                                            <h6 className=" font-bold mr-2">Group:</h6>
                                            {acc.AccountGroup}
                                        </div>}
                                        {acc.AccountType != null && <div className="text-gray-500 flex md:ml-2 flex-row">
                                            <h6 className=" font-bold mr-2">Type:</h6>
                                            {acc.AccountType}
                                        </div>}
                                    </div>
                                </div>
                                <div className=" flex flex-col">
                                    {/* Modify Button */}
                                    {/* <button
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mb-2"
                                        onClick={() => handleUpdateRequest()}>
                                        Toggle
                                    </button> */}
                                    {/* Remove Button */}
                                    <button
                                        className="bg-CancelExcel hover:bg-CancelExcelHovertext-white px-4 py-2 rounded-md"
                                        onClick={() => handleAccountDelete(acc.AccountCode)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul> : <LoaderAnimation />}
            </motion.div>
        </div >
    );
}

export default ManageAccounts;