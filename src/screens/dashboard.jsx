import { useState, useEffect } from 'react';
import { baseURL } from "../utils/constants"
import { format } from 'date-fns'
import LoaderAnimation from "../utils/loader";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const [date, changeDate] = useState(new Date())
    const [formattedDate, setFormattedDate] = useState(null)
    const [todaySales, setTodaySales] = useState(null)
    const [totalSales, setTotalSales] = useState(null)
    const [debitCredit, setDebitCredit] = useState(null)
    const [accountsPayable, setAccountsPayable] = useState(null)
    const [accountsRecievables, setAccountsRecievables] = useState(null)

    const [todaySalesFetched, setTodaySalesFetched] = useState(null)
    const [totalSalesFetched, setTotalSalesFetched] = useState(null)
    const [debitCreditFetched, setDebitCreditFetched] = useState(null)
    const [accountsPayableFetched, setAccountsPayableFetched] = useState(null)
    const [accountsRecievablesFetched, setAccountsRecievablesFetched] = useState(null)

    useEffect(() => {
        const convertedDate = date.toLocaleDateString('en-US', { timeZone: 'Asia/Karachi' });
        const formattedDate = format(new Date(convertedDate), 'yyyy-MM-dd');
        setFormattedDate(formattedDate)
    }, [date])

    useEffect(() => {
        getTodaySales()
        getDebitCredit()
        getAccountsPayable()
        getAccountsReceivables()
    }, [])

    useEffect(() => {
        if (formattedDate != null) {
            getTotalSales()
        }
    }, [formattedDate])

    useEffect(() => {
        console.log(totalSales)
    }, [totalSales])

    const getTodaySales = async () => {
        setTodaySalesFetched(false)
        return await fetch(`${baseURL}/api/incomestatement`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                setTodaySales(await data.json())
                setTodaySalesFetched(true);
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    const getAccountsPayable = async () => {
        setAccountsPayableFetched(false)
        return await fetch(`${baseURL}/api/payables`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                setAccountsPayable(await data.json())
                setAccountsPayableFetched(true);
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    const getAccountsReceivables = async () => {
        setAccountsRecievablesFetched(false)
        return await fetch(`${baseURL}/api/receivables`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                setAccountsRecievables(await data.json())
                setAccountsRecievablesFetched(true);
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    const getTotalSales = async () => {
        setTotalSalesFetched(false)
        return await fetch(`${baseURL}/api/incomestatement?currmonth=${formattedDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                setTotalSales(await data.json())
                setTotalSalesFetched(true);
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    const getDebitCredit = async () => {
        setDebitCreditFetched(false)
        return await fetch(`${baseURL}/api/trialbalance`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async data => {
                setDebitCredit(await data.json())
                setDebitCreditFetched(true);
            })
            .catch(err => console.error('An execption is caught: ', err))
    }

    return (
        <div className=" ml-20 mt-14 mr-20 flex flex-col bg-slate-50 h-screen w-screen overflow-auto ">
            <header className="bg-gray-800 p-4 h-30">
                <h1 className="text-3xl ml-2 font-bold text-white">Dashboard</h1>
            </header>
            <main className="flex-1 p-5">

                {/* Statistics */}
                <div className=" grid grid-cols-1 md:grid-cols-3 mr-20 gap-10 md:gap-10">

                    {/* Total Revenue */}
                    <div className=" flex flex-col justify-center items-center bg-white text-black rounded shadow p-5">
                        <h2 className="text-xl font-bold mb-5"> Monthly Revenue</h2>
                        {todaySalesFetched ?
                            <p className="text-3xl font-bold">Rs {todaySales}</p>
                            : <LoaderAnimation />
                        }
                    </div>

                    {/* Accounts Payable */}

                    <div className=" flex flex-col justify-center items-center bg-white text-black rounded shadow p-5">
                        <h2 className="text-xl font-bold mb-5">Accounts Payable</h2>
                        {todaySalesFetched ?
                            <p className="text-3xl font-bold">Rs {accountsPayable}</p>
                            : <LoaderAnimation />}
                    </div>

                    {/* Accounts Receivable */}
                    <div className=" flex flex-col justify-center items-center bg-white text-black rounded shadow p-5">
                        <h2 className="text-xl font-bold mb-5">Accounts Receivable</h2>
                        {todaySalesFetched ?
                            <p className="text-3xl font-bold">Rs {accountsRecievables}</p>
                            : <LoaderAnimation />}
                    </div>
                </div>

                Graphs
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10 md:gap-10 mt-10 mr-20 mb-20">
                    <div className="bg-white text-black rounded shadow p-5">
                        <h2 className="text-lg font-bold mb-5">Monthly Revenue</h2>
                        {totalSalesFetched ?
                            <ResponsiveContainer height={350}>
                                <BarChart data={totalSales}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="Name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="TotalSales" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer> : <LoaderAnimation />
                        }
                    </div>
                    <div className="bg-white text-black rounded shadow p-5">
                        <h2 className="text-lg font-bold mb-5">Trend</h2>
                        <ResponsiveContainer height={350}>
                            <LineChart data={debitCredit}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Debit" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="Credit" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white text-black rounded shadow p-5">
                        <h2 className="text-lg font-bold mb-5">Debit / Credit</h2>
                        <ResponsiveContainer height={350}>
                            <BarChart data={debitCredit}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Debit" fill="#8884d8" />
                                <Bar dataKey="Credit" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
        </div>)
}