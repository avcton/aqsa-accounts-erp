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

export default function CashReceipt() {
  return (
    <div className='flex flex-col h-screen w-screen align items-center justify-center  bg-slate-50'>
      <div className=' flex flex-col justify-center items-center '>
          <h3 className=" text-black text-3xl font-bold mt-10 mb-6 ">Cash Receipt</h3>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Receipt Number</StyledTableCell>
                <StyledTableCell align="center">1234</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="center">12-01-23</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="left">Item 1</StyledTableCell>
                <StyledTableCell align="center">$20.00</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left">Item 2</StyledTableCell>
                <StyledTableCell align="center">$10.00</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left">Item 3</StyledTableCell>
                <StyledTableCell align="center">$50.00</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="left">Total</StyledTableCell>
                <StyledTableCell align="center">$80.0</StyledTableCell>
              </StyledTableRow>

            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}