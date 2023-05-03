import { useState, useEffect } from 'react';
import { baseURL } from "../utils/constants"
import { format } from 'date-fns'
import chroma from 'chroma-js';
import LoaderAnimation from "../utils/loader";

import { Pie, PieChart, Label, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const [date, changeDate] = useState(new Date())
    const [formattedDate, setFormattedDate] = useState(null)
    const [todaySales, setTodaySales] = useState(null)
    const [totalSales, setTotalSales] = useState(null)
    const [accountsPayable, setAccountsPayable] = useState(null)
    const [accountsRecievables, setAccountsRecievables] = useState(null)
    const [data, setData] = useState(null)

    const [dataFetched, setDataFetched] = useState(false)
    const [todaySalesFetched, setTodaySalesFetched] = useState(false)
    const [totalSalesFetched, setTotalSalesFetched] = useState(false)
    const [accountsPayableFetched, setAccountsPayableFetched] = useState(false)
    const [accountsRecievablesFetched, setAccountsRecievablesFetched] = useState(false)
    const [screenDimensions, setScreenDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [colorScale, setColorScale] = useState([]);

    useEffect(() => {
        const convertedDate = date.toLocaleDateString('en-US', { timeZone: 'Asia/Karachi' });
        const formattedDate = format(new Date(convertedDate), 'yyyy-MM-dd');
        setFormattedDate(formattedDate)
    }, [date])

    useEffect(() => {
        getTodaySales()
        getAccountsPayable()
        getAccountsReceivables()
    }, [])

    useEffect(() => {
        if (formattedDate != null) {
            getTotalSales()
        }
    }, [formattedDate])

    useEffect(() => {
        if (data != null) {
            setColorScale(chroma.scale(['#7681b1', '#b187b6']).colors(data.length))
        }
    }, [data])

    useEffect(() => {
        if (accountsPayable != null && accountsRecievables != null && todaySales != null) {
            setData([
                { name: 'Sales', value: todaySales },
                { name: 'Payables', value: accountsPayable },
                { name: 'Receivables', value: accountsRecievables },
            ])
            setDataFetched(true)
        }
    }, [accountsPayable, accountsRecievables, todaySales])

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

    function getFormattedBalance(Balance) {
        return Balance < 0 ? `(${Balance * -1})` : Balance;
    }

    const getRandomColor = () => {
        const colors = ['#1f77b4', '#2ca02c', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
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
                            <p className="text-3xl font-bold">Rs {getFormattedBalance(todaySales)}</p>
                            : <LoaderAnimation />
                        }
                    </div>

                    {/* Accounts Payable */}

                    <div className=" flex flex-col justify-center items-center bg-white text-black rounded shadow p-5">
                        <h2 className="text-xl font-bold mb-5">Accounts Payable</h2>
                        {accountsPayableFetched ?
                            <p className="text-3xl font-bold">Rs {getFormattedBalance(accountsPayable)}</p>
                            : <LoaderAnimation />}
                    </div>

                    {/* Accounts Receivable */}
                    <div className=" flex flex-col justify-center items-center bg-white text-black rounded shadow p-5">
                        <h2 className="text-xl font-bold mb-5">Accounts Receivable</h2>
                        {accountsRecievablesFetched ?
                            <p className="text-3xl font-bold">Rs {getFormattedBalance(accountsRecievables)}</p>
                            : <LoaderAnimation />}
                    </div>
                </div>

                {/* Graphs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10 mt-10 mr-20 mb-20">
                    <div className="flex flex-col items-center bg-white text-black rounded shadow p-5">
                        <h2 className="text-lg font-bold mb-5">Sales Trend</h2>
                        {totalSalesFetched ?
                            <ResponsiveContainer height={screenDimensions.height * 0.5}>
                                <LineChart data={totalSales}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="Name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="TotalSales" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer> : <LoaderAnimation />
                        }
                    </div>
                    <div className="flex flex-col items-center bg-white text-black rounded shadow p-5">
                        <h2 className="text-lg font-bold mb-5">Monthly Segementation</h2>
                        {dataFetched ?
                            <ResponsiveContainer height={screenDimensions.height * 0.5}>
                                <PieChart width={400} >
                                    <Pie
                                        data={data}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colorScale[index]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer> : <LoaderAnimation />
                        }
                    </div>
                </div>
            </main>
        </div>)
}