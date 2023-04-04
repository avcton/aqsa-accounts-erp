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

function createData(AccountNumber, Description, Type, FinancialStatement, Group) {
  return { AccountNumber, Description, Type, FinancialStatement, Group };
}

const rows = [
  createData('1-101', 'Cash', 'Asset', 'Balance Sheet', 'Debit'),
  createData('1-101', 'Cash', 'Expense', 'Balance Sheet', 'Debit'),
  createData('1-101', 'Cash', 'Expense', 'Balance Sheet', 'Credit'),
  createData('1-101', 'Cash', 'Expense', 'Balance Sheet', 'Debit'),
  createData('1-101', 'Cash', 'Expense', 'Balance Sheet', 'Debit'),
];


export default function AccountsList() {
  return (
    <div className='flex flex-col h-screen w-screen align items-center justify-center bg-slate-50 overflow-auto'>
    <div className=' flex flex-col items-center justify-center '>
      <h3 className=" text-black text-3xl font-bold mb-6 ">List of Accounts</h3>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Account Name</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="center">Type</StyledTableCell>

                <StyledTableCell align="center">Financial Statement</StyledTableCell>
                <StyledTableCell align="center">Group</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.AccountNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.Description}</StyledTableCell>
                  <StyledTableCell align="center">{row.Type}</StyledTableCell>

                  <StyledTableCell align="center">{row.FinancialStatement}</StyledTableCell>
                  <StyledTableCell align="center">{row.Group}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}