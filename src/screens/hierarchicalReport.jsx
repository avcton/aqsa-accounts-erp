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

function createData(Accountname, Code, FinancialStatement, Group, Type) {
  return { Accountname, Code, FinancialStatement, Group, Type };
}

const rows = [
  createData('ABC', 123, 'Balance Sheet', 'Current assets', 'Debit'),
  createData('DEF', 465, 'Balance Sheet', 'Current assets', 'Debit'),
  createData('XYZ', 545, 'Balance Sheet', 'Current assets', 'Credit'),
  createData('WER', 576, 'Balance Sheet', 'Current assets', 'Debit'),
  createData('TYU', 76, 'Balance Sheet', 'Long term assets', 'Debit'),
];


export default function Hierarchical_r() {
  return (
    <div className='flex flex-col h-screen w-screen align items-center justify-center bg-slate-50 overflow-auto'>
      <div className=' flex flex-col items-center justify-center '>
        <h3 className=" text-black text-3xl font-bold mb-6 ">Hierarchical Chart of Accounts</h3>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Account Name</StyledTableCell>
                <StyledTableCell align="center">Code</StyledTableCell>
                <StyledTableCell align="center">Financial Statement</StyledTableCell>
                <StyledTableCell align="center">Group</StyledTableCell>
                <StyledTableCell align="center">Type</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.Accountname}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.Code}</StyledTableCell>
                  <StyledTableCell align="center">{row.FinancialStatement}</StyledTableCell>
                  <StyledTableCell align="center">{row.Group}</StyledTableCell>
                  <StyledTableCell align="center">{row.Type}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}