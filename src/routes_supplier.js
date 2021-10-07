// import icon

import HomeIcon from "@material-ui/icons/Home"; //dashboard
import LocalAtmIcon from "@material-ui/icons/LocalAtm"; //CashFlow icon
import ReceiptIcon from "@material-ui/icons/Receipt"; //Report icon
import AssignmentIcon from "@material-ui/icons/Assignment"; //Invoice icon
import PaymentIcon from "@material-ui/icons/Payment"; //Loan Agreement icon

import AttachMoneyTwoToneIcon from "@material-ui/icons/AttachMoneyTwoTone"; // investment

import StoreMallDirectoryTwoToneIcon from "@material-ui/icons/StoreMallDirectoryTwoTone"; //販售商品 marchandise
import MonetizationOnTwoToneIcon from "@material-ui/icons/MonetizationOnTwoTone"; //deli pay 交貨款

import SettingsIcon from "@material-ui/icons/Settings"; //setup 設定

//import History Chart
import Dashboard from "./Views/Dashboard/Dashboard";
import DemandRef from "./components/HistoryChart/DemandRef";
import Report from "./components/HistoryChart/Report";
import Invoice from "./components/HistoryChart/Invoice";
import LoanAgreement from "./components/HistoryChart/LoanAgreement";
import Setup from "./Views/Setup/Setup";

const routes_supplier = [
  {
    path: "/dashboard",
    name: "決策中心",
    icon: HomeIcon,
    component: Dashboard,
    layout: "/supplieradmin",
  },
  {
    path: "/demandref",
    name: "參考供需",
    icon: ReceiptIcon,
    component: DemandRef,
    layout: "/supplieradmin",
  },
  {
    path: "/playerrecord",
    name: "玩家紀錄",
    icon: LocalAtmIcon,
    component: Report,
    layout: "/supplieradmin",
  },
  {
    path: "/invoice",
    name: "交易契約 ",
    icon: AssignmentIcon,
    component: Invoice,
    layout: "/supplieradmin",
  },
  {
    path: "/loanagreemen",
    name: "借貸契約 ",
    icon: PaymentIcon,
    component: LoanAgreement,
    layout: "/supplieradmin",
  },
  {
    path: "/setup",
    name: "設定 ",
    icon: SettingsIcon,
    component: Setup,
    layout: "/supplieradmin",
  },
];
export default routes_supplier;
