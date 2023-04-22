import { motion } from "framer-motion";
import { useState, useEffect } from "react"
import { baseURL } from "../utils/constants"
import Swal from "sweetalert2";
import LoaderAnimation from "../utils/loader";
import Dropdown from 'react-dropdown';
import arrow from '../assets/MenuIcons/right-arrow.svg'

export default function PeriodEntry() {
  const [yearOptions, setYearOptions] = useState([])
  const [yearSelected, setYearSelected] = useState(null)
  const [yearsFetched, setYearsFetched] = useState(false)

  const [periods, setPeriods] = useState([])
  const [periodsFetched, setPeriodsFetched] = useState(false)
  const [newPeriod, setNewPeriod] = useState(
    { PeriodName: '', YearCode: '' });

  useEffect(() => {
    getYears();
  }, [])

  useEffect(() => { if (yearSelected != null) { getPeriods() } }, [yearSelected])

  const handleInputChange = (e) => {
    setNewPeriod({ ...newPeriod, [e.target.name]: e.target.value });
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    const Period = { ...newPeriod };
    Swal.showLoading()
    const YearCode = await getYearCode(yearSelected)
    Period.YearCode = YearCode
    const res = await postPeriod(Period)

    // Handling Reponse Accordingly
    if (res.Success) {
      setNewPeriod({ PeriodName: '', YearCode: '' });
      Swal.hideLoading()
      getPeriods() // Updating Current Period Display
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

  // This function gets the year code for the selected year
  async function getYearCode(YearName) {
    return await fetch(`${baseURL}/api/year?yearname=${YearName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async response => {
        const success = response.ok
        response = await response.json()
        if (success) { return response }
        return null;
      })
      .catch(err => { console.log(err) })
  }

  const getYears = async () => {
    setYearsFetched(false)
    return await fetch(`${baseURL}/api/year`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async data => {
        data = await data.json()
        data.map((value) => {
          setYearOptions((prevOptions) => [...prevOptions, value.YearName])
        })
        setYearsFetched(true);
      })
      .catch(err => console.error('An execption is caught: ', err))
  }

  async function postPeriod(Period) {
    return await fetch(`${baseURL}/api/period`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Period),
    })
      .then(async response => {
        const success = response.ok
        response = await response.json()
        return { Success: success, Message: response.Message }
      })
      .catch(err => { console.log(err) })
  }

  const getPeriods = async () => {
    setPeriodsFetched(false)
    return await fetch(`${baseURL}/api/period?yearname=${yearSelected}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async data => {
        setPeriods(await data.json())
        setPeriodsFetched(true);
      })
      .catch(err => console.error('An execption is caught: ', err))
  }

  const handlePeriodToggle = async (PeriodCode) => {
    return await fetch(`${baseURL}/api/period/${PeriodCode}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async data => {
      if (data.ok) {
        getPeriods()
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

  const handlePeriodDelete = async (periodName) => {
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
        const response = await deletePeriod(periodName)
        Swal.hideLoading()
        if (response.Success) {
          getPeriods();
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
  async function deletePeriod(periodName) {
    return await fetch(`${baseURL}/api/period?periodname=${periodName}`, {
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
    <div className=" bg-slate-50 z-20" >
      <motion.div initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }} className={` flex flex-col mt-14 relative items-center ${yearSelected == null && 'justify-center'} h-screen w-screen bg-slate-50 overflow-auto`}>
        {/* <div className=" flex flex-row  justify-center">
        <img src={arrow} onClick={() => { setYearSelected(null); setPeriodsFetched(false) }} className=" cursor-pointer rotate-180 w-2/12" /> */}
        <h3 className={` text-black text-3xl font-bold mt-14 mb-6 ${yearSelected == null && ' absolute top-0'}  `}>Period Entry</h3>
        {/* </div> */}
        {yearSelected != null ? (
          <motion.div initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }} className=" flex flex-col items-center justify-center">
            <form className="justify-center rounded-xl" onSubmit={handleFormSubmit}>
              <div className="flex md:flex-row flex-col -mx-1">
                <div className="w-full px-3 py-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                    Period Name
                  </label>
                  <input name="PeriodName" onChange={handleInputChange} className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                          leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="Description" />
                </div>
              </div>

              <div className="flex justify-center px-4 py-4">
                <button className='px-4 py-2 bg-orange-400 font-semibold text-white rounded-lg'>Insert Period</button>
              </div>
            </form>

            <h3 className=" text-black text-2xl font-bold mx-28 mt-9 mb-1">Current Periods - '{yearSelected}'</h3>
            {/* Periods Fetched */}
            {periodsFetched ? periods.length < 1 ? <h4 className=" text-black text-xl font-semibold mt-9 mb-1 mx-28">Whoops! Nothing to show here</h4> : <ul className="mt-10 mb-32 place-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {periods.map((period, index) => (
                <li key={period.PeriodCode} className="m-2">
                  <div className="bg-white rounded-lg p-5 flex justify-between items-center">
                    <div className=" mr-6">
                      <div className="text-lg text-black font-bold">
                        {period.PeriodName}</div>
                      <div className="text-gray-500 flex flex-row">
                        <h6 className=" font-bold mr-2">Status:</h6>
                        {period.PeriodStatus ? 'Active' : 'Inactive'}</div>
                    </div>
                    <div className=" flex flex-col">
                      {/* Disable Button */}
                      <button
                        className="bg-green-600 hover:bg-green-600 text-white px-4 py-2 rounded-md mb-2"
                        onClick={() => handlePeriodToggle(period.PeriodCode)}>
                        {period.PeriodStatus ? 'Close' : 'Open'}
                      </button>
                      {/* Remove Button */}
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={() => handlePeriodDelete(period.PeriodName)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul> : <LoaderAnimation />}

          </motion.div>)

          : yearsFetched ? (<div className="flex flex-col items-center w-max px-3 py-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Period Entries for Year
            </label>
            <Dropdown menuClassName=" mt-4 cursor-pointer" placeholderClassName={`${yearSelected != null ? 'text-black' : 'text-gray-400'}`} className=" appearance-textfield block w-full bg-gray-100 text-black border border-gray-300  rounded-lg py-4 px-4 mb-3 
                            leading-tight" options={yearOptions} value={yearSelected} onChange={(value) => {
                setYearSelected(value.value);
              }} placeholder="Select a Year" />;
          </div>) : <LoaderAnimation />}
      </motion.div>
    </div>
  )
}