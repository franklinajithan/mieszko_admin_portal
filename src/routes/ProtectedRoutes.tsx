import React from "react";
import { FiList, FiShoppingCart, FiBox, FiUsers, FiUserPlus, FiEdit, FiPackage, FiArchive, FiShield, FiShoppingBag } from "react-icons/fi";
import { BsFillBagPlusFill } from "react-icons/bs";
import {
  FaFileAlt,
  FaHistory,
  FaStore,
  FaCube,
  FaArrowsAltH,
  FaFolder,
  FaTrademark,
  FaShoppingBag,
  FaAddressBook,
  FaUserPlus,
  FaUsers,
  FaUser,
  FaShieldAlt,
  FaUserCog,
  FaWarehouse,
  FaTools,
  FaExchangeAlt,
  FaBell,
  FaTrashAlt,
  FaFileInvoice,
  FaMoneyBillWave,
  FaTruck,
  FaBoxes,
  FaRecycle,
  FaFileInvoiceDollar,
  FaPlus,
  FaFire,
  FaCalendarAlt,
  FaPlusCircle,
  FaClock,
  FaClipboardList,
  FaPaperPlane,
  FaCalendarCheck,
  FaUserTag,
  FaFileSignature,
  FaPlusSquare,
  FaTags,
  FaChartPie,
  FaBitcoin,
  FaHeadphones,
  FaDatabase,
  FaPercentage,
} from "react-icons/fa";

// Dashboard
import EventManagement from "../dashboard/EventManagement";
import SalesMonitoring from "../dashboard/SalesMonitoring";
import WebsiteAnalytics from "../dashboard/WebsiteAnalytics";
import FinanceMonitoring from "../dashboard/FinanceMonitoring";
import Cryptocurrency from "../dashboard/Cryptocurrency";
import HelpdeskService from "../dashboard/HelpdeskService";
import StorageManagement from "../dashboard/StorageManagement";
import ProductManagement from "../dashboard/ProductManagement";

import PurchaseOrder from "../apps/orderManagement/PurchaseOrder";
import OrderHistory from "../apps/orderManagement/OrderHistory";
import PurchasePlanning from "../apps/orderManagement/PurchasePlanning";
import NewPurchasePlanning from "../apps/orderManagement/NewPurchasePlanning";

import RolesAndRights from "../apps/userManagement/RolesAndRights";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaBox, FaCalendarDay, FaChartBar, FaChartLine, FaFileContract } from "react-icons/fa";

import StoreInventory from "@/apps/storeManagement/StoreInventory";
import StoreTransfers from "@/apps/storeManagement/StoreTransfers";

import SupplierContracts from "@/apps/supplierManagement/SupplierContracts";
import SupplierPerformance from "@/apps/supplierManagement/SupplierPerformance";
import UserList from "../apps/userManagement/UserList";
import NewUser from "../apps/userManagement/NewUser";
import UserRoles from "@/apps/userManagement/UserRoles";
import UserActivityLogs from "@/apps/userManagement/UserActivityLogs";
import StockOverview from "@/apps/stockManagement/StockOverview";
import StockAdjustments from "@/apps/stockManagement/StockAdjustments";
import StockAlerts from "@/apps/stockManagement/StockAlerts";
import WasteTracking from "@/apps/wasteManagement/WasteTracking";
import WasteReduction from "@/apps/wasteManagement/WasteReduction";
import NewWasteEntry from "@/apps/wasteManagement/NewWasteEntry";
import WasteReports from "@/apps/wasteManagement/WasteReports";
import InvoiceList from "@/apps/InvoiceManagement/InvoiceList";
import PaymentStatus from "@/apps/InvoiceManagement/PaymentStatus";
import InvoiceReports from "@/apps/InvoiceManagement/InvoiceReports";
import DeliveryReports from "@/apps/DeliveryManagement/DeliveryReports";

