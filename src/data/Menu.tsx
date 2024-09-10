import { 
  faChartLine, faCalendarDay, faChartBar, faChartPie, faBox, faHeadphones, 
  faDatabase, faCube, faArrowsAltH, faFolder, faTrademark, faShoppingBag, 
  faPlusSquare, faAddressBook, faUserPlus, faFileContract, faUser, faShieldAlt, 
  faUserCog, faHistory, faWarehouse, faTools, faExchangeAlt, faBell, faTrashAlt, 
  faFileAlt, faFileInvoice, faMoneyBillWave, faStore, faTags, faTruck, faBoxes, 
  faRecycle, faFileInvoiceDollar 
} from '@fortawesome/free-solid-svg-icons';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';

// Dashboard Menu
const dashboardMenu = [
  { label: "Finance Monitoring", link: "/dashboard/finance", icon: faChartLine },
  { label: "Events Management", link: "/dashboard/events", icon: faCalendarDay },
  { label: "Sales Monitoring", link: "/dashboard/sales", icon: faChartBar },
  { label: "Website Analytics", link: "/dashboard/analytics", icon: faChartPie },
  { label: "Cryptocurrency", link: "/dashboard/crypto", icon: faBitcoin },
  { label: "Helpdesk Service", link: "/dashboard/helpdesk", icon: faHeadphones },
  { label: "Storage Management", link: "/dashboard/storage", icon: faDatabase },
  { label: "Product Management", link: "/dashboard/product", icon: faBox }
];

// Order Management Menu
const OrderManagementMenu = [
  { label: "New Purchase Planning", link: "/order/new-purchase-planning", icon: faShoppingBag },
  { label: "Purchase Planning", link: "/order/purchase-planning", icon: faCalendarDay },
  { label: "Purchase Order", link: "/order/purchase-order", icon: faFileAlt },
  { label: "Order History", link: "/order/order-history", icon: faHistory }
];

// Store Management Menu
const storeManagementMenu = [
  { label: "Manage Store", link: "/store/manage-store", icon: faStore },
  { label: "New Store Setup", link: "/store/new-store", icon: faCube },
  { label: "Store Inventory", link: "/store/inventory", icon: faBox },
  { label: "Store Transfers", link: "/store/transfers", icon: faArrowsAltH }
];

// Product Management Menu
const productManagementMenu = [
  { label: "Product", link: "/product/list", icon: faShoppingBag },
  { label: "New Product", link: "/product/new-product", icon: faPlusSquare },
  { label: "Product Category", link: "/product/category", icon: faFolder },
  { label: "Product Brand", link: "/product/brand", icon: faTrademark },
 
 
];

// Supplier Management Menu
const supplierManagementMenu = [
  { label: "Supplier Directory", link: "/supplier/directory", icon: faAddressBook },
  { label: "Add New Supplier", link: "/supplier/new", icon: faUserPlus },
  { label: "Supplier Contracts", link: "/supplier/contracts", icon: faFileContract },
  { label: "Supplier Performance", link: "/supplier/performance", icon: faChartLine }
];

// User Management Menu
const userManagementMenu = [
  { label: "User List", link: "/user/user-grid", icon: faUser },
  { label: "New User", link: "/user/new-user", icon: faUserPlus },
  { label: "Roles And Rights", link: "/user/roles-and-rights", icon: faShieldAlt },
  { label: "User Roles", link: "/user/roles", icon: faUserCog },
  { label: "User Activity Logs", link: "/user/logs", icon: faHistory }
];

// Stock Management Menu
const stockManagementMenu = [
  { label: "Stock Overview", link: "/stock/overview", icon: faWarehouse },
  { label: "Stock Adjustments", link: "/stock/adjustments", icon: faTools },
  { label: "Stock Transfers", link: "/stock/transfers", icon: faExchangeAlt },
  { label: "Stock Alerts", link: "/stock/alerts", icon: faBell }
];

// Waste Management Menu
const wasteManagementMenu = [
  { label: "Waste Tracking", link: "/waste/tracking", icon: faTrashAlt },
  { label: "Waste Reports", link: "/waste/reports", icon: faFileAlt },
  { label: "New Waste Entry", link: "/waste/new", icon: faFileAlt },
  { label: "Waste Reduction", link: "/waste/reduction", icon: faRecycle }
];

// Invoice Management Menu
const invoiceManagementMenu = [
  { label: "Invoice List", link: "/invoice/list", icon: faFileAlt },
  { label: "Create Invoice", link: "/invoice/new", icon: faFileInvoice },
  { label: "Payment Status", link: "/invoice/payment-status", icon: faMoneyBillWave },
  { label: "Invoice Reports", link: "/invoice/reports", icon: faChartBar }
];

// Management Menu
const ManagementMenu = [
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

export {
  dashboardMenu,
  OrderManagementMenu,
  storeManagementMenu,
  productManagementMenu,
  supplierManagementMenu,
  userManagementMenu,
  stockManagementMenu,
  invoiceManagementMenu,
  wasteManagementMenu,
  ManagementMenu
};
