import * as React from 'react';
import { motion } from "framer-motion";
import { styled } from '@mui/material/styles'
import { format } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css";;
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { baseURL } from '../utils/constants';
import LoaderAnimation from '../utils/loader';
import "jspdf-autotable";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#4B5563',
        color: theme.palette.common.white,
        padding: '16px', // add padding to the header cells
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: '16px', // add padding to the body cells
    },
}));

const StyledTableRow = styled(TableRow)(({ theme, highlight }) => ({
    ...({ // add a conditional statement to change the background color of the row
        backgroundColor: highlight,
    }),
    '&:hover': { // add a hover effect to the table rows
        backgroundColor: '#CBD5E1',
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function ExpiredVouchers() {
    const [vouchers, setVouchers] = React.useState([])
    const [vouchersFetched, setVouchersFetched] = React.useState([])

    const getVouchers = async () => {
        setVouchersFetched(false)
        return await fetch(`${baseURL}/api/voucher`, {
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

    React.useState(() => {
        getVouchers()
    }, [])

    function filterNullValue(value) {
        if (value == null) {
            return ''
        }
        return value;
    }

    // function highlightWhatColor(account) {
    //   if (account.AccountType == null) {
    //     // Level 1 Account
    //     return '#a9dde8'
    //   }
    //   else if (account.AccountGroup == null) {
    //     // Level 2 Account
    //     return '#FCC29A'
    //   }
    //   return '#FDE9C9'
    // }

    return (
        <div className=" bg-slate-50 z-20">
            <motion.div initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }} className=" flex flex-col mt-14 ml-20 md:ml-0 items-center h-screen w-screen bg-slate-50 overflow-auto">
                <div className=' flex flex-col space-y-5 items-center justify-center mb-32'>

                    <h3 className=" text-black text-3xl font-bold mb-6 mt-14 ">List of Expired Vouchers</h3>

                    {vouchersFetched ? <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 350, }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align='center'>Voucher Number</StyledTableCell>
                                    <StyledTableCell align='center'>Period</StyledTableCell>
                                    <StyledTableCell align='center'>Voucher Date</StyledTableCell>
                                    <StyledTableCell align='center'>Particulars</StyledTableCell>
                                    <StyledTableCell align='center'>Amount</StyledTableCell>
                                    <StyledTableCell align='center'>Created By</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    vouchers.map((voucher) => (
                                        <StyledTableRow key={voucher.VoucherNumber}>
                                            <StyledTableCell component="th" scope="row">
                                                {voucher.VoucherNumber}
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>{voucher.PeriodName}</StyledTableCell>
                                            <StyledTableCell align='center'>{format(new Date(voucher.VoucherDate), "yyyy-MM-dd")}</StyledTableCell>
                                            <StyledTableCell align='center'>{filterNullValue(voucher.Particulars)}</StyledTableCell>
                                            <StyledTableCell align='center'>{voucher.Amount}</StyledTableCell>
                                            <StyledTableCell align='center'>{voucher.CreatedBy}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer> : <LoaderAnimation />}
                </div>
            </motion.div>
        </div>
    );
}