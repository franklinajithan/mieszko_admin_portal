import { 
  faChartLine, faCalendarDay, faChartBar, faChartPie, faBox, faHeadphones, 
  faDatabase, faCube, faArrowsAltH, faFolder, faTrademark, faShoppingBag, 
  faPlusSquare, faAddressBook, faUserPlus, faFileContract, faUser, faShieldAlt, 
  faUserCog, faHistory, faWarehouse, faTools, faExchangeAlt, faBell, faTrashAlt, 
  faFileAlt, faFileInvoice, faMoneyBillWave, faStore, faTags, faTruck, faBoxes, 
  faRecycle, faFileInvoiceDollar, 
  faPlus,
  faFire,
  faCalendarAlt,
  faPlusCircle,
  faClock,
  faClipboardList,
  faPaperPlane,
  faCalendarCheck,
  faUsers,
  faUserTag,
  faFileSignature,
  faBuilding,
  faCog,
  faShop,
  faShopLock,
  faTag,
  faUtensils,
  faAppleAlt,
  faBreadSlice
} from '@fortawesome/free-solid-svg-icons';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';


export const dashboardMenu:any = [
  { label: "Finance Monitoring", link: "/dashboard/finance", icon: faChartLine },
  { label: "Sales Monitoring", link: "/dashboard/sales", icon: faChartBar },
  { label: "Website Analytics", link: "/dashboard/analytics", icon: faChartPie },
  { label: "Product Management", link: "/dashboard/product", icon: faBox }
];


export const OrderManagementMenu:any = [
  { label: "New Purchase Planning", link: "/order/new-purchase-planning", icon: faShoppingBag },
  { label: "Purchase Planning", link: "/order/purchase-planning", icon: faCalendarDay },
  { label: "Purchase Order", link: "/order/purchase-order", icon: faFileAlt },
  { label: "Order History", link: "/order/order-history", icon: faHistory }
];


export const storeManagementMenu:any = [
  { label: "Company List", link: "/store/company-list", icon: faBuilding },
  // { label: "New Company", link: "/store/new-company", icon: faPlusSquare },
  { label: "Store List", link: "/store/store-list", icon: faShop },
  // { label: "New Store", link: "/store/new-store", icon: faCube },
  { label: "Store Inventory", link: "/store/inventory", icon: faBox },
  { label: "Store Transfers", link: "/store/transfers", icon: faExchangeAlt } 
];


export const productManagementMenu:any = [
  { label: "Product List", link: "/product/product-list", icon: faShoppingBag },
  { label: "New Product", link: "/product/new-product", icon: faPlusSquare },
  { label: "Product Category", link: "/product/product-category", icon: faFolder },
  { label: "Product Brand", link: "/product/product-brand", icon: faTrademark },
 
 
];


export const supplierManagementMenu:any = [
  { label: "Supplier List", link: "/supplier/supplier-list", icon: faAddressBook },
  { label: "New Supplier", link: "/supplier/new-supplier", icon: faUserPlus },
  { label: "Supplier Contracts", link: "/supplier/contracts", icon: faFileContract },
  { label: "Supplier Performance", link: "/supplier/performance", icon: faChartLine }
];


export const userManagementMenu:any = [
  { label: "User List", link: "/user/user-list", icon: faUsers },
  { label: "New User", link: "/user/new-user", icon: faUserPlus },
  { label: "Roles And Rights", link: "/user/roles-and-rights", icon: faShieldAlt },
  { label: "User Roles", link: "/user/roles", icon: faUserCog },
  { label: "User Activity Logs", link: "/user/logs", icon: faHistory }
];


export const stockManagementMenu:any = [
  { label: "Stock Overview", link: "/stock/overview", icon: faWarehouse },
  { label: "Stock Adjustments", link: "/stock/adjustments", icon: faTools },
  { label: "Stock Transfers", link: "/stock/transfers", icon: faExchangeAlt },
  { label: "Stock Alerts", link: "/stock/alerts", icon: faBell }
];


