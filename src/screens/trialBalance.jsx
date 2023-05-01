import * as React from 'react';
import { motion } from "framer-motion";
import { styled } from '@mui/material/styles'
import { format } from 'date-fns'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { baseURL } from '../utils/constants';
import LoaderAnimation from '../utils/loader';
import jsPDF from "jspdf";
import "jspdf-autotable";
import exportToCSV from '../utils/excelExport';

function filterDate(date) {
  const dt = new Date(date);
  const formattedDate = dt.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  return formattedDate;
}

const generatePDF = balance => {

  if (balance == null || balance.length < 1) {
    return
  }

  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Account Code", "Account Name", "Openning Debit", "Openning Credit", "Current Debit", "Current Credit", "Closing Debit", "Closing Credit"];
  // define an empty array of rows
  const tableRows = [];

  // for each voucher pass all its data into an array
  balance.forEach(balance => {
    const balanceData = [
      balance.AccountCode,
      balance.AccountName,
      balance.OpenningDebit,
      balance.OpenningCredit,
      balance.CurrentDebit,
      balance.CurrentCredit,
      balance.ClosingDebit,
      balance.ClosingCredit,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  // const date = Date().split(" ");

  // // we use a date string to generate our filename.
  // const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  // voucher title. and margin-top + margin-left
  doc.text(`TrialBalance_Report`, 14, 15);

  // we define the name of our PDF file.
  doc.save(`TrialBalance_Report.pdf`);
};

const generateExcelSheet = async balance => {
  if (balance == null || balance.length < 1) {
    return
  }

  // define the columns we want and their titles
  const tableColumn = ["Account Code", "Account Name", "Openning Debit", "Openning Credit", "Current Debit", "Current Credit", "Closing Debit", "Closing Credit"];
  // define an empty array of rows
  const tableRows = [];

  // for each voucher pass all its data into an array
  balance.forEach(bl => {
    const voucherData = [
      bl.AccountCode,
      bl.AccountName,
      bl.OpenningDebit,
      bl.OpenningCredit,
      bl.CurrentDebit,
      bl.CurrentCredit,
      bl.ClosingDebit,
      bl.ClosingCredit,
    ];
    // push each voucher's info into a row
    tableRows.push(voucherData);
  });

  // define an empty array to hold the new list
  const data = [];

  // iterate over the rows in tableRows
  tableRows.forEach(row => {
    // create a new object with the desired key-value pairs
    const newRow = {
      AccountCode: row[0],
      AccountName: row[1],
      OpenningDebit: row[2],
      OpenningCredit: row[3],
      CurrentDebit: row[4],
      CurrentCredit: row[5],
      ClosingDebit: row[6],
      ClosingCredit: row[7]
    };
    // add the new object to the newList array
    data.push(newRow);
  });

  exportToCSV(data, `TrialBalance_ExcelReport`);
}

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

export default function TrialBalance() {
  const [date1, changeDate1] = React.useState(new Date())
  const [date2, changeDate2] = React.useState(new Date())
  const [formattedDate1, setFormattedDate1] = React.useState(null)
  const [formattedDate2, setFormattedDate2] = React.useState(null)
  const [Balance, setBalance] = React.useState(null)
  const accountTypes = ["Openning", "Current", "Closing"];
  const [formattedBalance, setFormattedBalance] = React.useState([])
  const [formattedBalanceFetched, setFormattedBalanceFetched] = React.useState([])

  // Date Converter
  React.useEffect(() => {
    const convertedDate = date1.toLocaleDateString('en-US', { timeZone: 'Asia/Karachi' });
    const formattedDate = format(new Date(convertedDate), 'yyyy-MM-dd');
    setFormattedDate1(formattedDate)
  }, [date1])

  React.useEffect(() => {
    const convertedDate = date2.toLocaleDateString('en-US', { timeZone: 'Asia/Karachi' });
    const formattedDate = format(new Date(convertedDate), 'yyyy-MM-dd');
    setFormattedDate2(formattedDate)
  }, [date2])

  React.useEffect(() => {
    if (Balance != null) {
      const formattedData = []
      for (let i = 0; i < Math.max(Balance.Openning.length, Balance.Current.length, Balance.Closing.length); i++) {
        const row = {
          AccountCode: Balance.Openning?.[i]?.AccountCode
            ?? Balance.Current?.[i]?.AccountCode
            ?? Balance.Closing?.[i]?.AccountCode,
          AccountName: Balance.Openning?.[i]?.AccountName
            ?? Balance.Current?.[i]?.AccountName
            ?? Balance.Closing?.[i]?.AccountName,
          OpenningDebit: Balance.Openning?.[i]?.TotalAccDebit ?? 0,
          OpenningCredit: Balance.Openning?.[i]?.TotalAccCredit ?? 0,
          CurrentDebit: Balance.Current?.[i]?.TotalAccDebit ?? 0,
          CurrentCredit: Balance.Current?.[i]?.TotalAccCredit ?? 0,
          ClosingDebit: Balance.Closing?.[i]?.TotalAccDebit ?? 0,
          ClosingCredit: Balance.Closing?.[i]?.TotalAccCredit ?? 0,
        }
        formattedData.push(row)
      }
      setFormattedBalance(formattedData)
      setFormattedBalanceFetched(true)
    }
  }, [Balance])

  React.useEffect(() => {
    if (formattedDate1 != null) {
      getBalance()
    }
    else if (formattedDate2 != null) {
      getBalance()
    }
  }, [formattedDate1, formattedDate2])

  const getBalance = async () => {
    setFormattedBalanceFetched(false)
    return await fetch(`${baseURL}/api/trialbalance?start=${formattedDate1}&end=${formattedDate2}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async data => {
        data = await data.json()
        setBalance(data)
      })
      .catch(err => console.error('An execption is caught: ', err))
  }

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

          <h3 className=" text-black text-3xl font-bold mb-6 mt-14 ">Trial Balance</h3>

          <div className=' flex flex-row justify-center space-x-4'>
            <div className=' flex flex-col items-center'>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                From Date
              </label>
              <DatePicker
                className="appearance-textfield block w-min bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                                leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500"
                selected={date1} onChange={(ddate) => {
                  changeDate1(ddate);
                }} />
            </div>
            <div className=' flex flex-col items-center'>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                Till Date
              </label>
              <DatePicker
                className="appearance-textfield block w-min bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                                leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500"
                selected={date2} onChange={(ddate) => {
                  changeDate2(ddate);
                }} />
            </div>
          </div>

          {formattedBalanceFetched ? <TableContainer component={Paper}>
            <Table sx={{ minWidth: 900, }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center' colSpan={2} >Account</StyledTableCell>
                  <StyledTableCell align='center' colSpan={2} style={{ marginRight: '20px' }} >Openning</StyledTableCell>
                  <StyledTableCell align='center' colSpan={2} >Current</StyledTableCell>
                  <StyledTableCell align='center' colSpan={2} >Closing</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align='center'>Account Code</StyledTableCell>
                  <StyledTableCell align='center' style={{ borderRight: '1px solid white' }}>Account Name</StyledTableCell>
                  <StyledTableCell align='center'>Debit</StyledTableCell>
                  <StyledTableCell align='center' style={{ borderRight: '1px solid white' }}>Credit</StyledTableCell>
                  <StyledTableCell align='center'>Debit</StyledTableCell>
                  <StyledTableCell align='center' style={{ borderRight: '1px solid white' }}>Credit</StyledTableCell>
                  <StyledTableCell align='center'>Debit</StyledTableCell>
                  <StyledTableCell align='center'>Credit</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  formattedBalance.map((balance, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {balance.AccountCode}
                      </StyledTableCell>
                      <StyledTableCell align='center'>{balance.AccountName}</StyledTableCell>
                      <StyledTableCell align='center'>{balance.OpenningDebit}</StyledTableCell>
                      <StyledTableCell align='center'>{balance.OpenningCredit}</StyledTableCell>
                      <StyledTableCell align='center'>{balance.CurrentDebit}</StyledTableCell>
                      <StyledTableCell align='center'>{balance.CurrentCredit}</StyledTableCell>
                      <StyledTableCell align='center'>{balance.ClosingDebit}</StyledTableCell>
                      <StyledTableCell align='center'>{balance.ClosingCredit}</StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer> : <LoaderAnimation />}

          <div className=' flex md:flex-row flex-col'>
            {/* PDF Button */}
            <button
              disabled={formattedBalanceFetched ? false : true}
              className="bg-SubmitPDF hover:bg-SubmitPDFHover text-white px-4 py-2 rounded-md mb-2 mr-2"
              onClick={() => { generatePDF(formattedBalance) }}>
              Downlaod as PDF
            </button>
            {/* Excel Button */}
            <button
              disabled={formattedBalanceFetched ? false : true}
              className="bg-CancelExcel hover:bg-CancelExcelHover text-white px-4 py-2 rounded-md mb-2"
              onClick={() => { generateExcelSheet(formattedBalance) }}>
              Download as Excel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}