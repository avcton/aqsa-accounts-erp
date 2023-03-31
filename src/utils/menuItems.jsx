import logo from "../assets/logo.png"
import i_coa from '../assets/MenuIcons/coa-icon.svg'
import i_dashboard from '../assets/MenuIcons/dashboard-icon.svg'
import i_manage from '../assets/MenuIcons/manage-icon.svg'
import i_reports from '../assets/MenuIcons/reports-icon.svg'
import i_setup from '../assets/MenuIcons/setup-icon.svg'
import i_voucher from '../assets/MenuIcons/voucher-icon.svg'

export const Menus = [
    {title: "Dashboard", icon: i_dashboard, gap: true},
    {title: "Vouchers", icon: i_voucher, gap: true,
        subMenus: [
            {title: 'Cash Payment', icon: logo,},
            {title: 'Bank Payment', icon: logo,},
            {title: 'Cash Receipt', icon: logo,},
            {title: 'Bank Receipt', icon: logo,},
            {title: 'Journal Voucher', icon: logo,},
        ]
    },
    {title: "Chart of Accounts", icon: i_coa},
    {title: "Reports", icon: i_reports, gap: true,
        subMenus:[
            {title: 'Hierarchical COA', icon: logo,},
            {title: 'Accounts List', icon: logo,},
            {title: 'Voucher Print', icon: logo,},
            {title: 'Daybook List', icon: logo,},
            {title: 'Ledger Report', icon: logo,},
            {title: 'Trial Balance', icon: logo,},
            {title: 'Balance Sheet', icon: logo,},
            {title: 'Income Statement', icon: logo,},
            {title: 'Payables Report', icon: logo,},
            {title: 'Receivables Report', icon: logo,},
        ]
    },
    {title: "Application Setup", icon: i_setup, gap: true, highAuth: 1,
        subMenus:[
            {title: 'Year Entry', icon: logo,},
            {title: 'Period Entry', icon: logo,},
        ]
    },
    {title: "User Management", icon: i_manage, highAuth: 1},
]