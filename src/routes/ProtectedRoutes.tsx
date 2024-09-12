import React from "react";
import { FiList, FiShoppingCart, FiBox, FiUsers, FiUserPlus, FiEdit, FiPackage, FiArchive, FiShield, FiShoppingBag,  } from 'react-icons/fi'; 
import { BsFillBagPlusFill } from "react-icons/bs";
import { FaFileAlt, FaHistory, FaStore, FaCube, FaArrowsAltH, FaFolder, FaTrademark, FaShoppingBag, FaAddressBook, FaUserPlus, FaUser, FaShieldAlt, FaUserCog, FaWarehouse, FaTools, FaExchangeAlt, FaBell, FaTrashAlt, FaFileInvoice, FaMoneyBillWave, FaTruck, FaBoxes, FaRecycle, FaFileInvoiceDollar, FaPlus, FaFire, FaCalendarAlt, FaPlusCircle, FaClock, FaClipboardList, FaPaperPlane, FaCalendarCheck, FaUsers, FaUserTag, FaFileSignature, FaPlusSquare, FaTags, FaChartPie, FaBitcoin, FaHeadphones, FaDatabase } from 'react-icons/fa';

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
import ManageStore from "../apps/storeManagement/ManageStore";
import NewStore from "../apps/storeManagement/NewStore";

import PurchasePlanning from "../apps/orderManagement/PurchasePlanning";
import NewPurchasePlanning from "../apps/orderManagement/NewPurchasePlanning";


import RolesAndRights from "../apps/userManagement/RolesAndRights";







import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaBox, FaCalendarDay, FaChartBar, FaChartLine, FaFileContract } from "react-icons/fa";

import StoreInventory from "@/apps/storeManagement/StoreInventory";
import StoreTransfers from "@/apps/storeManagement/StoreTransfers";

import SupplierDirectory from "@/apps/supplierManagement/SupplierDirectory";
import AddNewSupplier from "@/apps/supplierManagement/AddNewSupplier";
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
import CreateInvoice from "@/apps/InvoiceManagement/CreateInvoice";
import PaymentStatus from "@/apps/InvoiceManagement/PaymentStatus";
import InvoiceReports from "@/apps/InvoiceManagement/InvoiceReports";
import DeliveryReports from "@/apps/DeliveryManagement/DeliveryReports";
import CreateDelivery from "@/apps/DeliveryManagement/CreateDelivery";
import DeliveryStatus from "@/apps/DeliveryManagement/DeliveryStatus";
import DeliveryList from "@/apps/DeliveryManagement/DeliveryList";
import PromotionList from "@/apps/PromoManagement/PromotionList";
import CreatePromotion from "@/apps/PromoManagement/CreatePromotion";
import ActivePromotions from "@/apps/PromoManagement/ActivePromotions";
import PromotionReports from "@/apps/PromoManagement/PromotionReports";
import RotaReports from "@/apps/RotaManagement/RotaReports";
import RotaSchedule from "@/apps/RotaManagement/RotaSchedule";
import CreateRota from "@/apps/RotaManagement/CreateRota";
import RotaList from "@/apps/RotaManagement/RotaList";
import ProductList from "@/apps/productManagement/ProductList";
import NewProduct from "@/apps/productManagement/NewProduct";
import ProductCategory from "@/apps/productManagement/ProductCategory";
import ProductBrand from "@/apps/productManagement/ProductBrand";
import EditProduct from "@/apps/productManagement/EditProduct";

