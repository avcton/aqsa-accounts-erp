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

function createData(Category, Code, Description, Debit, Credit) {
  return { Category, Code, Description, Debit, Credit };
}

const rows = [
  createData('asset', 123, 'ACH', '$8.00', '$9.00'),
  createData('asset', 123, 'ACH', '$8.00', '$9.00'),
  createData('asset', 123, 'ACH', '$8.00', '$9.00'),


];


export default function LedgerReport() {
  return (
    <div className='flex flex-col h-screen w-screen align items-center justify-center bg-slate-50 overflow-auto'>
      <div className=' flex flex-col items-center justify-center '>
        <h3 className=" text-black text-3xl font-bold mb-6 ">Ledger Report</h3>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell align="center">Code</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="center">Debit</StyledTableCell>
                <StyledTableCell align="center">Credit</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.Category}>
                  <StyledTableCell component="th" scope="row">
                    {row.Category}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.Code}</StyledTableCell>
                  <StyledTableCell align="center">{row.Description}</StyledTableCell>
                  <StyledTableCell align="center">{row.Debit}</StyledTableCell>
                  <StyledTableCell align="center">{row.Credit}</StyledTableCell>
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