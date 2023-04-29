import logo from "../assets/logo.png"
import i_coa from '../assets/MenuIcons/coa-icon.svg'
import i_dashboard from '../assets/MenuIcons/dashboard-icon.svg'
import i_manage from '../assets/MenuIcons/manage-icon.svg'
import i_reports from '../assets/MenuIcons/reports-icon.svg'
import i_setup from '../assets/MenuIcons/setup-icon.svg'
import i_voucher from '../assets/MenuIcons/voucher-icon.svg'
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

export const Menus = [
    { title: "Dashboard", icon: i_dashboard, gap: true },
    { title: "Vouchers", icon: i_voucher, gap: true, },
    {
        title: "Chart of Accounts", icon: i_coa,
        subMenus: [
            { title: 'List View', icon: logo, },
            { title: 'Hierarchical View', icon: logo, },
            { title: 'Manage Accounts', icon: logo, },
        ]
    },
    {
        title: "Reports", icon: i_reports, gap: true,
        subMenus: [
            { title: 'Vouchers List', icon: logo, },
            { title: 'Daybook List', icon: logo, },
            { title: 'Ledger Report', icon: logo, },
            { title: 'Trial Balance', icon: logo, },
            { title: 'Balance Sheet', icon: logo, },
            { title: 'Income Statement', icon: logo, },
            { title: 'Payables Report', icon: logo, },
            { title: 'Receivables Report', icon: logo, },
        ]
    },
    {
        title: "Application Setup", icon: i_setup, gap: true, highAuth: 1,
        subMenus: [
            { title: 'Year Entry', icon: logo, },
            { title: 'Period Entry', icon: logo, },
        ]
    },
    {
        title: "Management", icon: i_manage, highAuth: 1,
        subMenus: [
            { title: 'Manage Users', icon: logo, },
            { title: 'Manage Roles', icon: logo, },
        ]
    },
]

export function GetScreen({ screen, user }) {
    const PageNavigation = {
        'Dashboard': <Dashboard />,

        // Chart of Accounts
        'List View': <AccountsList />,
        'Hierarchical View': <Hierarchical_r />,
        'Manage Accounts': <ChartOfAccounts />,

        // Voucher
        'Vouchers': <Voucher user={user} />,

        // Reports
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