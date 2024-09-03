
const dashboardMenu = [
  {
    "label": "Finance Monitoring",
    "link": "/dashboard/finance",
    "icon": "ri-pie-chart-2-line"
  },
  {
    "label": "Events Management",
    "link": "/dashboard/events",
    "icon": "ri-calendar-todo-line"
  },
  {
    "label": "Sales Monitoring",
    "link": "/dashboard/sales",
    "icon": "ri-shopping-bag-3-line"
  },
  {
    "label": "Website Analytics",
    "link": "/dashboard/analytics",
    "icon": "ri-bar-chart-2-line"
  },
  {
    "label": "Cryptocurrency",
    "link": "/dashboard/crypto",
    "icon": "ri-coin-line"
  },
  {
    "label": "Helpdesk Service",
    "link": "/dashboard/helpdesk",
    "icon": "ri-service-line"
  },
  {
    "label": "Storage Management",
    "link": "/dashboard/storage",
    "icon": "ri-hard-drive-2-line"
  },
  {
    "label": "Product Management",
    "link": "/dashboard/product",
    "icon": "ri-suitcase-2-line"
  }
];

const OrderManagementMenu = [
  {
    "label": "New Purchase Planning",
    "link": "/order/new-purchase-planning",
    "icon": "ri-file-add-fill"
  },
  {
    "label": "Purchase Planning",
    "link": "/order/purchase-planning",
    "icon": "ri-calendar-check-fill" 
  },
  {
    "label": "Purchase Order",
    "link": "/order/purchase-order",
    "icon": "ri-shopping-cart-2-fill"
  },
  {
    "label": "Order History",
    "link": "/order/Order-History",
    "icon": "ri-file-list-fill"
  }
];

const storeManagementMenu = [
  {
    "label": "Manage Store",
    "link": "/store/manage-store",
    "icon": "ri-store-2-fill"
  },
  {
    "label": "New Store Setup",
    "link": "/store/new-store",
    "icon": "ri-building-fill"
  },
  {
    "label": "Store Inventory",
    "link": "/store/inventory",
    "icon": "ri-inventory-fill"
  },
  {
    "label": "Store Transfers",
    "link": "/store/transfers",
    "icon": "ri-exchange-fill"
  }
];

const productManagementMenu = [
  {
    "label": "Product Category",
    "link": "/product/category",
    "icon": "ri-grid-fill" 
  },
  {
    "label": "Product Brand",
    "link": "/product/brand",
    "icon": "ri-trademark-fill" 
  },
  {
    "label": "Product",
    "link": "/product/list",
    "icon": "ri-list-unordered" 
  },
  {
    "label": "New Product",
    "link": "/product/new-product",
    "icon": "ri-list-unordered" 
  },
];

const supplierManagementMenu = [
  {
    "label": "Supplier Directory",
    "link": "/supplier/directory",
    "icon": "ri-contacts-book-fill"
  },
  {
    "label": "Add New Supplier",
    "link": "/supplier/new",
    "icon": "ri-user-add-fill"
  },
  {
    "label": "Supplier Contracts",
    "link": "/supplier/contracts",
    "icon": "ri-file-paper-2-fill"
  },
  {
    "label": "Supplier Performance",
    "link": "/supplier/performance",
    "icon": "ri-bar-chart-fill"
  }
];

const userManagementMenu = [
  {
    "label": "User List",
    "link": "/user/user-grid",
    "icon": "ri-group-fill"
  },

  {
    "label": "New User",
    "link": "/user/new-user",
    "icon": "ri-user-add-fill"
  },
  {
    "label": "Roles And Rights",
    "link": "/user/roles-and-rights",
     "icon": "ri-shield-user-fill"
  },
  {
    "label": "User Roles",
    "link": "/user/roles",
    "icon": "ri-user-add-fill"
  },
  {
    "label": "User Activity Logs",
    "link": "/user/logs",
    "icon": "ri-time-line"
  }
];

const stockManagementMenu = [
  {
    "label": "Stock Overview",
    "link": "/stock/overview",
    "icon": "ri-archive-fill"
  },
  {
    "label": "Stock Adjustments",
    "link": "/stock/adjustments",
    "icon": "ri-edit-box-fill"
  },
  {
    "label": "Stock Transfers",
    "link": "/stock/transfers",
    "icon": "ri-transfer-fill"
  },
  {
    "label": "Stock Alerts",
    "link": "/stock/alerts",
    "icon": "ri-notification-2-fill"
  }
];

const wasteManagementMenu = [
  {
    "label": "Waste Tracking",
    "link": "/waste/tracking",
    "icon": "ri-delete-bin-fill"
  },
  {
    "label": "Waste Reports",
    "link": "/waste/reports",
    "icon": "ri-file-chart-fill"
  },
  {
    "label": "New Waste Entry",
    "link": "/waste/new",
    "icon": "ri-add-fill"
  },
  {
    "label": "Waste Reduction",
    "link": "/waste/reduction",
    "icon": "ri-recycle-fill"
  }
];

const invoiceManagementMenu = [
  {
    "label": "Invoice List",
    "link": "/invoice/list",
    "icon": "ri-file-list-3-fill"
  },
  {
    "label": "Create Invoice",
    "link": "/invoice/new",
    "icon": "ri-file-add-fill"
  },
  {
    "label": "Payment Status",
    "link": "/invoice/payment-status",
    "icon": "ri-bank-card-fill"
  },
  {
    "label": "Invoice Reports",
    "link": "/invoice/reports",
    "icon": "ri-bar-chart-fill"
  }
];


const ManagementMenu = [
  {
    "label": "Order Management",
    "link": "/order/order-management",
    "icon": "ri-file-list-3-fill",
    "submenu": [
      {
        "label": "purchase Planning",
        "icon": "ri-file-list-3-fill",
        "link": "/order/purchaseplanning"
      },
      {
        "label": "New Purchase Planning",
        "link": "/apps/gallery-video"
      }
    ]
  },
  {
    "label": "Store Management",
    "link": "/store/store-management",
    "icon": "ri-store-2-fill"
  },
  {
    "label": "Product Management",
    "link": "/product/product-management",
    "icon": "ri-price-tag-3-fill"
  },
  {
    "label": "Supplier Management",
    "link": "/supplier/supplier-management",
    "icon": "ri-truck-fill"
  },
  {
    "label": "User Management",
    "link": "/user/user-management",
    "icon": "ri-user-settings-fill"
  },
  {
    "label": "Stock Management",
    "link": "/stock/stock-management",
    "icon": "ri-stack-fill"
  },
  {
    "label": "Waste Management",
    "link": "/waste/waste-management",
    "icon": "ri-delete-bin-6-fill"
  },
  {
    "label": "Invoice Management",
    "link": "/invoice/invoice-management",
    "icon": "ri-file-text-fill"
  }

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



