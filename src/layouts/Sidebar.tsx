import React, { Component } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import userAvatar from "../assets/img/img1.jpg";
import { FaTachometerAlt, FaBox, FaStore, FaBoxes, FaPeopleCarry, FaWarehouse, FaFileInvoice, FaTrashAlt, FaUserCog, FaRecycle, FaFileInvoiceDollar, FaTruckLoading, FaTags, FaUserShield, FaClipboardList, FaStoreAlt, FaChartLine } from 'react-icons/fa';

import {
    dashboardMenu, OrderManagementMenu, storeManagementMenu,
    productManagementMenu, supplierManagementMenu,
    userManagementMenu, stockManagementMenu,
    invoiceManagementMenu, wasteManagementMenu,
} from "../data/Menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Make sure to import FontAwesomeIcon
type MenuGroupKey = 'dashboard' | 'orderManagement' | 'storeManagement' | 'productManagement' | 'supplierManagement' | 'stockManagement' | 'invoiceManagement' | 'wasteManagement' | 'userManagement';

interface MenuItem {
    label: string;
    link?: string;
    icon?: string;
    submenu?: MenuItem[];
}

interface SidebarMenuState {
    menuGroups: Record<MenuGroupKey, boolean>;
}

interface SidebarState {
    footerMenuOpen: boolean;
}

class Sidebar extends Component<{}, SidebarState> {
    state: SidebarState = {
        footerMenuOpen: false,
    };

    toggleFooterMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        this.setState(prevState => ({ footerMenuOpen: !prevState.footerMenuOpen }));
    }

    _scrollBarRef: PerfectScrollbar | null = null;

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo">MIESZKO</Link>
                </div>
                <PerfectScrollbar className="sidebar-body" ref={ref => this._scrollBarRef = ref}>
                    <SidebarMenu />
                </PerfectScrollbar>
                <div className="sidebar-footer">
                    <div className="sidebar-footer-top">
                        <div className="sidebar-footer-thumb">
                            <img src={userAvatar} alt="" />
                        </div>
                        <div className="sidebar-footer-body">
                            <h6><Link to="../pages/profile.html">Shaira Diaz</Link></h6>
                            <p>Premium Member</p>
                        </div>
                        <Link onClick={this.toggleFooterMenu} to="" className="dropdown-link"><i className="ri-arrow-down-s-line"></i></Link>
                    </div>
                    <div className={`sidebar-footer-menu ${this.state.footerMenuOpen ? 'footer-menu-show' : ''}`}>
                        <nav className="nav">
                            <Link to=""><i className="ri-edit-2-line"></i> Edit Profile</Link>
                            <Link to=""><i className="ri-profile-line"></i> View Profile</Link>
                        </nav>
                        <hr />
                        <nav className="nav">
                            <Link to=""><i className="ri-question-line"></i> Help Center</Link>
                            <Link to=""><i className="ri-lock-line"></i> Privacy Settings</Link>
                            <Link to=""><i className="ri-user-settings-line"></i> Account Settings</Link>
                            <Link to=""><i className="ri-logout-box-r-line"></i> Log Out</Link>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

