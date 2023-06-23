import { useState, useEffect } from 'react';
import { baseURL } from "../utils/constants"
import { format } from 'date-fns'
import { motion } from "framer-motion";
import LoaderAnimation from "../utils/loader";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';

export default function DebitCredit() {
    const [date, changeDate] = useState(new Date())
    const [formattedDate, setFormattedDate] = useState(null)
    const [debitCredit, setDebitCredit] = useState(null)
    const [screenDimensions, setScreenDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const [debitCreditFetched, setDebitCreditFetched] = useState(null)

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

    useEffect(() => {
        const convertedDate = date.toLocaleDateString('en-US', { timeZone: 'Asia/Karachi' });
        const formattedDate = format(new Date(convertedDate), 'yyyy-MM-dd');
        setFormattedDate(formattedDate)
    }, [date])

    useEffect(() => {
        if (formattedDate != null) {
            getDebitCredit()
        }
    }, [formattedDate])

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
        <div className=" bg-slate-50 z-20">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className=" mt-14 flex flex-col items-center bg-slate-50 h-screen w-screen overflow-auto ">

                <main className="flex-1 p-5 mt-6">
                    <div className="flex flex-col items-center bg-white text-black rounded shadow p-5">
                        <h2 className="text-lg font-bold mb-5">Debit Credit - Past 7 Months</h2>
                        {debitCreditFetched ?
                            <ResponsiveContainer height={screenDimensions.height * 0.7} width={screenDimensions.width * 0.7}>
                                <BarChart data={debitCredit}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Debit" fill="#8884d8" />
                                    <Bar dataKey="Credit" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer> : <LoaderAnimation />
                        }
                    </div>
                </main>
            </motion.div>
        </div >)
}