export const wasteManagementMenu:any = [
  { label: "Waste Tracking", link: "/waste/tracking", icon: faTrashAlt },
  { label: "Waste Reports", link: "/waste/reports", icon: faFileAlt },
  { label: "New Waste Entry", link: "/waste/new", icon: faFileAlt },
  { label: "Waste Reduction", link: "/waste/reduction", icon: faRecycle }
];


export const invoiceManagementMenu:any = [
  { label: "Invoice List", link: "/invoice/list", icon: faFileAlt },
  { label: "Create Invoice", link: "/invoice/new", icon: faFileInvoice },
  { label: "Payment Status", link: "/invoice/payment-status", icon: faMoneyBillWave },
  { label: "Invoice Reports", link: "/invoice/reports", icon: faChartBar }
];

export const deliveryManagementMenu:any = [
  { label: "Delivery List", link: "/delivery/list", icon: faBox },
  { label: "Create Delivery", link: "/delivery/new", icon: faPlusSquare },
  { label: "Delivery Status", link: "/delivery/status", icon: faTruck },
  { label: "Delivery Reports", link: "/delivery/reports", icon: faFileAlt }
];

export const promotionManagementMenu:any = [
  { label: "Promotion List", link: "/promotion/promotion-list", icon: faTags },
  { label: "Create Promotion", link: "/promotion/create-promotion", icon: faPlus },
  // { label: "Label List", link: "/promotion/label-list", icon: faTag  },
  // { label: "Create Label", link: "/promotion/create-label", icon: faClipboardList  }
];

export const labelManagementMenu:any = [
  { label: "Deli Label", link: "/label/deli-label", icon: faUtensils },
  { label: "Fruit & Veg Label", link: "/label/fruit-veg-label", icon: faAppleAlt },
  // { label: "Bakery Label", link: "/label/bakery-label", icon: faBreadSlice },
];

export const rotaManagementMenu:any = [
  { label: "Rota List", link: "/rota/list", icon: faCalendarAlt },
  { label: "Create Rota", link: "/rota/new", icon: faPlusCircle },
  { label: "Rota Schedule", link: "/rota/schedule", icon: faClock },
  { label: "Rota Reports", link: "/rota/reports", icon: faChartPie }
];

export const leaveManagementMenu:any = [
  { label: "Leave Requests", link: "/leave/requests", icon: faClipboardList },
  { label: "Apply for Leave", link: "/leave/apply", icon: faPaperPlane },
  { label: "Leave Status", link: "/leave/status", icon: faCalendarCheck },
  { label: "Leave Reports", link: "/leave/reports", icon: faFileAlt }
];

export const staffManagementMenu:any = [
  { label: "Staff List", link: "/staff/list", icon: faUsers },
  { label: "New Staff", link: "/staff/new", icon: faUserPlus },
  { label: "Staff Roles", link: "/staff/roles", icon: faUserTag },
  { label: "Staff Reports", link: "/staff/reports", icon: faFileSignature }
];


export const ManagementMenu:any = [
  {
    label: "Order Management",
    link: "/order/order-management",
    icon: faShoppingBag,
    submenu: [
      { label: "Purchase Planning", icon: faCalendarDay, link: "/order/purchaseplanning" },
      { label: "New Purchase Planning", link: "/apps/gallery-video", icon: faShoppingBag }
    ]
  },
  { label: "Store Management", link: "/store/store-management", icon: faStore },
  { label: "Product Management", link: "/product/product-management", icon: faTags },
  { label: "Supplier Management", link: "/supplier/supplier-management", icon: faTruck },
  { label: "User Management", link: "/user/user-management", icon: faUserCog },
  { label: "Stock Management", link: "/stock/stock-management", icon: faBoxes },
  { label: "Waste Management", link: "/waste/waste-management", icon: faTrashAlt },
  { label: "Invoice Management", link: "/invoice/invoice-management", icon: faFileInvoiceDollar }
];


