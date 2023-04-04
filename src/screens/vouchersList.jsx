import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(AccountNumber, Date, Purpose, Amount, Xyz) {
  return { AccountNumber, Date, Purpose, Amount, Xyz };
}

const rows = [
  createData('1-101', '01-01-2022', 'misc', '987', 'xyz'),
  createData('1-101', '01-01-2022', 'misc', '987', 'xyz'),
  createData('1-101', '01-01-2022', 'misc', '987', 'xyz'),
  createData('1-101', '01-01-2022', 'misc', '987', 'xyz'),
  createData('1-101', '01-01-2022', 'misc', '987', 'xyz'),


];

export default function VouchersList() {
  return (
    <div className='flex flex-col h-screen w-screen align items-center justify-center bg-slate-50 overflow-auto'>
      <div className=' flex flex-col items-center justify-center '>
        <h3 className=" text-black text-3xl font-bold mb-6 ">List of Vouchers</h3>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Account Number</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Purpose</StyledTableCell>

                <StyledTableCell align="center">Amount</StyledTableCell>
                <StyledTableCell align="center">XYZ</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.AccountNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.Date}</StyledTableCell>
                  <StyledTableCell align="center">{row.Purpose}</StyledTableCell>

                  <StyledTableCell align="center">{row.Amount}</StyledTableCell>
                  <StyledTableCell align="center">{row.Xyz}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className=' mt-10 flex md:flex-row flex-col'>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mb-2 mr-2"
            onClick={() => {} }>
            Downlaod as PDF
          </button>
          {/* Remove Button */}
          <button
            className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md mb-2"
            onClick={() => {}}>
            Download as Excel
          </button>
        </div>
      </div>
    </div>
  );
}