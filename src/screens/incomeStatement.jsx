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

function createData(abc, wer, rty) {
  return { abc, wer, rty };
}

const rows = [
  createData('ABC', 123, 'Balance '),
  createData('ABC', 123, 'Balance '),
  createData('ABC', 123, 'Balance '),
  createData('ABC', 123, 'Balance '),
  createData('ABC', 123, 'Balance '),
];


export default function IncomeStatement() {
  return (
    <div className='flex flex-col h-screen w-screen align items-center justify-center bg-slate-50 overflow-auto'>
      <div className=' flex flex-col items-center justify-center '>
        <h3 className=" text-black text-3xl font-bold mb-6 ">Income Statement</h3>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>abc</StyledTableCell>
                <StyledTableCell align="center">wer</StyledTableCell>
                <StyledTableCell align="center">tyu</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.abc}>
                  <StyledTableCell component="th" scope="row">
                    {row.abc}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.wer}</StyledTableCell>
                  <StyledTableCell align="center">{row.rty}</StyledTableCell>
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