import DeliveryStatus from "@/apps/DeliveryManagement/DeliveryStatus";
import DeliveryList from "@/apps/DeliveryManagement/DeliveryLoadList";
import PromotionList from "@/apps/PromoManagement/PromotionList";
import CreatePromotion from "@/apps/PromoManagement/CreatePromotion";
import RotaReports from "@/apps/RotaManagement/RotaReports";
import RotaSchedule from "@/apps/RotaManagement/RotaSchedule";
import CreateRota from "@/apps/RotaManagement/CreateRota";
import RotaList from "@/apps/RotaManagement/RotaList";
import ProductList from "@/apps/productManagement/ProductList";
import NewProduct from "@/apps/productManagement/NewProduct";
import ProductCategory from "@/apps/productManagement/ProductCategory";
import ProductBrand from "@/apps/productManagement/ProductBrand";
import EditProduct from "@/apps/productManagement/EditProduct";
import { ModeType } from "@/data/enum";
import NewSupplier from "@/apps/supplierManagement/NewSupplier";
import EditSupplier from "@/apps/supplierManagement/EditSupplier";
import SupplierList from "@/apps/supplierManagement/SupplierList";
import CompanyList from "@/apps/storeManagement/CompanyList";
import AddEditCompany from "@/apps/storeManagement/AddEditCompany";
import StoreList from "@/apps/storeManagement/StoreList";
import AddEditStore from "@/apps/storeManagement/AddEditStore";
import LabelList from "@/apps/LabelManagement/LabelList";
import DeliLabel from "@/apps/LabelManagement/DeliLabel";
import BakeryLabel from "@/apps/LabelManagement/BakeryLabel";
import FruitVegLabel from "@/apps/LabelManagement/FruitVegLabel";
import ProductByCategory from "@/apps/productManagement/ProductByCategory";
import VatOverview from "@/apps/Configuration/VatOverview";
import VatNewEntry from "@/apps/Configuration/VatNewEntry";
import MSPStockTake from "@/apps/stockManagement/MSPStockTake";
import NewBrand from "@/apps/productManagement/NewBrand";
import ReduceToClear from "@/apps/SalesManagement/ReduceToClear";

import NewReduceToClear from "@/apps/SalesManagement/NewReduceToClear";
import ProductGroupList from "@/apps/productManagement/ProductCategoryList";
import ChatPage from "@/pages/ChatPage";
import SupplierItemImport from "@/apps/supplierManagement/SupplierItemImport";
import EditSupplierItemImport from "@/apps/supplierManagement/EditSupplierItemImport";
import SingleInvoice from "@/apps/InvoiceManagement/SingleInvoice";
import CreateDelivery from "@/apps/DeliveryManagement/DeliveryManagement";
import DeliveryNote from "@/apps/DeliveryManagement/DeliveryNote";
import DeliveryManagement from "@/apps/DeliveryManagement/DeliveryManagement";
import EDIInvoice from "@/apps/InvoiceManagement/EDIInvoice";
import PurchaseReturn from "@/apps/DeliveryManagement/PurchaseReturn";
import StockTake from "@/apps/stockManagement/StockTake";
import ReduceToClearList from "@/apps/SalesManagement/ReduceToClearList";
import FillScanList from "@/apps/stockManagement/FillScanList";
import GapScanList from "@/apps/stockManagement/GapScanList";
import FillScanListDetail from "@/apps/stockManagement/FillScanListDetail";
import BasicDashboard from "@/apps/DashboardManagement/BasicDashboard";
import SpecialOrder from "@/apps/orderManagement/SpecialOrder";
import NewSpecialOrder from "@/apps/orderManagement/NewSpecialOrder";
import StockTakeDetails from "@/apps/stockManagement/StockTakeDetails";
import AddEditStockTake from "@/apps/stockManagement/AddEditStockTake";
import ManageLicenses from "@/apps/Configuration/ManageLicenses";
import NewLicense from "@/apps/Configuration/NewLicense";

