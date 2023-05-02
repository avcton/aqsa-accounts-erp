import ChartOfAccounts from "../screens/manageAccounts"
import Dashboard from "../screens/dashboard"
import PeriodEntry from "../screens/periodEntry"
import UserManagement from "../screens/umanage"
import RoleManagement from "../screens/rmanage"
import YearEntry from "../screens/yearEntry"
import Hierarchical_r from "../screens/hierarchicalReport"
import AccountsList from "../screens/accountsList"
import VouchersList from "../screens/vouchersList"
import DayBookList from "../screens/dayBookList"
import LedgerReport from "../screens/ledgerReport"
import TrialBalance from "../screens/trialBalance"
import BalanceSheet from "../screens/balanceSheet"
import IncomeStatement from "../screens/incomeStatement"
import PayablesReport from "../screens/payablesReport"
import ReceivablesReport from "../screens/receivablesReport"
import Voucher from "../screens/vouchers"
import ExpiredVouchers from "../screens/expiredVouchers"
import MonthlyRevenue from "../screens/revenueGreport"
import DebitCredit from "../screens/debitCreditGreport"

export function GetScreen({ screen, user }) {
    const PageNavigation = {
        'Dashboard': <Dashboard />,

        // Chart of Accounts
        'List View': <AccountsList />,
        'Hierarchical View': <Hierarchical_r />,
        'Manage Accounts': <ChartOfAccounts />,

        // Voucher
        'Manage Vouchers': <Voucher user={user} />,
        'Expired Vouchers': <ExpiredVouchers />,

        // Reports
        'Monthly Revenue': <MonthlyRevenue />,
        'Debit / Credit': <DebitCredit />,
        'Vouchers List': <VouchersList />,
        'Daybook List': <DayBookList />,
        'Ledger Report': <LedgerReport />,
        'Trial Balance': <TrialBalance />,
        'Balance Sheet': <BalanceSheet />,
        'Income Statement': <IncomeStatement />,
        'Payables Report': <PayablesReport />,
        'Receivables Report': <ReceivablesReport />,

        // Application Setup
        'Year Entry': <YearEntry />,
        'Period Entry': <PeriodEntry />,

        // Management
        'Manage Users': <UserManagement />,
        'Manage Roles': <RoleManagement />,
    }
    return PageNavigation[screen];
}