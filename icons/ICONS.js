import InvoiceScanIcon from './scan.svg'
import ExpenseScanIcon from './expenseOcr.svg'
import BankIcon from './bank.svg'
import TaxIcon from './tax.svg'
import EmailIcon from "@atlaskit/icon/glyph/email"
import LeftArrow from "@atlaskit/icon/glyph/arrow-left"
import MobileIcon from "@atlaskit/icon/glyph/mobile"
import AdminIcon from "@atlaskit/icon/glyph/user-avatar-circle"
import NotificationIcon from "@atlaskit/icon/glyph/notification"
import CameraFilledIcon from "@atlaskit/icon/glyph/camera-filled"
import OpenIcon from "@atlaskit/icon/glyph/open";
import AppIcon from "@atlaskit/icon/glyph/app-switcher";
import PersonIcon from '@atlaskit/icon/glyph/person'
import DashboardIcon from "./sidebar.svg";
import AccountIcon from "./account.svg"
import ApiIcon from "./api.svg"
import ApprovedIcon from "./approved.svg"
import Add from "./add.svg"
import Driver from "./id.svg"
import Currency from "./currency.svg"
import SupportIcon from "./support.svg"
import FolderIcon from "./folder.svg"
import SuccessIcon from "./success-apis.svg"
import ExpenseIcon from "./expense.svg"
import Maps from "./maps.svg"
import Route from "./route.svg"
import ProjectIcon from "./project.svg"
import LatencyIcon from "./latency.svg"
import StructureIcon from './structure.svg'
import CountIcon from './count.svg'
import FlightIcon from './flight.svg'
import TuneIcon from './tune.svg'
import AdvanceIcon from './advance.svg'
import BoxIcon from './box.svg'
import CashIcon from './cash.svg'
import DocumentIcon from './document.svg'
import TicketIcon from './ticket.svg'
import WalletIcon from './wallet.svg'
import Users from './users.svg'
import InvoiceIcon from './streamline/invoice.svg'
import TripIcon from './streamline/travel.svg'
import FastForwardIcon from './streamline/fast-forward.svg'
import TransactionsIcon from './streamline/expense.svg'
import ApprovalIcon from './streamline/approval.svg'
import ControlRoomIcon from './streamline/control-room.svg'
import OfficeIcon from './streamline/office.svg'
import BoardIcon from './streamline/board.svg'
import CashierIcon from './streamline/cashier.svg'
import ReceiptIcon from './streamline/receipt.svg'
import PackageIcon from './streamline/package.svg'
import AccountPayIcon from './streamline/account-pay.svg'
import TravelBookingIcon from './streamline/travel-booking.svg'
import ExpenseVoucherIcon from './streamline/expense-voucher.svg'
import StocksIcon from './streamline/stocks.svg'
import ExportIcon from './streamline/export.svg'

//Default Size Configurations
const SIZES = {large: 48, medium: 36, small: 20, xsmall: 16}

const imgWrapper = (size,icon) => {
	const style = {
		width:size==="large"?48:size==="medium"?36:size==="small"?24:12,
		height:size==="large"?48:size==="medium"?36:size==="small"?24:12
	}
	return (
		<img src={icon} alt="Email icon" style={style}/>
	)
}