const protectedRoutes = [
  { path: "dashboard/basic", element: <BasicDashboard /> },
  // { path: "dashboard/finance", element: <FinanceMonitoring icon={FaBox} title="Finance Monitoring" /> },
  // { path: "dashboard/events", element: <EventManagement icon={FaCalendarDay} title="Events Management" /> },
  // { path: "dashboard/sales", element: <SalesMonitoring icon={FaChartBar} title="Sales Monitoring" /> },
  // { path: "dashboard/analytics", element: <WebsiteAnalytics icon={FaChartPie} title="Website Analytics" /> },
  // { path: "dashboard/crypto", element: <Cryptocurrency icon={FaBitcoin} title="Cryptocurrency" /> },
  // { path: "dashboard/helpdesk", element: <HelpdeskService icon={FaHeadphones} title="Helpdesk Service" /> },
  // { path: "dashboard/storage", element: <StorageManagement icon={FaDatabase} title="Storage Management" /> },
  // { path: "dashboard/product", element: <ProductManagement icon={FaBox} title="Product Management" /> },

  { path: "order/new-purchase-planning", element: <NewPurchasePlanning icon={FaShoppingBag} title="New Purchase Planning" /> },
  { path: "order/purchase-planning", element: <PurchasePlanning icon={FaCalendarDay} title="Purchase Planning" /> },
  { path: "order/purchase-order", element: <PurchaseOrder icon={FaFileAlt} title="Purchase Order" /> },
  { path: "order/order-history", element: <OrderHistory icon={FaHistory} title="Order History" /> },
  { path: "order/special-order", element: <SpecialOrder icon={FaHistory} title="Special Order" /> },
  { path: "order/new-special-order", element: <NewSpecialOrder icon={FaHistory} title="New Special Order" /> },

  { path: "sale/reduce-to-clear", element: <ReduceToClear icon={FaHistory} title="Reduce to Clear" /> },
  { path: "sale/reduce-to-clear-list", element: <ReduceToClearList icon={FaHistory} title="Reduce to Clear List" /> },
  { path: "sale/new-reduce-to-clear", element: <NewReduceToClear icon={FaHistory} title="New Reduce to Clear" /> },
  { path: "sale/edit-reduce-to-clear/:id", element: <NewReduceToClear icon={FaHistory} title="Edit Reduce to Clear" /> },

  { path: "sale/fill-scan-list", element: <FillScanList icon={FaHistory} title="Fill Scan List" /> },
  { path: "sale/fill-scan-list-details", element: <FillScanListDetail icon={FaHistory} title="Fill Scan List Detail" /> },

  { path: "sale/gap-scan-list", element: <GapScanList icon={FaHistory} title="Gap Scan list" /> },

  { path: "store/company-List", element: <CompanyList icon={FaStore} title="Company List" /> },
  { path: "store/new-company", element: <AddEditCompany icon={FaStore} title="New Company" /> },
  { path: "store/edit-company/:id", element: <AddEditCompany icon={FaStore} title="Edit Company" /> },
  { path: "store/store-list", element: <StoreList icon={FaStore} title="Store List" /> },
  { path: "store/new-store", element: <AddEditStore icon={FaCube} title="New Store" /> },
  { path: "store/inventory", element: <StoreInventory icon={FaBox} title="Store Inventory" /> },
  { path: "store/transfers", element: <StoreTransfers icon={FaArrowsAltH} title="Store Transfers" /> },

  { path: "product/product-list", element: <ProductList icon={FaShoppingBag} title="Product List" /> },
  { path: "product/new-product", element: <NewProduct icon={FaPlusSquare} title="New Product" /> },
  { path: "product/product-category", element: <ProductCategory icon={FaFolder} title="Product Category" /> },
  { path: "product/product-category-list", element: <ProductGroupList icon={FaFolder} title="Product Category List" /> },

  { path: "product/product-by-category", element: <ProductByCategory icon={FaFolder} title="Product By Category" /> },
  { path: "product/product-brand", element: <ProductBrand icon={FaTrademark} title="Product Brand" /> },
  { path: "product/new-brand", element: <NewBrand icon={FaUserPlus} title="New Brand" type={ModeType.Add} /> },
  { path: "product/edit-brand/:id", element: <NewBrand icon={FaUserPlus} title="Edit Brand" type={ModeType.Edit} /> },

  { path: "product/edit-product/:id", element: <EditProduct icon={FiEdit} title="Edit Product" /> },

  { path: "supplier/supplier-list", element: <SupplierList icon={FaAddressBook} title="Supplier Directory" /> },
  { path: "supplier/new-supplier", element: <NewSupplier icon={FaUserPlus} title="Add Supplier" /> },
  { path: "supplier/edit-supplier/:id", element: <EditSupplier icon={FaUserPlus} title="Edit Supplier" /> },
  { path: "supplier/supplier-item-import", element: <SupplierItemImport icon={FaUserPlus} title="Supplier Item Import" /> },
  { path: "supplier/supplier-item-import/:id", element: <EditSupplierItemImport icon={FaUserPlus} title="Edit Supplier Item Import" /> },
  // { path: "supplier/contracts", element: <SupplierContracts icon={FaFileContract} title="Supplier Contracts" /> },
  // { path: "supplier/performance", element: <SupplierPerformance icon={FaChartLine} title="Supplier Performance" /> },

  { path: "user/user-list", element: <UserList icon={FaUsers} title="User List" /> },
  { path: "user/new-user", element: <NewUser icon={FaUserPlus} title="New User" type={ModeType.Add} /> },
  { path: "user/edit-user/:id", element: <NewUser icon={FaUserPlus} title="Edit User" type={ModeType.Edit} /> },
  { path: "user/roles-and-rights", element: <RolesAndRights icon={FaShieldAlt} title="Roles and Rights" /> },
  { path: "user/roles", element: <UserRoles icon={FaUserCog} title="User Roles" /> },
  { path: "user/logs", element: <UserActivityLogs icon={FaHistory} title="User Activity Logs" /> },

  { path: "stock/overview", element: <StockOverview icon={FaWarehouse} title="Stock Overview" /> },
  { path: "stock/stock-take", element: <StockTake icon={FaWarehouse} title="Stock Take" /> },
  { path: "stock/adjustments", element: <StockAdjustments icon={FaTools} title="Stock Adjustments" /> },
  { path: "stock/transfers", element: <StoreTransfers icon={FaExchangeAlt} title="Stock Transfers" /> },
  { path: "stock/alerts", element: <StockAlerts icon={FaBell} title="Stock Alerts" /> },
  { path: "stock/MSP-Stock-Take", element: <MSPStockTake icon={FaBell} title="Stock Alerts" /> },
  { path: "stock/MSP-Stock-Take", element: <MSPStockTake icon={FaBell} title="Stock Alerts" /> },
  { path: "stock/new-stock-take", element: <AddEditStockTake icon={FaBell} title="Add Stock Take" /> },

  { path: "waste/tracking", element: <WasteTracking icon={FaTrashAlt} title="Waste Tracking" /> },
  { path: "waste/reports", element: <WasteReports icon={FaFileAlt} title="Waste Reports" /> },
  { path: "waste/new", element: <NewWasteEntry icon={FaFileAlt} title="New Waste Entry" /> },
  { path: "waste/reduction", element: <WasteReduction icon={FaRecycle} title="Waste Reduction" /> },

  { path: "invoice/edi-invoice", element: <EDIInvoice icon={FaFileAlt} title="EDI Invoice Management" /> },
  { path: "invoice/list", element: <InvoiceList icon={FaFileAlt} title="Invoice List" /> },
  { path: "invoice/single", element: <SingleInvoice icon={FaFileInvoice} title="Single Invoice" /> },
  { path: "invoice/single/:id", element: <SingleInvoice icon={FaFileInvoice} title="Single Invoice" /> },
  { path: "invoice/payment-status", element: <PaymentStatus icon={FaMoneyBillWave} title="Payment Status" /> },
  { path: "invoice/reports", element: <InvoiceReports icon={FaChartBar} title="Invoice Reports" /> },

  { path: "delivery/delivery-management", element: <DeliveryManagement icon={FaBox} title="Delivery Load List" /> },

  { path: "delivery/load-list", element: <DeliveryList icon={FaBox} title="Delivery Load List" /> },
  { path: "delivery/delivery-note-management", element: <DeliveryNote icon={FaPlusSquare} title="Delivery Note Management" /> },
  { path: "delivery/purchase-return", element: <PurchaseReturn icon={FaPlusSquare} title="Claim List/ Credit Note Management" /> },
  // { path: "delivery/status", element: <DeliveryStatus icon={FaTruck} title="Delivery Status" /> },
  // { path: "delivery/reports", element: <DeliveryReports icon={FaFileAlt} title="Delivery Reports" /> },

  { path: "promotion/promotion-list", element: <PromotionList icon={FaTags} title="Promotion List" /> },
  { path: "promotion/create-promotion", element: <CreatePromotion icon={FaPlus} title="Create Promotion" /> },
  // { path: "promotion/label-list", element: <LabelList icon={FaFire} title="Label List" /> },
  // { path: "promotion/create-label", element: <CreateLabel icon={FaChartLine} title="Create Label" /> },

  { path: "label/deli-label", element: <DeliLabel icon={FaTags} title="Create Deli Label" /> },
  { path: "label/fruit-veg-label", element: <FruitVegLabel icon={FaPlus} title="Create Fruit & Veg Label" /> },
  { path: "label/bakery-label", element: <BakeryLabel icon={FaFire} title="Create Bakery Label" /> },
  // { path: "label/create-label", element: <CreateLabel icon={FaChartLine} title="Create Label" /> },

  { path: "rota/list", element: <RotaList icon={FaCalendarAlt} title="Rota List" /> },
  { path: "rota/new", element: <CreateRota icon={FaPlusCircle} title="Create Rota" /> },
  { path: "rota/schedule", element: <RotaSchedule icon={FaClock} title="Rota Schedule" /> },
  { path: "rota/reports", element: <RotaReports icon={FaChartPie} title="Rota Reports" /> },

  { path: "vat/vat-overview", element: <VatOverview icon={FaPercentage} title="VAT Overview" /> },
  { path: "vat/new-vat", element: <VatNewEntry icon={FaFileInvoice} title="New VAT Entry" /> },

  { path: "configure/manage-licenses", element: <ManageLicenses icon={FaFileInvoice} title="Manage Licenses" /> },
  { path: "configure/new-license", element: <NewLicense icon={FaFileInvoice} title="New License" /> },

  { path: "chat", element: <ChatPage /> },
];

export default protectedRoutes;
