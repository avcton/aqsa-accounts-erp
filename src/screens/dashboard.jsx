import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const data = [
        { name: 'Jan', Debit: 4000, Credit: 2400 },
        { name: 'Feb', Debit: 3000, Credit: 1398 },
        { name: 'Mar', Debit: 2000, Credit: 9800 },
        { name: 'Apr', Debit: 2780, Credit: 3908 },
        { name: 'May', Debit: 1890, Credit: 4800 },
        { name: 'Jun', Debit: 2390, Credit: 3800 },
        { name: 'Jul', Debit: 3490, Credit: 4300 },
    ];

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
                        <h2 className="text-xl font-bold mb-5"> Total Revenue</h2>
                        <p className="text-3xl font-bold">Rs 100,000</p>
                    </div>
                    {/* Accounts Payable */}
                    <div className=" flex flex-col justify-center items-center bg-white text-black rounded shadow p-5">
                        <h2 className="text-xl font-bold mb-5">Accounts Payable</h2>
                        <p className="text-3xl font-bold">Rs 6,000</p>
                    </div>
                    {/* Accounts Receivable */}
                    <div className=" flex flex-col justify-center items-center bg-white text-black rounded shadow p-5">
                        <h2 className="text-xl font-bold mb-5">Accounts Receivable</h2>
                        <p className="text-3xl font-bold">Rs 11,000</p>
                    </div>
                </div>

                {/* Graphs */}
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10 md:gap-10 mt-10 mr-20 mb-20">
                    <div className="bg-white text-black rounded shadow p-5">
                        <h2 className="text-lg font-bold mb-5">Monthly Revenue</h2>
                        <ResponsiveContainer height={350}>
                            <BarChart data={data}>
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
                    <div className="bg-white text-black rounded shadow p-5">
                        <h2 className="text-lg font-bold mb-5">Weekly Visitors</h2>
                        <ResponsiveContainer height={350}>
                            <LineChart data={data}>
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
                            <BarChart data={data}>
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