import * as React from 'react';
import { motion } from "framer-motion";
import { styled } from '@mui/material/styles'
import { format } from 'date-fns'
import DatePicker from "react-datepicker";
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
import jsPDF from "jspdf";
import "jspdf-autotable";
import exportToCSV from '../utils/excelExport';

const generatePDF = vouchers => {

  if (vouchers == null || vouchers.length < 1) {
    return
  }

  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Voucher No", "Voucher Date", "Particulars", "Amount", "CreatedBy", "PostedBy"];
  // define an empty array of rows
  const tableRows = [];

  const vDate = format(new Date(vouchers[0].VoucherDate), "yyyy-MM-dd")

  // for each voucher pass all its data into an array
  vouchers.forEach(voucher => {
    const voucherData = [
      voucher.VoucherNumber,
      vDate,
      voucher.Particulars,
      voucher.Amount,
      voucher.CreatedBy,
      voucher.PostedBy,
    ];
    // push each voucher's info into a row
    tableRows.push(voucherData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  // const date = Date().split(" ");

  // // we use a date string to generate our filename.
  // const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  // voucher title. and margin-top + margin-left
  doc.text(`Daybook List for ${vDate}`, 14, 15);

  // we define the name of our PDF file.
  doc.save(`dayBookList_${vDate}.pdf`);
};

const generateExcelSheet = async vouchers => {
  if (vouchers == null || vouchers.length < 1) {
    return
  }

  // define the columns we want and their titles
  const tableColumn = ["Voucher No", "Voucher Date", "Particulars", "Amount", "CreatedBy", "PostedBy"];

  // define an empty array of rows
  const tableRows = [];

  const vDate = format(new Date(vouchers[0].VoucherDate), "yyyy-MM-dd")

  // for each voucher pass all its data into an array
  vouchers.forEach(voucher => {
    const voucherData = [
      voucher.VoucherNumber,
      vDate,
      voucher.Particulars,
      voucher.Amount,
      voucher.CreatedBy,
      voucher.PostedBy,
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
      VoucherNo: row[0],
      VoucherDate: row[1],
      Particulars: row[2],
      Amount: row[3],
      CreatedBy: row[4],
      PostedBy: row[5]
    };
    // add the new object to the newList array
    data.push(newRow);
  });

  exportToCSV(data, `dayBookList_${vDate}`);
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

export default function DayBookList() {
  const date = new Date()
  const [formattedDate, setFormattedDate] = React.useState(null)
  const [vouchers, setVouchers] = React.useState([])
  const [vouchersFetched, setVouchersFetched] = React.useState([])

  // Date Converter
  React.useEffect(() => {
    const convertedDate = date.toLocaleDateString('en-US', { timeZone: 'Asia/Karachi' });
    const formattedDate = format(new Date(convertedDate), 'yyyy-MM-dd');
    setFormattedDate(formattedDate)
  }, [date])

  React.useEffect(() => {
    if (formattedDate != null) {
      getVouchers()
    }
  }, [formattedDate])

  const getVouchers = async () => {
    setVouchersFetched(false)
    return await fetch(`${baseURL}/api/voucher?date=${formattedDate}`, {
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

          <h3 className=" text-black text-3xl font-bold mb-6 mt-14 ">Daybook List</h3>

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
                  <StyledTableCell align='center'>Posted By</StyledTableCell>
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
                      <StyledTableCell align='center'>{formattedDate}</StyledTableCell>
                      <StyledTableCell align='center'>{filterNullValue(voucher.Particulars)}</StyledTableCell>
                      <StyledTableCell align='center'>{voucher.Amount}</StyledTableCell>
                      <StyledTableCell align='center'>{voucher.CreatedBy}</StyledTableCell>
                      <StyledTableCell align='center'>{voucher.PostedBy}</StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer> : <LoaderAnimation />}

          <div className=' flex md:flex-row flex-col'>
            {/* PDF Button */}
            <button
              disabled={vouchersFetched ? false : true}
              className="bg-SubmitPDF hover:bg-SubmitPDFHover text-white px-4 py-2 rounded-md mb-2 mr-2"
              onClick={() => { generatePDF(vouchers) }}>
              Downlaod as PDF
            </button>
            {/* Excel Button */}
            <button
              disabled={vouchersFetched ? false : true}
              className="bg-CancelExcel hover:bg-CancelExcelHover text-white px-4 py-2 rounded-md mb-2"
              onClick={() => { generateExcelSheet(vouchers) }}>
              Download as Excel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}