const protectedRoutes = [

  { path: "dashboard/finance", element: <FinanceMonitoring icon={FaBox} title="Finance Monitoring" /> },
  { path: "dashboard/events", element: <EventManagement icon={FaCalendarDay} title="Events Management" /> },
  { path: "dashboard/sales", element: <SalesMonitoring icon={FaChartBar} title="Sales Monitoring" /> },
  { path: "dashboard/analytics", element: <WebsiteAnalytics icon={FaChartPie} title="Website Analytics" /> },
  { path: "dashboard/crypto", element: <Cryptocurrency icon={FaBitcoin} title="Cryptocurrency" /> },
  { path: "dashboard/helpdesk", element: <HelpdeskService icon={FaHeadphones} title="Helpdesk Service" /> },
  { path: "dashboard/storage", element: <StorageManagement icon={FaDatabase} title="Storage Management" /> },
  { path: "dashboard/product", element: <ProductManagement icon={FaBox} title="Product Management" /> },

  { path: "order/new-purchase-planning", element: <NewPurchasePlanning icon={FaShoppingBag} title="New Purchase Planning" /> },
  { path: "order/purchase-planning", element: <PurchasePlanning icon={FaCalendarDay} title="Purchase Planning" /> },
  { path: "order/purchase-order", element: <PurchaseOrder icon={FaFileAlt} title="Purchase Order" /> },
  { path: "order/order-history", element: <OrderHistory icon={FaHistory} title="Order History" /> },

  { path: "store/manage-store", element: <ManageStore icon={FaStore} title="Manage Store" /> },
  { path: "store/new-store", element: <NewStore icon={FaCube} title="New Store" /> },
  { path: "store/inventory", element: <StoreInventory icon={FaBox} title="Store Inventory" /> },
  { path: "store/transfers", element: <StoreTransfers icon={FaArrowsAltH} title="Store Transfers" /> },

  { path: "product/list", element: <ProductList icon={FaShoppingBag} title="Product List" /> },
  { path: "product/new-product", element: <NewProduct icon={FaPlusSquare} title="New Product" /> },
  { path: "product/category", element: <ProductCategory icon={FaFolder} title="Product Category" /> },
  { path: "product/brand", element: <ProductBrand icon={FaTrademark} title="Product Brand" /> },
  { path: "product/edit-product/:id", element: <EditProduct icon={FiEdit} title="Edit Product" /> },

  { path: "supplier/directory", element: <SupplierDirectory icon={FaAddressBook} title="Supplier Directory" /> },
  { path: "supplier/new", element: <AddNewSupplier icon={FaUserPlus} title="Add New Supplier" /> },
  { path: "supplier/contracts", element: <SupplierContracts icon={FaFileContract} title="Supplier Contracts" /> },
  { path: "supplier/performance", element: <SupplierPerformance icon={FaChartLine} title="Supplier Performance" /> },

  { path: "user/user-grid", element: <UserList icon={FaUser} title="User List" /> },
  { path: "user/new-user", element: <NewUser icon={FaUserPlus} title="New User" /> },
  { path: "user/roles-and-rights", element: <RolesAndRights icon={FaShieldAlt} title="Roles and Rights" /> },
  { path: "user/roles", element: <UserRoles icon={FaUserCog} title="User Roles" /> },
  { path: "user/logs", element: <UserActivityLogs icon={FaHistory} title="User Activity Logs" /> },

  { path: "stock/overview", element: <StockOverview icon={FaWarehouse} title="Stock Overview" /> },
  { path: "stock/adjustments", element: <StockAdjustments icon={FaTools} title="Stock Adjustments" /> },
  { path: "stock/transfers", element: <StoreTransfers icon={FaExchangeAlt} title="Stock Transfers" /> },
  { path: "stock/alerts", element: <StockAlerts icon={FaBell} title="Stock Alerts" /> },

  { path: "waste/tracking", element: <WasteTracking icon={FaTrashAlt} title="Waste Tracking" /> },
  { path: "waste/reports", element: <WasteReports icon={FaFileAlt} title="Waste Reports" /> },
  { path: "waste/new", element: <NewWasteEntry icon={FaFileAlt} title="New Waste Entry" /> },
  { path: "waste/reduction", element: <WasteReduction icon={FaRecycle} title="Waste Reduction" /> },

  { path: "invoice/list", element: <InvoiceList icon={FaFileAlt} title="Invoice List" /> },
  { path: "invoice/new", element: <CreateInvoice icon={FaFileInvoice} title="Create Invoice" /> },
  { path: "invoice/payment-status", element: <PaymentStatus icon={FaMoneyBillWave} title="Payment Status" /> },
  { path: "invoice/reports", element: <InvoiceReports icon={FaChartBar} title="Invoice Reports" /> },

  { path: "delivery/list", element: <DeliveryList icon={FaBox} title="Delivery List" /> },
  { path: "delivery/new", element: <CreateDelivery icon={FaPlusSquare} title="Create Delivery" /> },
  { path: "delivery/status", element: <DeliveryStatus icon={FaTruck} title="Delivery Status" /> },
  { path: "delivery/reports", element: <DeliveryReports icon={FaFileAlt} title="Delivery Reports" /> },

  { path: "promotion/list", element: <PromotionList icon={FaTags} title="Promotion List" /> },
  { path: "promotion/new", element: <CreatePromotion icon={FaPlus} title="Create Promotion" /> },
  { path: "promotion/active", element: <ActivePromotions icon={FaFire} title="Active Promotions" /> },
  { path: "promotion/reports", element: <PromotionReports icon={FaChartLine} title="Promotion Reports" /> },

  { path: "rota/list", element: <RotaList icon={FaCalendarAlt} title="Rota List" /> },
  { path: "rota/new", element: <CreateRota icon={FaPlusCircle} title="Create Rota" /> },
  { path: "rota/schedule", element: <RotaSchedule icon={FaClock} title="Rota Schedule" /> },
  { path: "rota/reports", element: <RotaReports icon={FaChartPie} title="Rota Reports" /> },






]

export default protectedRoutes;