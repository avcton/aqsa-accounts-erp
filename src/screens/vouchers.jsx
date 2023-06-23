import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react"
import { format } from 'date-fns'
import { baseURL } from "../utils/constants"
import Swal from "sweetalert2";
import LoaderAnimation from "../utils/loader";
import Select from "react-select";
import { SelectDownV2 } from "../utils/dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import remove from '../assets/minus-circle.svg'
import add from '../assets/plus-circle.svg'

export default function Voucher({ user }) {
    const [date, changeDate] = useState(new Date())
    const [formattedDate, setFormattedDate] = useState(null)
    const [branch, setBranch] = useState(null)
    const [period, setPeriod] = useState(null)
    const [vtype, setVType] = useState(null)

    // Initial Fetches
    useEffect(() => {
        getBranch()
        getPeriod()
        getAccounts()
    }, [])

    useEffect(() => {
        if (branch != null && period != null && vtype != null) {
            getVouchers()
        }
    }, [branch, period, vtype])

    const [accounts, setAccounts] = useState([])
    const [vouchers, setVouchers] = useState([])
    const [branchOptions, setBranchOptions] = useState([])
    const [periodOptions, setPeriodOptions] = useState([])
    const [particulars, setParticulars] = useState(null)

    // State Representators
    const [branchFetched, setBranchFetched] = useState(false)
    const [periodFetched, setPeriodFetched] = useState(false)
    const [accountsFetched, setAccountsFetched] = useState(false)
    const [vouchersFetched, setVouchersFetched] = useState(false)

    const voucherOptions = [
        { label: 'Cash Payment', value: 'CP' },
        { label: 'Cash Receipt', value: 'CR' },
        { label: 'Journal Voucher', value: 'JV' }
    ]

    const [voucherDetails, setVoucherDetails] =
        useState([{ AccountCode: null, Narration: null, DebitAmount: 0, CreditAmount: 0 }])

    const [totals, setTotals] = useState({ TotalDebit: 0, TotalCredit: 0, TotalDifference: 0 })

    // Total Listeners
    useEffect(() => {
        const totalDebit = voucherDetails.reduce((total, item) => {
            return total + item.DebitAmount;
        }, 0);

        const totalCredit = voucherDetails.reduce((total, item) => {
            return total + item.CreditAmount;
        }, 0);
        setTotals({ ...totals, TotalDebit: totalDebit, TotalCredit: totalCredit, TotalDifference: Math.abs(totalCredit - totalDebit) })
    }, [voucherDetails])

    // Date Converter
    useEffect(() => {
        const convertedDate = date.toLocaleDateString('en-US', { timeZone: 'Asia/Karachi' });
        const formattedDate = format(new Date(convertedDate), 'yyyy-MM-dd');
        setFormattedDate(formattedDate)
    }, [date])

    const handleAccountCodeChange = (i, accountCode) => {
        const newVoucherDetails = [...voucherDetails];
        newVoucherDetails[i].AccountCode = accountCode;
        setVoucherDetails(newVoucherDetails);
    }

    const getBranch = async () => {
        setBranchFetched(false)
        return await fetch(`${baseURL}/api/branch`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                data = await data.json()
                data.map((value) => {
                    const branchOption = { label: value.BrName[0].toUpperCase() + value.BrName.substring(1), value: value.BrCode }
                    setBranchOptions((prevOptions) => [...prevOptions, branchOption])
                })
                setBranchFetched(true);
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    const getPeriod = async () => {
        setPeriodFetched(false)
        return await fetch(`${baseURL}/api/period?yearname=&getAllActive=false`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                data = await data.json()
                data.map((value) => {
                    const periodOption = { label: value.PeriodName[0].toUpperCase() + value.PeriodName.substring(1), value: value.PeriodCode }
                    setPeriodOptions((prevOptions) => [...prevOptions, periodOption])
                })
                setPeriodFetched(true);
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    const getAccounts = async () => {
        setAccountsFetched(false)
        return await fetch(`${baseURL}/api/accounttree?level=3`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                data = await data.json()
                data.map((value) => {
                    const accountOption = { label: value.AccountName[0].toUpperCase() + value.AccountName.substring(1), value: value.AccountCode }
                    setAccounts((prevOptions) => [...prevOptions, accountOption])
                })
                setAccountsFetched(true);
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    const getVouchers = async () => {
        setVouchersFetched(false)
        return await fetch(`${baseURL}/api/voucher?branchCode=${branch.value}&periodCode=${period.value}&voucherType=${vtype.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                data = await data.json()
                setVouchers(data)
                setVouchersFetched(true);
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        const voucherData = {
            BranchCode: branch.value,
            PeriodCode: period.value,
            VoucherType: vtype.value,
            Particulars: particulars,
            VoucherDate: formattedDate,
            CreatedBy: user.name,
            Details: voucherDetails.map((vd) => { return vd })
        };

        Swal.showLoading()
        const res = await postVoucher(voucherData)

        // Handling Reponse Accordingly
        if (res.Success) {
            setVoucherDetails(prev => [{ AccountCode: prev[0].AccountCode, Narration: '', DebitAmount: 0, CreditAmount: 0 }])

            Swal.hideLoading()
            getVouchers() // Updating Current Voucher Display
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

    async function postVoucher(voucher) {
        return await fetch(`${baseURL}/api/voucher`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(voucher),
        })
            .then(async response => {
                const success = response.ok
                response = await response.json()
                return { Success: success, Message: response.Message }
            })
            .catch(err => { console.log(err) })
    }

    const handleVoucherToggle = async (voucherNo) => {
        return await fetch(`${baseURL}/api/voucher?id=${voucherNo}&user=${user.name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async data => {
            if (data.ok) {
                getVouchers()
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
    }

    const handleVoucherDelete = async (voucherNo) => {
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
                const response = await deleteVoucher(voucherNo)
                Swal.hideLoading()
                if (response.Success) {
                    getVouchers()
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
    async function deleteVoucher(voucherNo) {
        return await fetch(`${baseURL}/api/voucher/${voucherNo}`, {
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

    // Form Working
    const handleChange = (i, e) => {
        const newVoucherDetails = [...voucherDetails];
        if (e.target.name == 'Narration') {
            newVoucherDetails[i][e.target.name] = e.target.value;
        }
        else {
            if (e.target.value == '')
                newVoucherDetails[i][e.target.name] = 0;
            else {
                newVoucherDetails[i][e.target.name] = parseFloat(e.target.value);
            }
        }
        setVoucherDetails(newVoucherDetails);
    }

    let addVoucherDetail = () => {
        setVoucherDetails([...voucherDetails, { AccountCode: null, Narration: null, DebitAmount: 0, CreditAmount: 0 }]);
    }

    let removeVoucerDetail = (i) => {
        if (i > 0) {
            const newVoucherDetails = [...voucherDetails];
            newVoucherDetails.splice(i, 1);
            setVoucherDetails(newVoucherDetails)
        }
    }

    // Utility Functions
    function getFormattedDate(date) {
        const dt = new Date(date);
        const options = { timeZone: 'Asia/Karachi', month: 'long', day: 'numeric', year: 'numeric' };
        return dt.toLocaleDateString('en-US', options);
    }

    function invalidButtonState() {
        if (!branchFetched || !periodFetched || !accountsFetched) {
            return true;
        }
        if (branch == null || period == null || vtype == null) {
            return true;
        }
        return false;
    }

    return (
        <div className=" bg-slate-50 z-20" >
            <motion.div initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }} className=" relative flex flex-col mt-14 items-center h-screen w-screen bg-slate-50 overflow-auto">

                <h3 className=" text-black text-3xl font-bold mt-10 mb-6 ">Create Voucher</h3>

                {/* Top Level Form */}
                <form className="flex flex-col items-center rounded-xl" onSubmit={handleFormSubmit}>
                    <div className=" w-auto flex flex-col items-center">
                        <div className="w-full flex md:flex-row flex-col -mx-1">
                            <div className="w-full px-3 py-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Branch
                                </label>
                                <SelectDownV2 isLoading={branchFetched ? false : true} options={branchOptions} setChange={setBranch} value={branch} placeholder={"Select Branch"} />
                            </div>
                            <div className="w-full px-3 py-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Period
                                </label>
                                <SelectDownV2 options={periodOptions} value={period} setChange={setPeriod} placeholder={'Select Period'} isLoading={periodFetched ? false : true} />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row -mx-1">
                            <div className="w-full px-3 py-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Voucher Type
                                </label>
                                <SelectDownV2 options={voucherOptions} value={vtype} setChange={setVType} placeholder={'Select type'} isLoading={false} />
                            </div>

                            <div className="w-full px-3 py-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-card-number">
                                    Transaction Date
                                </label>
                                <DatePicker
                                    className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                                leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500"
                                    selected={date} onChange={(ddate) => {
                                        changeDate(ddate);
                                    }} />
                            </div>
                        </div>

                        <div className="flex md:flex-row flex-col -mx-1">
                            <div className="w-full px-3 py-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Particulars
                                </label>
                                <input name="Particulars" onChange={(e) => setParticulars(e.target.value)} value={particulars} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                          leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="Description" />
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className=" h-px my-8 w-2/5 bg-black border-black" />

                    <div className=" flex flex-col md:flex-row md:space-x-12 items-center my-4">
                        <label className="block uppercase tracking-wide text-gray-900 text-sm font-bold mb-2" htmlFor="grid-first-name">
                            Total Debit - {totals.TotalDebit}
                        </label>

                        <label className="block uppercase tracking-wide text-gray-900 text-sm font-bold mb-2" htmlFor="grid-first-name">
                            Total Credit - {totals.TotalCredit}
                        </label>

                        <label className="block uppercase tracking-wide text-gray-900 text-sm font-bold mb-2" htmlFor="grid-first-name">
                            Difference - {totals.TotalDifference}
                        </label>
                    </div>

                    <AnimatePresence>
                        {voucherDetails.map((vDetail, index) => {
                            return (
                                <motion.div key={index} initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{ duration: 0.5 }} className=" py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
                                    space-y-5 md:space-y-0
                                    justify-center">
                                    <div className=" w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                            Account
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
                                            options={accounts}
                                            isLoading={accountsFetched ? false : true}
                                            onChange={(value) => { handleAccountCodeChange(index, value.value) }}
                                            placeholder={'Acc Code'}
                                        />
                                    </div>

                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                            Narration
                                        </label>
                                        <input name="Narration" onChange={(e) => handleChange(index, e)} value={voucherDetails[index].Narration} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                          leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="Description" />
                                    </div>

                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                            Debit Amount
                                        </label>
                                        <input name="DebitAmount"
                                            disabled={voucherDetails[index].CreditAmount != 0 ? true : false}
                                            onChange={(e) => {
                                                handleChange(index, e);
                                            }} value={voucherDetails[index].DebitAmount} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                          leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="number" placeholder="Debit" />
                                    </div>

                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                            Credit Amount
                                        </label>
                                        <input
                                            name="CreditAmount"
                                            disabled={voucherDetails[index].DebitAmount != 0 ? true : false}
                                            onChange={(e) => handleChange(index, e)} value={voucherDetails[index].CreditAmount} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                          leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="number" placeholder="Credit" />
                                    </div>

                                </motion.div>)
                        })}
                    </AnimatePresence>
                    <div className="flex flex-row justify-center space-x-5">
                        <img className="cursor-pointer" src={add} alt="plus" width={50} onClick={addVoucherDetail} />
                        <img className="cursor-pointer" src={remove} alt="minus" width={50} onClick={() => removeVoucerDetail(voucherDetails.length - 1)} />
                    </div>

                    <div className="flex justify-center px-4 py-4">
                        <button
                            disabled={invalidButtonState()}
                            className='px-4 py-2 mt-4 bg-SubmitPDF hover:bg-SubmitPDFHover font-semibold text-white rounded-lg'>Create Voucher</button>
                    </div>
                </form>

                {/* List of Vouchers */}
                <h3 className=" text-black text-3xl font-bold mt-9 mb-4 ">Existing Vouchers</h3>

                {vouchersFetched ? <ul className="mt-10 mb-32 w-8/12 grid grid-cols-1">
                    {vouchers.map((v) => (
                        <li key={v.VoucherNumber} className="m-2">
                            <div className={`bg-white
                             rounded-lg p-4 flex flex-row justify-between items-center`}>
                                <div className=" mr-6">
                                    <div className="text-lg text-black font-bold">
                                        V#{v.VoucherNumber} - {getFormattedDate(v.VoucherDate)}</div>
                                    <div className="text-gray-500 flex flex-col md:flex-row">
                                        <div className=" text-black flex font-bold flex-row">
                                            <h6 className=" text-gray-500 font-bold mr-2">Created By:</h6>
                                            {v.CreatedBy}
                                        </div>
                                        {v.PostedBy != null && <div className="text-gray-500 flex flex-row md:ml-2">
                                            <h6 className=" font-bold mr-2">Posted By:</h6>
                                            {v.PostedBy}
                                        </div>}
                                    </div>

                                    <div className=" text-black flex font-bold  flex-col md:flex-row">
                                        <h6 className=" text-gray-500 font-bold mr-2">Particulars:</h6>
                                        {v.Particulars}
                                    </div>

                                    {v.Details.length > 0 &&
                                        <div className=" flex flex-col p-2 text-black">

                                            {v.Details.map((vd) => (
                                                <li className="m-2 flex flex-col md:flex-row space-x-2 ">
                                                    <div className=" flex">
                                                        <h6 className=" text-gray-500 font-bold mr-2">Account Code:</h6>
                                                        {vd.AccountCode}
                                                    </div>

                                                    <div className=" flex">
                                                        <h6 className=" text-gray-500 font-bold mr-2">{vd.DebitAmount != 0 ? 'Debit' : 'Credit'}</h6>
                                                        {vd.DebitAmount != 0 ? vd.DebitAmount : vd.CreditAmount}
                                                    </div>

                                                    <div className=" flex">
                                                        <h6 className=" text-gray-500 font-bold mr-2">Narration:</h6>
                                                        {vd.Narration}
                                                    </div>
                                                </li>
                                            ))}
                                        </div>
                                    }
                                </div>
                                {v.PostedBy == null && <div className=" flex flex-col space-y-2">
                                    {/* Post / Delete Button */}
                                    <button
                                        className="bg-SubmitPDF hover:bg-SubmitPDFHover text-white px-4 py-2 rounded-md"
                                        onClick={() => { handleVoucherToggle(v.VoucherNumber) }}>
                                        Post
                                    </button> :
                                    <button
                                        className="bg-CancelExcel hover:bg-CancelExcelHovertext-white px-4 py-2 rounded-md"
                                        onClick={() => { handleVoucherDelete(v.VoucherNumber) }}>
                                        Delete
                                    </button>
                                </div>}
                            </div>
                        </li>
                    ))}
                </ul> : <div className=" mb-32 mt-4 text-black">
                    {(branch != null && period != null && vtype != null) ? <LoaderAnimation /> : "Please Select a Criteria for Voucher Display"}
                </div>}
            </motion.div>
        </div >
    )
}