const SidebarMenu: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const [menuGroups, setMenuGroups] = React.useState<SidebarMenuState['menuGroups']>({
        dashboard: false,
        orderManagement: false,
        storeManagement: false,
        productManagement: false,
        supplierManagement: false,
        stockManagement: false,
        invoiceManagement: false,
        wasteManagement: false,
        userManagement: false,
    });

    React.useEffect(() => {
        const findActiveMenuGroup = () => {
            const menuMap: Record<string, MenuGroupKey> = {
                // Dashboard Menu
                '/dashboard/finance': 'dashboard',
                '/dashboard/events': 'dashboard',
                '/dashboard/sales': 'dashboard',
                '/dashboard/analytics': 'dashboard',
                '/dashboard/crypto': 'dashboard',
                '/dashboard/helpdesk': 'dashboard',
                '/dashboard/storage': 'dashboard',
                '/dashboard/product': 'dashboard',
              
                // Order Management Menu
                '/order/new-purchase-planning': 'orderManagement',
                '/order/purchase-planning': 'orderManagement',
                '/order/purchase-order': 'orderManagement',
                '/order/order-history': 'orderManagement',
              
                // Store Management Menu
                '/store/manage-store': 'storeManagement',
                '/store/new-store': 'storeManagement',
                '/store/inventory': 'storeManagement',
                '/store/transfers': 'storeManagement',
              
                // Product Management Menu
                '/product/category': 'productManagement',
                '/product/brand': 'productManagement',
                '/product/list': 'productManagement',
                '/product/new-product': 'productManagement',
              
                // Supplier Management Menu
                '/supplier/directory': 'supplierManagement',
                '/supplier/new': 'supplierManagement',
                '/supplier/contracts': 'supplierManagement',
                '/supplier/performance': 'supplierManagement',
              
                // User Management Menu
                '/user/user-grid': 'userManagement',
                '/user/new-user': 'userManagement',
                '/user/roles-and-rights': 'userManagement',
                '/user/roles': 'userManagement',
                '/user/logs': 'userManagement',
              
                // Stock Management Menu
                '/stock/overview': 'stockManagement',
                '/stock/adjustments': 'stockManagement',
                '/stock/transfers': 'stockManagement',
                '/stock/alerts': 'stockManagement',
              
                // Waste Management Menu
                '/waste/tracking': 'wasteManagement',
                '/waste/reports': 'wasteManagement',
                '/waste/new': 'wasteManagement',
                '/waste/reduction': 'wasteManagement',
              
                // Invoice Management Menu
                '/invoice/list': 'invoiceManagement',
                '/invoice/new': 'invoiceManagement',
                '/invoice/payment-status': 'invoiceManagement',
                '/invoice/reports': 'invoiceManagement',
              
                // Management Menu (Top-Level)
                '/order/order-management': 'orderManagement',
                '/store/store-management': 'storeManagement',
                '/product/product-management': 'productManagement',
                '/supplier/supplier-management': 'supplierManagement',
                '/user/user-management': 'userManagement',
                '/stock/stock-management': 'stockManagement',
                '/waste/waste-management': 'wasteManagement',
                '/invoice/invoice-management': 'invoiceManagement',
              };
              
            const activeMenuGroup = menuMap[currentPath];
            if (activeMenuGroup) {
                setMenuGroups(prevState => ({
                    ...prevState,
                    [activeMenuGroup]: true
                }));
            }
        };

        findActiveMenuGroup();
    }, [currentPath]);

    const toggleMenu = (menuLabel: MenuGroupKey) => {
        setMenuGroups(prevState => {
            // Check if the clicked menu is already open
            const isCurrentlyOpen = prevState[menuLabel];
    
            // Close all menus and open only the clicked one
            const newMenuGroups = Object.keys(prevState).reduce((acc, key) => {
                acc[key as MenuGroupKey] = false;
                return acc;
            }, {} as Record<MenuGroupKey, boolean>);
    
            // If the clicked menu was not open, set it to true
            if (!isCurrentlyOpen) {
                newMenuGroups[menuLabel] = true;
            }
    
            return newMenuGroups;
        });
    };



    const populateMenu = (menuItems: MenuItem[]) => {
        return (
            <ul className="nav nav-sidebar">
                {menuItems.map((item, index) => {
                    const submenu = item.submenu ? item.submenu.map((subItem, subIndex) => (
                        <NavLink 
                            to={subItem.link || '#'} 
                            className={({ isActive }) => 
                                `nav-sub-link flex items-center text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md transition duration-300 ${
                                    isActive ? 'bg-zinc-800 text-white' : ''
                                }`
                            }
                            key={subIndex}
                        >
                            <FontAwesomeIcon icon={subItem.icon || ['fas', 'circle']} className="mr-2" /> 
                            {subItem.label}
                        </NavLink>
                    )) : null;
    
                    const isMenuGroupVisible = menuGroups[item.label as MenuGroupKey];
    
                    return (
                        <li 
                            key={index} 
                            className={`nav-item ${isMenuGroupVisible ? 'show' : ''} group relative`}
                        >
                            {!submenu ? (
                                <NavLink 
                                    to={item.link || '#'} 
                                    className={({ isActive }) => 
                                        `nav-link flex items-center rounded-md transition duration-300 ${
                                            isActive ? 'bg-cyan-500 text-white hover:text-white' : 'text-zinc-300 hover:text-white hover:bg-cyan-400'
                                        }`
                                    }
                                >
                                    <FontAwesomeIcon icon={item.icon || ['fas', 'circle']} className="mr-2" /> 
                                    <span>{item.label}</span>
                                </NavLink>
                            ) : (
                                <div 
                                    onClick={() => toggleMenu(item.label as MenuGroupKey)} 
                                    className="nav-link flex items-center justify-between text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-md cursor-pointer transition duration-300"
                                >
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={item.icon || ['fas', 'circle']} className="mr-2" /> 
                                        <span>{item.label}</span>
                                    </div>
                                    <FontAwesomeIcon icon="chevron-down" className="transform group-hover:rotate-180 transition duration-300" />
                                </div>
                            )}
                            {submenu && (
                                <nav className="nav nav-sub ml-4 mt-2 space-y-2">
                                    {submenu}
                                </nav>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };
    
    
    

    return (
<>
    <div className={`nav-group ${menuGroups.dashboard ? 'show' : ''} bg-zinc-50 rounded-lg my-2`}>
        <div 
            className="nav-label flex items-center gap-3 p-3 cursor-pointer text-white hover:bg-cyan-300 transition-colors duration-300 rounded-lg" 
            onClick={() => toggleMenu('dashboard')}
        >
            <FaChartLine className="nav-icon" size={20} /> 
            <span>Dashboard</span>
        </div>
        <div className="pl-2">{populateMenu(dashboardMenu)}</div>
    </div>

    <div className={`nav-group ${menuGroups.orderManagement ? 'show' : ''} bg-zinc-50 rounded-lg my-2`}>
        <div 
            className="nav-label flex items-center gap-3 p-3 cursor-pointer text-white hover:bg-cyan-300 transition-colors duration-300 rounded-lg" 
            onClick={() => toggleMenu('orderManagement')}
        >
            <FaClipboardList className="nav-icon" size={20}/> 
            <span>Order Management</span>
        </div>
        <div className="pl-2">{populateMenu(OrderManagementMenu)}</div>
    </div>

    <div className={`nav-group ${menuGroups.storeManagement ? 'show' : ''} bg-zinc-50 rounded-lg my-2`}>
        <div 
            className="nav-label flex items-center gap-3 p-3 cursor-pointer text-white hover:bg-cyan-300 transition-colors duration-300 rounded-lg" 
            onClick={() => toggleMenu('storeManagement')}
        >
            <FaStoreAlt className="nav-icon" size={20}/> 
            <span>Store Management</span>
        </div>
        <div className="pl-2">{populateMenu(storeManagementMenu)}</div>
    </div>

    <div className={`nav-group ${menuGroups.productManagement ? 'show' : ''} bg-zinc-50 rounded-lg my-2`}>
        <div 
            className="nav-label flex items-center gap-3 p-3 cursor-pointer text-white hover:bg-cyan-300 transition-colors duration-300 rounded-lg" 
            onClick={() => toggleMenu('productManagement')}
        >
            <FaTags className="nav-icon" size={20}/> 
            <span>Product Management</span>
        </div>
        <div className="pl-2">{populateMenu(productManagementMenu)}</div>
    </div>

    <div className={`nav-group ${menuGroups.supplierManagement ? 'show' : ''} bg-zinc-50 rounded-lg my-2`}>
        <div 
            className="nav-label flex items-center gap-3 p-3 cursor-pointer text-white hover:bg-cyan-300 transition-colors duration-300 rounded-lg" 
            onClick={() => toggleMenu('supplierManagement')}
        >
            <FaTruckLoading className="nav-icon" size={20}/> 
            <span>Supplier Management</span>
        </div>
        <div className="pl-2">{populateMenu(supplierManagementMenu)}</div>
    </div>

    <div className={`nav-group ${menuGroups.stockManagement ? 'show' : ''} bg-zinc-50 rounded-lg my-2`}>
        <div 
            className="nav-label flex items-center gap-3 p-3 cursor-pointer text-white hover:bg-cyan-300 transition-colors duration-300 rounded-lg" 
            onClick={() => toggleMenu('stockManagement')}
        >
            <FaBoxes className="nav-icon" size={20} /> 
            <span>Stock Management</span>
        </div>
        <div className="pl-2">{populateMenu(stockManagementMenu)}</div>
    </div>

    <div className={`nav-group ${menuGroups.invoiceManagement ? 'show' : ''} bg-zinc-50 rounded-lg my-2`}>
        <div 
            className="nav-label flex items-center gap-3 p-3 cursor-pointer text-white hover:bg-cyan-300 transition-colors duration-300 rounded-lg" 
            onClick={() => toggleMenu('invoiceManagement')}
        >
            <FaFileInvoiceDollar className="nav-icon" size={20} /> 
            <span>Invoice Management</span>
        </div>
        <div className="pl-2">{populateMenu(invoiceManagementMenu)}</div>
    </div>

    <div className={`nav-group ${menuGroups.wasteManagement ? 'show' : ''} bg-zinc-50 rounded-lg my-2`}>
        <div 
            className="nav-label flex items-center gap-3 p-3 cursor-pointer text-white hover:bg-cyan-300 transition-colors duration-300 rounded-lg" 
            onClick={() => toggleMenu('wasteManagement')}
        >
            <FaRecycle className="nav-icon" size={20}/> 
            <span>Waste Management</span>
        </div>
        <div className="pl-2">{populateMenu(wasteManagementMenu)}</div>
    </div>

    <div className={`nav-group ${menuGroups.userManagement ? 'show' : ''} bg-zinc-50 rounded-lg my-2`}>
        <div 
            className="nav-label flex items-center gap-3 p-3 cursor-pointer text-white hover:bg-cyan-300 transition-colors duration-300 rounded-lg" 
            onClick={() => toggleMenu('userManagement')}
        >
            <FaUserShield className="nav-icon" size={20}/> 
            <span>User Management</span>
        </div>
        <div className="pl-2">{populateMenu(userManagementMenu)}</div>
    </div>
</>

    
    );
}

window.addEventListener("click", function (e) {
    let tar = e.target as HTMLElement;
    let sidebar = document.querySelector(".sidebar");
    if (!tar.closest(".sidebar-footer") && sidebar) {
        sidebar.classList.remove("footer-menu-show");
    }

    if (!tar.closest(".sidebar") && !tar.closest(".menu-link")) {
        document?.querySelector("body")?.classList.remove("sidebar-show");
    }
});

window.addEventListener("load", function () {
    let skinMode = localStorage.getItem("sidebar-skin");
    let HTMLTag = document.querySelector("html");

    if (skinMode) {
        HTMLTag?.setAttribute("data-sidebar", skinMode);
    }
});

export default Sidebar;