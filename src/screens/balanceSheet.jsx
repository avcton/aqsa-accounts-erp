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

  // Assets 
  var balanceData = [
    null,
    "Assets",
    null
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Current Assets
  balance[1].CurrentAssets.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // Total CA
  balanceData = [
    null,
    "Total Current Assets",
    balance[1].TotalCurrentAssets
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Current Assets
  balance[1].NonCurrentAssets.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // Total NCA
  balanceData = [
    null,
    "Total Non-Current Assets",
    balance[1].TotalNonCurrentAssets
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Other Assets
  balance[1].OtherAssets.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // Total CA
  balanceData = [
    null,
    "Total Other Assets",
    balance[1].TotalOtherAssets
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Total Assets
  balanceData = [
    "Total Assets",
    null,
    balance[1].TotalAssets
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);


  // Liabilities
  balanceData = [
    null,
    "Liabilities",
    null,
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Liabilities
  balance[2].Liabilities.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // Total Liabilities
  balanceData = [
    "Total Liabilities",
    null,
    balance[2].TotalLiabilities,
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Equity
  balanceData = [
    null,
    "Equity",
    null,
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Equity
  balance[3].Equity.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  balanceData = [
    "Total Equity",
    null,
    balance[3].TotalEquity,
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Total Liabilities + Equity
  balanceData = [
    "Total Liabilities + Equity",
    null,
    balance[3].TotalEqLib,
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  // voucher title. and margin-top + margin-left
  doc.text(`BalanceSheet`, 14, 15);

  // we define the name of our PDF file.
  doc.save(`BalanceSheet.pdf`);
};

const generateExcelSheet = async balance => {
  if (balance == null || balance.length < 1) {
    return
  }

  // define the columns we want and their titles
  const tableColumn = ["Account Description", "Account Code", "Account Balance"];
  // define an empty array of rows
  const tableRows = [];

  // Assets 
  var balanceData = [
    null,
    "Assets",
    null
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Current Assets
  balance[1].CurrentAssets.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // Total CA
  balanceData = [
    null,
    "Total Current Assets",
    balance[1].TotalCurrentAssets
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Current Assets
  balance[1].NonCurrentAssets.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // Total NCA
  balanceData = [
    null,
    "Total Non-Current Assets",
    balance[1].TotalNonCurrentAssets
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Other Assets
  balance[1].OtherAssets.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // Total CA
  balanceData = [
    null,
    "Total Other Assets",
    balance[1].TotalOtherAssets
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Total Assets
  balanceData = [
    "Total Assets",
    null,
    balance[1].TotalAssets
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);


  // Liabilities
  balanceData = [
    null,
    "Liabilities",
    null,
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Liabilities
  balance[2].Liabilities.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // Total Liabilities
  balanceData = [
    "Total Liabilities",
    null,
    balance[2].TotalLiabilities,
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Equity
  balanceData = [
    null,
    "Equity",
    null,
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Equity
  balance[3].Equity.forEach(bl => {
    const balanceData = [
      bl.AccountName,
      bl.AccountCode,
      bl.Balance,
    ];
    // push each voucher's info into a row
    tableRows.push(balanceData);
  });

  // Total Liabilities
  balanceData = [
    "Total Equity",
    null,
    balance[3].TotalEquity,
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // Total Liabilities + Equity
  balanceData = [
    "Total Liabilities + Equity",
    null,
    balance[3].TotalEqLib,
  ];
  // push each voucher's info into a row
  tableRows.push(balanceData);

  // define an empty array to hold the new list
  const data = [];

  // iterate over the rows in tableRows
  tableRows.forEach(row => {
    // create a new object with the desired key-value pairs
    const newRow = {
      AccountDesciption: row[0],
      AccountCode: row[1],
      AccountBalance: row[2],
    };
    // add the new object to the newList array
    data.push(newRow);
  });

  exportToCSV(data, `BalanceSheet_ExcelReport`);
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

export default function BalanceSheet() {
  const [date, changeDate] = React.useState(new Date())
  const [formattedDate, setFormattedDate] = React.useState(null)
  const [BalanceSheet, setBalanceSheet] = React.useState(null)
  const [BalanceSheetFetched, setBalanceSheetFetched] = React.useState(false)

  React.useEffect(() => {
    if (formattedDate != null) {
      getBalanceSheet()
    }
  }, [formattedDate])

  React.useEffect(() => {
    const convertedDate = date.toLocaleDateString('en-US', { timeZone: 'Asia/Karachi' });
    const formattedDate = format(new Date(convertedDate), 'yyyy-MM-dd');
    setFormattedDate(formattedDate)
  }, [date])

  const getBalanceSheet = async () => {
    setBalanceSheetFetched(false)
    return await fetch(`${baseURL}/api/balancesheet?date=${formattedDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async data => {
        data = await data.json()
        setBalanceSheet(data)
        setBalanceSheetFetched(true)
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

          <h3 className=" text-black text-4xl font-bold mb-6 mt-14 ">Balance Sheet</h3>

          <div className=' flex flex-col items-center'>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
              Point in Time
            </label>
            <DatePicker
              className="appearance-textfield block w-min bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                                leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500"
              selected={date} onChange={(ddate) => {
                changeDate(ddate);
              }} />
          </div>

          {BalanceSheetFetched && <h2 className=" text-black text-2xl font-bold mb-6 mt-14 ">As of {getFormattedDate(BalanceSheet[0], true)}</h2>}

          {BalanceSheetFetched ?
            <div className=' flex flex-col items-center'>

              <TableContainer component={Paper}>
                <Table sx={{ width: 950, }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align='center' colSpan={3} >Balance Sheet</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell align='center' colSpan={3} >{
                        getFormattedDate(BalanceSheet[0], false)}</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell align='center'>Account Description</StyledTableCell>
                      <StyledTableCell align='center' style={{ borderLeft: '2px solid white' }}>Account Code</StyledTableCell>
                      <StyledTableCell align='center' style={{ borderLeft: '2px solid white' }}>Account Balance</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      <>
                        {/* Assets */}
                        <TableRow>
                          <StyledTableCell align='center'
                            style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                            colSpan={3}>Assets</StyledTableCell>
                        </TableRow>

                        {/* Current Assets */}

                        <TableRow>
                          <StyledTableCell align='center'
                            style={{ fontWeight: 'bold', fontSize: '1.1em' }}
                            colSpan={3}>Current Assets</StyledTableCell>
                        </TableRow>

                        {BalanceSheet[1].CurrentAssets.map((acc, index) => {
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

                        {/* Total CA */}
                        <TableRow>
                          <StyledTableCell align='center' colSpan={2}
                            style={{ fontWeight: 'bold', fontSize: '0.9em' }}
                          >Total Current Assets</StyledTableCell>
                          <StyledTableCell align='center' colSpan={1}
                            style={{ fontWeight: 'bold', fontSize: '0.9em' }}
                          >{getFormattedBalance(BalanceSheet[1].TotalCurrentAssets)}</StyledTableCell>
                        </TableRow>

                        {/* Non-Current Assets */}

                        <TableRow>
                          <StyledTableCell align='center'
                            style={{ fontWeight: 'bold', fontSize: '1.1em' }}
                            colSpan={3}>Non-Current Assets</StyledTableCell>
                        </TableRow>

                        {BalanceSheet[1].NonCurrentAssets.map((acc, index) => {
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

                        {/* Total NCA */}
                        <TableRow>
                          <StyledTableCell align='center' colSpan={2}
                            style={{ fontWeight: 'bold', fontSize: '0.9em' }}
                          >Total Non-Current Assets</StyledTableCell>
                          <StyledTableCell align='center' colSpan={1}
                            style={{ fontWeight: 'bold', fontSize: '0.9em' }}
                          >{getFormattedBalance(BalanceSheet[1].TotalNonCurrentAssets)}</StyledTableCell>
                        </TableRow>

                        {/* Other Assets */}

                        <TableRow>
                          <StyledTableCell align='center'
                            style={{ fontWeight: 'bold', fontSize: '1.1em' }}
                            colSpan={3}>Other Assets</StyledTableCell>
                        </TableRow>

                        {BalanceSheet[1].OtherAssets.map((acc, index) => {
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

                        {/* Total OA */}
                        <TableRow>
                          <StyledTableCell align='center' colSpan={2}
                            style={{ fontWeight: 'bold', fontSize: '0.9em' }}
                          >Total Other Assets</StyledTableCell>
                          <StyledTableCell align='center' colSpan={1}
                            style={{ fontWeight: 'bold', fontSize: '0.9em' }}
                          >{getFormattedBalance(BalanceSheet[1].TotalOtherAssets)}</StyledTableCell>
                        </TableRow>

                        {/* Total Assets */}

                        <TableRow>
                          <StyledTableCell align='center' colSpan={2}
                            style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                          >Total Assets</StyledTableCell>
                          <StyledTableCell align='center' colSpan={1}
                            style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                          >{getFormattedBalance(BalanceSheet[1].TotalAssets)}</StyledTableCell>
                        </TableRow>

                        {/* Liabilities */}
                        <TableRow>
                          <StyledTableCell align='center'
                            style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                            colSpan={3}>Liabilities</StyledTableCell>
                        </TableRow>

                        {BalanceSheet[2].Liabilities.map((acc, index) => {
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

                        {/* Total Liabilities */}
                        <TableRow>
                          <StyledTableCell align='center' colSpan={2}
                            style={{ fontWeight: 'bold', fontSize: '1.1em' }}
                          >Total Liabilities</StyledTableCell>
                          <StyledTableCell align='center' colSpan={1}
                            style={{ fontWeight: 'bold', fontSize: '1.1em' }}
                          >{getFormattedBalance(BalanceSheet[2].TotalLiabilities)}</StyledTableCell>
                        </TableRow>

                        {/* Equity */}
                        <TableRow>
                          <StyledTableCell align='center'
                            style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                            colSpan={3}>Equity</StyledTableCell>
                        </TableRow>

                        {BalanceSheet[3].Equity.map((acc, index) => {
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
                          >Total Equity</StyledTableCell>
                          <StyledTableCell align='center' colSpan={1}
                            style={{ fontWeight: 'bold', fontSize: '1.1em' }}
                          >{getFormattedBalance(BalanceSheet[3].TotalEquity)}</StyledTableCell>
                        </TableRow>

                        {/* Total Equity + Liabilities */}
                        <TableRow>
                          <StyledTableCell align='center' colSpan={2}
                            style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                          >Total Libabilities + Equity</StyledTableCell>
                          <StyledTableCell align='center' colSpan={1}
                            style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                          >{getFormattedBalance(BalanceSheet[3].TotalEqLib)}</StyledTableCell>
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
                  onClick={() => { generatePDF(BalanceSheet) }}>
                  Downlaod as PDF
                </button>
                {/* Excel Button */}
                <button
                  // disabled={vouchersFetched ? false : true}
                  className="bg-CancelExcel hover:bg-CancelExcelHover text-white px-4 py-2 rounded-md mb-2"
                  onClick={() => { generateExcelSheet(BalanceSheet) }}>
                  Download as Excel
                </button>
              </div> </div> : <LoaderAnimation />}
        </div>
      </motion.div>
    </div>
  );
}