const ICONS = {
	Email:({size="medium"})=>(
		<EmailIcon size={size}/>
	),
	AppIcon:({size="medium"})=>(
		<AppIcon size={size}/>
	),
	LeftArrow:({size="medium"})=>(
		<LeftArrow size={size}/>
	),
	Mobile:({size="medium"})=>(
		<MobileIcon size={size}/>
	),
	Notification:({size="medium"})=>(
		<NotificationIcon size={size}/>
	),
	Camera:({size="medium"})=>(
		<CameraFilledIcon size={size}/>
	),
	View:({size="medium"})=>(
		<OpenIcon size={size}/>
	),
	AdminIcon:({size="medium"})=>(
		<AdminIcon size={size}/>
	),
	UserIcon:({size="medium"})=>(
		<PersonIcon size={size}/>
	),
	Api:({size="medium"})=>imgWrapper(size,ApiIcon),
	Bank:({size="medium"})=>imgWrapper(size,BankIcon),
	License:({size="medium"})=>imgWrapper(size,Driver),
	Tax:({size="medium"})=>imgWrapper(size,TaxIcon),
	Task:({size="medium"})=>imgWrapper(size,Add),
	Advance:({size="medium"})=>imgWrapper(size,AdvanceIcon),
	Travel:({size="medium"})=>imgWrapper(size,FlightIcon),
	Tune:({size="medium"})=>imgWrapper(size,TuneIcon),
	InvoiceScan:({size="medium"})=>imgWrapper(size,InvoiceScanIcon),
	SuccessIcon:({size="medium"})=>imgWrapper(size,SuccessIcon),
	ExpenseIcon:({size="medium"})=>imgWrapper(size,ExpenseScanIcon),
	Client:({size="medium"})=>imgWrapper(size,AccountIcon),
	LatencyIcon:({size="medium"})=>imgWrapper(size,LatencyIcon),
	CountIcon:({size="medium"})=>imgWrapper(size,CountIcon),
	Currency:({size="medium"})=>imgWrapper(size,Currency),
	Maps:({size="medium"})=>imgWrapper(size,Maps),
	Route:({size="medium"})=>imgWrapper(size,Route),

	Dashboard:({size="medium"})=>(
		<img src={DashboardIcon} alt="Dashboard icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Users:({size="medium"})=>(
		<img src={Users} alt="Users icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Approved : ({size="medium"})=>(
		<img src={ApprovedIcon} alt="Approved icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Folder : ({size="medium"})=>(
		<img src={FolderIcon} alt="Folder icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Project : ({size="medium"})=>(
		<img src={ProjectIcon} alt="Project icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Expense : ({size="medium"})=>(
		<img src={ExpenseIcon} alt="Expense icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Structure : ({size="medium"})=>(
		<img src={StructureIcon} alt="Structure icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Support : ({size="medium"})=>(
		<img src={SupportIcon} alt="Structure icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Box : ({size="medium"})=>(
		<img src={BoxIcon} alt="Structure icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Cash : ({size="medium"})=>(
		<img src={CashIcon} alt="Structure icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Document : ({size="medium"})=>(
		<img src={DocumentIcon} alt="Structure icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Ticket : ({size="medium"})=>(
		<img src={TicketIcon} alt="Structure icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Wallet : ({size="medium"})=>(
		<img src={WalletIcon} alt="Structure icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Invoice : ({size="medium"})=>(
		<img src={InvoiceIcon} alt="Invoice icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Trip : ({size="medium"})=>(
		<img src={TripIcon} alt="Invoice icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	FastForward : ({size="medium"})=>(
		<img src={FastForwardIcon} alt="Advance icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Transactions : ({size="medium"})=>(
		<img src={TransactionsIcon} alt="Expense icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Approval : ({size="medium"})=>(
		<img src={ApprovalIcon} alt="Approval icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	ControlRoom : ({size="medium"})=>(
		<img src={ControlRoomIcon} alt="Control room icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Office : ({size="medium"})=>(
		<img src={OfficeIcon} alt="Office icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Board : ({size="medium"})=>(
		<img src={BoardIcon} alt="Dashboard icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Cashier : ({size="medium"})=>(
		<img src={CashierIcon} alt="Cashier icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Receipt : ({size="medium"})=>(
		<img src={ReceiptIcon} alt="Receipt icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Package : ({size="medium"})=>(
		<img src={PackageIcon} alt="Package icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	AccountPay : ({size="medium"})=>(
		<img src={AccountPayIcon} alt="Account Pay icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	TravelBooking : ({size="medium"})=>(
		<img src={TravelBookingIcon} alt="Travel Booking icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	ExpenseVoucher : ({size="medium"})=>(
		<img src={ExpenseVoucherIcon} alt="Account Pay icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Stocks : ({size="medium"})=>(
		<img src={StocksIcon} alt="Travel Booking icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
	Export : ({size="medium"})=>(
		<img src={ExportIcon} alt="Travel Booking icon" style={{width:SIZES[size],height: SIZES[size]}}/>
	),
};

const Streamline = ({icon, size='1rem', className})=>{
	return <svg className={className} width={size} height={size}><image xlinkHref={require(`./streamline/${icon}.SVG`)} width={size} height={size}/></svg>
}

export default ICONS;
export {ICONS, Streamline}
