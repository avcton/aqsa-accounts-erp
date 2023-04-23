import * as React from 'react';
import { motion } from "framer-motion";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { baseURL } from '../utils/constants';
import LoaderAnimation from '../utils/loader';

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
    backgroundColor: '#FFEDD5',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function AccountsList() {
  const [accounts, setAccounts] = React.useState([])
  const [accountsFetched, setAccountsFetched] = React.useState([])

  React.useEffect(() => {
    getAccounts();
  }, [])

  const getAccounts = async () => {
    setAccountsFetched(false)
    return await fetch(`${baseURL}/api/account`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(async data => {
        setAccounts(await data.json())
        setAccountsFetched(true);
      })
      .catch(err => console.error('An execption is caught: ', err))
  }

  function filterNullValue(value) {
    if (value == null) {
      return ''
    }
    return value;
  }

  function highlightWhatColor(account) {
    if (account.AccountType == null) {
      // Level 1 Account
      return '#6B7280'
    }
    else if (account.AccountGroup == null) {
      // Level 2 Account
      return '#D1D5DB'
    }
    return '#E2E8F0'
  }

  return (
    <div className=" bg-slate-50 z-20">
      <motion.div initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }} className=" flex flex-col mt-14 ml-20 md:ml-0 items-center h-screen w-screen bg-slate-50 overflow-auto">
        <div className=' flex flex-col items-center justify-center '>

          <h3 className=" text-black text-3xl font-bold mb-6 mt-14 ">List of Accounts</h3>

          {accountsFetched ? <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350, }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>Account Code</StyledTableCell>
                  <StyledTableCell align='center'>Account Name</StyledTableCell>
                  <StyledTableCell align='center'>Account Type</StyledTableCell>
                  <StyledTableCell align='center'>Account Group</StyledTableCell>
                  <StyledTableCell align='center'>Account Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  accounts.map((account) => (
                    <StyledTableRow key={account.AccountCode} highlight={highlightWhatColor(account)}>
                      <StyledTableCell component="th" scope="row">
                        {account.AccountCode}
                      </StyledTableCell>
                      <StyledTableCell align='center'>{account.AccountName}</StyledTableCell>
                      <StyledTableCell align='center'>{filterNullValue(account.AccountType)}</StyledTableCell>
                      <StyledTableCell align='center'>{filterNullValue(account.AccountGroup)}</StyledTableCell>
                      <StyledTableCell align='center'>{account.AccountStatus ? 'Active' : 'Inactive'}</StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer> : <LoaderAnimation />}

        </div>
      </motion.div>
    </div>
  );
}