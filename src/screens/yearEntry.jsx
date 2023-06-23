import { motion } from "framer-motion";
import { useState, useEffect } from "react"
import { baseURL } from "../utils/constants"
import Swal from "sweetalert2";
import LoaderAnimation from "../utils/loader";

export default function YearEntry() {

    const [yearName, setYearName] = useState({ YearName: '' })
    const [years, setYears] = useState([])
    const [yearsFetched, setYearsFetched] = useState(false);

    useEffect(() => {
        getYears();
    }, [])

    const handleInputChange = (e) => {
        setYearName({ [e.target.name]: e.target.value });
    };

    const handleYearToggle = async (YearCode) => {
        Swal.showLoading()
        return await fetch(`${baseURL}/api/year/${YearCode}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async data => {
            Swal.hideLoading()
            if (data.ok) {
                getYears()
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

    const getYears = async () => {
        setYearsFetched(false)
        return await fetch(`${baseURL}/api/year?activeonly=false`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                setYears(await data.json())
                setYearsFetched(true);
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        const year = yearName;
        Swal.showLoading()

        const res = await postYear(year)

        // Handling Reponse Accordingly
        if (res.Success) {
            setYearName({ YearName: '' })
            Swal.hideLoading()
            getYears() // Updating Current Years Display
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

    async function postYear(year) {
        return await fetch(`${baseURL}/api/year`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(year),
        })
            .then(async response => {
                const success = response.ok
                response = await response.json()
                return { Success: success, Message: response.Message }
            })
            .catch(err => { console.log(err) })
    }

    const handleYearDelete = async (yearName) => {
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
                const response = await deleteYear(yearName)
                Swal.hideLoading()
                if (response.Success) {
                    getYears();
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
    async function deleteYear(yearName) {
        return await fetch(`${baseURL}/api/year?yearName=${yearName}`, {
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

    return (
        <div className=" bg-slate-50 z-20">
            <motion.div initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }} className=" flex flex-col mt-14 items-center h-screen w-screen bg-slate-50 overflow-auto">
                <h3 className=" text-black text-3xl font-bold mt-14 mb-6 ">Year Entry</h3>
                <form className="justify-center rounded-xl" onSubmit={handleFormSubmit}>
                    <div className="flex md:flex-row flex-col -mx-1">
                        <div className="w-full px-3 py-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Year Name
                            </label>
                            <input value={yearName.YearName} name="YearName" onChange={handleInputChange} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                          leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="Description" />
                        </div>
                    </div>

                    <div className="flex justify-center px-4 py-4">
                        <button className='px-4 py-2 bg-orange-400 font-semibold text-white rounded-lg'>Insert Year</button>
                    </div>
                </form>

                <h3 className=" text-black text-3xl font-bold mt-9 mb-1">Current Years</h3>

                {/* Years Fetched */}
                {yearsFetched ? years.length < 1 ? <h4 className=" text-black text-2xl font-semibold mt-9 mb-1">Whoops! Nothing to show here</h4> : <ul className="mt-10 mb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center md:justify-center">
                    {years.map((year, index) => (
                        <li key={year.YearCode} className="m-2">
                            <div className="bg-white rounded-lg p-5 flex justify-between items-center">
                                <div className=" mr-6">
                                    <div className="text-lg text-black font-bold">
                                        {year.YearName}</div>
                                    <div className="text-gray-500 flex flex-row">
                                        <h6 className=" font-bold mr-2">YearCode:</h6>
                                        {year.YearCode}</div>
                                    <div className="text-gray-500 flex flex-row">
                                        <h6 className=" font-bold mr-2">Status:</h6>
                                        {year.YearStatus ? 'Active' : 'Inactive'}</div>
                                </div>
                                <div className=" flex flex-col">
                                    {/* Disable Button */}
                                    <button
                                        className="bg-SubmitPDF hover:bg-SubmitPDFHover text-white px-4 py-2 rounded-md mb-2"
                                        onClick={() => handleYearToggle(year.YearCode)}>
                                        {year.YearStatus ? 'Close' : 'Open'}
                                    </button>
                                    {/* Remove Button */}
                                    <button
                                        className="bg-CancelExcel hover:bg-CancelExcelHover text-white px-4 py-2 rounded-md"
                                        onClick={() => handleYearDelete(year.YearName)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul> : <LoaderAnimation />}
            </motion.div>
        </div>
    )
}