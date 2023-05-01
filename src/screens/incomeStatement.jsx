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

const generatePDF = balance => {

  if (balance == null || balance.length < 1) {
    return
  }

  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Account Description", "Account Code", "Account Balance"];
  // define an empty array of rows
  const tableRows = [];

  // Sales 
  var balanceData = [
    null,
    "Sales",
    null
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  balance.Sales.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // Total Sales
  balanceData = [
    null,
    "Total Sales",
    balance.TotalSales
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // COGs
  balance.COGS.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // Total Net Cost of Sale
  balanceData = [
    null,
    "Net Cost of Sale",
    balance.NetCostofSale
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Expenses
  balance.Expenses.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // Total Expenses
  balanceData = [
    null,
    "Total Expenses",
    balance.TotalExpenses
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Total Net Profit
  balanceData = [
    null,
    "Net Profit",
    balance.NetProfit
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  // voucher title. and margin-top + margin-left
  doc.text(`Income Statement`, 14, 15);

  // we define the name of our PDF file.
  doc.save(`IncomeStatement.pdf`);
}

const generateExcelSheet = async balance => {
  if (balance == null || balance.length < 1) {
    return
  }

  // define the columns we want and their titles
  const tableColumn = ["Account Code", "Account Name", "Openning Debit", "Openning Credit", "Current Debit", "Current Credit", "Closing Debit", "Closing Credit"];
  // define an empty array of rows
  const tableRows = [];

  // Sales 
  var balanceData = [
    null,
    "Sales",
    null
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  balance.Sales.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // Total Sales
  balanceData = [
    null,
    "Total Sales",
    balance.TotalSales
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // COGs
  balance.COGS.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // Total Net Cost of Sale
  balanceData = [
    null,
    "Net Cost of Sale",
    balance.NetCostofSale
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Expenses
  balance.Expenses.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // Total Expenses
  balanceData = [
    null,
    "Total Expenses",
    balance.TotalExpenses
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Total Net Profit
  balanceData = [
    null,
    "Net Profit",
    balance.NetProfit
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // define an empty array to hold the new list
  const data = [];

  // iterate over the rows in tableRows
  tableRows.forEach(row => {
    // create a new object with the desired key-value pairs
    const newRow = {
      AccountName: row[0],
      AccountCode: row[1],
      Amount: row[2],
    };
    // add the new object to the newList array
    data.push(newRow);
  });

  exportToCSV(data, `IncomeStatement_ExcelReport`);
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

export default function IncomeStatement() {
  const [date1, changeDate1] = React.useState(new Date())
  const [date2, changeDate2] = React.useState(new Date())
  const [formattedDate1, setFormattedDate1] = React.useState(null)
  const [formattedDate2, setFormattedDate2] = React.useState(null)
  const [IncomeStatement, setIncomeStatement] = React.useState(null)
  const [IncomeStatementFetched, setIncomeStatementFetched] = React.useState(false)

  React.useEffect(() => {
    if (formattedDate1 != null && formattedDate2 != null) {
      getIncomeStatement()
    }
  }, [formattedDate1, formattedDate2])

  React.useEffect(() => {
    const convertedDate = date1.toLocaleDateString('en-US', { timeZone: 'Asia/Karachi', month: 'long', day: 'numeric', year: 'numeric' });
    setFormattedDate1(convertedDate)
  }, [date1])

  React.useEffect(() => {
    const convertedDate = date1.toLocaleDateString('en-US', { timeZone: 'Asia/Karachi', month: 'long', day: 'numeric', year: 'numeric' });
    setFormattedDate2(convertedDate)
  }, [date2])

  const getIncomeStatement = async () => {
    setIncomeStatementFetched(false)
    return await fetch(`${baseURL}/api/incomestatement?start=${formattedDate1}&end=${formattedDate2}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async data => {
        data = await data.json()
        setIncomeStatement(data)
        setIncomeStatementFetched(true)
      })
      .catch(err => console.error('An execption is caught: ', err))
  }

  // Utility Functions
  function getFormattedDate(date, expanded) {
    const dt = new Date(date);
    const options = { timeZone: 'Asia/Karachi', month: expanded ? 'long' : 'numeric', day: 'numeric', year: 'numeric' };
    return dt.toLocaleDateString('en-US', options);
  }

  function getFormattedBalance(Balance) {
    return Balance < 0 ? `(${Balance * -1})` : Balance;
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

          <h3 className=" text-black text-4xl font-bold mb-6 mt-14 ">Income Statement</h3>

          <div className=' flex flex-row justify-center space-x-4'>
            <div className=' flex flex-col items-center'>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                Period Start
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
                Period End
              </label>
              <DatePicker
                className="appearance-textfield block w-min bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                                leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500"
                selected={date2} onChange={(ddate) => {
                  changeDate2(ddate);
                }} />
            </div>
          </div>

          {IncomeStatementFetched && <h2 className=" text-black text-xl font-bold mb-6 mt-14 ">{formattedDate1} To {formattedDate2} </h2>}

          {IncomeStatementFetched ?
            <div className=' flex flex-col items-center'>

              <TableContainer component={Paper}>
                <Table sx={{ width: 950, }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align='center' colSpan={3} >Income Statement</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell align='center'>Account Description</StyledTableCell>
                      <StyledTableCell align='center' style={{ borderLeft: '2px solid white' }}>Account Code</StyledTableCell>
                      <StyledTableCell align='center' style={{ borderLeft: '2px solid white' }}>Amount</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      <>
                        {/* Sales */}
                        <TableRow>
                          <StyledTableCell align='center'
                            style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                            colSpan={3}>Sales</StyledTableCell>
                        </TableRow>

                        {IncomeStatement.Sales.map((acc, index) => {
                          return <StyledTableRow>
                            <StyledTableCell align='center'>
                              {acc.AccountName}
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              {acc.AccountCode}
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              {getFormattedBalance(acc.Balance)}
                            </StyledTableCell>
                          </StyledTableRow>
                        })}

                        {/* Total Sales */}
                        <TableRow>
                          <StyledTableCell align='center' colSpan={2}
                            style={{ fontWeight: 'bold', fontSize: '1.1em' }}
                          >Total Sales</StyledTableCell>
                          <StyledTableCell align='center' colSpan={1}
                            style={{ fontWeight: 'bold', fontSize: '1.1em' }}
                          >{getFormattedBalance(IncomeStatement.TotalSales)}</StyledTableCell>
                        </TableRow>

                        {/* COGS */}
                        <TableRow>
                          <StyledTableCell align='center'
                            style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                            colSpan={3}>Cost of Goods Sold</StyledTableCell>
                        </TableRow>

                        {IncomeStatement.COGS.map((acc, index) => {
                          return <StyledTableRow>
                            <StyledTableCell align='center'>
                              {acc.AccountName}
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              {acc.AccountCode}
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              {getFormattedBalance(acc.Balance)}
                            </StyledTableCell>
                          </StyledTableRow>
                        })}

                        {/* Total COGS */}
                        <TableRow>
                          <StyledTableCell align='center' colSpan={2}
                            style={{ fontWeight: 'bold', fontSize: '1.1em' }}
                          >Net Cost of Sales</StyledTableCell>
                          <StyledTableCell align='center' colSpan={1}
                            style={{ fontWeight: 'bold', fontSize: '1.1em' }}
                          >{getFormattedBalance(IncomeStatement.NetCostofSale)}</StyledTableCell>
                        </TableRow>

                        {/* Expenses */}
                        <TableRow>
                          <StyledTableCell align='center'
                            style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                            colSpan={3}>Expenses</StyledTableCell>
                        </TableRow>

                        {IncomeStatement.Expenses.map((acc, index) => {
                          return <StyledTableRow>
                            <StyledTableCell align='center'>
                              {acc.AccountName}
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              {acc.AccountCode}
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              {getFormattedBalance(acc.Balance)}
                            </StyledTableCell>
                          </StyledTableRow>
                        })}

                        {/* Total Equity */}
                        <TableRow>
                          <StyledTableCell align='center' colSpan={2}
                            style={{ fontWeight: 'bold', fontSize: '1.1em' }}
                          >Total Expenses</StyledTableCell>
                          <StyledTableCell align='center' colSpan={1}
                            style={{ fontWeight: 'bold', fontSize: '1.1em' }}
                          >{getFormattedBalance(IncomeStatement.TotalExpenses)}</StyledTableCell>
                        </TableRow>

                        {/* Total Equity + Liabilities */}
                        <TableRow>
                          <StyledTableCell align='center' colSpan={2}
                            style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                          >Net Profit</StyledTableCell>
                          <StyledTableCell align='center' colSpan={1}
                            style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                          >{getFormattedBalance(IncomeStatement.NetProfit)}</StyledTableCell>
                        </TableRow>

                      </>
                    }
                  </TableBody>
                </Table>
              </TableContainer>

              <div className=' flex md:flex-row flex-col mt-6'>
                {/* PDF Button */}
                <button
                  // disabled={vouchersFetched ? false : true}
                  className="bg-SubmitPDF hover:bg-SubmitPDFHover text-white px-4 py-2 rounded-md mb-2 mr-2"
                  onClick={() => { generatePDF(IncomeStatement) }}>
                  Downlaod as PDF
                </button>
                {/* Excel Button */}
                <button
                  // disabled={vouchersFetched ? false : true}
                  className="bg-CancelExcel hover:bg-CancelExcelHover text-white px-4 py-2 rounded-md mb-2"
                  onClick={() => { generateExcelSheet(IncomeStatement) }}>
                  Download as Excel
                </button>
              </div> </div> : <LoaderAnimation />}
        </div>
      </motion.div>
    </div>
  );
}